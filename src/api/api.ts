import { Color, Good } from '../types';
import { get } from './apiClient';

export const getGoods = (): Promise<Good[]> => (
  get<Good[]>('/goods')
);

export const getColors = (): Promise<Color[]> => (
  get<Color[]>('/colors')
);

export const getColorById = (id: number): Promise<Color> => (
  get<Color>(`/colors/${id}`)
);
