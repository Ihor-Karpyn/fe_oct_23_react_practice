export enum UserSex {
  Male = 'm',
  Female = 'f',
}

export interface User {
  id: number;
  name: string;
  sex: UserSex,
}

export interface Category {
  id: number;
  title: string;
  icon: string;
  ownerId: number;
}

export interface Product {
  id: number;
  name: string;
  categoryId: number;
}

export interface ProductFull extends Product {
  user?: User;
  category?: Category;
}

export enum SortFields {
  Id = 'id',
  Product = 'product',
  Category = 'category',
  User = 'user',
}
