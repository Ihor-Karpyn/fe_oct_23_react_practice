import React from 'react';
import cn from 'classnames';

export const TableBody = ({ products }) => (
  <tbody>
    {products.map(product => (
      <tr key={product.id} data-cy="Product">
        <td className="has-text-weight-bold" data-cy="ProductId">
          {product.id}
        </td>

        <td data-cy="ProductName">{product.name}</td>

        <td data-cy="ProductCategory">
          {product.category}
        </td>

        <td
          data-cy="ProductUser"
          className={cn({
            'has-text-link': product.user.sex === 'm',
            'has-text-danger': product.user.sex === 'f',
          })}
        >
          {product.user.name}
        </td>
      </tr>
    ))}
  </tbody>
);
