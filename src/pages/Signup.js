import React, { useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import "../styles/login.css";

import { db, auth, storage } from "../servises/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [file, setFile] = useState(null),
    [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const useCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ),
        user = useCredential.user,
        storageRef = ref(storage, `images/${Date.now() + username}`),
        uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            // update user profile
            await updateProfile(user, {
              displayName: username,
              photoURL: downloadUrl,
            });

            // store user data in firestore database
            await setDoc(doc(db, "user", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadUrl,
            });
          });
        }
      );

      setLoading(false);
      toast.success("account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("somthing went wrong!");
    }
  };

  return (
    <Helmet title="Login">
      <div>
        {loading ? (
          <h6 className="fw-bold">Loading.....</h6>
        ) : (
          <>
            <form onSubmit={signup}>
              <h3>Signup</h3>
              <input
                type="text"
                label="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />

              <button type="submit" className="bg-blue-200">
                Create an account
              </button>
            </form>
            <div>
              <p>
                <Link to="/signin">login</Link>
              </p>
            </div>
          </>
        )}
      </div>
    </Helmet>
  );
};

export default Signup;
