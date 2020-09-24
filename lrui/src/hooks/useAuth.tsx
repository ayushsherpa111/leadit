import * as React from "react";
import { AuthStat } from "src/interfaces/user";
import authService from "src/utils/authHandler";
interface authState {
  user: AuthStat;
  setUser: React.Dispatch<React.SetStateAction<AuthStat>>;
}
const { isLoggedIn } = authService();
const checkStorageForLogin: () => AuthStat = () => {
  const state: AuthStat | null = {
    isLoggedIn: isLoggedIn({ isLoggedIn: false, pending: false }),
    pending: false,
  };
  return state ?? { isLoggedIn: false, pending: false };
};

export const defaultLoginState: AuthStat = checkStorageForLogin();
const AuthContext = React.createContext<authState | undefined>(undefined);
export default AuthContext;

export function useQuery(search: string) {
  return new URLSearchParams(search);
}
