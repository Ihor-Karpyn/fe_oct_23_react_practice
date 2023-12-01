import { FC } from 'react';
import cn from 'classnames';
import { User } from '../../../types';

interface Props {
  users: User[];
  selectUserId: (id: number | null) => void;
  selectedUserId: number | null;
}

export const UserFilter: FC<Props> = (props) => {
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
