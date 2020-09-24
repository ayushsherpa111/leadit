import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStat } from "./interfaces/user";

interface Iprops {
  Component: React.FC;
  auth: AuthStat;
  path: string;
}

const ProtectedRoute: React.FC<Iprops> = ({ Component, auth, path }) => {
  return (
    <Route
      path={path}
      render={() =>
        !auth.pending && auth.isLoggedIn ? (
          <Component />
        ) : auth.pending ? (
          <h1 style={{ color: "white", fontSize: "150px" }}>Loading....</h1>
        ) : (
          <Redirect to={"/login?next=" + path.slice(1)} />
        )
      }
    />
  );
};

export default ProtectedRoute;
