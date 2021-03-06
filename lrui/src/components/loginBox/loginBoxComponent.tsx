import * as React from "react";
import "./loginBox.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

const LoginBoxComponent: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div className="loginOpts">
      <button className="registerBtn" onClick={() => history.push("register")}>
        Register
      </button>
      <button className="loginBtn" onClick={() => history.push("login")}>
        Login
      </button>
    </div>
  );
};

export default withRouter(LoginBoxComponent);
