import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { colorsFromServer, goodsFromServer } from './api/data';
import { getGoodsWithColors, getNewId } from './helpers';
import './App.scss';
import { GoodsList } from './Components/GoodsList';
import { GoodForm } from './Components/GoodForm';
import { Color, Good } from './types';
import {
  createGood,
  deleteGood,
  getColors,
  getGoods,
  goodApiClient
} from './api/api';
import { isUndefined } from 'util';

export const App: FC = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [counter, setCounter] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isDataReady = !isLoading && !errorMessage;

  console.log(goods);

  useEffect(
    () => {
      setIsLoading(true);

      Promise.all([getGoods(), getColors()])
        .then((dataFromServer) => {
          const [goodsFS, colorsFS] = dataFromServer;

          setGoods(goodsFS);
          setColors(colorsFS);
        })
        .catch(error => setErrorMessage(error.message))
        .finally(() => setIsLoading(false));
    },
    [],
  );

  const goodsWithColors = useMemo(
    () => getGoodsWithColors(goods, colors),
    [colors, goods],
  );

  const editGood = useCallback(
    async (goodToEdit: Good) => {
      const {id, ...fieldsToUpdate} = goodToEdit;

      const editedGood = await goodApiClient.updateGood(id, fieldsToUpdate);

      setGoods(
        currentGoods => currentGoods.map(good => (good.id !== goodToEdit.id
            ? good
            : editedGood
        )),
      );
    },
    [],
  );

  const removeGood = useCallback(
    async(goodId: number) => {
      try {
        await deleteGood(goodId);

        setGoods(
          currentGoods => currentGoods.filter(good => good.id !== goodId),
        );
      } catch (error: any) {
        window.alert(`Smth went wrong, ${error?.message}`);
      }
    },
    [],
  );

  const addGood = useCallback(
    async (
      goodName: string,
      colorId: number,
    ) => {
      try {
        const newGood = await createGood({
          name: goodName,
          colorId,
        });

        setGoods((currentGoods) => {
          return [
            ...currentGoods,
            newGood,
          ];
        });
      } catch (error: any) {
        window.alert(`Smth went wrong ${error.message}`)
      }
    },
    []
  );

  const goodsToRender = useMemo(
    () => goodsWithColors.filter(
      good => good.name.includes(searchQuery),
    ),
    [goodsWithColors, searchQuery],
  );

  return (
    <>
      <h1 className="appTitle">Goods list</h1>

      <button
        type="button"
        onClick={() => {
          getColors().catch(er => console.log(er));
        }}
      >
        dsgdfgdfg
      </button>

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
        {isLoading && (
          <h1>Loading...</h1>
        )}

        {errorMessage && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}

        {isDataReady && (
          <GoodsList
            goods={goodsToRender}
            removeGood={removeGood}
            colors={colors}
            editGood={editGood}
          />
        )}

        <GoodForm
          colors={colors}
          onSubmit={addGood}
          submitButtonText="Add good"
        />
      </div>
    </>
  );
};
