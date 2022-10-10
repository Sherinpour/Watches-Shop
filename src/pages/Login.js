import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import "../styles/login.css";
import { toast } from "react-toastify";

import { db, auth, storage } from "../servises/firebase";
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
          <div>
            <form onSubmit={login}>
              <h3>LogIn</h3>
              <input
                type="email"
                label="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                label="Password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="bg-blue-200">
                Login
              </button>
            </form>
          </div>
          <div>
            <p>
              <Link to="/signup">Create an account</Link>
            </p>
          </div>
        </>
      )}
    </Helmet>
  );
};

export default Login;
