import React from 'react';
import cn from 'classnames';

export const CategoryFilter = (props) => {
  const {
    categories,
    selectedCategoriesIds,
    setSelectedCategoriesIds,
  } = props;

  const toggleSelect = (categoryId) => {
    const isExist = selectedCategoriesIds.includes(categoryId);

    if (isExist) {
      setSelectedCategoriesIds(
        selectedCategoriesIds.filter(id => id !== categoryId),
      );

      return;
    }

    setSelectedCategoriesIds([
      ...selectedCategoriesIds,
      categoryId,
    ]);
  };

  // is-info

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6', {
          'is-outlined': selectedCategoriesIds.length !== 0,
        })}
        onClick={() => setSelectedCategoriesIds([])}
      >
        All
      </a>

      {categories.map(category => (
        <a
          data-cy="Category"
          className={cn('button mr-2 my-1', {
            'is-info': selectedCategoriesIds.includes(category.id),
          })}
          href="#/"
          key={category.id}
          onClick={() => toggleSelect(category.id)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
