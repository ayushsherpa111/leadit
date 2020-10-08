import { sign, verify } from "jsonwebtoken";
import { AuthStat } from "src/interfaces";

type user = {
  email: string;
  password: string;
};

function authService() {
  const login: (user: user) => Promise<Response> = (user) => {
    return fetch("/api/v1/login/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(user),
    });
  };

  const setStorage: (key: string, value: string) => void = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getStorage: (key: string) => string | null = (key) =>
    localStorage.getItem(key);
  const setToken = (data: AuthStat) => {
    sign(
      data,
      "secret",
      {
        expiresIn: "2d",
      },
      (err, encoded) => {
        if (err == null) {
          console.log(encoded);
          setStorage("currentUser", encoded!);
        }
      }
    );
  };

  const clearStorage: (key: string) => void = (key) => {
    localStorage.removeItem(key);
  };

  const getLoginStatus: () => AuthStat | null = () => {
    const storedData = getStorage("currentUser");
    console.log(storedData);
    try {
      return verify(storedData ?? "", "secret") as AuthStat;
    } catch {
      return null;
    }
  };

  const isLoggedIn: (user: AuthStat) => boolean = (user) => {
    // upon refreshing the user object will be undefined
    if (user.isLoggedIn) {
      return true;
    }
    clearStorage("currentUser");
    return false;
  };

  return {
    login,
    isLoggedIn,
    setToken,
    getLoginStatus,
  };
}

export default authService;
