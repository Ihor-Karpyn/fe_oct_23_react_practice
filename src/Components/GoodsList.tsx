import React, { FC, useState } from 'react';
import { Color, GoodWithColor, Good as GoodType } from '../types';
import { Good } from './Good';
import { GoodForm } from './GoodForm';

interface Props {
  goods: GoodWithColor[];
  removeGood: (goodId: number) => void;
  colors: Color[];
  editGood: (goodToEdit: GoodType) => void;
}

export const GoodsList: FC<Props> = (props) => {
  const {
    goods,
    removeGood,
    colors,
    editGood,
  } = props;

  const [selectedGoodId, setSelectedGoodId] = useState<number | null>(null);

  const editHandler = (goodName: string, colorId: number) => {
    if (!selectedGoodId) {
      return;
    }

    const good: GoodType = {
      id: selectedGoodId,
      name: goodName,
      colorId,
    };

    setSelectedGoodId(null);
    editGood(good);
  };

  return (
    <div className="GoodList">
      {goods.map(good => (good.id === selectedGoodId
        ? (
          <GoodForm
            key={good.id}
            colors={colors}
            onSubmit={editHandler}
            initialGoodName={good.name}
            initialColorId={good.colorId}
          />
        )
        : (
          <Good
            key={good.id}
            good={good}
            onEdit={setSelectedGoodId}
            onDelete={removeGood}
          />
        )
      ))}
    </div>
  );
};
