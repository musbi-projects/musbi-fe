import React, { memo, useCallback, useEffect, useState, FocusEvent, useRef, useLayoutEffect, useMemo } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import styled, { css } from 'styled-components';
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
  const [layerPosition, setLayerPosition] = useState<LayerPosition>({ top: 0, left: 0 });
  const setEditorViewState = useSetEditorViewState();
  const { currentCanvas } = useCanvasValue();

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

  const handleDraggingLayer = useCallback((e: DraggableEvent, data: DraggableData) => {
    // console.log('[handleDrag]', data);
    setIsDragging(true);
  }, []);

  const handleStopDragLayer = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClickLayer = useCallback(() => {
    console.log('[handleClickLayer]');
  }, []);

  // 초기 중앙 포지셔닝을 위해 레이어 사이즈를 계산해
  const initLayerSize = useCallback(() => {
    const layerRect = layerRef.current!.getBoundingClientRect();
    const left = center?.left - layerRect.width / 2;
    setLayerPosition({ ...center, left });
  }, [layerRef.current]);

  useLayoutEffect(() => {
    if (!layerRef.current) return;
    initLayerSize();
  }, [layerRef.current]);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <Draggable
      onStart={handleStartDragLayer}
      onDrag={handleDraggingLayer}
      onStop={handleStopDragLayer}
      nodeRef={layerRef}
    >
      <StyledTextLayer
        clicked={clicked.toString()}
        center={layerPosition}
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
    </Draggable>
  );
};

export default memo(TextLayer);

const StyledTextLayer = styled(ContentEditable)<{
  fontFamily: string;
  fontWeight: number;
  disabled: boolean;
  clicked: string;
  center: { top: number; left: number };
}>`
  ${({ theme, fontFamily, fontWeight, disabled, clicked, center }) => css`
    outline: none;
    font-family: ${fontFamily};
    font-weight: ${fontWeight ? fontWeight : 'normal'};
    cursor: ${disabled ? 'move' : 'initial'};
    position: absolute;
    display: inline-block;
    top: ${center.top}px;
    left: ${center.left}px;


    &:hover,
    &:focus {
      box-shadow: 0 0 0 1px ${theme.color.primary};
    }

    box-shadow: ${!disabled ? `0 0 0 1px ${theme.color.secondary} !important` : 'none'};
    box-shadow: ${clicked === 'true' ? `0 0 0 1px ${theme.color.primary}` : 'none'};


  `}
`;
