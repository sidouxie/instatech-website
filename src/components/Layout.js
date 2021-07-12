import React from "react";
import BotNav from "./BotNav";
import Navbar from "./Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      {props.children}
      <BotNav />
      <div>Footer</div>
    </>
  );
}

export default Layout;
