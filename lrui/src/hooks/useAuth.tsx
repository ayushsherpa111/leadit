import * as React from "react";
import { AuthStat } from "src/interfaces/user";

interface authState {
  user: AuthStat;
  setUser: React.Dispatch<React.SetStateAction<AuthStat>>;
}

export const defaultLoginState: AuthStat = {
  userID: "",
  isLoggedIn: false,
  pending: true,
};

const AuthContext = React.createContext<authState | undefined>(undefined);
export default AuthContext;
