import cn from 'classnames';

export const CategoryFilter = ({
  selectedCategories,
  handleSelectingCategory,
  setSelectedCategories,
  categoriesFromServer,
}) => (
  <div className="panel-block is-flex-wrap-wrap">
    <a
      href="#/"
      data-cy="AllCategories"
      className={cn(
        'button is-success mr-6',
        { 'is-outlined': selectedCategories.length !== 0 },
      )}
      onClick={() => setSelectedCategories([])}
    >
      All
    </a>

    {categoriesFromServer.map(category => (
      <a
        data-cy="Category"
        className={cn('button mr-2 my-1', {
          'is-info': selectedCategories.includes(category.title),
        })}
        href="#/"
        onClick={() => handleSelectingCategory(category.title)}
      >
        {category.title}
      </a>
    ))}
  </div>
);
