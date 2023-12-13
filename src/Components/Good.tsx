import React, { FC, useState } from 'react';
import { GoodWithColor } from '../types';
import { ColorModal } from './ColorModal';

interface Props {
  good: GoodWithColor;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const Good: FC<Props> = (props) => {
  const [selectedColorId, setSelectedColorId] = useState<
    number | null
  >(null);

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
        onClick={() => setSelectedColorId(good.colorId)}
      >
        check color
      </button>

      {selectedColorId && (
        <ColorModal
          colorId={selectedColorId}
          close={() => setSelectedColorId(null)}
        />
      )}

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
