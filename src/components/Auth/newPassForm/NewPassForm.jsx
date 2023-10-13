import { useState } from "react";
import { Formik } from "formik";

import AuthInp from "../../../ui/inputs/authInp/AuthInp";
import BlackBtn from "../../../ui/buttons/authButtons/BlackBtn";
import { validationNewPass } from "../../../code/validation/validation";
import { updatePass } from "../../../api/Auth";
import { useNavigate } from "react-router-dom";

import styles from "./NewPassForm.module.css";

const NewPassForm = ({setActive}) => {
  const [passChan, setPassChan] = useState(false);
  const [confirmChan, setConfirmChan] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPass: "",
      }}
      validateOnBlur
      validationSchema={validationNewPass}
      onSubmit={(values) => {
        updatePass({
          email: localStorage.getItem("email"),
          otp: parseInt(localStorage.getItem("otp")),
          password: values.password,
          password2: values.confirmPass,
        })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setActive(true)
            }
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              setError(error.response.data.detail);
            }
          });
      }}
    >
      {({
        values,
        errors,
        isValid,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        dirty,
      }) => (
        <div className={styles.passMainDiv}>
          <div className={styles.passInpDiv}>
            <AuthInp
              error={touched.password && errors.password}
              type={"password"}
              values={values.password}
              name={"password"}
              handBlur={handleBlur}
              handChan={handleChange}
              placeholder={"Password"}
              change={passChan}
            />
            <AuthInp
              error={touched.confirmPass && errors.confirmPass}
              type={"password"}
              values={values.confirmPass}
              name={"confirmPass"}
              handBlur={handleBlur}
              handChan={handleChange}
              placeholder={"Confirm password"}
              change={confirmChan}
            />
          </div>
          {error ? (
            <p className={styles.errorText}>{error}</p>
          ) : (
            Object.keys(errors).length > 0 &&
            touched && <p className={styles.errorText}>not correct</p>
          )}
          <BlackBtn
            onClick={handleSubmit}
            dis={!isValid || !dirty || Object.keys(errors).length > 0}
          >
            Continue
          </BlackBtn>
          {values.password.length > 0 ? setPassChan(true) : setPassChan(false)}
          {values.confirmPass.length > 0
            ? setConfirmChan(true)
            : setConfirmChan(false)}
        </div>
      )}
    </Formik>
  );
};

export default NewPassForm;
