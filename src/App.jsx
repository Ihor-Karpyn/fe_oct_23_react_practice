import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categori => (
    categori.id === product.categoryId
  ));

  const user = usersFromServer.find(owner => (
    category.ownerId ? owner.id === category.ownerId : null
  ));

  return {
    ...product,
    category,
    user,
  };
});

const sortedData = (data, sort) => {
  switch (sort) {
    case 'productId':
      break;

    case 'productName':
      break;

    case 'categoryTitle':
      break;

    case 'userName':
      break;
    default:
  }
};

const operateData = (data,
  {
    searchQuery,
    currentUserId,
    categoriesId,
    sortBy,
  }) => {
  let currentData = [...data];

  if (searchQuery) {
    currentData = currentData.filter((item) => {
      const name = item.name.toLowerCase();
      const query = searchQuery.toLowerCase();

      return name.includes(query);
    });
  }

  if (currentUserId) {
    currentData = currentData.filter(item => (
      item.user.id === currentUserId
    ));
  }

  if (categoriesId.length > 0) {
    currentData = currentData.filter(item => (
      categoriesId.includes(item.category.id)
    ));
  }

  if (sortBy) {
    sortedData(currentData, sortBy);
  }

  return currentData;
};

export const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUserId, setCurrentUserId] = useState(null);
  const [categoriesId, setCategoriesId] = useState([]);
  const [sortBy, setSortBy] = useState('');

  const currentProducts = operateData(products,
    {
      searchQuery,
      currentUserId,
      categoriesId,
      sortBy,
    });

  const handlerSortBy = (value) => {
    setSortBy(value);
  };

  const handlerReset = () => {
    setSearchQuery('');
    setCurrentUserId(null);
    setCategoriesId([]);
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
                className={cn({ 'is-active': !currentUserId })}
                onClick={() => setCurrentUserId(null)}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  className={cn({ 'is-active': currentUserId === user.id })}
                  onClick={() => setCurrentUserId(user.id)}
                  key={user.id}
                >
                  {user.name}
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
                  onChange={e => setSearchQuery(e.target.value)}
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
                      onClick={() => setSearchQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button', 'mr-6', 'is-success',
                  { 'is-outlined': categoriesId.length !== 0 })}
                onClick={() => setCategoriesId([])}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button', 'mr-2', 'my-1',
                    { 'is-info': categoriesId.includes(category.id) })}
                  href="#/"
                  onClick={
                    () => setCategoriesId([...categoriesId, category.id])
                  }
                  key={category.id}
                >
                  {category.title}
                </a>
              ))}
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={handlerReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {currentProducts.length === 0
            ? (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )

            : (
              <table
                data-cy="ProductTable"
                className="table is-striped is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        ID

                        <a
                          href="#/"
                          onClick={() => handlerSortBy('productId')}
                        >
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        Product

                        <a
                          href="#/"
                          onClick={() => handlerSortBy('productName')}
                        >
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

                        <a
                          href="#/"
                          onClick={() => handlerSortBy('categoryTitle')}
                        >
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort-up" />
                          </span>
                        </a>
                      </span>
                    </th>

                    <th>
                      <span className="is-flex is-flex-wrap-nowrap">
                        User

                        <a
                          href="#/"
                          onClick={() => handlerSortBy('userName')}
                        >
                          <span className="icon">
                            <i data-cy="SortIcon" className="fas fa-sort" />
                          </span>
                        </a>
                      </span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {currentProducts.map(prodact => (
                    <tr data-cy="Product" key={prodact.id}>
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {prodact.id}
                      </td>

                      <td data-cy="ProductName">{prodact.name}</td>
                      <td data-cy="ProductCategory">
                        {`${prodact.category.icon} - ${prodact.category.title}`}
                      </td>

                      <td
                        data-cy="ProductUser"
                        className={cn(
                          { 'has-text-link': prodact.user.sex === 'm' },
                          { 'has-text-danger': prodact.user.sex === 'f' },
                        )}
                      >
                        {prodact.user.name}
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
