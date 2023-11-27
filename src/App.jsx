import React, { useState } from 'react';
import './App.scss';
import { ProductTable } from './components/ProductTable';
import ProductsList from './api/products';

const filterProducts = (products, searchQuery, selectedUserId) => {
  let filteredProducts = products;

  if (searchQuery) {
    const preparedSearchQuery = searchQuery.toLowerCase().trim();

    filteredProducts = filteredProducts.filter((product) => {
      const preparedTitle = product.name.toLowerCase();

      return preparedTitle.includes(preparedSearchQuery);
    });
  }

  if (selectedUserId !== 'all') {
    filteredProducts = filteredProducts.filter(
      product => product.ownerId === selectedUserId,
    );
  }

  return filteredProducts;
};

export const App = () => {
  const [products] = useState(ProductsList);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedUserId] = useState('all');

  // const tabs = [
  //   { id: 'all', name: 'All' },
  //   { id: 'user1', name: 'User 1' },
  //   { id: 'user2', name: 'User 2' },
  //   { id: 'user3', name: 'User 3' },
  // ];

  const productsForRender = filterProducts(
    products,
    searchQuery,
    selectedUserId,
  );

  const resetFilters = () => {
    setSearchQuery('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 1
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
              >
                User 2
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
              >
                User 3
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={event => setSearchQuery(event.target.value)}
                />

                <span className="icon is-left">
                  <i
                    className="fas fa-search"
                    aria-hidden="true"
                  />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchQuery && (
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchQuery('')}
                  />
                  )}
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
                onClick={resetFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {productsForRender.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <ProductTable prod={productsForRender} />
          )}
        </div>
      </div>
    </div>
  );
};
