import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthInp from "../../../ui/inputs/authInp/AuthInp";
import BlackBtn from "../../../ui/buttons/authButtons/BlackBtn";
import AuthModal from "../../../ui/modal/authModal/AuthModal";
import { validationLogin } from "../../../code/validation/validation";
import { setUser } from "../../../store/userSlice";
import { login } from "../../../api/Auth";


import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailChan, setEmailChan] = useState(false);
  const [passChan, setPassChan] = useState(false);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        login(values)
          .then((res) => {
            if (res) {
              localStorage.setItem("access", res.access);
              localStorage.setItem("refresh", res.refresh);

              navigate("/profile");
            }
          })
          .catch((error) => {
            console.log(error)
          });
      }}
      validationSchema={validationLogin}
      validateOnChange={false}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        touched,
        dirty,
      }) => (
        <form onSubmit={handleSubmit} className={styles.loginDiv}>
          <AuthInp
            type={"text"}
            placeholder={"Your email"}
            name="email"
            values={values.email}
            handBlur={handleBlur}
            handChan={handleChange}
            change={emailChan}
          />
          <AuthInp
            type={"password"}
            placeholder={"Password"}
            name="password"
            values={values.password}
            handBlur={handleBlur}
            handChan={handleChange}
            change={passChan}
          />
          <div className={styles.linkDiv}>
            <Link className={styles.link} to="/forgot">
              Forgot password ?
            </Link>
          </div>
          <BlackBtn
            onClick={(e) => {
              e.preventDefault();
              if (!isValid && !emailErr && errors.email) {
                setEmailErr(true);
              } else if (!isValid && !passwordErr && errors.password) {
                setPasswordErr(true);
              } else {
                handleSubmit();
              }
            }}
          >
            Log in
          </BlackBtn>
          {values.email.length > 0 ? setEmailChan(true) : setEmailChan(false)}
          {values.password.length > 0 ? setPassChan(true) : setPassChan(false)}
          <AuthModal active={emailErr}>
            <div className={styles.emailModal}>
              <p className={styles.ModalText}>Incorrect Username</p>
              <p className={styles.ModalDesc}>
                The username you entered doesn’t appear to belong to an account.
                Please check your username and try again.
              </p>
              <button
                type="reset"
                className={styles.emailModalClose}
                onClick={() => {
                  setEmailErr(false);
                }}
              >
                Try Again
              </button>
            </div>
          </AuthModal>
          <AuthModal active={passwordErr}>
            <div className={styles.passModal}>
              <p className={styles.ModalText}>Forgotten Password</p>
              <p className={styles.ModalDesc}>
                We can send you an email to help you get back into your account.
              </p>
              <div style={{ width: "100%" }}>
                <Link className={styles.passModalLink} to={"/forgot"}>
                  Send
                </Link>
                <button
                  className={styles.emailModalClose}
                  onClick={() => {
                    setPasswordErr(false);
                  }}
                >
                  Try Again
                </button>
              </div>
            </div>
          </AuthModal>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
