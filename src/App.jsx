import React, { useState } from 'react';
import './App.scss';

import { type } from 'os';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import { Filters } from './components/Filters/Filters';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

const initialProducts = productsFromServer.map((product) => {
  const category = categoriesFromServer.find(c => (
    c.id === product.categoryId
  ));
  const user = usersFromServer.find(u => (
    category.ownerId === u.id
  ));

  return {
    ...product,
    category,
    user,
  };
});

const getFieldFromProduct = (product, columnCode) => {
  switch (columnCode) {
    case 'id':
      return product.id;

    case 'product':
      return product.name;

    case 'category':
      return product.category.title;

    case 'user':
      return product.user.name;

    default:
      return null;
  }
};

const prepareProducts = (products, filters) => {
  const filteredProducts = products.filter((productToFilter) => {
    const preparedSearchQuery = filters.searchQuery.toLowerCase();
    const preparedProductName = productToFilter.name.toLowerCase();
    const categoryId = productToFilter.category.id;

    const isUserFilterMatch = filters.userId
      ? productToFilter.user.id === filters.userId
      : true;

    const isMatchSearchQuery = filters.searchQuery
      ? preparedProductName.includes(preparedSearchQuery)
      : true;

    const isMatchCategoryFilter = filters.categoriesIds.length
      ? filters.categoriesIds.includes(categoryId)
      : true;

    return isUserFilterMatch && isMatchSearchQuery && isMatchCategoryFilter;
  });

  const {
    sortColumn,
    isReverse,
  } = filters;

  if (sortColumn) {
    console.log(sortColumn, isReverse);

    filteredProducts.sort((a, b) => {
      const aField = isReverse
        ? getFieldFromProduct(b, sortColumn)
        : getFieldFromProduct(a, sortColumn);

      const bField = isReverse
        ? getFieldFromProduct(a, sortColumn)
        : getFieldFromProduct(b, sortColumn);

      console.log(aField, bField);

      if (typeof aField === 'number' && typeof bField === 'number') {
        return aField - bField;
      }

      if (typeof aField === 'string' && typeof bField === 'string') {
        return aField.localeCompare(bField);
      }

      return 0;
    });
  }

  return filteredProducts;
};

export const App = () => {
  const [products] = useState(initialProducts);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [isReverse, setIsReverse] = useState(false);

  const changeSortHandler = (columnCode) => {
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
