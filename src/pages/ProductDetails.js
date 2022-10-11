import React from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import products from "../assets/data/products";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/commonSection/CommonSection";

import { toast } from "react-toastify";
import "../styles/product-details.css";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  const dispatch = useDispatch();
  const {
    imgUrl,
    productName,
    price,
    avgRating,
    review,
    description,
    shortDesc,
  } = product;

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id,
        image: imgUrl,
        productName,
        price,
      })
    );
    toast.success("Product added successfully");
  };

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />

      <div className="details">
        <div className="product-image">
          <img src={imgUrl} alt="" />
        </div>
        <div className="product-desc">
          <div>
            <h1>{productName}</h1>
          </div>

          <div>
            <p>{description}</p>
          </div>
          <div>
            <h1> ${price}</h1>
          </div>

          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </Helmet>
  );
};

export default ProductDetails;
