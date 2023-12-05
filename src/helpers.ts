import { Color, Good, GoodWithColor } from './types';

export const getColorById = (
  coloros: Color[],
  id: number,
): Color | null => (
  coloros.find(color => color.id === id) || null
);

export const getGoodsWithColors = (
  goods: Good[],
  colors: Color[],
): GoodWithColor[] => (
  goods.map(good => ({
    ...good,
    color: getColorById(colors, good.colorId),
  }))
);

export const getNewId = (arr: { id: number }[]): number => {
  const ids = arr.map(el => el.id);
  const maxId = Math.max(...ids);

  if (!Number.isFinite(maxId)) {
    return 1;
  }

  return maxId + 1;
};
