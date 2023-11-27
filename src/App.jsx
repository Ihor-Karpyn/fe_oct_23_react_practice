import React, { useState } from 'react';

import './App.scss';
import { Table } from './components/Table';
import { Filters } from './components/Filters';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(categoryFromServer => (
    categoryFromServer.id === product.categoryId
  ));
  const user = usersFromServer.find(userFromServer => (
    userFromServer.id === category.ownerId
  ));

  return { category, user, ...product };
});

function getSortedProducts(productsReceived, selectedUserId, searchQuery) {
  if (!selectedUserId && !searchQuery) {
    return productsReceived;
  }

  return productsReceived.filter((product) => {
    const preparedProductId = product.user.id;
    const preparedSearchQuery = searchQuery.toLowerCase();
    const preparedName = product.name.toLowerCase();

    const isMatchSearchQuery = preparedSearchQuery
      ? preparedName.includes(preparedSearchQuery)
      : true;

    const isMatchSelectedUser = selectedUserId
      ? preparedProductId === selectedUserId
      : true;

    return isMatchSearchQuery && isMatchSelectedUser;
  });
}

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedProducts = getSortedProducts(
    products,
    selectedUserId,
    searchQuery,
  );

  const reset = () => {
    setSearchQuery('');
    setSelectedUserId('');
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <Filters
          resetFilters={reset}
          searchQuery={searchQuery}
          selectedUserId={selectedUserId}
          usersFromServer={usersFromServer}
          categoriesFromServer={categoriesFromServer}
          setQueryForSeach={query => setSearchQuery(query)}
          setSelectedUserId={value => setSelectedUserId(value)}
        />

        <Table sortedProducts={sortedProducts} />
      </div>
    </div>
  );
};
