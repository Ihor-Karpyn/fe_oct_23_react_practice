export const ProductTable = ({
  productsToView,
  columns,
  handleChangeSortingMethod,
  checkSortingMethod,
}) => (
  <div className="box table-container">
    {productsToView.length === 0 ? (
      <p data-cy="NoMatchingMessage">No products matching selected criteria</p>
    ) : (
      <table
        data-cy="ProductTable"
        className="table is-striped is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {columns.map(column => (
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  {column}
                  <a
                    href="#/"
                    onClick={() => handleChangeSortingMethod(
                      column.toLowerCase(),
                    )}
                  >
                    <span className="icon">
                      <i
                        data-cy="SortIcon"
                        className={`fas ${checkSortingMethod(column.toLowerCase())}`}
                      />
                    </span>
                  </a>
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {productsToView.map(product => (
            <tr data-cy="Product" key={product.id}>
              <td className="has-text-weight-bold" data-cy="ProductId">
                {product.id}
              </td>

              <td data-cy="ProductName">{product.name}</td>

              <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>

              <td
                data-cy="ProductUser"
                className={`${product.user.sex === 'm' ? 'has-text-link' : 'has-text-danger'}`}
              >
                {product.user.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
