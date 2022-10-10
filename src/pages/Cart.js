import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/cart.css";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";

import { cartActions } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <section className="cart-table">
        {cartItems.length === 0 ? (
          <h2 className="fs-4 text-center">No item added to the cart</h2>
        ) : (
          <table className="table borderd">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <ReturnCartItem item={item} key={index} />
              ))}
            </tbody>
          </table>
        )}

        <section>
          <div>
            <h6 className="d-flex align-items-center justify-content-between">
              SubTotal
              <span className="fs-4 fw-bold">${totalAmount}</span>
            </h6>
          </div>
          <div>
            <button className="btn">
              <Link to={"/checkout"}>Checkout</Link>
            </button>
            <button className="btn">
              <Link to={"/shop"}>Continue</Link>
            </button>
          </div>
        </section>
      </section>
    </Helmet>
  );
};

const ReturnCartItem = ({ item }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    dispatch(cartActions.deleteItem(item.id));
  };

  return (
    <tr>
      <td>
        <img src={item.imgUrl} alt="" />
      </td>
      <td>{item.productName}</td>
      <td>{item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <span onClick={deleteProduct}>delete icon</span>
      </td>
    </tr>
  );
};

export default Cart;
