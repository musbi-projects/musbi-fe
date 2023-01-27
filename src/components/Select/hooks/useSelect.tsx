import React, { useCallback, useState, useRef, useEffect, createElement } from "react";

import SelectOption from "../SelectOption";

interface UseSelectProps {
  children: React.ReactElement[];
  handleCloseSelect: () => void;
}

export const useSelect = ({ children, handleCloseSelect }: UseSelectProps) => {
  const [value, setValue] = useState<string>("");
  const [currentValue, setCurrentValue] = useState<string>();
  const [filteredChildren, setFilteredChildren] = useState<React.ReactElement[]>([]);

  const originalChildren = useRef<React.ReactElement[]>([]);

  const handleClickSelectOption = useCallback(
    (index: number) => {
      const { value } = children[index].props;

      setCurrentValue(() => value);
      handleCloseSelect();
    },
    [handleCloseSelect, setCurrentValue],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const filteredChildren = children.filter(({ props }) => props.value.includes(value));

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

  return {
    currentValue,
    filteredChildren,
    handleClickSelectOption,
    handleChange,
  };
};
