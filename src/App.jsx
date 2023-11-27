import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const MALE = 'm';
const FEMALE = 'f';

const mappedProducts = productsFromServer.map((product) => {
  const foundCategory = categoriesFromServer
    .find(category => category.id === product.categoryId) || null;

  const foundUser = usersFromServer
    .find(user => user.id === foundCategory?.ownerId) || null;

  return {
    ...product,
    category: foundCategory,
    user: foundUser,
  };
});

//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  const [products] = useState(mappedProducts);
  const [owner, setOwner] = useState(null);
  const [searchField, setSearchField] = useState('');

  const filteredProducts = products.filter((product) => {
    const isOwnerMatched = owner === null
    || (product.user && product.user.id === owner.id);

    const isProductMatched = searchField === ''
    || product.name.toLowerCase().includes(searchField.toLowerCase());

    return isOwnerMatched && isProductMatched;
  });

  const inputSearchHandler = (event) => {
    setSearchField(event.target.value);
  };

  const resetSearch = () => {
    setSearchField('');
  };

  const resetAllFilters = () => {
    setSearchField('');
    setOwner(null);
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
                className={cn({
                  'is-active': !owner,
                })}
                onClick={() => setOwner(null)}
              >
                All
              </a>

              {
                usersFromServer.map(user => (
                  <a
                    data-cy="FilterUser"
                    href="#/"
                    key={user.id}
                    className={cn({
                      'is-active': user.id === owner?.id,
                    })}
                    onClick={() => {
                      setOwner(user);
                    }}
                  >
                    {user.name}
                  </a>
                ))
              }
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchField}
                  onChange={inputSearchHandler}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchField ? (
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={resetSearch}
                    />
                  ) : null}
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

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={resetAllFilters}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {filteredProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
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
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
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
                {
                filteredProducts.map((product) => {
                  const { category, user } = product;

                  return (
                    <tr data-cy="Product" key={product.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>

                      <td data-cy="ProductName">{product.name}</td>
                      {category && (
                        <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>
                      )}

                      {user && (
                        <td
                          data-cy="ProductUser"
                          className={cn({
                            'has-text-link': user.sex === MALE,
                            'has-text-danger': user.sex === FEMALE,
                          })}
                        >
                          {user.name}
                        </td>
                      )}
                    </tr>
                  );
                })
              }
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
