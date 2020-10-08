import React, { useState } from "react";
import "./uploadPost.css";
import { TextForm, MediaForm, LinkForm } from "src/forms";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props extends RouteComponentProps {}

const UploadPostComponent: React.FC<Props> = ({ history }) => {
  const [uploadForm, setUploadForm] = useState<string>("text");

  const navTo = (path: string) => {
    history.push(path);
  };

  return (
    <div className="uploadBack">
      <div className="formContent">
        <div className="title">
          <h1>Share your post</h1>
        </div>
        <div className="postForm">
          <div className="tabs">
            <div className="tab selected" onClick={() => setUploadForm("text")}>
              <img src="/images/textPost.png" alt="post" />
              <p>Text Post</p>
            </div>
            <div className="tab" onClick={() => setUploadForm("media")}>
              <img src="/images/mediaPost.png" alt="post" />
              <p>Media Post</p>
            </div>
            <div className="tab" onClick={() => setUploadForm("link")}>
              <img
                style={{ transform: "rotate(-45deg)" }}
                src="/images/linkPost.png"
                alt="post"
              />
              <p>Link Post</p>
            </div>
          </div>
          {uploadForm === "text" ? (
            <TextForm navTo={navTo} />
          ) : uploadForm === "media" ? (
            <MediaForm navTo={navTo} />
          ) : (
            <LinkForm />
          )}
        </div>
      </div>
      <div className="bottomBanner"></div>
    </div>
  );
};

export default withRouter(UploadPostComponent);
