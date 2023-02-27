import { useCallback, useMemo, useState } from 'react';

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  return {
    isOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
