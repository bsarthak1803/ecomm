import { useEffect, useState, memo } from "react";
import styles from "./ProductPageView.module.css";
import Image from "next/image";
import { Product } from "../utils/types/common.types";

interface ProductPageViewProps {
  productID: number;
}

export const ProductPageView: React.FC<ProductPageViewProps> = memo(({
  productID
}) => {
  const [productDetails, setProductDetails] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productID}`)
      .then((res) => res.json())
      .then((data) => {
        setProductDetails(data);
        setIsLoading(false);
      });
  }, [productID]);

  if (isLoading) {
    return <>Fetching Product Data.....</>;
  }

  if (!productDetails) {
    return <>Product Not Found!!</>;
  }
  return (
    <>
      <main className={styles.mainCard}>
        <section className={styles.imgSection}>
          <Image
            src={productDetails?.image}
            alt={productDetails?.description}
            width={300}
            height={300}
          ></Image>
        </section>
        <section className={styles.productDescription}>
          <section>
            <center>
              <b>Title : </b>
              {productDetails?.title}
            </center>
          </section>
          <section>
            <center>
              <b>Description : </b>
              {productDetails?.description}
            </center>
          </section>
          <section>
            <center>
              <b>Price : </b>INR {productDetails?.price}
            </center>
          </section>
          <section>
            <center>
              <b>Rating : </b>
              {productDetails?.rating?.rate}
            </center>
          </section>
        </section>
      </main>
      <section className={styles.cartBtnSection}>
        <button className={styles.cartBtn} type="button" aria-label="add to cart button" title="Add item to cart">
          Add To Cart
        </button>
      </section>
    </>
  );
});

ProductPageView.displayName = 'ProductPageView';