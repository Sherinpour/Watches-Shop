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
        <img src={logo} alt="Logo" />
      </div>

      <div className="navigation">
        <ul className="menu">
          {nav_links.map((item) => (
            <li className="nav_item" key={item.path}>
              <NavLink
                to={item.path}
                className={(navClass) => (navClass.isActive ? "nav_activ" : "")}
              >
                {item.display}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="nav_icons">
        <span className="fav-icon">
          <i className="bi bi-suit-heart"></i>
          <span className="badge">2</span>
        </span>
        <span className="fav-icon" onClick={navigateTOCart}>
          <i className="bi bi-bag"></i>
          <span className="badge">{totalQuantity}</span>
        </span>
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
              <span onClick={logout}>Logout</span>
            ) : (
              <div className="d-flex align-items-center justify-content-center flex-column">
                <Link to="/signup">Signup</Link>
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mobile_menu">
        <span>
          <i className="bi bi-list"></i>
        </span>
      </div>
    </header>
  );
};

export default Header;
