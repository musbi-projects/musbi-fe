import type { SelectOptionProps, SelectedOption } from "../types";

import React, { useCallback, useState, useRef, useEffect } from "react";

import SelectOption from "../SelectOption";

interface UseSelectProps {
  children: React.ReactElement<SelectOptionProps>[];
  isOpen: boolean;
  handleCloseSelect: () => void;
}

export const useSelect = ({ children, isOpen, handleCloseSelect }: UseSelectProps) => {
  const [value, setValue] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({id: '', value: ''});
  const [filteredChildren, setFilteredChildren] = useState<React.ReactElement[]>([]);

  const originalChildren = useRef<React.ReactElement[]>([]);

  const handleClickSelectOption = useCallback(
    (index: number) => {
      const { value, id } = children[index].props;

      setSelectedOption({id, value});
      handleCloseSelect();
    },
    [handleCloseSelect, setSelectedOption],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const filteredChildren = children.filter(({ props }) => props.value.includes(value));

      setValue(value);

      if (value.length && filteredChildren.length) {
        return setFilteredChildren(filteredChildren);
      }

      if (value.length && !filteredChildren.length) {
        setFilteredChildren([
          <SelectOption disabled index={0} id='NO_RESULT' value='검색 결과 없음'>
            검색 결과 없음
          </SelectOption>,
        ]);
      }

      if (!value.length) {
        setFilteredChildren(originalChildren.current);
      }
    },
    [children],
  );

  useEffect(() => {
    if (children) {
      originalChildren.current = children;
      setFilteredChildren(children);
    }

    return () => {};
  }, [children]);

  useEffect(() => {
    if (isOpen) {
      setValue(selectedOption.value);
    }
    if (!isOpen) {
      setValue("");
    }
  }, [isOpen]);

  return {
    value,
    selectedOption,
    filteredChildren,

    handleClickSelectOption,
    handleChange,
  };
};
