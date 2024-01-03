import { Color, Good } from '../types';
import { apiClient } from './apiClient';

interface CreateGoodFields {
  name: string,
  colorId: number,
}

type UpdateGoodFields = Partial<CreateGoodFields>;

export const getGoods = (): Promise<Good[]> => (
  apiClient.get<Good[]>('/goods')
);

export const getGoodById = (id: number): Promise<Good> => (
  apiClient.get<Good>(`/goods/${id}`)
);

export const getColors = (): Promise<Color[]> => (
  apiClient.get<Color[]>('/colors')
);

export const getColorById = (id: number): Promise<Color> => (
  apiClient.get<Color>(`/colors/${id}`)
);

export const deleteGood = (id: number): Promise<void> => (
  apiClient.delete<void>(`/goods/${id}`)
);

export const createGood = (fields: CreateGoodFields): Promise<Good> => (
  apiClient.post<Good>('/goods', fields)
);

export const updateGood = (
  id: number,
  fields: UpdateGoodFields,
): Promise<Good> => (
  apiClient.patch<Good>(`/goods/${id}`, fields)
);

export const goodApiClient = {
  getGoods,
  deleteGood,
  updateGood,
};
