import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import "./header.css";
import logo from "../../assets/images/eco-logo.png";
import userIcon from "../../assets/images/user-icon.png";

import useAuth from "../../custom-hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../servises/firebase";

const nav_links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const { currentUser } = useAuth();
  const profileActionRef = useRef(null);

  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky_header");
      } else {
        headerRef.current.classList.remove("sticky_header");
      }
    });
  };

  const navigateTOCart = () => {
    navigate("/cart");
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logged out");
        navigate("/home");
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleProfileAction = () =>
    profileActionRef.current.classList.toggle("show-profileActions");

  return (
    <header className="header" ref={headerRef}>
      <div className="logo">
        <i class="bi bi-watch"></i>
      </div>

      <ul className="navigation-menu-main">
        {nav_links.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={(navClass) =>
                navClass.isActive ? "text-[#101010]" : "text-gray-600"
              }
            >
              {item.display}
            </NavLink>
          </li>
        ))}
      </ul>

      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <div className="nav-item" onClick={navigateTOCart}>
            <span className="bag">
              <i className="bi bi-bag"></i>
            </span>
            <span className="cart-num">{totalQuantity}</span>
          </div>
        </li>
        <li className="navigation-menu-item">
          <div className="fav-icon profile">
            <img
              src={currentUser ? currentUser.photoURL : userIcon}
              alt=""
              onClick={toggleProfileAction}
            />
            <div
              className="profile-actions"
              ref={profileActionRef}
              onClick={toggleProfileAction}
            >
              {currentUser ? (
                <div className="user-nav">
                  <span onClick={logout}>Logout</span>
                  <i class="bi bi-arrow-right-circle"></i>
                </div>
              ) : (
                <div className="user-nav">
                  <div className="border-b-2 border-gray-200">
                    <Link to="/signup">Signup</Link>
                    <i class="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <Link to="/login">Login</Link>
                    <i class="bi bi-arrow-left-circle"></i>
                  </div>
                </div>
              )}
            </div>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default Header;
