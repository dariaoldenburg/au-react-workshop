import React from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  fullWidth?: boolean;
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
  variant: 'primary'
};
