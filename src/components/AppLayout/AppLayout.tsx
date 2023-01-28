import React from "react";
import Header from "@/components/Header";
import styled from "styled-components";

interface AppLayoutProps {
  children: React.ReactNode;
}

const SampleLeft = () => {
  return <h1>musbi - main page</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <StyledLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <main>{children}</main>
    </StyledLayout>
  );
};

export default AppLayout;

const StyledLayout = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-color: #f1f1f2;
`;
