import { sign, verify } from "jsonwebtoken";
import { AuthStat } from "src/interfaces/user";

type user = {
  email: string;
  password: string;
};

function authService() {
  const login: (user: user) => Promise<Response> = (user: user) => {
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

  const getStorage: (key: string) => string | null = (key: string) =>
    localStorage.getItem(key);
  const setToken = (id: string) => {
    sign(
      { currentUser: id },
      "secret",
      {
        expiresIn: "1d",
      },
      (err, encoded) => {
        if (err == null) {
          console.log(encoded);
          setStorage("currentUser", encoded!);
        }
      }
    );
  };

  const isLoggedIn: (user: AuthStat) => boolean = (user) => {
    const data: string | null = getStorage("currentUser");
    if (data === null) {
      return false;
    }
    if (user.isLoggedIn) {
      return true;
    }
    console.log(verify(data, "secret"));
    return !!verify(data, "secret");
  };

  return {
    login,
    isLoggedIn,
    setToken,
  };
}

export default authService;
