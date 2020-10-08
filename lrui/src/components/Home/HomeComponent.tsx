import React from "react";
import "./Home.css";
import CreatePostComponent from "src/components/CreatePost/CreatePostComponent";
/* import AuthContext from "src/hooks/useAuth"; */

const HomeComponent: React.FC<{}> = () => {
  /* const { user, setUser } = React.useContext(AuthContext)!; */
  return (
    <div className="mainContent">
      <div className="topPosts">
        <h1>TOP POSTS</h1>
      </div>
      <div className="options">
        <CreatePostComponent />
      </div>
    </div>
  );
};

export default HomeComponent;
