import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import ProductsList from "../components/UI/productsList/ProductsList";
import heroImg from "../assets/images/hero-img.jpg";
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
      <div className="banner">
        <div className="banner-desc">
          <h1>
            Find your dream watch on the leading marketplace for luxury watches.
          </h1>
          <p>
            Buying eyewear should leave you happy and good-looking, with money
            in your pocket. Glasses, sunglasses, and contacts—we’ve got your
            eyes covered.
          </p>

          <Link class="button" to="/shop">
            Shop Now &nbsp;
            <span
              role="img"
              aria-label="arrow-right"
              class="anticon anticon-arrow-right"
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="arrow-right"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path>
              </svg>
            </span>
          </Link>
        </div>
        <div className="banner-img">
          <img src={heroImg} alt="" />
        </div>
      </div>

      <div className="display">
        <div className="display-header">
          <h1>Featured Products</h1>
          <Link to="/shop">See All</Link>
        </div>
        <ProductsList data={trendingProducts} />
      </div>

      <div className="display">
        <div className="display-header">
          <h1>Recommended Products</h1>
          <Link to="/shop">See All</Link>
        </div>
        <ProductsList data={watchProducts} />
      </div>
    </Helmet>
  );
};

export default Home;
