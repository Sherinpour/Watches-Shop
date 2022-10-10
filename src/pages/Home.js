import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import ProductsList from "../components/UI/productsList/ProductsList";
import heroImg from "../assets/images/hero-img.png";
import products from "../assets/data/products";
import "../styles/home.css";

const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [watchProducts, setWatchProducts] = useState([]);

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredWatchProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setWatchProducts(filteredWatchProducts);
  }, []);

  return (
    <Helmet title="Home">
      <section className="hero_section">
        <div className="container">
          <div className="hero_content">
            <h2>Title</h2>
            <p>make ahglhf jWHFJH JJESHFHLS AIHEUIF</p>
            <button className="by_btn">
              <Link to="/shop">SHOP NOW</Link>
            </button>
          </div>
          <div className="hero_img">
            <img src={heroImg} alt="" />
          </div>
        </div>
      </section>

      <section className="trending_products">
        <h2> Trending Products </h2>
        <ProductsList data={trendingProducts} />
      </section>

      <section className="new_arivals">
        <h2>Watches </h2>
        <ProductsList data={watchProducts} />
      </section>
    </Helmet>
  );
};

export default Home;
