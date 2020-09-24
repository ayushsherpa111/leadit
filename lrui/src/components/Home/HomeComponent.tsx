import React from "react";
import CreateSubComponent from "../CreateSub/CreateSubComponent";
import "./Home.css";
/* import AuthContext from "src/hooks/useAuth"; */

const HomeComponent: React.FC<{}> = () => {
  /* const { user, setUser } = React.useContext(AuthContext)!; */
  return (
    <div className="mainContent">
      <div className="topPosts">
        <h1>TOP POSTS</h1>
      </div>
      <div className="options">
        <CreateSubComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
