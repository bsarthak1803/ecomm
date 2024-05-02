import { Product } from "../../utils/types/common.types";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { memo } from "react";

//types interface for Product Card Props
interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product }): React.ReactElement => {
    return (
      <main className={styles.productCard} id={product?.id.toString()}>
        <Image
          src={product?.thumbnail}
          alt={product?.title}
          width={200}
          height={200}
          loading={product.id <= 8 ? "eager" : "lazy"}
          id={product?.id.toString()}
        />
        <section className={styles.verticalDivision}></section>
        <section>
          <center id={product?.id.toString()}>
            <b>Title : </b>
            {product?.title}
          </center>
        </section>
        <section>
          <center id={product?.id.toString()}>
            <b>Price : </b>INR {product?.price}
          </center>
        </section>
        <section>
          <center id={product?.id.toString()}>
            <b>Rating : </b>
            {product?.rating}
          </center>
        </section>
      </main>
    );
  }
);

ProductCard.displayName = "ProductCard";
