import React from "react";
import "./CreateSub.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {}

const CreateSubComponent: React.FC<Props> = ({ history }) => {
  return (
    <div className="createBox">
      <div className="title sub">
        <h1>Create Your Own Sub</h1>
        <hr />
      </div>
      <div className="detail">
        <p>Create a Sub for people to join and post like similar content</p>
        <button onClick={() => history.push("/sub/create")}>Create Now</button>
      </div>
    </div>
  );
};

export default withRouter(CreateSubComponent);
