import { MouseEventHandler, memo } from "react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  productsLen: number;
  onPaginationHandler: Function;
  onNextHandler: MouseEventHandler;
  onPrevHandler: MouseEventHandler
}

export const Pagination: React.FC<PaginationProps> = memo(({
  productsLen,
  onPaginationHandler,
  onPrevHandler,
  onNextHandler
}) => {
  const productsPerPage : number = 16;
  const numOfPages = Math.ceil(productsLen / productsPerPage);
  return (
    <section className={styles.pageBtn}>
    <button type="button" onClick={onPrevHandler}>Prev</button>
      {numOfPages
      //@ts-ignore
        ? Array.apply(null, { length: numOfPages })
            .map(Number.call, Number)
            .map((num, index) => (
              <button
                type="button"
                key={index + 1}
                onClick={event => onPaginationHandler(event, index)}
              >
                {index + 1}
              </button>
            ))
        : null}
    <button type="button" onClick={onNextHandler}>Next</button>
    </section>
  );
});

Pagination.displayName = 'Pagination';