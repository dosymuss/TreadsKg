import { Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AuthInp from "../../../ui/inputs/authInp/AuthInp";
import BlackBtn from "../../../ui/buttons/authButtons/BlackBtn";
import { validationCreate } from "../../../code/validation/validation";
import { setUser } from "../../../store/userSlice";
import { register } from "../../../api/Auth";

import styles from "./CreateForm.module.css";

const CreateForm = () => {
  const [emailChan, setEmailChan] = useState(false);
  const [nameChan, setNameChan] = useState(false);
  const [passChan, setPassChan] = useState(false);
  const [confirmChan, setConfirmChan] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();



  return (
    <Formik
      initialValues={{
        email: "",
        name: "",
        password: "",
        confirmPass: "",
      }}
      validateOnBlur
      validationSchema={validationCreate}
      onSubmit={(values) => {
        dispatch(setUser({ values }));

        register(values)
          .then((res) => {
            if (res) {
              localStorage.setItem("username", res.username);
              localStorage.setItem("access", res.access);
              localStorage.setItem("refresh", res.refresh);

              navigate("/confirmemail");
            }
          })
          .catch((error) => {
            if (error) {
              if (error.response.data.username) {
                setError(error.response.data.username[0]);
              }
              if (error.response.data.email) {
                setError(`email:${error.response.data.email[0]}`);
              }
            }
          });
      }}
    >
      {({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        errors,
        touched,
        isValid,
        dirty,
      }) => (
        <div className={styles.createDiv}>
          <AuthInp
            error={touched.email && errors.email}
            type={"text"}
            values={values.email}
            name={"email"}
            placeholder={"Your email"}
            handBlur={handleBlur}
            handChan={handleChange}
            change={emailChan}
          />
          <AuthInp
            error={touched.name && errors.name}
            type={"text"}
            values={values.name}
            name={"name"}
            placeholder={"Your name"}
            handBlur={handleBlur}
            handChan={handleChange}
            change={nameChan}
          />
          <AuthInp
            error={touched.password && errors.password}
            type={"password"}
            values={values.password}
            name={"password"}
            placeholder={"Password"}
            handBlur={handleBlur}
            handChan={handleChange}
            change={passChan}
          />
          <AuthInp
            error={touched.confirmPass && errors.confirmPass}
            type={"password"}
            values={values.confirmPass}
            name={"confirmPass"}
            placeholder={"Confirm password"}
            handBlur={handleBlur}
            handChan={handleChange}
            change={confirmChan}
          />
          {error ? (
            <p className={styles.errorText}>{error}</p>
          ) : (
            Object.keys(errors).length > 0 &&
            touched && (
              <p className={styles.errorText}>
                {"что то не правильно в полях"}
              </p>
            )
          )}
          <BlackBtn
            onClick={handleSubmit}
            dis={!isValid || !dirty || Object.keys(errors).length > 0}
          >
            Create account
          </BlackBtn>
          {values.email.length > 0 ? setEmailChan(true) : setEmailChan(false)}
          {values.name.length > 0 ? setNameChan(true) : setNameChan(false)}
          {values.password.length > 0 ? setPassChan(true) : setPassChan(false)}
          {values.confirmPass.length > 0
            ? setConfirmChan(true)
            : setConfirmChan(false)}
        </div>
      )}
    </Formik>
  );
};

export default CreateForm;
