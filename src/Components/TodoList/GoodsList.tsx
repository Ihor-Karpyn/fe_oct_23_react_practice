import React, { FC, memo, useRef, useState } from 'react';
import { Color, GoodWithColor, Good as GoodType } from '../../types';
import { Good } from './Good';
import { GoodForm } from './GoodForm';

interface Props {
  goods: GoodWithColor[];
  removeGood: (goodId: number) => Promise<void>;
  colors: Color[];
  editGood: (goodToEdit: GoodType) => Promise<number>;
}

export const GoodsList: FC<Props> = memo((props) => {
  const {
    goods,
    removeGood,
    colors,
    editGood,
  } = props;

  const [selectedGoodId, setSelectedGoodId] = useState<number | null>(null);

  const editHandler = async(goodName: string, colorId: number) => {
    if (!selectedGoodId) {
      return;
    }

    const good: GoodType = {
      id: selectedGoodId,
      name: goodName,
      colorId,
    };

    try {
      await editGood(good);

      setSelectedGoodId(null);
    } catch (error: any) {
      window.alert(`Smth went wrong ${error.message}`);
    }
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
});
