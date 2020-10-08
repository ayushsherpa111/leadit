import React from "react";
import { MediaPost } from "src/interfaces";
import { useFormik } from "formik";
import { CounterComponent } from "src/reusable";
import "./common.css";
import "./Media.css";
import { TITLE_LEN } from "./consts";
import * as Yup from "yup";

interface Props {
  navTo: (path: string) => void;
}
export const MediaForm: React.FC<Props> = ({ navTo }) => {
  const titleRef = React.useRef<HTMLTextAreaElement>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      file: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().max(TITLE_LEN).required("Title is required"),
    }),
    onSubmit: (vals: { title: string; file: string }, action) => {
      if (fileRef.current?.files?.length) {
        const newPost = new MediaPost(vals.title, fileRef.current.files);
        newPost.performUpload();
        action.resetForm();
        navTo("/");
      } else {
        action.setFieldError("file", "Post required");
      }
    },
  });

  const uploadedImage = () => {
    console.log("uploaded");
    console.log(fileRef.current?.value);
    console.log(fileRef.current?.files);
  };

  return (
    <form
      className="uploadForm"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <div className="formGroup">
        <div className="counterForm">
          <textarea
            maxLength={TITLE_LEN}
            ref={titleRef}
            rows={1}
            placeholder="Title"
            name="title"
            {...formik.getFieldProps("title")}
          />
          <CounterComponent max={300} data={titleRef.current?.value ?? ""} />
        </div>
      </div>
      {formik.touched.title && formik.errors.title ? (
        <div className="error">
          <p>{formik.errors.title}</p>
        </div>
      ) : null}
      <div className="formGroup">
        <div className="uploadArea">
          <p>Drag and drop post or </p>
          <input
            ref={fileRef}
            name="file"
            onChange={uploadedImage}
            multiple
            accept="image/png,image/gif,image/jpeg,video/mp4,video/quicktime"
            type="file"
          />
          <button type="button" onClick={() => fileRef.current?.click()}>
            UPLOAD
          </button>
        </div>
      </div>
      {formik.errors.file ? (
        <div className="error">
          <p>{formik.errors.file}</p>
        </div>
      ) : null}
      <div className="formGroup">
        <button>Cancel</button>
        <button type="submit">Post</button>
      </div>
    </form>
  );
};
