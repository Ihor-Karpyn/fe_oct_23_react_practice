import { FC, useState } from 'react';
import './App.scss';

import { Filters } from './components/Filters/Filters';
import { PeopleTable } from './components/PeopleTable/PeopleTable';
import { getFullProducts, prepareProducts } from './helpers';
import { productsFromServer } from './api/products';
import { categoriesFromServer } from './api/categories';
import { usersFromServer } from './api/users';
import { ProductFull, SortFields } from './types';

export const App: FC = () => {
  const [products] = useState<ProductFull[]>(() => getFullProducts(
    productsFromServer,
    categoriesFromServer,
    usersFromServer,
  ));
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState<number[]>(
    [],
  );
  const [sortColumn, setSortColumn] = useState<SortFields | null>(null);
  const [isReverse, setIsReverse] = useState(false);

  const changeSortHandler = (columnCode: SortFields | null) => {
    const isFirstClick = sortColumn !== columnCode;
    const isSecondClick = sortColumn === columnCode && !isReverse;
    const isThirdClick = sortColumn === columnCode && isReverse;

    if (isFirstClick) {
      setSortColumn(columnCode);
      setIsReverse(false);

      return;
    }

    if (isSecondClick) {
      setIsReverse(!isReverse);

      return;
    }

    if (isThirdClick) {
      setSortColumn(null);
      setIsReverse(false);
    }
  };

  const visibleProducts = prepareProducts(
    products,
    {
      userId: selectedUserId,
      searchQuery,
      categoriesIds: selectedCategoriesIds,
      sortColumn,
      isReverse,
    },
  );

  const shouldRenderPeopleTable = visibleProducts.length > 0;

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedUserId(null);
    setSelectedCategoriesIds([]);
    setIsReverse(false);
    setSortColumn(null);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          users={usersFromServer}
          selectUserId={setSelectedUserId}
          selectedUserId={selectedUserId}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearAllFilters={clearAllFilters}
          categories={categoriesFromServer}
          selectedCategoriesIds={selectedCategoriesIds}
          setSelectedCategoriesIds={setSelectedCategoriesIds}
        />

        <div className="box table-container">
          {shouldRenderPeopleTable && (
            <PeopleTable
              products={visibleProducts}
              sortColumn={sortColumn}
              setSortColumn={changeSortHandler}
              isReverse={isReverse}
            />
          )}

          {!shouldRenderPeopleTable && (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
