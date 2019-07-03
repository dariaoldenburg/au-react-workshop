import React from 'react';
import { Cell } from './ui/Cell';
import { Row } from './ui/Row';
import { User, UsersList } from './UsersList';

export function Chat() {
  const channelName = 'Sieradz - Nasze Radio';
  const onlineUsersCount = 69;
  const onlineUsersTitle = `Obecni: [${onlineUsersCount}]`;
  const onlineUsers: User[] = [
    { name: 'geron' },
    { name: 'hit_fm', color: 'pink', senior: true },
    { name: 'kasienka2' },
    { name: 'Lady_Ann_' },
    { name: 'MalWINKaaa', color: 'orange', senior: true }
  ];

  return (
    <div className="Chat">
      <Row>
        <Cell header widthPercentage={70}>
          <strong>{channelName}</strong>
        </Cell>
        <Cell header widthPercentage={30} textAlign="center">
          {onlineUsersTitle}
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
