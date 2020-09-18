import React from "react";
import AuthContext, { useAuthState } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarComponent from "./components/navBar/navBarComponent";
import { RegisterComponent } from "./components/register/registerComponent";
import { AccountSettingComp } from "./components/accountSettings/accountSettingComp";

interface Props {
  children?: JSX.Element[];
}

const AuthProvider: React.FC<Props> = () => {
  const state = useAuthState();
  return (
    <AuthContext.Provider value={state}>
      <Router>
        <NavBarComponent />
        <Switch>
          <Route path="/" exact render={() => <h1>Hllo</h1>} />
          <Route path="/register" component={RegisterComponent} />
          <Route path="/account" component={AccountSettingComp} />
          <Route path="/" render={() => <h1>404 not found</h1>} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
