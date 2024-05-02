import React, { useRef, useEffect, useCallback } from "react";
import { Product, ProductListingViewProps } from "../utils/types/common.types";
import { ProductCard } from "../components/ProductCard/ProductCard";
import styles from "./ProductListingView.module.css";
import { Pagination } from "../components/Pagination/Pagination";
import { useRouter } from "next/router";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

export const ProductListingView: React.FC<ProductListingViewProps> = React.memo(
  ({
    products,
    fetchData,
    setProductsList,
    hasNextPage,
    isLoading,
  }): React.ReactElement => {
    const router = useRouter();
    const lastProductRef = useIntersectionObserver(
      () =>
        fetchData(products.length).then((newProducts: any[]) =>
          setProductsList((products: any[]) => [...products, ...newProducts])
        ),
      [hasNextPage, !isLoading]
    );

    //using event delegation and attaching handler to the parent element
    var onProductHandler = useCallback(
      (e: React.MouseEvent) => {
        const targetProduct = e?.target as HTMLInputElement;
        router.push(`/products/${targetProduct?.id}`);
      },
      [router]
    );

    if (products?.length === 0) {
      return <div>No Products Found!!</div>;
    }

    return (
      <>
        <main>
          <ul
            onClick={(e) => onProductHandler(e)}
            className={styles.productListing}
          >
            {products.map((product, index, products) => {
              return (
                <li
                  key={product.id}
                  ref={products.length - 1 ? lastProductRef : null}
                >
                  <ProductCard product={product} />
                </li>
              );
            })}
          </ul>
        </main>
      </>
    );
  }
);

ProductListingView.displayName = "ProductListingView";
