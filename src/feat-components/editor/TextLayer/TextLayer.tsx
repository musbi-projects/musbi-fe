import React, { memo, useCallback, useEffect, useState, FocusEvent, useRef, useMemo, useLayoutEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import styled, { css } from 'styled-components';

interface TextLayerProps {
  id: string;
  content: string;
  fontFamily: string;
  fontWeight: number;
  center: { top: number; left: number };
}

const sanitizeConf = {
  allowedTags: ['b', 'i', 'a', 'p', 'br'],
  allowedAttributes: { a: ['href'] },
};

const TextLayer = (props: TextLayerProps) => {
  const { id, content: initialContent, fontFamily, fontWeight, center } = props;
  const [content, setContent] = useState(initialContent);
  const [isDisabled, setIsDisabled] = useState(true);
  const [layerPosition, setLayerPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const layerRef = useRef<HTMLDivElement | null>();

  const handleContentChange = useCallback((e: ContentEditableEvent) => {
    setContent(e.currentTarget.innerHTML);
  }, []);

  const handleDoubleClickLayer = useCallback(() => {
    setIsDisabled(false);
  }, []);

  const handleBlurLayer = useCallback((e: FocusEvent<HTMLDivElement>) => {
    setIsDisabled(true);
    setContent(e.currentTarget.innerHTML);
  }, []);

  const handleDragEnterLayer = useCallback(() => {
    console.log('[handleDragEnter]');
  }, []);

  const handleDragLayer = useCallback(() => {
    console.log('[handleDrag]');
  }, []);

  const handleClickLayer = useCallback(() => {
    console.log('[handleClickLayer]');
  }, []);

  const initLayerSize = useCallback(() => {
    const layerRect = layerRef.current!.getBoundingClientRect();
    const left = center.left - layerRect.width / 2;
    setLayerPosition({ ...center, left });
  }, [layerRef.current]);

  useLayoutEffect(() => {
    if (!layerRef.current) return;
    initLayerSize();
  }, [layerRef.current]);

  useEffect(() => {
    setContent(sanitizeHtml(initialContent, sanitizeConf));
  }, [initialContent]);

  return (
    <StyledTextLayer
      center={layerPosition}
      disabled={isDisabled}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      onBlur={handleBlurLayer}
      onChange={handleContentChange}
      onClick={handleClickLayer}
      onDrag={handleDragLayer}
      onDragEnter={handleDragEnterLayer}
      onDoubleClick={handleDoubleClickLayer}
      html={content}
      tagName='div'
      innerRef={(ref: HTMLDivElement) => (layerRef.current = ref)}
    />
  );
};

export default memo(TextLayer);

const StyledTextLayer = styled(ContentEditable)<{
  fontFamily: string;
  fontWeight: number;
  disabled: boolean;
  center: { top: number; left: number };
}>`
  ${({ theme, fontFamily, fontWeight, disabled, center }) => css`
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
  `}
`;
