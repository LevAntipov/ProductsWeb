import type { ReactNode } from 'react';

import clsx from 'clsx';

import classes from './AddButton.module.css';

export interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  disabled,
  onClick,
  children,
  className,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      className={clsx(classes.button, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
