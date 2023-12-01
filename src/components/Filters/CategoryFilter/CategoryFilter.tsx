import cn from 'classnames';
import { FC } from 'react';
import { Category } from '../../../types';

interface Props {
  categories: Category[];
  selectedCategoriesIds: number[];
  toggleSelectCategory: (id: number) => void;
  clearSelectedCategories: () => void;
}

export const CategoryFilter: FC<Props> = (props) => {
  const {
    categories,
    selectedCategoriesIds,
    toggleSelectCategory,
    clearSelectedCategories,
  } = props;

  return (
    <div className="panel-block is-flex-wrap-wrap">
      <a
        href="#/"
        data-cy="AllCategories"
        className={cn('button is-success mr-6', {
          'is-outlined': selectedCategoriesIds.length !== 0,
        })}
        onClick={clearSelectedCategories}
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
          onClick={() => toggleSelectCategory(category.id)}
        >
          {category.title}
        </a>
      ))}
    </div>
  );
};
