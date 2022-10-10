import React from "react";
import ProductCard from "./ProductCard";
import "../../styles/products-list.css";

const ProductsList = ({ data }) => {
  return (
    <div className="products-list">
      {data.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </div>
  );
};

export default ProductsList;
