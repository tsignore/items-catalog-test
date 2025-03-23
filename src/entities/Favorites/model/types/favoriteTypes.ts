import { Product } from "../../../Product";

export interface FavoriteStore {
  favoriteItems: Product[];
  isShowFavorites: boolean;
  addItemToFavorites: (product: Product) => void;
  removeItemFromFavorites: (productId: number) => void;
  getTotalPrice: () => number;
  setIsShowFavorites: (value: boolean) => void;
}
