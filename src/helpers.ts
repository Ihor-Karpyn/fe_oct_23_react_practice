import { Todo, TodoWithUser, User } from './types';

export const getTodosWithUser = (
  todos: Todo[],
  users: User[],
): TodoWithUser[] => todos.map(
  todo => ({
    ...todo,
    user: users.find(u => u.id === todo.userId) || null,
  }),
);

export const getNewId = (arr: { id: number }[]): number => {
  if (arr.length === 0) {
    return 1;
  }

  const ids = arr.map(el => el.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};
