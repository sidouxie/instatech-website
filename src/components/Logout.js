import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      Cookies.remove("_GO");
    });
  }, []);

  /* const removeCookie = (key) => {
    Cookies.remove(key, { expires: 1 });
  }; */

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true,
    })
      .then((res) => {
        Cookies.remove("_GO", { path: "/", expires: 1 });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        return history.go("/signin");
      });
  };

  return (
    <div className="menu-mobile">
      <div className="lignes"></div>
      <span>Paramètres</span>
      <div className="lignes"></div>
      <span onClick={logout}>Déconnecter</span>
      <div className="lignes"></div>
    </div>
  );
}

export default Logout;
