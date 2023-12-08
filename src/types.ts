export interface Todo {
  id: number;
  title: string;
  userId: number;
}

export interface User {
  id: number;
  userName: string;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
