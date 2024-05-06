import { useEffect, useState, memo } from "react";
import styles from "./ProductPageView.module.css";
import { Product } from "../utils/types/common.types";
import Carousel from "../components/Carousel/Carousel";

interface ProductPageViewProps {
  productID: number;
}

export const ProductPageView: React.FC<ProductPageViewProps> = memo(
  ({ productID }) => {
    const [productDetails, setProductDetails] = useState<Product>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      fetchProductData()
        .then((productData) => setProductDetails(productData))
        .catch((err) => console.error(err));
    }, [productID]);

    const fetchProductData = async () => {
      const resp = await fetch(
        `https://dummyjson.com/products/${Number(productID)}`
      );
      const data = await resp.json();
      setIsLoading(false);
      return data;
    };

    if (isLoading) {
      return <>Fetching Product Data.....</>;
    }

    if (!productDetails) {
      return <>Product Not Found!!</>;
    }
    return (
      <>
        <main className={styles.mainCard}>
          <Carousel images={productDetails.images} />
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
                {productDetails?.rating}
              </center>
            </section>
          </section>
        </main>
        <section className={styles.cartBtnSection}>
          <button
            className={styles.cartBtn}
            type="button"
            aria-label="add to cart button"
            title="Add item to cart"
          >
            Add To Cart
          </button>
        </section>
      </>
    );
  }
);

ProductPageView.displayName = "ProductPageView";
