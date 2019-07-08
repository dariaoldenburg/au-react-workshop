import React from 'react';
import { Message } from './ChatAPI';
import { MessagesListThread } from './MessagesListThread';

interface MessagesListProps {
  messages: Message[];
  onReplyClick?(message: Message): void;
}

export function MessagesList(props: MessagesListProps) {
  return (
    <React.Fragment>
      {props.messages.map(message => (
        <MessagesListThread
          key={message.id}
          message={message}
          onReplyClick={() => props.onReplyClick && props.onReplyClick(message)}
        />
      ))}
    </React.Fragment>
  );
}
