import React, { useRef } from "react";
import "./common.css";
import { useFormik } from "formik";
import { LinkPost, Link } from "src/interfaces";
import { CounterComponent } from "src/reusable";
import * as Yup from "yup";
import { TITLE_LEN } from "./consts";
import { autoResize } from "../utils";

export const LinkForm = () => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(TITLE_LEN)
        .required("A post title is required")
        .trim(),
      url: Yup.string().required("URL Required"),
    }),
    onSubmit: (values: Link) => {
      const textForm = new LinkPost(values.title, values.url);
      textForm.performUpload();
    },
  });

  return (
    <form className="uploadForm" onSubmit={formik.handleSubmit}>
      <div className="formGroup">
        <div className="counterForm">
          <textarea
            ref={titleRef}
            maxLength={TITLE_LEN}
            rows={1}
            placeholder="Title"
            name="title"
            onKeyDown={() => autoResize(titleRef.current)}
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
        <div className="counterForm">
          <textarea
            className="bodyText"
            rows={4}
            placeholder="URL"
            name="url"
            {...formik.getFieldProps("url")}
          />
        </div>
      </div>
      {formik.touched.url && formik.errors.url ? (
        <div className="error">
          <p>{formik.errors.url}</p>
        </div>
      ) : null}
      <div className="formGroup">
        <button>Cancel</button>
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Post
        </button>
      </div>
    </form>
  );
};
