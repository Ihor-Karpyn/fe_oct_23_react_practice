import React from 'react';
import cn from 'classnames';

export const UserFilter = (props) => {
  const { users, selectUserId, selectedUserId } = props;

  return (
    <p className="panel-tabs has-text-weight-bold">
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => selectUserId(null)}
        className={cn({
          'is-active': !selectedUserId,
        })}
      >
        All
      </a>

      {users.map(user => (
        <a
          key={user.id}
          data-cy="FilterUser"
          href="#/"
          onClick={() => selectUserId(user.id)}
          className={cn({
            'is-active': selectedUserId === user.id,
          })}
        >
          {user.name}
        </a>
      ))}
    </p>
  );
};
