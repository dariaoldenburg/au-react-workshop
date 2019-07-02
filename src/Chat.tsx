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
        <Cell header widthPercentage={70}>
          <strong>{channelName}</strong>
        </Cell>
        <Cell header widthPercentage={30} textAlign="center">
          {onlineUsersTitle}
        </Cell>
      </Row>

      <Row>
        <Cell widthPercentage={70}>here be chat</Cell>
        <Cell widthPercentage={30}>here be online users list</Cell>
      </Row>

      <Row>
        <Cell header widthPercentage={70}>
          here be textarea
        </Cell>
      </Row>
    </div>
  );
}
