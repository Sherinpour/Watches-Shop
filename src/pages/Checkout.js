import React from "react";
import "../styles/checkout.css";
import CommonSection from "../components/UI/commonSection/CommonSection";
import Helmet from "../components/helmet/Helmet";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <div className="billing">
        <div className="billing-form">
          <h6>Billing Information</h6>
          <form>
            <input type="text" placeholder="Enter Your name" />
            <input type="email" placeholder="Enter Your email" />
            <input type="number" placeholder="Phone number" />
            <input type="text" placeholder="Street address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="Postal code" />
            <input type="text" placeholder="Country" />
          </form>
        </div>

        <div className="billing-cart">
          <div>
            Total Qty: <span>{totalQty} items</span>
          </div>
          <div>
            Subtotal: <span>{totalAmount}</span>
          </div>

          <button className="order-btn">Place an order</button>
        </div>
      </div>
    </Helmet>
  );
};

export default Checkout;
