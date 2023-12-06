import React, { FC } from 'react';
import { GoodWithColor } from '../types';

interface Props {
  good: GoodWithColor;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const Good: FC<Props> = (props) => {
  const {
    good,
    onEdit,
    onDelete,
  } = props;

  return (
    <article
      className="GoodCard"
    >
      <p
        className="GoodCard__title"
        style={{
          color: good.color?.name || 'black',
        }}
      >
        {good.name}
      </p>

      <button
        type="button"
        onClick={() => onEdit(good.id)}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => onDelete(good.id)}
      >
        X
      </button>
    </article>
  );
};
