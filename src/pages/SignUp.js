import React, { useState } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import axios from "axios";

function SignUp({ uid }) {
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPass, setIsErrorPass] = useState(false);
  const [isErrorPseudo, setIsErrorPseudo] = useState(false);

  const history = useHistory();

  const handleRegister = async (e) => {
    const terms = document.querySelector("#terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfError = document.querySelector(".password-conf.error");
    const termsError = document.querySelector(".terms.error");
    e.preventDefault();

    termsError.innerHTML = null;
    passwordConfError.innerHTML = null;

    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfError.innerHTML = "les mots de passes ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/user/register`,
        withCredentials: true,
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res.data);

          if (res.data.errors) {
            if (res.data.errors.email) {
              emailError.innerHTML = res.data.errors.email;
              setIsErrorEmail(true);
            } else {
              setIsErrorEmail(false);
              emailError.innerHTML = null;
            }

            if (res.data.errors.pseudo) {
              pseudoError.innerHTML = res.data.errors.pseudo;
              setIsErrorPseudo(true);
            } else {
              setIsErrorPseudo(false);
              pseudoError.innerHTML = null;
            }

            if (res.data.errors.password) {
              passwordError.innerHTML = res.data.errors.password;
              setIsErrorPass(true);
            } else {
              setIsErrorPass(false);
              passwordError.innerHTML = null;
            }
          } else {
            history.go("/signin");
            console.log("user created succesfully");
          }
        })

        .catch((err) => console.log(err));
    }
  };

  if (uid) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="main-form">
        <div className="container">
          <h1>Inscription</h1>
          <h3>Créer un compte pour faire des rencontres</h3>

          <form action="" onSubmit={handleRegister}>
            <label htmlFor="pseudo" />
            Pseudo *
            <input
              type="pseudo"
              name="pseudo"
              id="pseudo"
              value={pseudo}
              className={`${isErrorPseudo ? "active" : ""}`}
              onChange={(e) => setPseudo(e.target.value)}
            />
            <div className="pseudo error"></div>
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
            <label htmlFor="password" />
            confirmer le mot de passe *
            <input
              type="password"
              name="password"
              id="password-conf"
              value={controlPassword}
              className={`${isErrorPass ? "active" : ""}`}
              onChange={(e) => setControlPassword(e.target.value)}
            />
            <div className="password-conf error"></div>
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                {"  "} J'accepte les{" "}
                <a
                  target="_blank"
                  rel="noopner noreferrer"
                  href="http://localhost:3000/"
                >
                  conditions générales.
                </a>{" "}
              </label>
            </div>
            <div className="terms error"></div>
            <input type="submit" className="btn-style" name="submit" />
            <p>
              Vous avez déjà un compte, pas de soucis{" "}
              <NavLink to="signin">connectez-vous</NavLink>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
