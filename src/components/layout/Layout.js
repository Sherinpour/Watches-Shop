import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Routers from "../../routers/Routers";
import "../../styles/index.css";

const Layout = () => {
  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
