import React from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  type: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { children, onClick, variant, disabled, type, fullWidth } = props;

  return (
    <button
      className={classNames('Button', {
        [`Button--variant--${variant}`]: true,
        [`Button--fullWidth`]: fullWidth
      })}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  variant: 'primary',
  type: 'button'
};
