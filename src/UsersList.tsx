import React from 'react';
import { User } from './ChatAPI';
import './UsersList.css';

interface UsersListProps {
  users: User[];
}

export function UsersList(props: UsersListProps) {
  return (
    <div className="UsersList">
      {props.users.map(user => (
        <div
          key={user.id || user.name}
          className="UsersList__item"
          style={{
            color: user.color || 'black',
            fontWeight: user.senior ? 'bold' : undefined
          }}
        >
          {user.name}
        </div>
      ))}
    </div>
  );
}
