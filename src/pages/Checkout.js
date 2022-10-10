import React from "react";
import "../styles/checkout.css";
import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/helmet/Helmet";
import { useSelector } from "react-redux";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />
      <section>
        <h6 className="mb-4 fw-bold">Billing Information</h6>
        <form className="billing-form">
          <input type="text" placeholder="Enter Your name" />
          <input type="email" placeholder="Enter Your email" />
          <input type="number" placeholder="Phone number" />
          <input type="text" placeholder="Street address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Postal code" />
          <input type="text" placeholder="Country" />
        </form>

        <div className="checkout-cart">
          <h6>
            Total Qty: <span>{totalQty} items</span>
          </h6>
          <h6>
            Subtotal: <span>{totalAmount}</span>
          </h6>
          <h6>
            shiping: <span>0</span>
          </h6>
          <button className="w-100">Place an order</button>
        </div>
      </section>
    </Helmet>
  );
};

export default Checkout;
