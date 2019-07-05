import React from 'react';
import { Button } from './ui/Button';
import './MessageBox.css';

export interface MessageBox {
  message: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

function handleChange(
  event: React.ChangeEvent<HTMLTextAreaElement>,
  onChange: MessageBox['onChange']
) {
  if (onChange) {
    onChange(event.target.value);
  }
}

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  onSubmit: MessageBox['onSubmit']
) {
  event.preventDefault();
  if (onSubmit) {
    onSubmit();
  }
}

export function MessageBox(props: MessageBox) {
  const { onChange, onSubmit, message, disabled } = props;

  return (
    <form
      onSubmit={event => handleSubmit(event, onSubmit)}
      className="MessageBox"
    >
      <textarea
        value={message}
        onChange={event => handleChange(event, onChange)}
        className="MessageBox__textarea"
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled}>
        Wyślij
      </Button>
    </form>
  );
}
