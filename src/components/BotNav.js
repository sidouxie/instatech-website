import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoHome, IoSearch, IoPerson } from "react-icons/io5";
import { UidContext } from "./AppContext";

function BotNav() {
  const uid = useContext(UidContext);
  return (
    <>
      {uid ? (
        <div className="bot-nav-container">
          <div className="icons">
            <NavLink to="/" exact activeClassName="active-bot">
              <IoHome fill="#4f259e" size="1.5em" />
            </NavLink>

            <NavLink to="/search" exact activeClassName="active-bot">
              <IoSearch fill="#4f259e" size="1.5em" />
            </NavLink>

            <NavLink to="/profil" exact activeClassName="active-bot">
              <IoPerson fill="#4f259e" size="1.5em" />
            </NavLink>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default BotNav;
