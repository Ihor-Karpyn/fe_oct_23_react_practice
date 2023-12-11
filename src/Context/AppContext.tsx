import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Color, Good, GoodWithColor } from '../types';
import { colorsFromServer, goodsFromServer } from '../api/data';
import { getGoodsWithColors, getNewId } from '../helpers';

interface AppContextType {
  goodsToRender: GoodWithColor[];
  colors: Color[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  editGood: (goodToEdit: Good) => void;
  removeGood: (goodId: number) => void;
  addGood: (goodName: string, colorId: number) => void;
}

const AppContext = createContext<AppContextType>({
  goodsToRender: [],
  colors: [],
  searchQuery: '',
  setSearchQuery: () => { /* empty */ },
  editGood: () => { /* empty */ },
  removeGood: () => { /* empty */ },
  addGood: () => { /* empty */ },
});

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: FC = (props) => {
  const { children } = props;

  const [colors, setColors] = useState(colorsFromServer);
  const [goods, setGoods] = useState(goodsFromServer);
  const [searchQuery, setSearchQuery] = useState('');

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

  const addGood = useCallback((
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
  }, []);

  const goodsToRender = useMemo(
    () => goodsWithColors.filter(
      good => good.name.includes(searchQuery),
    ),
    [goodsWithColors, searchQuery],
  );

  const value: AppContextType = useMemo(() => ({
    addGood,
    colors,
    editGood,
    goodsToRender,
    removeGood,
    searchQuery,
    setSearchQuery,
  }), [
    addGood,
    colors,
    editGood,
    goodsToRender,
    removeGood,
    searchQuery,
    setSearchQuery,
  ]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
