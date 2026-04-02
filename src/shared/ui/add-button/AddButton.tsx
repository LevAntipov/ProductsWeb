import type { ReactNode } from 'react';

import clsx from 'clsx';

import classes from './AddButton.module.css';

interface AddButtonProps {
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
  className: string;
}

export const AddButton = ({ disabled, onClick, children, className }: AddButtonProps) => {
  return (
    <button
      className={clsx(
        classes.addButton,
        className // всегда
      )}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {children}
    </button>
  );
};
