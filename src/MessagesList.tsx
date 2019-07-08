import React from 'react';
import { MessagesListThread } from './MessagesListThread';
import { Message } from './ui/ChatAPI';

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
