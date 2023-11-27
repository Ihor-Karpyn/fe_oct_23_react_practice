import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const USER_1 = usersFromServer.find(user => user.id === 1);
const USER_2 = usersFromServer.find(user => user.id === 2);
const USER_3 = usersFromServer.find(user => user.id === 3);

const products = productsFromServer.map((product) => {
  const { categoryId } = product;

  const category = categoriesFromServer.find((cat) => categoryId === cat.id);
  const owner = usersFromServer.find((user) => user.id === category.ownerId);

  //  const category = null; // find by product.categoryId
  //  const user = null; // find by category.ownerId

  return {
    ...product,
    category,
    owner,
  };
});

console.log(products);

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const isSelected = selectedUser !== null;

  const clear = () => {
    setSelectedUser(null);
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
                onClick={() => {
                  clear();
                }}
              >
                All
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => {
                  setSelectedUser(USER_1.name);
                }}
              >
                {USER_1.name}
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                className="is-active"
                onClick={() => {
                  setSelectedUser(USER_2.name);
                }}
              >
                {USER_2.name}
              </a>

              <a
                data-cy="FilterUser"
                href="#/"
                onClick={() => {
                  setSelectedUser(USER_3.name);
                }}
              >
                {USER_3.name}
              </a>
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value="qwe"
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

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
              {products.map((product) => {
                const { id, name, category, owner } = product;
                const isFemale = owner.sex === 'f';
                const myClass = cn({
                  'has-text-danger': isFemale,
                  'has-text-link': !isFemale,
                });



                return (
                  <tr data-cy="Product" key={id}>
                    <td className="has-text-weight-bold" data-cy="ProductId">
                      {id}
                    </td>

                    <td data-cy="ProductName">{name}</td>
                    <td data-cy="ProductCategory">{`${category.icon} - ${category.title}`}</td>

                    <td data-cy="ProductUser" className={myClass}>
                      {owner.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
