import { Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthInp from "../../../ui/inputs/authInp/AuthInp";
import BlackBtn from "../../../ui/buttons/authButtons/BlackBtn";
import { validationForgot } from "../../../code/validation/validation";
import { sendOtp } from "../../../api/Auth";

import styles from "./ForgotPassForm.module.css";

const ForgotPassForm = () => {

  const [emailChan, setEmailChan] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validateOnBlur
      validationSchema={validationForgot}
      onSubmit={(values) => {
        localStorage.setItem("email", values.email)
        sendOtp(values)
          .then((res) => {
            if (res) {
              navigate("/otp")
            }
          })
          .catch((error) => {
            if (error.response.status === 500) {
              setError("Такого зарегистрированного email нет");
            }
          });
      }}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isValid,
        dirty,
        touched,
      }) => (
        <div className={styles.mainDiv}>
          <AuthInp
            error={touched.email && errors.email}
            type={"text"}
            values={values.email}
            placeholder={"Your email"}
            name={"email"}
            handBlur={handleBlur}
            handChan={handleChange}
            change={emailChan}
          />

          {error ? (
            <p className={styles.errorText}>{error}</p>
          ) : (
            touched &&
            Object.keys(errors).length > 0 && (
              <p className={styles.errorText}>not correct</p>
            )
          )}

          <BlackBtn
            onClick={handleSubmit}
            dis={!isValid || !dirty || Object.keys(errors).length > 0}
          >
            Continue
          </BlackBtn>
          {values.email.length > 0 ? setEmailChan(true) : setEmailChan(false)}
        </div>
      )}
    </Formik>
  );
};

export default ForgotPassForm;
