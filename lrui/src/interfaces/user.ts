export default interface User {
  username: string;
  password: string;
  email: string;
  phone?: string;
}

export interface AuthStat {
  id: string;
  isLoggedIn: boolean;
  username: string;
  pending: boolean;
  avatar: string;
}

export interface AuthProp {
  setToken: (user: AuthStat) => void;
  isLoggedIn: (user: AuthStat) => boolean;
}
