import React from 'react';
import { Message } from './ui/ChatAPI';

interface MessagesListThreadProps {
  message: Message;
}

export function MessagesListThread({ message }: MessagesListThreadProps) {
  const date = new Date(message.createdAt);

  return (
    <div key={message.id || message.content}>
      <strong>[{date.toLocaleTimeString()}]</strong>{' '}
      {message.user && (
        <span
          style={{
            color: message.user.color,
            fontWeight: message.user.senior ? 'bold' : undefined
          }}
        >
          {message.user.name}:{' '}
        </span>
      )}
      {message.content}
    </div>
  );
}
