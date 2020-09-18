import * as React from "react";
import "./loginBox.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

const LoginBoxComponent: React.FC<RouteComponentProps> = ({ history }) => {
  let loginDiv: JSX.Element;
  loginDiv = (
    <div className="loginOpts">
      <button className="registerBtn" onClick={() => history.push("register")}>
        Register
      </button>
      <button className="loginBtn">Login</button>
    </div>
  );
  return <>{loginDiv}</>;
};

export default withRouter(LoginBoxComponent);
