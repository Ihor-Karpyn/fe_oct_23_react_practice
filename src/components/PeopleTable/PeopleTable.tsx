import { FC } from 'react';
import { PeopleTableHead } from './Head/PeopleTableHead';
import { PeopleTableBody } from './Body/PeopleTableBody';
import { ProductFull, SortFields } from '../../types';

interface Props {
  products: ProductFull[];
  sortColumn: SortFields | null;
  setSortColumn: (field: SortFields | null) => void;
  isReverse: boolean;
}

export const PeopleTable: FC<Props> = (props) => {
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
