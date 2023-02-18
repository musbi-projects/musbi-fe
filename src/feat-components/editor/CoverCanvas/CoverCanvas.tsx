import React, { useCallback } from 'react';
import { useCoverCanvas } from '@/feat-components/editor/CoverCanvas/hooks/useCoverCanvas';
import styled, { css } from 'styled-components';
import TextLayer from '@/feat-components/editor/TextLayer';

interface CoverCanvasProps {
  contents?: any[];
}

const CoverCanvas = ({ contents }: CoverCanvasProps) => {
  const { isFocus, center } = useCoverCanvas();
  const renderer = useCallback(
    (contents: any[]) => {
      return contents?.map((layer) => {
        if (layer.type === 'TEXT') {
          return <TextLayer key={layer.id} center={center} {...layer} />;
        }

        if (layer.type === 'BACKGROUND') {
          return <div>배경</div>;
        }
      });
    },
    [contents],
  );

  return (
    <>
      <StyledCoverCanvasContainer>
        <StyledCanvasLabel>첫 페이지</StyledCanvasLabel>
        <StyledCanvasContent isFocus={isFocus} data-canvas-id='cover'>
          {renderer(contents || [])}
        </StyledCanvasContent>
      </StyledCoverCanvasContainer>
    </>
  );
};

export default CoverCanvas;

const StyledCanvasContent = styled.div<{ isFocus: boolean }>`
  ${({ isFocus }) => css`
    height: 844px;
    border: 1px solid #fff;
    background-color: #fff;
    box-shadow: ${isFocus ? '0 3px 6px rgba(0,0,0,0.1), 0 3px 6px rgba(0,0,0,0.16)' : 'none'};
  `}
`;

const StyledCanvasLabel = styled.div`
  ${({ theme }) => css`
    padding: 8px 5px;
    color: ${theme.color.lightGray};
    font-size: ${theme.font.label.large}
  `}
`;

const StyledCoverCanvasContainer = styled.div`
    width: 390px;
    margin: 60px auto;
`;
