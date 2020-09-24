import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import AuthContext from "src/hooks/useAuth";
import * as Yup from "yup";
import "./login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AuthStat } from "src/interfaces/user";
import { useQuery } from "../../hooks/useAuth";

interface Props extends RouteComponentProps {
  login: (u: { email: string; password: string }) => Promise<Response>;
  setToken: (id: string) => void;
  isLoggedIn: (user: AuthStat) => boolean;
}

const LoginComponent: React.FC<Props> = ({
  login,
  setToken,
  isLoggedIn,
  history,
  location,
}) => {
  const query = useQuery(location.search);
  console.log(query.get("bruh"));
  const initialValues: { email: string; password: string } = {
    email: "",
    password: "",
  };
  const { user, setUser } = React.useContext(AuthContext)!;
  if (isLoggedIn(user)) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bod">
      <div
        className="banner"
        style={{ backgroundImage: "url('images/bkg.jpg')" }}
      ></div>
      <div className="registerForm lgn">
        <div className="title">
          <h1>Login</h1>
          <div className="subtitle">
            <p>Welcome Back!!</p>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("This an invalid email.")
              .required("Gonna need an email."),
            password: Yup.string().required("Youre missing your password"),
          })}
          onSubmit={async (
            values: { email: string; password: string },
            action
          ) => {
            action.setSubmitting(true);
            setUser({ ...user, pending: true });
            try {
              const resp = await login(values);
              const data: { msg: string; id: string } = await resp.json();
              console.log(data);
              if (resp.status === 200) {
                setToken(data.id);
                setUser(() => ({
                  isLoggedIn: true,
                  pending: false,
                }));
                const nextRoute = query.get("next") ?? "";
                history.push("/" + nextRoute);
              }
              action.resetForm();
            } catch (e) {
              console.log(e);
            } finally {
              action.setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="forms">
                <div className="formGrp">
                  <label htmlFor="email">Your Email</label>
                  <Field
                    placeholder="Your Email here"
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
                    placeholder="Your Password here"
                    name="password"
                    type="password"
                  />
                  <div className="error">
                    <ErrorMessage name="password" />
                  </div>
                </div>
                <button
                  disabled={isSubmitting}
                  className="registerBtn frm"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <p>{JSON.stringify(user)}</p>
      </div>
    </div>
  );
};

/* export default withRouter(LoginComponent); */
export default LoginComponent;
