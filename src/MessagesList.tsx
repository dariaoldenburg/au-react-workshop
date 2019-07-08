import React from 'react';
import { MessagesListThread } from './MessagesListThread';
import { Message } from './ChatAPI';

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
