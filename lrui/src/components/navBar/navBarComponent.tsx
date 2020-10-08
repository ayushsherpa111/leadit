import * as React from "react";
import "./navBar.css";
import LoginBoxComponent from "../loginBox/loginBoxComponent";
import AuthContext from "src/hooks/useAuth";
import { AuthStat } from "src/interfaces/user";
import LoggedInComponent from "src/components/loggedIn/loggedInComponent";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {
  isLoggedIn: (user: AuthStat) => boolean;
}

const NavBarComponent: React.FC<Props> = ({ history, isLoggedIn }) => {
  const { user } = React.useContext(AuthContext)!;
  return (
    <div className="topNav">
      <div className="intro" onClick={() => history.push("/")}>
        <div className="logo">
          <img src="/images/logo.png" alt="" />
        </div>
        <div className="title">
          <h1>leadit</h1>
        </div>
      </div>
      <div className="stat">
        {!isLoggedIn(user) ? <LoginBoxComponent /> : <LoggedInComponent />}
      </div>
    </div>
  );
};

export default withRouter(NavBarComponent);
