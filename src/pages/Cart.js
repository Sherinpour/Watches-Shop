import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/cart.css";
import Helmet from "../components/helmet/Helmet";
import CommonSection from "../components/UI/commonSection/CommonSection";

import { cartActions } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  return (
    <Helmet title="Cart">
      <CommonSection title="Shopping Cart" />
      <div className="cart-table">
        {cartItems.length === 0 ? (
          <h2>No item added to the cart!</h2>
        ) : (
          <div className="table-content">
            <table className="table">
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
          </div>
        )}

        <div className="checkout-box">
          <div className="section-a">
            <h6>SubTotal</h6>
            <span>${totalAmount}</span>
          </div>
          <div className="section-b">
            <p>taxes and shipping will calculate in checkout</p>
          </div>
          <div className="section-c">
            <div>
              <button>
                <Link to={"/checkout"}>Checkout</Link>
              </button>
            </div>
            <div>
              <button>
                <Link to={"/shop"}>Continue</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
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
      <td>${item.price}</td>
      <td>{item.quantity}px</td>
      <td>
        <span onClick={deleteProduct}>
          <i class="bi bi-trash cursor-pointer"></i>
        </span>
      </td>
    </tr>
  );
};

export default Cart;
