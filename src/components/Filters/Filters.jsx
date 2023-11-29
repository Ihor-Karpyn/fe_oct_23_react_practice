import React from 'react';
import { UserFilter } from './UserFilter/UserFilter';
import { SearchFilter } from './Search/SearchFilter';
import { CategoryFilter } from './CategoryFilter/CategoryFilter';

export const Filters = (props) => {
  const {
    users,
    selectUserId,
    selectedUserId,
    searchQuery,
    setSearchQuery,
    clearAllFilters,
    categories,
    selectedCategoriesIds,
    setSelectedCategoriesIds,
  } = props;

  return (
    (
      <div className="block">
        <nav className="panel">
          <p className="panel-heading">Filters</p>

          <UserFilter
            users={users}
            selectUserId={selectUserId}
            selectedUserId={selectedUserId}
          />

          <SearchFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <CategoryFilter
            categories={categories}
            selectedCategoriesIds={selectedCategoriesIds}
            setSelectedCategoriesIds={setSelectedCategoriesIds}
          />

          <div className="panel-block">
            <a
              data-cy="ResetAllButton"
              href="#/"
              className="button is-link is-outlined is-fullwidth"
              onClick={clearAllFilters}
            >
              Reset all filters
            </a>
          </div>
        </nav>
      </div>
    )
  );
};
