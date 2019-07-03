import React from 'react';
import { Subscription } from 'rxjs';
import {
  fetchMessages,
  fetchOnlineUsers,
  login,
  logout,
  Message,
  User
} from './ChatAPI';
import { MessagesList } from './MessagesList';
import { Button } from './ui/Button';
import { Cell } from './ui/Cell';
import { Row } from './ui/Row';
import { UsersList } from './UsersList';

interface ChatState {
  channelName: string;
  currentUser: User | null;
  onlineUsers: User[];
  onlineUsersLoading: boolean;
  messages: Message[];
  messagesLoading: boolean;
}

export class Chat extends React.PureComponent<{}, ChatState> {
  state: ChatState = {
    channelName: 'AppUnite: #obiady',
    currentUser: null,
    onlineUsers: [],
    onlineUsersLoading: true,
    messages: [],
    messagesLoading: true
  };

  private _subscriptions: Subscription[] = [];

  componentDidMount() {
    this._subscriptions.push(
      fetchOnlineUsers().subscribe(users => {
        this.setState({
          onlineUsers: users,
          onlineUsersLoading: false
        });
      })
    );

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

  handleSignIn = () => {
    const name = prompt('Twój nick: ', 'gość777');
    const color = prompt('Kolor: ', 'red') || undefined;

    if (name) {
      return login({ name, color }).then(currentUser => {
        this.setState({ currentUser });
      });
    }
    alert('Podaj nick!');
  };

  handleSignOut = () => {
    logout();
    this.setState({ currentUser: null });
  };

  render() {
    const {
      channelName,
      onlineUsers,
      onlineUsersLoading,
      messages,
      messagesLoading,
      currentUser
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
          <Cell widthPercentage={30}>
            <UsersList users={onlineUsers} />
          </Cell>
        </Row>

        <Row>
          <Cell header widthPercentage={70}>
            here be textarea
          </Cell>
          <Cell widthPercentage={30}>
            {currentUser ? (
              <Button
                onClick={this.handleSignOut}
                variant="secondary"
                fullWidth
              >
                Wyloguj się
              </Button>
            ) : (
              <Button onClick={this.handleSignIn} variant="secondary" fullWidth>
                Zaloguj się
              </Button>
            )}
          </Cell>
        </Row>
      </div>
    );
  }
}
