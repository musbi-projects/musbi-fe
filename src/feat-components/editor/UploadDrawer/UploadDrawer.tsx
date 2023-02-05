import React from "react";

import { useFileUpload } from "./hooks";
import styled, { css, useTheme } from "styled-components";

import Button from "@/components/Button";
import Text from "@/components/Text";
import { MdOutlineFileUpload } from "react-icons/md";

export default function UploadDrawer() {
  const theme = useTheme();
  const { dragRef, isDragging } = useFileUpload();

  return (
    <>
      {isDragging && <div></div>}

      <StyledUploadDrawerContainer ref={dragRef}>
        <StyledUploadButtonWrapper>
          <label htmlFor="file-upload"></label>
          <input id="file-upload" type="file" accept=".jpeg, .jpg, .png" />
          <Button
            size="large"
            shape="circle"
            variant="contained"
            color="secondary"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            width={"100%"}
            weight="700"
          >
            업로드
          </Button>
        </StyledUploadButtonWrapper>
        <StyledUploadDescriptionWrapper gap={"24px"}>
          <div>
            <div>
              <MdOutlineFileUpload size="48px" />
            </div>
          </div>
          <StyledUploadDescriptionWrapper gap="12px">
            <Text as="p" size={theme.font.title.large} color="black">
              파일을 업로드하세요.
            </Text>
            <Text as="p" size={theme.font.body.medium} color="lightGray" center>
              드래그 앤 드롭하거나 업로트 버튼을 사용하세요.
              <br />
              JPG, PNG, SVG, GIF, MP4, MP3, M4A
            </Text>
          </StyledUploadDescriptionWrapper>
        </StyledUploadDescriptionWrapper>
      </StyledUploadDrawerContainer>
    </>
  );
}

const StyledUploadDrawerContainer = styled.div`
  padding: 28px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 60px;
`;

const StyledUploadDescriptionWrapper = styled.div<{ gap: React.CSSProperties["rowGap"] }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: ${({ gap }) => gap};
`;

const StyledUploadButtonWrapper = styled.div`
  width: 100%;
  position: relative;

  label {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    :hover {
      cursor: pointer;
    }
  }

  input {
    display: none;
  }
`;
