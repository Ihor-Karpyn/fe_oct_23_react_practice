import React, { useState } from 'react';
import './App.scss';
import { ProductTable } from './components/ProductTable/ProductTable';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { UserTabs } from './components/UserTabs/UserTabs';
import { SearchInput } from './components/SearchInput/SearchInput';

const FILTER_TYPE_USER = 'user';
const FILTER_TYPE_CATEGORY = 'category';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(currentCategory => product.categoryId === currentCategory.id);
  const user = usersFromServer
    .find(currentUser => currentUser.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

const prepearedProducts = (prods, filtType, filtValue, query = '') => {
  const trimmedQuery = query.trim().toLowerCase();

  let readyProducts = [...prods];

  if (filtType === FILTER_TYPE_USER) {
    readyProducts = readyProducts
      .filter(product => product.user.id === filtValue);
  }

  if (filtType === FILTER_TYPE_CATEGORY) {
    readyProducts = readyProducts
      .filter(product => product.category.id === filtValue);
  }

  if (trimmedQuery) {
    return readyProducts
      .filter((product) => {
        const trimmedProductName = product.name.trim().toLowerCase();

        return trimmedProductName.includes(trimmedQuery);
      });
  }

  return readyProducts;
};

export const App = () => {
  const [users] = useState(usersFromServer);
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const onUserFilter = (userId) => {
    setFilterType(FILTER_TYPE_USER);
    setFilterValue(userId);

    if (userId === '') {
      setFilterType('');
      setFilterValue('');
    }
  };

  const onQueryChange = (query) => {
    setSearchQuery(query);
  };

  const resetAllFilters = () => {
    setFilterType('');
    setFilterValue('');
    setSearchQuery('');
  };

  const productsToRender = prepearedProducts(
    products,
    filterType,
    filterValue,
    searchQuery,
  );

  return (
    <>
      <div className="section">
        <div className="container">
          <h1 className="title">Product Categories</h1>

          <div className="block">
            <nav className="panel">
              <p className="panel-heading">Filters</p>

              <UserTabs
                users={users}
                onFilter={selectedUserId => onUserFilter(selectedUserId)}
                filterValue={filterValue}
              />

              <div className="panel-block">
                <p className="control has-icons-left has-icons-right">
                  <SearchInput
                    value={searchQuery}
                    onQueryChange={quer => onQueryChange(quer)}
                  />

                  <span className="icon is-left">
                    <i className="fas fa-search" aria-hidden="true" />
                  </span>

                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  </span>
                </p>
              </div>

              <div className="panel-block is-flex-wrap-wrap">
                <a
                  href="#/"
                  data-cy="AllCategories"
                  className="button is-success mr-6 is-outlined"
                >
                  All
                </a>

                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  Category 1
                </a>

                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  Category 2
                </a>

                <a
                  data-cy="Category"
                  className="button mr-2 my-1 is-info"
                  href="#/"
                >
                  Category 3
                </a>
                <a
                  data-cy="Category"
                  className="button mr-2 my-1"
                  href="#/"
                >
                  Category 4
                </a>
              </div>

              <div className="panel-block">
                <a
                  data-cy="ResetAllButton"
                  href="#/"
                  className="button is-link is-outlined is-fullwidth"
                  onClick={() => resetAllFilters()}
                >
                  Reset all filters
                </a>
              </div>
            </nav>
          </div>

          <div className="box table-container">
            {
              productsToRender.length === 0
                ? (
                  <p data-cy="NoMatchingMessage">
                    No products matching selected criteria
                  </p>
                )
                : (
                  <ProductTable
                    products={productsToRender}
                  />
                )
            }
            {/* <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
};
