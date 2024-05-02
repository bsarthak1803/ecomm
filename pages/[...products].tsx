import { useRouter } from "next/router";
import { ProductPageView } from "../src/views/ProductPageView";
import { memo, useMemo } from "react";
import { Product } from '../src/utils/types/common.types'

// type ProductPageProps = { 
//   productData : Product
// }

const ProductPage = memo(() => {
  const router = useRouter();
  const params = router?.query;
  const productID = Number(params?.products?.[1]);
  // memoize productID
  useMemo(() => Number(params?.products?.[1]), [params]);
  return (
    <>
      <ProductPageView productID={productID} />
    </>
  );
});


//using getStaticProps async function to generate all the pages at build time
// export const getStaticProps = async(nextReq : any, nextRes : any) => {
//   const productID = parseInt(nextReq?.params?.products[1]);
//   const result = await fetch(`https://fakestoreapi.com/products/${productID}`);
//   const productData = await result.json();
//   console.log(productData);
//   return {
//     props : {
//       productData : productData
//     },
//     revalidate : 20
//   }
// }

//Without getStaticPaths - getStaticProps won't work
// export const getStaticPaths = async() => {
//   return {
//     paths : [],
//     fallback : true
//   }
// }

export default ProductPage;

ProductPage.displayName = "ProductPage";
