import React from 'react';
import { Message } from './ChatAPI';

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
        <button onClick={onClick}>
          {!extended
            ? `[pokaż odpowiedzi (${messages.length})]`
            : '[schowaj odpowiedzi]'}
        </button>
      </div>
    </div>
  );
};

interface MessagesListThreadProps {
  message: Message;
  showSubmessages: boolean;
  onReplyClick?(): void;
}

interface MessagesListThreadState {
  extended: boolean;
}

export class MessagesListThread extends React.PureComponent<
  MessagesListThreadProps,
  MessagesListThreadState
> {
  static defaultProps = {
    showSubmessages: true
  };

  state = {
    extended: false
  };

  handleShowMore = () => {
    this.setState(state => ({
      extended: !state.extended
    }));
  };

  render() {
    const { message, onReplyClick, showSubmessages } = this.props;
    const { extended } = this.state;
    const date = new Date(message.createdAt);

    return (
      <div key={message.id || message.content}>
        <strong
          onClick={onReplyClick}
          style={{
            cursor: 'pointer'
          }}
        >
          [{date.toLocaleTimeString()}]
        </strong>{' '}
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
        {showSubmessages &&
          message.submessages &&
          message.submessages.length > 0 && (
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
