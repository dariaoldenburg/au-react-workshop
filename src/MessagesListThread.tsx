import React from 'react';
import { Message } from './ChatAPI';
import { Button } from './ui/Button';

const SubmessagesList = ({
  messages,
  extended,
  onClick
}: {
  messages: Message[];
  extended: boolean;
  onClick(): void;
}) => {
  return (
    <div style={{ marginLeft: 20 }}>
      {extended &&
        messages.map(message => (
          <MessagesListThread key={message.id} message={message} />
        ))}
      <div>
        <Button onClick={onClick}>
          {!extended
            ? `[show ${messages.length} other messages]`
            : '[hide thread]'}
        </Button>
      </div>
    </div>
  );
};

interface MessagesListThreadProps {
  message: Message;
}

interface MessagesListThreadState {
  extended: boolean;
}

export class MessagesListThread extends React.PureComponent<
  MessagesListThreadProps,
  MessagesListThreadState
> {
  state = {
    extended: false
  };

  handleShowMore = () => {
    this.setState(state => ({
      extended: !state.extended
    }));
  };

  render() {
    const { message } = this.props;
    const { extended } = this.state;
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
        {message.submessages && message.submessages.length > 0 && (
          <SubmessagesList
            messages={message.submessages}
            extended={extended}
            onClick={this.handleShowMore}
          />
        )}
      </div>
    );
  }
}
