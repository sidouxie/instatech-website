import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { UidContext } from "../components/AppContext";
import Thread from "../components/Thread";

function Home() {
  const uid = useContext(UidContext);
  return (
    <div>
      {uid ? (
        <Thread />
      ) : (
        <div className="main-home">
          <div className="head-cover">
            <img
              src="./uploads/cover/bg_home.jpg"
              alt="cover street art background"
            />
          </div>

          <div className="container">
            <div className="sec-left">
              <h1>Le réseau sociale le plus aimée de ca génération.</h1>
              <h5>il est facile et rapide</h5>
              <NavLink to="/signin" className="btn-style">
                se connecter
              </NavLink>
              <p>
                Vous n'avez pas de compte ?{" "}
                <NavLink to="/signup">Inscritvez-vous</NavLink>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
