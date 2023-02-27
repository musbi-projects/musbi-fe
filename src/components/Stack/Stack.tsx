import React from 'react';
import styled, { css } from 'styled-components';

type Direction = 'row' | 'column';
type Align = 'start' | 'end' | 'center' | 'baseline';

interface Props {
  direction?: Direction;
  spacing?: React.CSSProperties['gap'];
  aligns?: [Align, Align];
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Stack = ({ children, ...restProps }: Props) => {
  return <StyledStackContainer {...restProps}>{children}</StyledStackContainer>;
};

export default Stack;

const StyledStackContainer = styled.div<Omit<Props, 'children'>>`
  display: flex;
  width: 100%;

  ${({ direction = 'row', spacing, aligns }) => {
    const align: Record<Align, string> = {
      start: 'flex-start',
      end: 'flex-end',
      center: 'center',
      baseline: 'baseline',
    };

    const unit = 'px';

    return css`
      flex-direction: ${direction};
      gap: ${typeof spacing === 'number' ? spacing + unit : spacing};
      align-items: ${!!aligns && align[aligns[0]]};
      justify-content: ${!!aligns && align[aligns[1]]};
    `;
  }}
`;
