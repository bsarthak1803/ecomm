import { Product } from "../src/utils/types/common.types";
import { ProductListingView } from "../src/views/ProductListingView";
import { SearchBar } from "../src/components/SearchBar/SearchBar";
import {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState,
  useRef,
  memo,
  useCallback,
} from "react";
// import { Pagination } from "../Components/Pagination/Pagination";

interface HomeProps {
  products: Array<Product>; //products is an array of product object
}

const Home = memo(({ products }: HomeProps) => {
  const [productsList, setProductsList] = useState(products);
  const [isLoading, setIsLoading] = useState(false);
  // const [currentPageNum, setCurrentPageNum] = useState(1);
  // const [error, setError] = useState(null);
  // const [selectedPageNum, setSelectedPageNum] = useState(1);
  // const [page, setPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasNextPage, setHasNextPage] = useState(true);

  //on scroll check if the user has reached the bottom of the viewport, if not return else hit the api and fetch data
  // const handleScroll =() => {
  //   if(window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading){
  //     return;
  //   }
  //   fetchData();
  // }

  // cleanup
  // useEffect(() => {
  //   attaching on scroll event
  //   window.addEventListener('scroll', handleScroll);
  //   cleanup
  //   return () => removeEventListener('scroll', handleScroll);
  // }, [isLoading]);

  const fetchData = async (skip = 0, limit = 24) => {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    if (data.total <= skip + limit) setHasNextPage(false);
    setIsLoading(false);
    return data.products;
  };

  const onSearchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm((e?.target as HTMLInputElement)?.value);
  };

  const onPaginationHandler = (event: MouseEvent, index: number) => {
    event.preventDefault;
    // setSelectedPageNum(Number(index) + 1);
  };

  const onNextHandler = () => {
    // setSelectedPageNum((prevPage) => prevPage + 1);
  };

  const onPrevHandler = () => {
    // setSelectedPageNum((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    let filteredProductsList = [];
    // let endInd = selectedPageNum * 12;
    // let startInd = endInd - 12;
    filteredProductsList = products?.filter((product) =>
      product?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    );
    // filteredProductsList = filteredProductsList.slice(startInd, endInd);
    setProductsList(filteredProductsList);
  }, [
    searchTerm,
    products,
    // selectedPageNum
  ]);

  return (
    <>
      <main>
        <SearchBar onSearchHandler={onSearchHandler} />
        <ProductListingView
          products={productsList}
          fetchData={fetchData}
          setProductsList={setProductsList}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
        />
        {/* <Pagination
          productsLen={searchTerm ? productsList?.length : products?.length}
          onPaginationHandler={onPaginationHandler}
          onNextHandler={onNextHandler}
          onPrevHandler={onPrevHandler}
        /> */}
        {/* <div ref={observerTarget}></div> */}
        {isLoading ? <div>Fetching Content</div> : null}
      </main>
    </>
  );
});

//any server side code should go here
export async function getServerSideProps() {
  const response = await fetch(
    `https://dummyjson.com/products?limit=24&skip=0`
  );
  const data = await response.json();
  return {
    props: {
      products: data?.products,
    },
  };
}

export default Home;

Home.displayName = "Home";
