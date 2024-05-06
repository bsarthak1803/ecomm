import { useId, useState } from "react";
import Image from "next/image";
import styles from "./Carousel.module.css";

type CarouselProps = {
  images: string[];
};

export default function Carousel({ images }: CarouselProps) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const getImgId = (ind: number) => {
    return `img-${useId()}-${ind}-id`;
  } 

  const onPrevHandler = () => {
    setCurrentImgIndex((ind) => {
      if (ind === 0) return images.length - 1;
      return ind - 1;
    });
  };

  const onNextHandler = () => {
    setCurrentImgIndex((ind) => {
      if (ind === images.length - 1) return 0;
      return ind + 1;
    });
  };

  return (
    <section className={styles.carousel}>
      <Image
        id={getImgId(currentImgIndex)}
        className={styles.image}
        src={images[currentImgIndex]}
        alt={`product image ${currentImgIndex + 1}`}
        loading={currentImgIndex === 0 ? "eager" : "lazy"}
        fill={true}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <button aria-label="slide left" tabIndex={0} className={styles.leftArrow} onClick={onPrevHandler}></button>
      <button aria-label="slide right" tabIndex={0} className={styles.rightArrow} onClick={onNextHandler}></button>
    </section>
  );
}
