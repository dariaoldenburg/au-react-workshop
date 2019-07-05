import React from 'react';
import { Message } from './ui/ChatAPI';

interface MessagesListProps {
  messages: Message[];
}

export function MessagesList(props: MessagesListProps) {
  return (
    <React.Fragment>
      {props.messages.map(message => {
        const date = new Date(message.createdAt);

        return (
          <div key={message.id || message.content}>
            <strong>[{date.toLocaleTimeString()}]</strong>
            <span style={{ color: message.color }}> {message.name}: </span>
            {message.content}
          </div>
        );
      })}
    </React.Fragment>
  );
}
