import React, { useCallback, useEffect, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import styled, { css } from 'styled-components';

interface ArgsParams {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

interface ModalContainerProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children: React.ReactNode;
}

const ModalContainer = ({ isOpen, handleCloseModal, children }: ModalContainerProps) => {
  const [bodyEl, setBodyEl] = useState<Element | null>(null);
  const [_isOpen, _setIsOpen] = useState<boolean>(isOpen);
  const _handleCloseModal = useCallback(() => handleCloseModal(), []);
  const { ref } = useOutsideClick(() => _handleCloseModal());

  useEffect(() => {
    if (document) {
      setBodyEl(document.body);
    }
  }, []);

  useEffect(() => {
    _setIsOpen(isOpen);
  }, [isOpen]);

  if (!_isOpen) {
    return null;
  }

  return (
    <div>
      {bodyEl && children
        ? createPortal(
            <>
              <StyledDimmed />
              <article ref={ref}>{children}</article>
            </>,
            bodyEl,
          )
        : null}
    </div>
  );
};

export default ModalContainer;

const StyledDimmed = styled.div`
    ${() => css`
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
        background-color: rgba(0, 0, 0, .5);
    `}
`;
