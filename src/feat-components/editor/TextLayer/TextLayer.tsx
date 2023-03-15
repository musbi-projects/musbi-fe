import React, { memo, useCallback, useEffect, useState, FocusEvent, useLayoutEffect, useRef } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Moveable, { OnDrag, OnResize } from 'react-moveable';
import styled, { css } from 'styled-components';
import { Frame } from 'scenejs';
import { useOutsideClick } from '@/hooks';
import { useSetEditorViewState } from '@/recoil/editorView';
import { useCanvasValue } from '@/recoil/canvas';

interface LayerPosition {
  top: number;
  left: number;
}

interface TextLayerProps {
  id: string;
  content: string;
  fontFamily: string;
  fontWeight: number;
  center: LayerPosition;
}

const TextLayer = (props: TextLayerProps) => {
  const { id, content: initialContent, fontFamily, fontWeight, center } = props;
  const [content, setContent] = useState(initialContent);
  const [clicked, setClicked] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const setEditorViewState = useSetEditorViewState();
  const { currentCanvas } = useCanvasValue();
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  const frameRef = useRef(
    new Frame({
      width: 'auto',
      height: 'auto',
      left: '0px',
      top: '0px',
      transform: {
        rotate: '0deg',
        scaleX: 1,
        scaleY: 1,
        matrix3d: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
      },
    }),
  );

  console.log('[isDragging]', isDragging);

  const syncLayerFrame = (transformFn: () => void) => {
    transformFn();
    if (layerRef.current && frameRef.current) {
      layerRef.current.style.cssText = frameRef.current.toCSSText();
    }
  };

  // TODO: 현재 TextLayer 내용 한정 update 추후 fontFamily, name 등등 상태변경도 필요
  const updateEditorViewState = (text: string) => {
    setEditorViewState((prev) => {
      const newContents = prev[currentCanvas].contents.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            content: text,
          };
        }

        return item;
      });

      return {
        ...prev,
        [currentCanvas]: {
          contents: newContents,
        },
      };
    });
  };

  const handleOuterClick = useCallback(() => {
    console.log('[handleOuterClick]');
    setClicked(false);
    setIsDisabled(true);
    setTarget(null);
  }, []);

  const { ref: layerRef } = useOutsideClick(handleOuterClick);

  const handleContentChange = useCallback((e: ContentEditableEvent) => {
    setContent(e.currentTarget.innerHTML);
    updateEditorViewState(e.currentTarget.innerHTML);
  }, []);

  const handleDoubleClickLayer = useCallback(() => {
    setIsDisabled(false);
    // if (clicked) {
    //   setIsDisabled(false);
    //   return;
    // }
    // setClicked(!clicked);
  }, [clicked]);

  const handleBlurLayer = useCallback((e: FocusEvent<HTMLDivElement>) => {
    console.log('[handleBlurLayer]');
    setIsDisabled(true);
    setContent(e.currentTarget.innerHTML);
    updateEditorViewState(e.currentTarget.innerHTML);
  }, []);

  //  편집중 상태 (isDisabled === false) 일때는 Dragging 을 취소하는 이벤트
  const handleStartDragLayer = useCallback(() => {
    if (!isDisabled) return false;
  }, [isDisabled]);

  const handleDraggingLayer = useCallback(({ left, top }: OnDrag) => {
    syncLayerFrame(() => {
      frameRef.current.set('top', top + 'px');
      frameRef.current.set('left', left + 'px');
    });
  }, []);

  const handleStopDragLayer = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleResizeLayer = useCallback(({ width, height, transform }: OnResize) => {
    syncLayerFrame(() => {
      frameRef.current.set('width', width + 'px');
      frameRef.current.set('height', height + 'px');
      frameRef.current.set('transform', transform);
    });
  }, []);

  const handleClickLayer = useCallback(() => {
    console.log('[handleClickLayer]');
    setTarget(layerRef.current);
  }, []);

  const getLayerStartPosition = useCallback(() => {
    if (!layerRef.current) return { top: 0, left: 0 };
    const layerRect = layerRef.current!.getBoundingClientRect();
    const left = center?.left - layerRect.width / 2;
    return { top: center.top, left };
  }, [layerRef.current]);

  // 초기 중앙 포지셔닝을 위해 레이어 사이즈를 계산해
  const initLayer = useCallback(() => {
    const { top, left } = getLayerStartPosition();
    if (layerRef.current) {
      setTarget(layerRef.current);
      syncLayerFrame(() => {
        frameRef.current.set('top', top + 'px');
        frameRef.current.set('left', left + 'px');
      });
    }
  }, [layerRef.current]);

  useLayoutEffect(() => {
    if (!layerRef.current) return;
    initLayer();
  }, [layerRef.current]);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <>
      <Moveable
        origin={false}
        draggable={true}
        resizable={true}
        throttleDrag={1}
        throttleRotate={0.2}
        throttleResize={1}
        throttleScale={0.01}
        pinchThreshold={20}
        target={target}
        onDrag={handleDraggingLayer}
        onDragStart={handleStartDragLayer}
        onDragEnd={handleStopDragLayer}
        onResize={handleResizeLayer}
      />
      <StyledTextLayer
        disabled={isDisabled}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        onBlur={handleBlurLayer}
        onChange={handleContentChange}
        onClick={handleClickLayer}
        onDoubleClick={handleDoubleClickLayer}
        html={content}
        innerRef={layerRef}
        tagName='div'
      />
    </>
  );
};

export default memo(TextLayer);

const StyledTextLayer = styled(ContentEditable)<{
  fontFamily: string;
  fontWeight: number;
  disabled: boolean;
}>`
  ${({ theme, fontFamily, fontWeight, disabled }) => css`
    outline: none;
    font-family: ${fontFamily};
    font-weight: ${fontWeight ? fontWeight : 'normal'};
    cursor: ${disabled ? 'move' : 'initial'};
    position: absolute;
    display: inline-block;
    word-break: break-all;

    &:hover,
    &:focus {
      //box-shadow: 0 0 0 1px ${theme.color.primary};
    }



  `}
`;
