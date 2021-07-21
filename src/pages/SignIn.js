import React, { useState } from "react";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SignIn({ uid }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPass, setIsErrorPass] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    e.preventDefault();

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/user/login`,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          if (res.data.errors.email) {
            emailError.innerHTML = res.data.errors.email;
            setIsErrorEmail(true);
          } else {
            setIsErrorEmail(false);
            emailError.innerHTML = null;
          }

          if (res.data.errors.password) {
            passwordError.innerHTML = res.data.errors.password;
            setIsErrorPass(true);
          } else {
            setIsErrorPass(false);
            passwordError.innerHTML = null;
          }
        } else {
          Cookies.set("_GO", res.data.token);
          history.go("/");
        }
      })

      .catch((err) => console.log(err));
  };

  if (uid) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="main-form">
        <div className="container">
          <h1>Connection</h1>
          <h3>
            Connectez vous pour discuter avec les personnes que vous aimez.
          </h3>
          <form action="" onSubmit={handleSubmit}>
            <label htmlFor="email" />
            Email *
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              className={`${isErrorEmail ? "active" : ""}`}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="email error"></div>
            <label htmlFor="password" />
            mot de passe *
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              className={`${isErrorPass ? "active" : ""}`}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password error"></div>
            <button type="submit" className="btn-style" name="connectez">
              connectez
            </button>
            <p>
              Vous n'avez pas de compte, pas de soucis{" "}
              <NavLink to="signup">inscrivez-vous</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignIn;
