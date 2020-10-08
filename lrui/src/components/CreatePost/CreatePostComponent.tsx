import React from "react";
import "./CreatePost.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {}

const CreatePostComponent: React.FC<Props> = ({ history }) => {
  return (
    <div className="createBox">
      <div className="topBack">
      </div>
      <div className="title sub">
        <h1>Upload Your Own Post.</h1>
        <hr />
      </div>
      <div className="detail">
        <p>
          Share Posts that you like. Maybe Someone outthere might appreciate it
          and people might updoot.
        </p>
        <button onClick={() => history.push("/u/post")}>Create Now</button>
      </div>
    </div>
  );
};

export default withRouter(CreatePostComponent);
