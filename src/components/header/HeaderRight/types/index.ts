import type { ButtonVariant } from '@/components/Button';

export interface HeaderMenu {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
}

export type AuthModalType = 'login' | 'join';
