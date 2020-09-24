import * as React from "react";
import "./navBar.css";
import LoginBoxComponent from "../loginBox/loginBoxComponent";
import AuthContext from "src/hooks/useAuth";
import { RouteComponentProps, withRouter } from "react-router-dom";

const NavBarComponent: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = React.useContext(AuthContext)!;
  console.log(user);
  return (
    <div className="topNav">
      <div className="intro" onClick={() => history.push("/")}>
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

export default withRouter(NavBarComponent);
