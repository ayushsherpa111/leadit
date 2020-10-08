import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthStat } from "./interfaces/user";

interface Iprops {
  auth: AuthStat;
  path: string;
}

const ProtectedRoute: React.FC<Iprops> = ({
  children,
  auth,
  path,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={() =>
        !auth.pending && auth.isLoggedIn ? (
          <>{children}</>
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
