import cn from 'classnames';
import { FC } from 'react';
import { Category } from '../../../types';

interface Props {
  categories: Category[];
  selectedCategoriesIds: number[];
  setSelectedCategoriesIds: (ids: number[]) => void;
}

export const CategoryFilter: FC<Props> = (props) => {
  const {
    categories,
    selectedCategoriesIds,
    setSelectedCategoriesIds,
  } = props;

  const toggleSelect = (categoryId: number) => {
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
