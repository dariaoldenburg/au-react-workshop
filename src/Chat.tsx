import React from 'react';
import { Row } from './ui/Row';
import { Cell } from './ui/Cell';
import { Button } from './ui/Button';

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
        <Cell height={300} scrollable widthPercentage={70}>
          here be chat
        </Cell>
        <Cell height={300} scrollable widthPercentage={30}>
          here be online users list
        </Cell>
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
