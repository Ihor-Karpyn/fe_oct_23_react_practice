import { Todo, User } from '../types';

export const usersFromServer: User[] = [
  { id: 1, userName: 'John' },
  { id: 2, userName: 'Jane' },
  { id: 3, userName: 'Joe' },
];

export const todosFromServer: Todo[] = [
  { id: 1, title: 'Buy milk', userId: 1 },
  { id: 2, title: 'Buy eggs', userId: 1 },
  { id: 3, title: 'Buy bread', userId: 2 },
  { id: 4, title: 'Buy butter', userId: 3 },
];
