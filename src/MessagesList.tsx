import React from 'react';
import { Message } from './ui/ChatAPI';

interface MessagesListProps {
  messages: Message[];
}

export function MessagesList(props: MessagesListProps) {
  return (
    <React.Fragment>
      {props.messages.map(message => (
        <div key={message.id || message.content}>{message.content}</div>
      ))}
    </React.Fragment>
  );
}
