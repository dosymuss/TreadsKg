import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import editFormExit from "../../../img/profile/editFormExit.svg";
import EditPhoto from "../EditPhoto/EditPhoto";
import { setUser } from "../../../store/userSlice";
import { profileUpdate } from "../../../api/profile";

import styles from "./EditForm.module.css";

const EditForm = () => {
  const [newValues, setNewValues] = useState(null);

  const user = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    username: user.username,
    name: user.full_name,
    bio: user.bio === "null" ? "" : user.bio,
    link: user.website === "null" ? "" : user.website,
    private: user.is_private,
  };

  useEffect(() => {
    console.log(newValues);
    profileUpdate(newValues)
      .then((res) => {
        if (res) {
          navigate("/profile");
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [newValues]);

  const handleSubmit = (values) => {
    dispatch(setUser(values));
    if (values) {
      setNewValues(values);
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <EditPhoto />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isValid, dirty }) => (
            <Form className={styles.form}>
              <label className={styles.label}>
                Username
                <Field
                  className={styles.inputs}
                  type="text"
                  name="username"
                  placeholder="+ Add username"
                  minLength={1}
                  required
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className={styles.errorText}
                />
              </label>

              <label className={styles.label}>
                Name
                <Field
                  className={styles.inputs}
                  type="text"
                  name="name"
                  placeholder="+ Add name"
                  minLength={1}
                  required
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className={styles.errorText}
                />
              </label>

              <label className={styles.label}>
                Bio
                <Field
                  className={styles.inputs}
                  type="text"
                  name="bio"
                  placeholder="+ Write bio"
                  maxLength={50}
                />
                <ErrorMessage
                  name="bio"
                  component="p"
                  className={styles.errorText}
                />
              </label>

              <label className={styles.label}>
                Link
                <Field
                  className={styles.inputs}
                  type="text"
                  name="link"
                  placeholder="+ Add link"
                  pattern="^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$"
                />
                <ErrorMessage
                  name="link"
                  component="p"
                  className={styles.errorText}
                />
              </label>

              <div className={styles.privateDiv}>
                <p className={styles.privateText}>Private profile</p>
                <label class={styles.switch}>
                  <Field
                    type="checkbox"
                    name="private"
                    className={styles.switchInp}
                  />
                  <span class={styles.switchSlider}></span>
                </label>
              </div>

              <div className={styles.linkDiv}>
                <Link className={styles.Link} to="/profile">
                  <img src={editFormExit} alt="" />
                  Edit profile
                </Link>
                <button
                  type="submit"
                  className={styles.submit}
                  disabled={!isValid || !dirty}
                >
                  Done
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditForm;
