export const QueryFilter = ({ productNameQuery, setProductNameQuery }) => (
  <div className="panel-block">
    <p className="control has-icons-left has-icons-right">
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={productNameQuery}
        onChange={event => setProductNameQuery(event.target.value)}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      {productNameQuery && (
        <span className="icon is-right">
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => setProductNameQuery('')}
          />
        </span>
      )}
    </p>
  </div>
);
