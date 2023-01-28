export interface ISelectContext {
  handleClickSelectOption?: (index: number) => void | undefined;
  targetIndex?: number | undefined;
  selectedOption: SelectedOption;
}

export interface SelectedOption {
  id: string;
  value: string;
}

export interface StyledSelectOptionProps {
  isHover: boolean;
  selected: boolean;
  disabled?: boolean | undefined;
}

export interface SelectOptionProps {
  id: string;
  index: number;
  value: string;
  children?: React.ReactNode;
  disabled?: boolean;
}