export interface CommonStyleProps {
  pl?: string | number;
  pr?: string | number;
  pt?: string | number;
  pb?: string | number;
  ml?: string | number;
  mr?: string | number;
  mt?: string | number;
  mb?: string | number;
}

export type Nullable<T> = T | null;

export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type ModalHandler<T extends string | number> = {
  [P in T]: {
    open: () => void;
    close: () => void;
  };
};
