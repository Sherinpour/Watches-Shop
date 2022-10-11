import React, { useState } from "react";
import CommonSection from "../components/UI/commonSection/CommonSection";
import Helmet from "../components/helmet/Helmet";
import products from "../assets/data/products";
import ProductsList from "../components/UI/productsList/ProductsList";
import "../styles/shop.css";

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    const filterProducts = products.filter(
      (item) => item.category === filterValue
    );
    setProductsData(filterProducts);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;

    const searchProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProductsData(searchProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />

      <div className="filter-product">
        <div className="filtered-widget">
          <select onChange={handleFilter}>
            <option>Filter By Category</option>
            <option value="sofa">Sofa</option>
            <option value="mobile">Mobile</option>
            <option value="chair">Chair</option>
            <option value="watch">Watch</option>
            <option value="wireless">Wireless</option>
          </select>
        </div>

        <div className="filtered-widget">
          <select>
            <option>Sort By</option>
            <option value="ascending">ascending</option>
            <option value="descending">descending</option>
          </select>
        </div>

        <div className="search-bod">
          <input type="text" placeholder="Search..." onChange={handleSearch} />
          <span>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>

      <div>
        {productsData.length === 0 ? (
          <div className="search-result">
            <h1>No Products are found!</h1>
          </div>
        ) : (
          <ProductsList data={productsData} />
        )}
      </div>
    </Helmet>
  );
};

export default Shop;
