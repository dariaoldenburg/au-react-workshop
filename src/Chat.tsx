import React from 'react';
import { Subscription } from 'rxjs';
import { Cell } from './ui/Cell';
import { fetchOnlineUsers, User } from './ui/ChatAPI';
import { Row } from './ui/Row';
import { UsersList } from './UsersList';

interface ChatState {
  channelName: string;
  onlineUsers: User[];
  onlineUsersLoading: boolean;
}

export class Chat extends React.PureComponent<{}, ChatState> {
  state = {
    channelName: 'Sieradz - Nasze Radio',
    onlineUsers: [],
    onlineUsersLoading: true
  };

  private _subscriptions: Subscription[] = [];

  componentDidMount() {
    fetchOnlineUsers().subscribe(users => {
      this.setState({
        onlineUsers: users,
        onlineUsersLoading: false
      });
    });
  }

  componentWillUnmount() {
    this._subscriptions.forEach(s => s.unsubscribe());
    this._subscriptions.length = 0;
  }

  render() {
    const { channelName, onlineUsers, onlineUsersLoading } = this.state;

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
            here be chat
          </Cell>
          <Cell widthPercentage={30} scrollable height={300}>
            <UsersList users={onlineUsers} />
          </Cell>
        </Row>

        <Row>
          <Cell header widthPercentage={70}>
            here be textarea
          </Cell>
        </Row>
      </div>
    );
  }
}
