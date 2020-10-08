import React, { Suspense } from "react";
import AuthContext, { defaultLoginState } from "./hooks/useAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarComponent from "./components/navBar/navBarComponent";
import { AccountSettingComp } from "./components/accountSettings/accountSettingComp";
import HomeComponent from "./components/Home/HomeComponent";
import ProtectedRoute from "./ProtectedRoute";
import LoginComponent from "./components/loginPage/loginComponent";
import authService from "./utils/authHandler";
import UploadPostComponent from "./components/uploadPost/uploadPostComponent";

interface Props {
  children?: JSX.Element[];
}

const RegisterLazy = React.lazy(
  () => import("./components/register/registerComponent")
);

const AuthProvider: React.FC<Props> = () => {
  const [user, setUser] = React.useState(defaultLoginState);
  const { login, setToken, isLoggedIn } = authService();
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <NavBarComponent isLoggedIn={isLoggedIn} />
        <Switch>
          <Route path="/" exact component={HomeComponent} />
          <ProtectedRoute path="/account" auth={user}>
            <AccountSettingComp />
          </ProtectedRoute>
          <Route
            path="/register"
            render={(props) => (
              <Suspense fallback={<div>Loading...</div>}>
                <RegisterLazy
                  setToken={setToken}
                  isLoggedIn={isLoggedIn}
                  {...props}
                />
              </Suspense>
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
          <ProtectedRoute path="/u/post" auth={user}>
            <UploadPostComponent />
          </ProtectedRoute>
          <Route path="/" render={() => <h1>404 not found</h1>} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
