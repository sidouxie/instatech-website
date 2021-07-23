import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Logout() {
  const history = useHistory();

  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();

      localStorage.clear();
    });
  }, []);

  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/user/logout`,
      withCredentials: true,
    })
      .then(() => {
        localStorage.removeItem("_user");
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
