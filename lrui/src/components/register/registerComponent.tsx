import * as React from "react";
import "./register.css";
import { Formik, Form, ErrorMessage, Field } from "formik";
import User, { AuthStat, AuthProp } from "src/interfaces/user";
import * as Yup from "yup";
import { RouteComponentProps, Redirect } from "react-router-dom";
import AuthContext from "src/hooks/useAuth";
interface Props extends RouteComponentProps, AuthProp {}

interface Register extends User {
  confirm: string;
}

const RegisterComponent: React.FC<Props> = ({
  isLoggedIn,
  history,
  setToken,
}) => {
  const { user, setUser } = React.useContext(AuthContext)!;
  const initalValues: Register = {
    username: "",
    password: "",
    email: "",
    confirm: "",
  };
  if (isLoggedIn(user)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bod">
      <div
        className="banner"
        style={{ backgroundImage: "url('images/bkg.jpg')" }}
      ></div>
      <div className="registerForm">
        <div className="title">
          <h1>Sign Up</h1>
          <div className="subtitle">
            <p>By Signing up you are agreeing to our terms and condition.</p>
          </div>
        </div>
        <Formik
          initialValues={initalValues}
          validationSchema={Yup.object({
            username: Yup.string()
              .trim()
              .min(5, "Username should be atleast 5 characters")
              .max(64, "Max length for username is 64 characters")
              .required("Username Required"),
            password: Yup.string()
              .min(8, "Password too short use atleast 8 characters")
              .max(
                64,
                "Woah! calm down I dont think you can remember a password that long"
              )
              .required("Where on earth is your password"),
            email: Yup.string()
              .required("Gonna need an Email buddy")
              .email("Deadass this isnt even an email"),
            confirm: Yup.string()
              .required("Field Missing")
              .equals([Yup.ref("password")], "Passwords dont match"),
          })}
          onSubmit={async (values: Register, action) => {
            try {
              setUser((v: AuthStat) => ({
                ...v,
                isLoggedIn: false,
                pending: true,
              }));
              action.setSubmitting(true);
              delete values.confirm;
              const resp = await fetch("/api/v1/login/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(values),
              });
              const data: AuthStat = await resp.json();
              console.log(data);
              if (resp.status === 200) {
                console.log("Registered");
                history.push("/");
                setToken({
                  ...data,
                  isLoggedIn: true,
                  pending: false,
                });
                setUser(() => ({
                  ...data,
                  isLoggedIn: true,
                  pending: false,
                }));
                action.resetForm();
              } else {
                setUser((user: AuthStat) => ({
                  ...user,
                  isLoggedIn: false,
                  pending: false,
                }));
                console.log(resp);
                action.setFieldError("email", "Email Is Taken");
                action.setFieldError("username", "Username is also taken");
                action.setFieldValue("password", "");
                action.setFieldValue("confirm", "");
              }
            } catch (err) {
              console.log(err);
              action.resetForm();
            } finally {
              action.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="forms">
                <div className="formGrp">
                  <label htmlFor="username">Your Username</label>
                  <Field
                    placeholder="Your username will be your alias online"
                    name="username"
                    type="text"
                  />
                  <div className="error">
                    <ErrorMessage name="username" />
                  </div>
                </div>
                <div className="formGrp">
                  <label htmlFor="email">Your E-mail address</label>
                  <Field
                    placeholder="A valid Email address please."
                    name="email"
                    type="text"
                  />
                  <div className="error">
                    <ErrorMessage name="email" />
                  </div>
                </div>
                <div className="formGrp">
                  <label htmlFor="password">Your Password</label>
                  <Field
                    placeholder="A strong password."
                    name="password"
                    type="password"
                  />
                  <div className="error">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <div className="formGrp">
                  <label htmlFor="password">Confirm Password</label>
                  <Field
                    placeholder="Confirm Password"
                    name="confirm"
                    type="password"
                  />
                  <div className="error">
                    <ErrorMessage name="confirm" />
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  className="registerBtn frm"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterComponent;
