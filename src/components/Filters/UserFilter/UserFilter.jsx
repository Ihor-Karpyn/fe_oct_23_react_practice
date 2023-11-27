import cn from 'classnames';

export const UserFilter = ({
  selectedOwner,
  handleChangingOwnerFilter,
  usersFromServer,
}) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterUser"
      href="#/"
      className={cn({
        'is-active': selectedOwner === 0,
      })}
      onClick={() => handleChangingOwnerFilter(0)}
    >
      All
    </a>

    {usersFromServer.map(user => (
      <a
        data-cy="FilterUser"
        href="#/"
        className={cn({
          'is-active': selectedOwner === user.id,
        })}
        onClick={() => handleChangingOwnerFilter(user.id)}
      >
        {user.name}
      </a>
    ))}
  </p>
);
