import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import "../styles/login.css";
import { toast } from "react-toastify";

import { auth } from "../servises/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const useCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ),
        user = useCredential.user;
      setLoading(false);
      toast.success("Successfully logged in :)");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Login">
      {loading ? (
        <h6 className="fw-bold">Loading....</h6>
      ) : (
        <>
          <div className="auth-content">
            <div className="auth">
              <h3>Sign in to Watches Shop</h3>

              <form onSubmit={login}>
                <div class="input-group">
                  <label class="label-input" for="email">
                    Email
                  </label>
                  <input
                    type="email"
                    label="Email"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>

                <div class="input-group">
                  <label class="label-input" for="password">
                    Password
                  </label>
                  <input
                    type="password"
                    label="Password"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your Password"
                  />
                </div>
                <br />

                <button type="submit" className="button">
                  Sign In&nbsp;
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
                </button>
              </form>
            </div>

            <div className="auth-message">
              <span>Do not have an account?</span>
              <Link to="/signup">
                <button
                  class="button-small button-border button-border-gray button-icon"
                  type="button"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </Helmet>
  );
};

export default Login;
