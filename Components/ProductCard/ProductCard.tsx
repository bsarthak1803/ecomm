import { Product } from "../../utils/types/common.types";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { memo } from "react";

//types interface for Product Card Props
interface ProductCardProps {
  key: number;
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product }): React.ReactElement => {
    return (
      <div className={styles.productCard} id={product?.id.toString()}>
        <Image
          src={product?.image}
          alt={product?.title}
          width={200}
          height={200}
          loading={product.id <= 8 ? "eager" : "lazy"}
          id={product?.id.toString()}
        />
        <div className={styles.verticalDivision}></div>
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
            {product?.rating?.rate}
          </center>
        </section>
      </div>
    );
  }
);

ProductCard.displayName = "ProductCard";
