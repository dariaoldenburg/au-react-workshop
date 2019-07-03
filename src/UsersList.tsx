import React from 'react';
import './UsersList.css';

export interface User {
  id?: string;
  name: string;
  color?: string;
  senior?: boolean;
}

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
