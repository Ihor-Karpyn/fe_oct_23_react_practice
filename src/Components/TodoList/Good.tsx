import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { GoodWithColor } from '../../types';
import { ColorModal } from './ColorModal';

interface Props {
  good: GoodWithColor;
  onEdit: (id: number) => void;
  onDelete: (id: number) => Promise<void>;
}

export const Good: FC<Props> = (props) => {
  const [selectedColorId, setSelectedColorId] = useState<
    number | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);

  const {
    good,
    onEdit,
    onDelete,
  } = props;

  const deleteHandler = async() => {
    setIsLoading(true);

    await onDelete(good.id);

    setIsLoading(false);
  };

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
        disabled={isLoading}
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
        disabled={isLoading}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => deleteHandler()}
        disabled={isLoading}
      >
        X
      </button>
      <Link to={`/todos/${good.id}`}>Details</Link>
    </article>
  );
};
