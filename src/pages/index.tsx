import React, { useState } from "react";
import AppLayout from "@/components/AppLayout/AppLayout";
import Header from "@/components/Header";
import styled from "styled-components";
import { Inter } from "@next/font/google";
import ToolBox from "@/components/ToolBox";
import ColorPicker, { useColorPicker } from "@/components/ColorPicker";

const inter = Inter({ subsets: ["latin"] });

const SampleLeft = () => {
  return <h1>musbi</h1>;
};

const SampleRight = () => {
  return (
    <div>
      <span>Menu 1</span>
      <span>Menu 2</span>
    </div>
  );
};

export default function Home() {
  const { color, handleChangeColor } = useColorPicker();

  return (
    <AppLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <ToolBox />
      <StyledMainContainer>
        <h1>Color Picker</h1>
        <ColorPicker color={color} onChange={handleChangeColor} />
      </StyledMainContainer>
    </AppLayout>
  );
}

const StyledMainContainer = styled.main``;
