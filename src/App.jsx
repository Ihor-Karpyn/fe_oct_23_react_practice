import React, { useState } from 'react';
import cn from 'classnames';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(categorie => categorie.id === product.categoryId); // find by product.categoryId
  const user = usersFromServer.find(person => person.id === category.ownerId); // find by category.ownerId

  return {
    id: product.id,
    name: product.name,
    categorie: category,
    owner: user,
  };
});

const filteredGoods = (productList,
  {
    inputQuery, selectedCategory, productOwner,
  }) => {
  let filtered = [...productList];
  console.log(filtered);
  console.log(inputQuery);

  if (inputQuery) {
    filtered = filtered.filter(good => good.name.toLowerCase()
      .includes(inputQuery.toLowerCase()));
  }

  if (selectedCategory) {
    filtered = filtered.filter(good => good.categorie.title
      === selectedCategory);
  }

  if (productOwner) {
    filtered = filtered.filter(good => good.owner.name === productOwner);
  }

  return filtered;
};

export const App = () => {
  const [inputQuery, setInputQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productOwner, setProductOwner] = useState(null);

  const handleQueryChange = (event) => {
    setInputQuery(event.target.value);
  };

  const handleReset = () => {
    setInputQuery('');
    setSelectedCategory(null);
    setProductOwner(null);
  };

  const filteredGoodsList = filteredGoods(products,
    { inputQuery, selectedCategory, productOwner });

  console.log(filteredGoodsList);

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">

              <a
                className={cn({ 'is-active': !productOwner })}
                data-cy="FilterUser"
                href="#/"
                onClick={() => setProductOwner(null)}
              >
                All
              </a>
              {usersFromServer.map(user => (
                <a
                  className={cn({ 'is-active': productOwner === user.name })}
                  data-cy="FilterAllUsers"
                  href="#/"
                  key={user.id}
                  onClick={() => setProductOwner(user.name)}
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
                  value={inputQuery}
                  onChange={handleQueryChange}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>
                {inputQuery && (
                  <span className="icon is-right">
                    {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                    <button
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                      onClick={() => setInputQuery('')}
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className={cn('button is-success mr-6', {
                  'is-outlined': selectedCategory,
                })}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </a>
              {categoriesFromServer.map(category => (
                <a
                  data-cy="Category"
                  className={cn('button mr-2 my-1', {
                    'is-info': selectedCategory === category.title,
                  })}
                  href="#/"
                  key={category.id}
                  onClick={() => setSelectedCategory(category.title)}
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
                onClick={handleReset}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
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
              {filteredGoodsList.map(product => (
                <tr key={product.id} data-cy="Product">
                  <td className="has-text-weight-bold" data-cy="ProductId">
                    {product.id}
                  </td>

                  <td data-cy="ProductName">{product.name}</td>
                  <td data-cy="ProductCategory">
                    {`${product.categorie.icon} - ${product.categorie.title}`}
                  </td>

                  <td
                    data-cy="ProductUser"
                    className={cn({
                      'has-text-link': product.owner.sex === 'm',
                      'has-text-danger': product.owner.sex === 'f',
                    })}
                  >
                    {product.owner.name}
                  </td>
                </tr>
              ))}
            </tbody>
            {!filteredGoodsList.length && (
              <p data-cy="NoMatchingMessage">
                No products matching selected criteria
              </p>
            )}
          </table>
        </div>
      </div>
    </div>

  );
};
