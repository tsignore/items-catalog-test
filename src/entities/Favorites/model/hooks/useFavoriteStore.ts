import { create } from "zustand";
import { FavoriteStore } from "../types/favoriteTypes";

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
  favoriteItems: [],
  isShowFavorites: false,
  addItemToFavorites: (product) => {
    set((state) => ({
      favoriteItems: [...state.favoriteItems, product],
    }));
  },
  removeItemFromFavorites: (productId) => {
    set((state) => ({
      favoriteItems: state.favoriteItems.filter(
        (item) => item.id !== productId
      ),
    }));
  },
  getTotalPrice: () => {
    const { favoriteItems } = get();
    return favoriteItems.reduce((total, product) => total + product.price, 0);
  },
  setIsShowFavorites: (value: boolean) =>
    set(() => ({ isShowFavorites: value })),
}));
