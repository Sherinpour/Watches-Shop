import React, { useState } from "react";
import { Link } from "react-router-dom";
import Helmet from "../components/helmet/Helmet";
import { db, auth, storage } from "../servises/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

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
            <div className="auth-content">
              <div className="auth">
                <h3>Sign up to Watches Shop</h3>

                <form onSubmit={signup}>
                  <div class="input-group">
                    <label class="label-input" for="username">
                      Username
                    </label>
                    <input
                      type="username"
                      label="username"
                      autoComplete="off"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Your Name"
                    />
                  </div>

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
                      Passeword
                    </label>
                    <input
                      type="password"
                      label="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />
                  </div>

                  <div class="input-group">
                    <label class="label-input" for="profile-img">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      for="profile-img"
                      className="profile-file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <br />

                  <button type="submit" className="button">
                    Sign Up&nbsp;
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
                <span>Already have an account?</span>
                <Link to="/login">
                  <button
                    class="button-small button-border button-border-gray button-icon"
                    type="button"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Helmet>
  );
};

export default Signup;
