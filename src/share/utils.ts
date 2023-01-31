import { CommonStyleProps } from '@/types/common';

export const setCommonStyle = ({ pl, pr, pt, pb, ml, mr, mt, mb }: CommonStyleProps) => {
  const style = [];
  const getFixedUnit = (value: string | number) => {
    if (typeof value === 'string') {
      return value;
    }

    return `${value}px`;
  };
  if (pl) {
    style.push(`padding-left: ${getFixedUnit(pl)}`);
  }

  if (pr) {
    style.push(`padding-right: ${getFixedUnit(pr)}`);
  }

  if (pt) {
    style.push(`padding-top: ${getFixedUnit(pt)}`);
  }

  if (pb) {
    style.push(`padding-bottom: ${getFixedUnit(pb)}`);
  }

  if (ml) {
    style.push(`margin-left: ${getFixedUnit(ml)}`);
  }

  if (mr) {
    style.push(`margin-right: ${getFixedUnit(mr)}`);
  }

  if (mt) {
    style.push(`margin-top: ${getFixedUnit(mt)}`);
  }

  if (mb) {
    style.push(`margin-bottom: ${getFixedUnit(mb)}`);
  }

  return style.join(';') + ';';
};
