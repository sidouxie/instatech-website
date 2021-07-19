import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import cookie from "js-cookie";

function Logout() {
  const history = useHistory();

  const removeCookie = (key) => {
    cookie.remove(key, { expires: 1 });
  };

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true,
    })
      .then(() => {
        removeCookie("jwt");
        removeCookie("_GO");
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
