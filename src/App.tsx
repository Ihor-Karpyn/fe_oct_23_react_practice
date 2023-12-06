import { FC, useState } from 'react';
import { colorsFromServer, goodsFromServer } from './api/data';
import { getGoodsWithColors, getNewId } from './helpers';
import './App.scss';
import { GoodsList } from './Components/GoodsList';
import { GoodForm } from './Components/GoodForm';
import { Good } from './types';

export const App: FC = () => {
  const [colors, setColors] = useState(colorsFromServer);
  const [goods, setGoods] = useState(goodsFromServer);

  const goodsWithColors = getGoodsWithColors(goods, colors);

  const editGood = (goodToEdit: Good) => {
    setGoods(
      currentGoods => currentGoods.map(good => (good.id !== goodToEdit.id
        ? good
        : goodToEdit
      )),
    );
  };

  const removeGood = (goodId: number) => {
    setGoods(
      currentGoods => currentGoods.filter(good => good.id !== goodId),
    );
  };

  const addGood = (
    goodName: string,
    colorId: number,
  ) => {
    setGoods((currentGoods) => {
      const newGood: Good = {
        id: getNewId(currentGoods),
        name: goodName,
        colorId,
      };

      return [
        ...currentGoods,
        newGood,
      ];
    });
  };

  return (
    <>
      <h1 className="appTitle">Goods list</h1>

      <div className="appContainer">
        <GoodsList
          goods={goodsWithColors}
          removeGood={removeGood}
          colors={colors}
          editGood={editGood}
        />

        <GoodForm
          colors={colors}
          onSubmit={addGood}
          submitButtonText="Add good"
        />
      </div>
    </>
  );
};
