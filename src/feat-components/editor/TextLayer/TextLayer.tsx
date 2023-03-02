import React, { memo, useCallback, useEffect, useState, FocusEvent, useRef, useLayoutEffect, useMemo } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import Moveable, { OnDrag, OnResize } from 'react-moveable';
import styled, { css } from 'styled-components';
import { useOutsideClick } from '@/hooks';
import { useSetEditorViewState } from '@/recoil/editorView';
import { useCanvasValue } from '@/recoil/canvas';

interface LayerPosition {
  top: number;
  left: number;
}

interface LayerSize {
  width: 'auto' | number;
  height: 'auto' | number;
}

interface TextLayerProps {
  id: string;
  content: string;
  fontFamily: string;
  fontWeight: number;
  center: LayerPosition;
}

const sanitizeConf = {
  allowedTags: ['b', 'i', 'a', 'p'],
  allowedAttributes: { a: ['href'] },
};

const TextLayer = (props: TextLayerProps) => {
  const { id, content: initialContent, fontFamily, fontWeight, center } = props;
  const [content, setContent] = useState(initialContent);
  const [clicked, setClicked] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const setEditorViewState = useSetEditorViewState();
  const { currentCanvas } = useCanvasValue();
  const [frame, setFrame] = useState<Record<string, any>>({ width: 'auto', height: 'auto', top: 0, left: 0 });

  console.log('[frame]', frame);

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
  }, []);

  const { ref: layerRef } = useOutsideClick(handleOuterClick);

  const handleContentChange = useCallback((e: ContentEditableEvent) => {
    setContent(e.currentTarget.innerHTML);
    updateEditorViewState(e.currentTarget.innerHTML);
  }, []);

  const handleDoubleClickLayer = useCallback(() => {
    if (clicked) {
      setIsDisabled(false);
      return;
    }
    setClicked(!clicked);
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

  const handleDraggingLayer = useCallback(
    ({ left, top }: OnDrag) => {
      setFrame({ ...frame, top, left });
    },
    [frame],
  );

  const handleStopDragLayer = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleResizeLayer = useCallback(
    ({ target, width, height, transform }: OnResize) => {
      console.log('height', height);
      setFrame({ ...frame, width, height });
      target.style.transform = transform;
    },
    [frame],
  );

  const handleClickLayer = useCallback(() => {
    console.log('[handleClickLayer]');
  }, []);

  const getLayerStartPosition = useCallback(() => {
    if (!layerRef.current) return { top: 0, left: 0 };
    const layerRect = layerRef.current!.getBoundingClientRect();
    const left = center?.left - layerRect.width / 2;
    return { top: center.top, left };
  }, [layerRef.current]);

  // 초기 중앙 포지셔닝을 위해 레이어 사이즈를 계산해
  const initLayer = useCallback(() => {
    console.log('[initLayer]');
    const { top, left } = getLayerStartPosition();
    setFrame({ ...frame, top, left });
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
        throttleResize={1}
        throttleScale={0.01}
        throttleRotate={0.2}
        pinchThreshold={20}
        target={layerRef.current}
        onDrag={handleDraggingLayer}
        onDragStart={handleStartDragLayer}
        onDragEnd={handleStopDragLayer}
        onResize={handleResizeLayer}
      />
      <StyledTextLayer
        frame={frame}
        clicked={clicked.toString()}
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
  clicked: string;
  frame: Record<string, any>;
}>`
  ${({ theme, fontFamily, fontWeight, disabled, clicked, frame }) => css`
    outline: none;
    font-family: ${fontFamily};
    font-weight: ${fontWeight ? fontWeight : 'normal'};
    cursor: ${disabled ? 'move' : 'initial'};
    position: absolute;
    display: inline-block;
    top: ${frame?.top}px;
    left: ${frame?.left}px;
    width: ${typeof frame.width === 'string' ? frame.width : `${frame.width}px`};
    height: ${typeof frame.height === 'string' ? frame.height : `${frame.height}px`};

    &:hover,
    &:focus {
      box-shadow: 0 0 0 1px ${theme.color.primary};
    }

    box-shadow: ${!disabled ? `0 0 0 1px ${theme.color.secondary} !important` : 'none'};
    box-shadow: ${clicked === 'true' ? `0 0 0 1px ${theme.color.primary}` : 'none'};


  `}
`;
