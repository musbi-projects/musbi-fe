import React, { useState } from "react";
import AppLayout from "@/components/AppLayout/AppLayout";
import Header from "@/components/Header";
import styled from "styled-components";
import { Inter } from "@next/font/google";
import ToolBox from "@/components/ToolBox";
import ColorPicker, { useColorPicker } from "@/components/ColorPicker";
import Input from "@/components/Input";
import { CiSearch } from "react-icons/ci";

export default function Home() {
  const { color, handleChangeColor } = useColorPicker();

  return (
    <AppLayout>
      <Header left={<SampleLeft />} right={<SampleRight />} />
      <ToolBox />
      <StyledMainContainer>
        <h1>Color Picker</h1>
        <ColorPicker color={color} onChange={handleChangeColor} />
              <Input
        type="search"
        variant="outlined"
        placeholder="텍스트 검색"
        icon={<CiSearch />}
      />
      </StyledMainContainer>
    </AppLayout>
  );

}
