import { useFavoriteStore } from "@/entities/Favorites";
import { Button } from "@/shared/ui/Button/Button";
import Link from "next/link";

import React from "react";

export const Header = () => {
  const { setIsShowFavorites } = useFavoriteStore();
  return (
    <div className="p-6 flex items-center justify-between gap-5">
      <Link href="/">
        <Button
          onClick={() => {
            setIsShowFavorites(false);
          }}
          variant="filled"
          color="primary"
          className="text-lg"
        >
          Главная
        </Button>
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/create-product">
          <Button variant="filled" color="primary" className="text-lg">
            Создать товар
          </Button>
        </Link>
        <Link href="/">
          <Button
            onClick={() => {
              setIsShowFavorites(true);
            }}
            variant="filled"
            color="primary"
            className="text-lg"
          >
            Избранное
          </Button>
        </Link>
      </div>
    </div>
  );
};
