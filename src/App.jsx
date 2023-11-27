import React, { useState } from 'react';
import './App.scss';

import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';
import usersFromServer from './api/users';
import { CategoryFilter } from './components/Filters/CategoryFilter';
import { QueryFilter } from './components/Filters/QueryFilter/QueryFilter';
import { ResetFilters } from './components/Filters/ResetFilters/ResetFilters';
import { UserFilter } from './components/Filters/UserFilter/UserFilter';
import { ProductTable } from './components/ProductTable/ProductTable';

const products = productsFromServer.map((product) => {
  const category = categoriesFromServer
    .find(cat => cat.id === product.categoryId);
  const user = usersFromServer
    .find(u => u.id === category.ownerId);

  return {
    ...product,
    category,
    user,
  };
});

export const App = () => {
  const [selectedOwner, setSelectedOwner] = useState(0);
  const [productNameQuery, setProductNameQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSortingMethod, setSelectedSortingMethod] = useState('');
  const [sortBy, setSortBy] = useState('');

  const getFilteredProducts = (rawproducts) => {
    let viewProducts = [...rawproducts];

    if (selectedOwner !== 0) {
      viewProducts = viewProducts
        .filter(product => product.user.id === selectedOwner);
    }

    if (selectedCategories.length !== 0) {
      viewProducts = viewProducts
        .filter(product => selectedCategories.includes(product.category.title));
    }

    if (productNameQuery) {
      viewProducts = viewProducts
        .filter(product => product.name.toLowerCase().includes(
          productNameQuery.toLowerCase(),
        ));
    }

    if (sortBy && selectedSortingMethod) {
      viewProducts.sort((a, b) => {
        let res = 0;

        switch (sortBy) {
          case 'id':
            res = a.id - b.id;
            break;

          case 'product':
            res = a.name.localeCompare(b.name);
            break;

          case 'category':
            res = a.category.title.localeCompare(b.category.title);
            break;

          case 'user':
            res = a.user.name.localeCompare(b.user.name);
            break;

          default:
            break;
        }

        if (selectedSortingMethod === 'desc') {
          res *= -1;
        }

        return res;
      });
    }

    return viewProducts;
  };

  const handleChangingOwnerFilter = id => setSelectedOwner(id);

  const handleSelectingCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter(category => category !== categoryName),
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        categoryName,
      ]);
    }
  };

  const handleChangeSortingMethod = (field) => {
    if (sortBy !== field) {
      setSortBy(field);
      setSelectedSortingMethod('asc');

      return;
    }

    switch (selectedSortingMethod) {
      case '':
        setSelectedSortingMethod('asc');
        break;

      case 'asc':
        setSelectedSortingMethod('desc');
        break;

      case 'desc':
        setSelectedSortingMethod('');
        setSortBy('');
        break;

      default:
        break;
    }
  };

  const checkSortingMethod = (field) => {
    if (field !== sortBy) {
      return 'fa-sort';
    }

    if (selectedSortingMethod === 'asc') {
      return 'fa-sort-up';
    }

    return 'fa-sort-down';
  };

  const resetAllFilters = () => {
    setSelectedOwner(0);
    setProductNameQuery('');
    setSelectedCategories([]);
    setSelectedSortingMethod('');
    setSortBy('');
  };

  const productsToView = getFilteredProducts(products);
  const columns = ['ID', 'Product', 'Category', 'User'];

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <UserFilter
              selectedOwner={selectedOwner}
              handleChangingOwnerFilter={handleChangingOwnerFilter}
              usersFromServer={usersFromServer}
            />

            <QueryFilter
              productNameQuery={productNameQuery}
              setProductNameQuery={setProductNameQuery}
            />

            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              handleSelectingCategory={handleSelectingCategory}
              categoriesFromServer={categoriesFromServer}
            />

            <ResetFilters resetAllFilters={resetAllFilters} />
          </nav>
        </div>

        <ProductTable
          productsToView={productsToView}
          columns={columns}
          handleChangeSortingMethod={handleChangeSortingMethod}
          checkSortingMethod={checkSortingMethod}
        />
      </div>
    </div>
  );
};
