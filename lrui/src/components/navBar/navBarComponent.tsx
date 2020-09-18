import * as React from "react";
import "./navBar.css";
import LoginBoxComponent from "../loginBox/loginBoxComponent";
import { useAuthState } from "src/hooks/useAuth";

const NavBarComponent: React.FC = () => {
  const usr = useAuthState();
  console.log(usr);
  return (
    <div className="topNav">
      <div className="intro">
        <div className="logo">
          <img src="images/logo.png" alt="" />
        </div>
        <div className="title">
          <h1>leadit</h1>
        </div>
      </div>
      <div className="stat">
        <LoginBoxComponent />
      </div>
    </div>
  );
};

export default NavBarComponent;
