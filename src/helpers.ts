import {
  Category, Product, ProductFull, SortFields, User,
} from './types';

export const getFullProducts = (
  products: Product[],
  categories: Category[],
  users: User[],
): ProductFull[] => {
  return products.map((product) => {
    const category = categories.find(c => (
      c.id === product.categoryId
    ));
    const user = users.find(u => (
      category?.ownerId === u.id
    ));

    return {
      ...product,
      category,
      user,
    };
  });
};

const getFieldFromProduct = (
  product: ProductFull,
  columnCode: SortFields | null,
) => {
  switch (columnCode) {
    case SortFields.Id:
      return product.id;

    case SortFields.Product:
      return product.name;

    case SortFields.Category:
      return product.category?.title;

    case SortFields.User:
      return product.user?.name;

    default:
      return null;
  }
};

interface Filters {
  userId: number | null;
  searchQuery: string;
  categoriesIds: number[];
  sortColumn: SortFields | null;
  isReverse: boolean;
}

export const prepareProducts = (
  products: ProductFull[],
  filters: Filters,
): ProductFull[] => {
  const filteredProducts = products.filter((productToFilter) => {
    const preparedSearchQuery = filters.searchQuery.toLowerCase();
    const preparedProductName = productToFilter.name.toLowerCase();
    const categoryId = productToFilter.category?.id;

    const isUserFilterMatch = filters.userId
      ? productToFilter.user?.id === filters.userId
      : true;

    const isMatchSearchQuery = filters.searchQuery
      ? preparedProductName.includes(preparedSearchQuery)
      : true;

    const isMatchCategoryFilter = filters.categoriesIds.length && categoryId
      ? filters.categoriesIds.includes(categoryId)
      : true;

    return isUserFilterMatch && isMatchSearchQuery && isMatchCategoryFilter;
  });

  const {
    sortColumn,
    isReverse,
  } = filters;

  if (sortColumn) {
    filteredProducts.sort((a, b) => {
      const aField = isReverse
        ? getFieldFromProduct(b, sortColumn)
        : getFieldFromProduct(a, sortColumn);

      const bField = isReverse
        ? getFieldFromProduct(a, sortColumn)
        : getFieldFromProduct(b, sortColumn);

      if (typeof aField === 'number' && typeof bField === 'number') {
        return aField - bField;
      }

      if (typeof aField === 'string' && typeof bField === 'string') {
        return aField.localeCompare(bField);
      }

      return 0;
    });
  }

  return filteredProducts;
};
