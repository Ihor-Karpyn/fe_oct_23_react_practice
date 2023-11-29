import React from 'react';
import cn from 'classnames';

const COLUMNS = [
  { id: 1, title: 'ID', columnCode: 'id' },
  { id: 2, title: 'Product', columnCode: 'product' },
  { id: 3, title: 'Category', columnCode: 'category' },
  { id: 4, title: 'User', columnCode: 'user' },
];

export const PeopleTableHead = (props) => {
  const {
    isReverse,
    setSortColumn,
    sortColumn,
  } = props;

  return (
    <thead>
      <tr>
        {COLUMNS.map(column => (
          <th
            key={column.id}
            onClick={() => setSortColumn(column.columnCode)}
          >
            <span className="is-flex is-flex-wrap-nowrap">
              {column.title}

              <a href="#/">
                <span className="icon">
                  <i
                    data-cy="SortIcon"
                    className={cn(
                      'fas',
                      {
                        'fa-sort-up': !isReverse && column.columnCode === sortColumn,
                        'fa-sort-down': isReverse && column.columnCode === sortColumn,
                        'fa-sort': column.columnCode !== sortColumn,
                      },
                    )}
                  />
                </span>
              </a>
            </span>
          </th>
        ))}

      </tr>
    </thead>
  );
};
