import { FC, useCallback, useMemo, useState } from 'react';
import { colorsFromServer, goodsFromServer } from './api/data';
import { getGoodsWithColors, getNewId } from './helpers';
import './App.scss';
import { GoodsList } from './Components/GoodsList';
import { GoodForm } from './Components/GoodForm';
import { Good } from './types';

export const App: FC = () => {
  const [colors, setColors] = useState(colorsFromServer);
  const [goods, setGoods] = useState(goodsFromServer);
  const [searchQuery, setSearchQuery] = useState('');
  const [counter, setCounter] = useState(0);

  const goodsWithColors = useMemo(
    () => getGoodsWithColors(goods, colors),
    [colors, goods],
  );

  const editGood = useCallback(
    (goodToEdit: Good) => {
      setGoods(
        currentGoods => currentGoods.map(good => (good.id !== goodToEdit.id
          ? good
          : goodToEdit
        )),
      );
    },
    [],
  );

  const removeGood = useCallback(
    (goodId: number) => {
      setGoods(
        currentGoods => currentGoods.filter(good => good.id !== goodId),
      );
    },
    [],
  );

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

  const goodsToRender = useMemo(
    () => goodsWithColors.filter(
      good => good.name.includes(searchQuery),
    ),
    [goodsWithColors, searchQuery],
  );

  return (
    <>
      <h1 className="appTitle">Goods list</h1>

      <input
        type="search"
        placeholder="Search"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />

      <div>
        <h2>Counter</h2>
        <button
          type="button"
          onClick={() => setCounter(prev => prev + 1)}
        >
          {counter}
        </button>
      </div>

      <div className="appContainer">
        <GoodsList
          goods={goodsToRender}
          removeGood={removeGood}
          colors={colors}
          editGood={editGood}
        />

        <GoodsList
          goods={goodsToRender}
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
