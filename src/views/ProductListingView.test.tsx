import "@testing-library/jest-dom"; // Import the matchersimport

import MockIntersectionObserver from "../../__mocks__/MockIntersectionObserver";

import { cleanup, render, screen, fireEvent } from "@testing-library/react";

import { ProductListingView } from "./ProductListingView";

import { mockProductData } from "../../__mocks__/products";

import { useRouter } from "next/router";

const fetchData = jest.fn();

//mock useRouter hook
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const useRouterMock = {
  pathname: "",
  query: {},
  asPath: "",
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
};

//browser -> global === window, node -> global === global
//directly modify the variable as they are global and not modules
global.IntersectionObserver = MockIntersectionObserver; //mocking global IntersectionObserver with our mockIB class\

describe("Product Listing View Component Functionality", () => {
  let componentContainer;
  let fragment;
  beforeEach(() => {
    const { asFragment, container } = render(
      <ProductListingView products={mockProductData} fetchData={fetchData} />
    );
    fragment = asFragment;
    componentContainer = container;
    useRouter.mockReturnValue(useRouterMock);
  });

  afterEach(() => cleanup);

  afterAll(() => {
    delete global.IntersectionObserver;
  });

  it("should render the ProductListing Component correctly", () => {
    const productListingElement =
      componentContainer.querySelector(".productListing");
    //this returns an HTML element from the document of the componentContainer by using querySelector
    expect(productListingElement).not.toBe(null);
  });

  it("should render the child Component - ProductCard correctly", () => {
    const productCardElement = componentContainer.querySelector(".productCard");
    //this returns an HTML element from the document of the componentContainer by using querySelector
    expect(productCardElement).not.toBe(null);
  });

  it("onProductHandler calls router.push with the correct url", () => {
    const firstSectionTag = componentContainer.querySelector("section");
    fireEvent.click(firstSectionTag); //attach onclick handler to the node
    expect(useRouterMock?.push).toHaveBeenCalledWith("/products/");
  });
});
