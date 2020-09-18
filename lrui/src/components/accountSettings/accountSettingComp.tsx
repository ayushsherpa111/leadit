import * as React from "react";
import { useAuthState } from "src/hooks/useAuth";
import { Redirect } from "react-router-dom";
interface Props {}

export const AccountSettingComp: React.FC<Props> = () => {
  const usr = useAuthState();
  const authContent: JSX.Element = React.useMemo(() => {
    if (!usr.isLoggedIn) return <Redirect to="/register" />;
    else return <h1>My Account Settings</h1>;
  }, [usr]);
  return <div>{authContent}</div>;
};
