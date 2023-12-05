import { FC, useState } from 'react';
import { colorsFromServer, goodsFromServer } from './api/data';
import { getGoodsWithColors, getNewId } from './helpers';
import './App.scss';
import { GoodsList } from './Components/GoodsList';
import { AddGoodForm } from './Components/AddGoodForm';
import { Good } from './types';

export const App: FC = () => {
  const [colors, setColors] = useState(colorsFromServer);
  const [goods, setGoods] = useState(goodsFromServer);

  const goodsWithColors = getGoodsWithColors(goods, colors);

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
        <GoodsList goods={goodsWithColors} />

        <AddGoodForm colors={colors} addGood={addGood} />
      </div>
    </>
  );
};
