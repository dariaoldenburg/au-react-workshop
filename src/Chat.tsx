import React from 'react';
import { Subscription } from 'rxjs';
import { Cell } from './ui/Cell';
import {
  fetchOnlineUsers,
  User,
  fetchMessages,
  Message,
  createMessage,
  login,
  logout
} from './ChatAPI';
import { Row } from './ui/Row';
import { UsersList } from './UsersList';
import { MessagesList } from './MessagesList';
import { MessageBox } from './MessageBox';
import { Button } from './ui/Button';

interface ChatState {
  channelName: string;
  currentUser: User | null;
  onlineUsers: User[];
  onlineUsersLoading: boolean;
  messages: Message[];
  messagesLoading: boolean;
  currentMessage: string;
  replyTo?: Message;
}

export class Chat extends React.PureComponent<{}, ChatState> {
  state: ChatState = {
    channelName: 'AppUnite: #obiady',
    currentUser: null,
    onlineUsers: [],
    onlineUsersLoading: true,
    messages: [],
    messagesLoading: true,
    currentMessage: '',
    replyTo: undefined
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

  handleSendMessage = () => {
    const { currentMessage, replyTo } = this.state;

    createMessage({
      content: currentMessage,
      parentMessageId: replyTo ? replyTo.id : undefined
    });
    this.setState({
      currentMessage: '',
      replyTo: undefined
    });
  };

  handleTextAreaOnChange = (value: string) => {
    this.setState({
      currentMessage: value
    });
  };

  handleSignIn = () => {
    const name = prompt('Twój nick: ', 'gość123');
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

  handleReplyClick = (message: Message) => {
    this.setState({
      replyTo: message
    });
  };

  handleReplyClear = () => {
    this.setState({
      replyTo: undefined
    });
  };

  render() {
    const {
      channelName,
      onlineUsers,
      onlineUsersLoading,
      messages,
      messagesLoading,
      currentMessage,
      currentUser,
      replyTo
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
              <MessagesList
                messages={messages}
                onReplyClick={this.handleReplyClick}
              />
            )}
          </Cell>
          <Cell widthPercentage={30} scrollable height={300}>
            <UsersList users={onlineUsers} />
          </Cell>
        </Row>

        <Row>
          <Cell header widthPercentage={70}>
            <MessageBox
              message={currentMessage}
              disabled={!currentUser}
              replyTo={replyTo}
              onReplyClear={this.handleReplyClear}
              onChange={this.handleTextAreaOnChange}
              onSubmit={this.handleSendMessage}
            />
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
