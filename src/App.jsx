import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category
    = categoriesFromServer.find(currentCategory => (
      category.id === product.categoryId
    ));

  const user
    = usersFromServer.find(currentUser => user.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [productFilter, setProductFilter] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('id');

  const handleCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const handleSelectedCategories = (currentCategory) => {
    if (selectedCategories.includes(currentCategory)) {
      setSelectedCategories(
        selectedCategories.filter(category => category !== currentCategory),
      );
    } else {
      setSelectedCategories([...selectedCategories, currentCategory]);
    }
  };

  const reset = () => {
    setCurrentUser(null);
    setProductFilter('');
    setSelectedCategories([]);
  };

  const handleSort = (sortType) => {
    if (sortBy === sortType) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(sortType);
      setSortOrder('asc');
    }
  };

  const sortedProducts = products.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (sortOrder === 'asc') {
      if (typeof aValue === 'string') {
        return aValue.localeCompare(bValue);
      }

      return aValue - bValue;
    }

    if (typeof aValue === 'string') {
      return bValue.localeCompare(aValue);
    }

    return bValue - aValue;
  });

  const filteredProducts = sortedProducts.filter((product) => {
    if (currentUser && product.user.name !== currentUser.name) {
      return false;
    }

    if (productFilter
      && !product.name.toLowerCase().includes(productFilter.toLowerCase())
    ) {
      return false;
    }

    if (selectedCategories.length > 0
      && !selectedCategories.includes(product.category.title)
    ) {
      return false;
    }

    return true;
  });

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
                onClick={() => handleCurrentUser(null)}
                className={cn({ 'is-active': !currentUser })}
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  key={user.id}
                  data-cy="FilterUser"
                  href="#/"
                  onClick={() => handleCurrentUser(user)}
                  className={cn({ 'is-active': currentUser.id === user.id })}
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
                  value={productFilter}
                  onChange={e => setProductFilter(e.target.value)}
                />
                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {productFilter && (
                  <span className="icon is-right">
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setProductFilter('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn(
                  'button',
                  'is-success',
                  'mr-6',
                  { 'is-outlined': selectedCategories.length > 0 },
                )}
                onClick={() => setSelectedCategories([])}
              >
                All
              </a>

              {categoriesFromServer.map(category => (
                <a
                  key={category.id}
                  data-cy="Category"
                  className={cn(
                    'button',
                    'mr-2',
                    'my-1',
                    'is-info',
                    {
                      'is-outlined':
                        !selectedCategories.includes(category.title),
                    },
                  )}
                  href="#/"
                  onClick={() => handleSelectedCategories(category.title)}
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
                onClick={reset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <p
            data-cy="NoMatchingMessage"
            style={
              { display: filteredProducts.length === 0 ? 'block' : 'none' }
            }
          >
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'is-flex',
                      'is-flex-wrap-nowrap',
                      { 'has-text-info': sortBy === 'id' },
                    )}
                    onClick={() => handleSort('id')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSort('id');
                      }
                    }}
                  >
                    ID
                    <span className="icon">
                      <i data-cy="SortIcon" className={`fas fa-sort${sortOrder === 'asc' ? '' : 'desc'}`} />
                    </span>
                  </span>
                </th>

                <th>
                  <span
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'is-flex',
                      'is-flex-wrap-nowrap',
                      { 'has-text-info': sortBy === 'name' },
                    )}
                    onClick={() => handleSort('name')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSort('name');
                      }
                    }}
                  >
                    Product
                    <span className="icon">
                      <i data-cy="SortIcon" className={`fas fa-sort${sortOrder === 'asc' ? '' : 'desc'}`} />
                    </span>
                  </span>
                </th>

                <th>
                  <span
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'is-flex',
                      'is-flex-wrap-nowrap',
                      { 'has-text-info': sortBy === 'category' },
                    )}
                    onClick={() => handleSort('category')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSort('category');
                      }
                    }}
                  >
                    Category
                    <span className="icon">
                      <i data-cy="SortIcon" className={`fas fa-sort${sortOrder === 'asc' ? '' : 'desc'}`} />
                    </span>
                  </span>
                </th>

                <th>
                  <span
                    role="button"
                    tabIndex={0}
                    className={cn(
                      'is-flex',
                      'is-flex-wrap-nowrap',
                      { 'has-text-info': sortBy === 'user' },
                    )}
                    onClick={() => handleSort('user')}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleSort('user');
                      }
                    }}
                  >
                    User
                    <span className="icon">
                      <i data-cy="SortIcon" className={`fas fa-sort${sortOrder === 'asc' ? '' : 'desc'}`} />
                    </span>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedProducts.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">{product.category}</td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': product.user.sex === 'm',
                      'has-text-danger': product.user.sex === 'f',
                    })}
                  >
                    {product.user}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
