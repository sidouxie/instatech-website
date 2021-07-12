import React, { useContext, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logout from "./Logout";
import { UidContext } from "./AppContext";
import { IoChevronDown } from "react-icons/io5";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  const history = useHistory();

  return (
    <header>
      <div className="menu-content">
        <div className="logo">
          <NavLink to="/">
            <h3>InstaTech</h3>
          </NavLink>
        </div>
        {uid ? (
          <>
            <div className="profil">
              <div className="pseudo-profil">
                <h4>{userData.pseudo}</h4>
              </div>
              <NavLink to="/profil">
                <div
                  className="icon-profil"
                  style={{ backgroundImage: `url(${userData.picture})` }}
                >
                  {/* <img src={userData.picture} alt="avatar-profil" /> */}
                </div>
              </NavLink>
              <div className="sub-menu" onClick={() => setIsMobile(!isMobile)}>
                <IoChevronDown color="#fff" size="1.5em" />
              </div>
              {isMobile && <Logout />}
            </div>
          </>
        ) : (
          <>
            <div className="login-btn">
              <button onClick={() => history.push("/signin")}>Login</button>
              <button onClick={() => history.push("/signup")}>inscrire</button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
