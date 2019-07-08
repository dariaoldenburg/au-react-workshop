import React from 'react';
import { Message } from './ChatAPI';
import { MessagesListThread } from './MessagesListThread';

interface MessagesListProps {
  messages: Message[];
}

export function MessagesList(props: MessagesListProps) {
  return (
    <React.Fragment>
      {props.messages.map(message => (
        <MessagesListThread key={message.id} message={message} />
      ))}
    </React.Fragment>
  );
}
