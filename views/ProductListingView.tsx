import React, { useRef, useEffect, useCallback } from "react";
import { Product, ProductListingViewProps } from "../utils/types/common.types";
import { ProductCard } from "../Components/ProductCard/ProductCard";
import styles from "./ProductListingView.module.css";
import { Pagination } from "../Components/Pagination/Pagination";
import { useRouter } from "next/router";

export const ProductListingView: React.FC<ProductListingViewProps> = React.memo(
  ({ products, fetchData }): React.ReactElement => {
    const router = useRouter();
    const observerTarget = useRef(null);

    //using intersectionObserver API to implement infinite scrolling
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchData();
          }
        },
        { threshold: 0.01 } //% of target element is visible
      );
      let target = observerTarget?.current;

      if (target) {
        observer.observe(target);
      }

      //cleanup
      return () => {
        if (target) {
          observer.unobserve(target);
        }
      };
    }, [observerTarget, fetchData]);

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
        <div>
          <section
            onClick={(e) => onProductHandler(e)}
            className={styles.productListing}
          >
            {products.map((product, index) => {
              //attach the ref to the last visible item after more data will be fetched
              if (index + 1 === products.length) {
                return <div ref={observerTarget} key={product.id}></div>;
              } else {
                return <ProductCard key={product.id} product={product} />;
              }
            })}
          </section>
        </div>
      </>
    );
  }
);

ProductListingView.displayName = "ProductListingView";
