import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import { UidContext } from "../components/AppContext";
import Profil from "../pages/Profil";
import PersonProfil from "../pages/PersonProfil";
import Search from "../pages/Search";

function Linked() {
  const uid = useContext(UidContext);
  return (
    <>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={() => <SignIn uid={uid} />} />
        <Route path="/signup" component={() => <SignUp uid={uid} />} />
        <Route path="/profil" component={() => <Profil uid={uid} />} />
        <Route path="/search" component={() => <Search uid={uid} />} />
        <Route path="/user/:id" component={() => <PersonProfil uid={uid} />} />
      </Switch>
    </>
  );
}

export default Linked;
