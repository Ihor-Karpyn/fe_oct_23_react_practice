import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(el => el.id === product.categoryId) || null; // find by product.categoryId
  const user = usersFromServer
    .find(elem => elem.id === category.ownerId) || null; // find by category.ownerId

  return {
    ...product,
    category,
    user,
  };
});

function getPreperedProducts(localProduct, { filterField, query }) {
  let filteredByUser = localProduct;

  if (filterField === 'all') {
    filteredByUser = localProduct;
  }

  if (filterField && filterField !== 'all') {
    filteredByUser = localProduct
      .filter(product => product.user.name === filterField);
  }

  if (query) {
    const queryUpperCase = query.toUpperCase().trim();

    return filteredByUser.filter(product => product.name
      .toUpperCase()
      .includes(queryUpperCase));
  }

  return filteredByUser;
}

export const App = () => {
  const [filterField, setFilterField] = useState('all');
  const [query, setQuery] = useState('');

  const handleResetFilter = () => {
    setFilterField('all');
    setQuery('');
  };

  const visibleProducts = getPreperedProducts(
    products, { filterField, query },
  );

  const isMessageVisible = !visibleProducts.length > 0;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => setFilterField('all')}
                data-cy="FilterAllUsers"
                href="#/"
                className={
                  cn({
                    'is-active': filterField === 'all',
                  })
                }
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  onClick={() => setFilterField(`${user.name}`)}
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={
                    cn({
                      'is-active': filterField === user.name,
                    })
                  }
                >
                  {user.name}
                </a>
              ))}

            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={event => setQuery(event.target.value)}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={query}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  <button
                    onClick={() => setQuery('')}
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
                onClick={handleResetFilter}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">

          {isMessageVisible
            && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}
          {!isMessageVisible
            && (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a href="#/">
                          <span className="icon">
                            <i
                              data-cy="SortIcon"
                              className="fas fa-sort-down"
                            />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Category

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a href="#/">
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visibleProducts.map(product => (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon}-${product.category.title}`}</td>

                      <td
                        data-cy="ProductUser"
                        className={product.user.sex === 'm'
                          ? 'has-text-link'
                          : 'has-text-danger'}
                      >
                        {product.user.name}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
        </div>
      </div>
    </div>
  );
};
