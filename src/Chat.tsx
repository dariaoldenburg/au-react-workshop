import React from 'react';
import { Row } from './ui/Row';
import { Cell } from './ui/Cell';

export function Chat() {
  const channelName = 'Sieradz - Nasze Radio';
  const onlineUsersCount = 69;
  const onlineUsersTitle = `Obecni: [${onlineUsersCount}]`;

  return (
    <div className="Chat">
      <Row>
        <Cell widthPercentage={70}>
          <strong>{channelName}</strong>
        </Cell>
        <Cell widthPercentage={30}>{onlineUsersTitle}</Cell>
      </Row>
    </div>
  );
}
