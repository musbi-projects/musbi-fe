export interface ISelectContext {
  handleClickSelectOption?: (index: number) => void | undefined;
  targetIndex?: number | undefined;
  currentValue: string;
}


export interface StyledSelectOptionProps {
  isHover: boolean;
  selected: boolean;
  disabled?: boolean | undefined;
}