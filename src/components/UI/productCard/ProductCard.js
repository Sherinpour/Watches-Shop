import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./product-card.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../../redux/slices/cartSlice";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success("Product added successfully");
  };
  return (
    <div className="product-item">
      <div className="product-img">
        <img src={item.imgUrl} alt="" />
      </div>
      <div className="product-detail">
        <h1 className="produc-name">
          <Link to={`/shop/${item.id}`}>{item.productName}</Link>
        </h1>
        <span className="produc-brand">{item.brand}</span>
        <div className="product-card-buttom">
          <span>${item.price}</span>
          <span onClick={addToCart}>
            <i class="bi bi-plus-circle-fill cursor-pointer"></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
