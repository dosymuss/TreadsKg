import OtpForm from "../components/Auth/otpForm/OtpForm";

import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";
import AuthTitle from "../ui/text/AuthText/AuthTitle";

import styles from "../styles/OtpPage.module.css";

const OtpPage = () => {
  return (
    <div className={styles.otpPageMain}>
      <LogoDesign />
      <div className={styles.otpPageDesc}>
        <div>
          <AuthTitle title={"OTP Verification"} desc={"Check your email to see the verification code"}/>
          <OtpForm />
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
