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
      <section>
        <CommonSection title={productName} />
      </section>
      <section className="product-details">
        <div>
          <img src={imgUrl} alt="" />
        </div>
        <div>
          <div>
            <h3>{productName}</h3>
          </div>
          <div>
            <h4>{avgRating} ratings</h4>
          </div>
          <div>
            <p>{review}</p>
          </div>
          <div>
            <p>{description}</p>
          </div>
          <div>
            <h4> $ {price}</h4>
          </div>
          <div>
            <p>{shortDesc}</p>
          </div>
          <button onClick={addToCart}>Add to Cart</button>
        </div>
      </section>
    </Helmet>
  );
};

export default ProductDetails;
