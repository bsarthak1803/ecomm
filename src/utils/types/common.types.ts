import { Ref } from "react"

export interface ProductListingViewProps {
  products : Array<Product>,
  fetchData: Function,
  setProductsList: Function,
  hasNextPage: boolean,
  isLoading: boolean
}

export interface Product {
    id : number,
    title : string,
    price : number,
    description : string,
    category : string,
    thumbnail : string,
    rating : number,
    discountPercentage: number,
    stock: number,
    brand: string,
    images: any[]

  }