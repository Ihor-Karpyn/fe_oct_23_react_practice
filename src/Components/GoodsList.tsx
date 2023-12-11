import React, { FC, memo, useRef, useState } from 'react';
import { Color, GoodWithColor, Good as GoodType } from '../types';
import { Good } from './Good';
import { GoodForm } from './GoodForm';
import { useAppContext } from '../Context/AppContext';

export const GoodsList: FC = memo((props) => {
  const {
    editGood,
    colors,
    removeGood,
    goodsToRender,
  } = useAppContext();

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
      {goodsToRender.map(good => (good.id === selectedGoodId
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
});
