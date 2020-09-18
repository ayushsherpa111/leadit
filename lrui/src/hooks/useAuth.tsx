import * as React from "react";
import { AuthStat } from "src/interfaces/user";

const defaultLoginState: AuthStat = {
  user: null,
  isLoggedIn: false,
  pending: true,
};

const authContext = React.createContext<AuthStat>(defaultLoginState);

type authState = () => AuthStat;

export const useAuthState: authState = (): AuthStat => {
  const state = React.useContext(authContext);

  return state;
};

export default authContext;
