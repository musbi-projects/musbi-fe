import React from 'react';
import styled from 'styled-components';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default AppLayout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`;
