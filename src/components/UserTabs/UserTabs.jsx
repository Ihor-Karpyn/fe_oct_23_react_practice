import cn from 'classnames';

export const UserTabs = ({ users, onFilter, filterValue }) => (
  <p className="panel-tabs has-text-weight-bold">
    <a
      data-cy="FilterAllUsers"
      href="#/"
      className={cn({ 'is-active': filterValue === '' })}
      onClick={() => onFilter('')}
    >
      All
    </a>
    {users.map(({ id, name }) => (
      <a
        data-cy="FilterUser"
        href="#/"
        key={id}
        onClick={() => onFilter(id)}
        className={cn({ 'is-active': id === filterValue })}
      >
        {name}
      </a>
    ))}
  </p>
);
