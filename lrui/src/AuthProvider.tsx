import React from "react";
import AuthContext, { defaultLoginState } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarComponent from "./components/navBar/navBarComponent";
import { RegisterComponent } from "./components/register/registerComponent";
import { AccountSettingComp } from "./components/accountSettings/accountSettingComp";
import HomeComponent from "./components/Home/HomeComponent";
import ProtectedRoute from "./ProtectedRoute";
import LoginComponent from "./components/loginPage/loginComponent";
import authService from "./utils/authHandler";
import SubFormComponent from "./components/SubForm/SubFormComponent";

interface Props {
  children?: JSX.Element[];
}

const AuthProvider: React.FC<Props> = () => {
  const [user, setUser] = React.useState(defaultLoginState);
  const { login, setToken, isLoggedIn } = authService();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBarComponent />
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <ProtectedRoute
            path="/account"
            Component={AccountSettingComp}
            auth={user}
          />
          <Route
            path="/register"
            render={(props) => (
              <RegisterComponent isLoggedIn={isLoggedIn} {...props} />
            )}
          />
          <Route
            path="/login"
            render={(props) => (
              <LoginComponent
                login={login}
                isLoggedIn={isLoggedIn}
                setToken={setToken}
                {...props}
              />
            )}
          />
          <ProtectedRoute
            path="/sub/create"
            auth={user}
            Component={SubFormComponent}
          />
          <Route path="/" render={() => <h1>404 not found</h1>} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
