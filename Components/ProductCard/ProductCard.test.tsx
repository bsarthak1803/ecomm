import "@testing-library/jest-dom"; // Import the matchers

import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { mockProductData } from "./mockData";
import { DOMElement } from "react";

describe("Product Card Component", () => {
  let fragment: () => {}; // fragment of type arrow
  let componentContainer: any; //this will store the container of the rendered component
  beforeEach(() => {
    //The container represents the reference to the root element containing the rendered component and its children --- essentially the reference to the dom node where the component is mounted during testing
    //render function provides an object with a number of useful properties in context of the rendered component
    const { asFragment, container } = render(
      <ProductCard product={mockProductData} key={2} />
    );
    fragment = asFragment;
    componentContainer = container;
  });

  it("renders product card component correctly", () => {
    expect(
      fragment() //fragment is called to retrieve a snapshot of the rendered component
    ).toMatchSnapshot(); //which is then matched with the saved instance of the snapshot
  });

  it("renders image component correctly", () => {
    let imgElement = componentContainer.querySelector("img"); //this will return a collection of html elements
    expect(imgElement).toBeInTheDocument();
  });

  it("renders the title section correctly", () => {
    expect(screen.getByText("Title :")).toBeInTheDocument();
  });

  it("renders the rating section correctly", () => {
    expect(screen.getByText("Rating :")).toBeInTheDocument();
  });

  it("renders the price section correctly", () => {
    expect(screen.getByText("Price :")).toBeInTheDocument();
  });
});
