import React, { useRef } from "react";
import "./common.css";
import { useFormik } from "formik";
import { TextPost, Text } from "src/interfaces";
import { CounterComponent } from "src/reusable";
import * as Yup from "yup";
import { TITLE_LEN, BODY_LEN } from "./consts";
import { autoResize } from "../utils";

interface Props {
  navTo: (path: string) => void;
}

export const TextForm: React.FC<Props> = ({ navTo }) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const BodyRef = useRef<HTMLTextAreaElement>(null);
  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(TITLE_LEN)
        .required("A post title is required")
        .trim(),
      body: Yup.string().max(BODY_LEN).optional().trim(),
    }),
    onSubmit: async (values: Text, action) => {
      try {
        console.log(values);
        const textForm = new TextPost(
          values.title,
          values.body!.length > 0 ? values.body : undefined
        );
        console.log(textForm);
        const data = await textForm.performUpload();
        console.log(data);
        action.resetForm();
        navTo("/");
      } catch {
      } finally {
        action.setSubmitting(false);
      }
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
            ref={BodyRef}
            className="bodyText"
            maxLength={BODY_LEN}
            rows={10}
            placeholder="Body (Optional)"
            name="body"
            {...formik.getFieldProps("body")}
          />
          <CounterComponent max={1000} data={BodyRef.current?.value ?? ""} />
        </div>
      </div>
      <div className="formGroup">
        <button>Cancel</button>
        <button type="submit" disabled={!formik.isValid || formik.isSubmitting}>
          Post
        </button>
      </div>
    </form>
  );
};
