"use client";
import React, { useCallback } from "react";
import { Product } from "../../model/types/productTypes";
import Image from "next/image";
import { useFavoriteStore } from "@/entities/Favorites";
import { Button } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { LikeIcon } from "@/shared/assets/icons/Like/LikeIcon";
import { XmarkIcon } from "@/shared/assets/icons/XmarkIcon/XmarkIcon";

import { useProductsStore } from "../../model/hooks/useProductsStore";

interface ProductItemProps {
  product: Product;
}

export const ProductItem: React.FC<ProductItemProps> = React.memo(
  ({ product }) => {
    const { id, title, description, price, image } = product;
    const { addItemToFavorites, removeItemFromFavorites, favoriteItems } =
      useFavoriteStore();
    const { removeProduct } = useProductsStore();

    const isInFavorites = favoriteItems.some((item) => item.id === +id);

    const handleAddToFavorites = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isInFavorites) {
          removeItemFromFavorites(id);
        } else {
          addItemToFavorites(product);
        }
      },
      [addItemToFavorites, id, isInFavorites, product, removeItemFromFavorites]
    );

    const handleDelete = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        removeProduct(id);
      },
      [id, removeProduct]
    );

    return (
      <div
        className={`flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
      >
        <Link href={`products/${id}`} className="grow">
          <div>
            <div className="w-full relative h-60">
              <Image
                alt={`product ${id} image`}
                src={image}
                fill={true}
                className="object-cover"
              />
            </div>
          </div>

          <div className="p-4 grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </Link>

        <div className="flex items-center justify-between p-4">
          <span className="text-lg font-bold text-gray-900">{price} $</span>
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer text-gray-500 hover:text-red-500"
              onClick={handleDelete}
            >
              <XmarkIcon />
            </Button>
            <Button
              style={{
                color: isInFavorites ? "red" : "black",
              }}
              onClick={handleAddToFavorites}
            >
              <LikeIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

ProductItem.displayName = "ProductItem";
