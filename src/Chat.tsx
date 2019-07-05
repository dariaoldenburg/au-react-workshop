import React from 'react';
import { Subscription } from 'rxjs';
import { fetchMessages, Message, User } from './ChatAPI';
import { MessagesList } from './MessagesList';
import { Button } from './ui/Button';
import { Cell } from './ui/Cell';
import { Row } from './ui/Row';

interface ChatState {
  channelName: string;
  onlineUsers: User[];
  onlineUsersLoading: boolean;
  messages: Message[];
  messagesLoading: boolean;
}

export class Chat extends React.PureComponent<{}, ChatState> {
  state = {
    channelName: 'Sieradz - Nasze Radio',
    onlineUsers: [],
    onlineUsersLoading: true,
    messages: [],
    messagesLoading: true
  };

  private _subscriptions: Subscription[] = [];

  componentDidMount() {
    this._subscriptions.push(
      fetchMessages().subscribe(messages => {
        this.setState({
          messages,
          messagesLoading: false
        });
      })
    );
  }

  componentWillUnmount() {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions.length = 0;
  }

  render() {
    const {
      channelName,
      onlineUsers,
      onlineUsersLoading,
      messages,
      messagesLoading
    } = this.state;

    return (
      <div className="Chat">
        <Row>
          <Cell header widthPercentage={70}>
            <strong>{channelName}</strong>
          </Cell>
          <Cell header widthPercentage={30} textAlign="center">
            Obecni: [{onlineUsersLoading ? '...' : onlineUsers.length}]
          </Cell>
        </Row>

        <Row>
          <Cell widthPercentage={70} scrollable height={300}>
            {messagesLoading ? (
              <div>Ładowanie...</div>
            ) : (
              <MessagesList messages={messages} />
            )}
          </Cell>
          <Cell widthPercentage={30}>here be online users list</Cell>
        </Row>

        <Row>
          <Cell header widthPercentage={70}>
            here be textarea
          </Cell>
          <Cell widthPercentage={30}>
            <Button fullWidth onClick={() => alert('TODO login')}>
              Zaloguj się
            </Button>
          </Cell>
        </Row>
      </div>
    );
  }
}
