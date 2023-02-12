import { useFileUpload } from "./hooks";
import styled, { useTheme } from "styled-components";

import Image from "next/image";
import Button from "@/components/Button";
import Text from "@/components/Text";
import { MdOutlineFileUpload } from "react-icons/md";

const IMAGE_HEIGHT = 80;

export default function UploadDrawer() {
  const theme = useTheme();
  const { dragRef, inputRef, isDragging, onChange, accept, fileObjectUrlList } = useFileUpload();

  return (
    <>
      <StyledUploadDrawerContainer ref={dragRef}>
        {isDragging && (
          <StyledDraggableContainer>
            <label htmlFor="file-upload2"></label>
            <input ref={inputRef} id="file-upload2" type="file" accept={accept} onChange={onChange} multiple />
          </StyledDraggableContainer>
        )}

        <StyledUploadButtonWrapper>
          <label htmlFor="file-upload"></label>
          <input ref={inputRef} id="file-upload" type="file" accept={accept} onChange={onChange} multiple />
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

        {fileObjectUrlList.length > 0 && (
          <StyledFileListWrapper>
            <div className="label-wrapper">
              <Text as="span" color="deepGray" size="14px" weight={"600"}>
                파일
              </Text>
              <Text as="span" color="lightGray" size="14px" weight={"600"}>
                {" "}
                ({fileObjectUrlList.length})
              </Text>
            </div>
            <div className="file-list">
              {fileObjectUrlList.map(({ objectUrl, ratio }) => {
                return (
                  <Image
                    key={objectUrl}
                    src={objectUrl}
                    alt=""
                    className="image-file"
                    height={IMAGE_HEIGHT}
                    width={IMAGE_HEIGHT * ratio}
                  />
                );
              })}
            </div>
          </StyledFileListWrapper>
        )}

        {fileObjectUrlList.length === 0 && (
          <StyledUploadDescriptionWrapper gap={"24px"}>
            <div>
              <div onChange={(e: React.ChangeEvent<HTMLDivElement>) => e.target.innerText} onInput={(e) => e}>
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
        )}
      </StyledUploadDrawerContainer>
    </>
  );
}

const StyledDraggableContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.12);
  transition: background-color 2s ease-in-out;
  z-index: 20;

  label: {
    width: 100%;
    height: 100%;
  }

  input {
    display: none;
  }
`;

const StyledUploadDrawerContainer = styled.div`
  padding: 28px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  position: relative;
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
    z-index: 10;

    :hover {
      cursor: pointer;
    }
  }

  input {
    display: none;
  }
`;

const StyledFileListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .file-list {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 8px;
    height: 100%;

    .image-file {
      flex-shrink: 0;
      border-radius: 2px;
      cursor: pointer;
    }
  }
`;
