import cn from 'classnames';

export const Filters = ({
  searchQuery,
  resetFilters,
  selectedUserId,
  usersFromServer,
  setQueryForSeach,
  setSelectedUserId,
  categoriesFromServer,
}) => (
  <div className="block">
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs has-text-weight-bold">
        <a
          data-cy="FilterAllUsers"
          href="#/"
          className={cn({ 'is-active': selectedUserId === '' })}
          onClick={() => setSelectedUserId('')}
        >
          All
        </a>

        {usersFromServer.map(userFromServer => (
          <a
            data-cy="FilterUser"
            href="#/"
            key={userFromServer.id}
            className={cn(
              { 'is-active': userFromServer.id === selectedUserId },
            )}
            onClick={() => setSelectedUserId(userFromServer.id)}
          >
            {userFromServer.name}
          </a>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left has-icons-right">
          <input
            data-cy="SearchField"
            type="text"
            className="input"
            placeholder="Search"
            value={searchQuery}
            onChange={event => setQueryForSeach(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {searchQuery && (
            <span className="icon is-right">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="ClearButton"
                type="button"
                className="delete"
                onClick={() => setQueryForSeach('')}
              />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block is-flex-wrap-wrap">
        <a
          data-cy="Category"
          className="button mr-6 is-success"
          href="#/"
        >
          All
        </a>

        {categoriesFromServer.map(catogoryFromServer => (
          <a
            data-cy="Category"
            className="button mr-2 my-1"
            href="#/"
            key={catogoryFromServer.id}
          >
            {catogoryFromServer.title}
          </a>
        ))}
      </div>

      <div className="panel-block">
        <a
          data-cy="ResetAllButton"
          href="#/"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => resetFilters()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  </div>
);
