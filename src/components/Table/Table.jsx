import { TableBody } from './Body/TableBody';
import { TableHead } from './Head/TableHead';

export const Table = ({ sortedProducts }) => (
  <div className="box table-container">

    {
      sortedProducts.length > 0
        ? (
          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <TableHead />

            <TableBody sortedProducts={sortedProducts} />
          </table>
        )
        : (
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>
        )
    }

  </div>
);
