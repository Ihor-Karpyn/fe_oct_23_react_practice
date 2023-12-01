import { FC } from 'react';
import { UserFilter } from './UserFilter/UserFilter';
import { SearchFilter } from './Search/SearchFilter';
import { CategoryFilter } from './CategoryFilter/CategoryFilter';
import { Category, User } from '../../types';

interface Props {
  users: User[];
  selectUserId: (id: number | null) => void;
  selectedUserId: number | null;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  clearAllFilters: () => void;
  categories: Category[];
  selectedCategoriesIds: number[];
  toggleSelectCategory: (id: number) => void;
  clearSelectedCategories: () => void;
}

export const Filters: FC<Props> = (props) => {
  const {
    users,
    selectUserId,
    selectedUserId,
    searchQuery,
    setSearchQuery,
    clearAllFilters,
    categories,
    selectedCategoriesIds,
    toggleSelectCategory,
    clearSelectedCategories,
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
            toggleSelectCategory={toggleSelectCategory}
            clearSelectedCategories={clearSelectedCategories}
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
