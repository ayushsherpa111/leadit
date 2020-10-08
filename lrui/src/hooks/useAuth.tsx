import * as React from "react";
import { AuthStat } from "src/interfaces";
import authService from "src/utils/authHandler";

interface authState {
  user: AuthStat;
  setUser: React.Dispatch<React.SetStateAction<AuthStat>>;
}

const { getLoginStatus } = authService();

export const defaultLoginState: AuthStat = getLoginStatus() ?? {
  id: "",
  isLoggedIn: false,
  pending: false,
  username: "",
  avatar: "default.png",
};
const AuthContext = React.createContext<authState | undefined>(undefined);
export default AuthContext;

export function useQuery(search: string) {
  return new URLSearchParams(search);
}
