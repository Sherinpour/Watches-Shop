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
    <div className="product_item">
      <div className="product_img">
        <img src={item.imgUrl} alt="" width="200px" height="200px" />
      </div>
      <h3 className="product_name">
        <Link to={`/shop/${item.id}`}>{item.productName}</Link>
      </h3>
      <span>{item.category}</span>
      <div className="product_card_buttom">
        <span className="price">${item.price}</span>
        <span onClick={addToCart}>
          <i className="bi bi-plus-circle"></i>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
