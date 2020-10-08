import React from "react";
import "./loggedIn.css";
import AuthContext from "src/hooks/useAuth";

const LoggedInComponent: React.FC<{}> = () => {
  // useEffect hook to get the users profile picture
  const { user } = React.useContext(AuthContext)!;
  console.log(user);
  return (
    <div className="accountBox">
      <div className="accountPic">
        <img
          src={
            user.avatar === "default.png" ? "/images/default.png" : user.avatar
          }
          alt="Avatar"
        />
      </div>

      <div className="details">
        <div className="uName">
          <p>{user.username}</p>
        </div>
        <div className="points">
          <img src="/images/updoot.png" alt="" />
          <div className="val">
            <p>4.0k</p>
          </div>
        </div>
      </div>
      <div className="dropDown">
        <img src="/images/down.png" alt="" />
      </div>
    </div>
  );
};

export default LoggedInComponent;
