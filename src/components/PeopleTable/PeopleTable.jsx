import React from 'react';
import { PeopleTableHead } from './Head/PeopleTableHead';
import { PeopleTableBody } from './Body/PeopleTableBody';

export const PeopleTable = (props) => {
  const {
    products,
    setSortColumn,
    sortColumn,
    isReverse,
  } = props;

  return (
    <table
      data-cy="ProductTable"
      className="table is-striped is-narrow is-fullwidth"
    >
      <PeopleTableHead
        sortColumn={sortColumn}
        setSortColumn={setSortColumn}
        isReverse={isReverse}
      />

      <PeopleTableBody products={products} />
    </table>
  );
};
