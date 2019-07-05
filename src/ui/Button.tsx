import React from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps) {
  const { children, onClick, variant, disabled, type } = props;

  return (
    <button
      className={classNames('Button', {
        [`Button--variant--${variant}`]: true
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
