import ForgotPassForm from "../components/Auth/forgotForm/ForgotPassForm";
import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";

import styles from "../styles/ForgotPass.module.css"
import AuthTitle from "../ui/text/AuthText/AuthTitle";

const ForgotPass = () => {

  return (
    <div className={styles.main}>
     <LogoDesign/>
      <div className={styles.formDiv}>
        <div>
        <AuthTitle title={"Forgot password ?"} desc={"Enter your email address to reset password"}/>
      <ForgotPassForm />
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
