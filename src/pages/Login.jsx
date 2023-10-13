import { Link } from "react-router-dom";

import LoginForm from "../components/Auth/loginForm/LoginForm";
import GoogleAuth from "../ui/buttons/otherAuthBtn/google/GoogleAuth";
import OrDecor from "../ui/design/orDecor/OrDecor";
import AuthTitle from "../ui/text/AuthText/AuthTitle";
import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";

import styles from "../styles/Login.module.css";

const Login = () => {
  localStorage.setItem("conf", true)
  return (
    <div className={styles.main}>
     <LogoDesign/>
      <div className={styles.formDiv}>
        <div>
          <AuthTitle title={"Let’s sign you in"} desc={"We’ve missed you"} />
          <LoginForm />
          <div>
            <OrDecor />
          </div>
          <div className={styles.otherDiv}>
            <GoogleAuth />
          </div>
          <label className={styles.linkLabel} htmlFor="signUpLink">
            Don’t have an account yet ?
            <span className={styles.linkWrapper}>
              <Link id="signUpLink" className={styles.link} to="/create">
                {" Sign up"}
              </Link>
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;
