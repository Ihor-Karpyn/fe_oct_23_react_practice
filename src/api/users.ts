import { User, UserSex } from '../types';

export const usersFromServer: User[] = [
  { id: 1, name: 'Roma', sex: UserSex.Male },
  { id: 2, name: 'Anna', sex: UserSex.Female },
  { id: 3, name: 'Max', sex: UserSex.Male },
  { id: 4, name: 'John', sex: UserSex.Male },
];
