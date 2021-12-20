import React from 'react';
import { Message } from './ChatAPI';
import './MessageBox.css';
import { MessagesListThread } from './MessagesListThread';
import { Button } from './ui/Button';

export interface MessageBox {
  disabled?: boolean;
  replyTo?: Message;
  onReplyClear?(): void;
  onSubmit: (content: string) => void;
}

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  onSubmit: MessageBox['onSubmit']
) {
  event.preventDefault();
  if (onSubmit) {
    onSubmit('something');
  }
}

export function MessageBox(props: MessageBox) {
  const { onSubmit, disabled, replyTo, onReplyClear } = props;

  return (
    <form
      onSubmit={event => handleSubmit(event, onSubmit)}
      className="MessageBox"
    >
      {replyTo && (
        <div>
          Odpowiadasz na{' '}
          <Button type="button" onClick={onReplyClear}>
            (anuluj)
          </Button>
          <div
            style={{
              background: '#fff',
              margin: '5px 0',
              padding: '5px'
            }}
          >
            <MessagesListThread message={replyTo} showSubmessages={false} />
          </div>
        </div>
      )}

      <textarea value="" className="MessageBox__textarea" disabled={disabled} />

      <Button type="submit" disabled={disabled}>
        Wyślij
      </Button>
    </form>
  );
}
