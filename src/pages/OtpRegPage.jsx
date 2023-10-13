import { useState } from "react";

import OtpFormReg from "../components/Auth/otpForm/otpForRegister/OtpFormReg";
import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";
import AuthTitle from "../ui/text/AuthText/AuthTitle";
import AuthEndModal from "../ui/modal/authModal/authEndModal/AuthEndModal";

import styles from "../styles/OtpPage.module.css";

const OtpPageReg = () => {
    const [active, setActive] = useState(false)
    
  return (
    <div className={styles.otpPageMain}>
      <LogoDesign />
      <div className={styles.otpPageDesc}>
        <div>
          <AuthEndModal
          active={active}
          setActive={setActive}
          text={"your account is registered"} 
          path={"profile"}
          />
          <AuthTitle
            title={"OTP Verification"}
            desc={"Check your email to see the verification code"}
          />
          <OtpFormReg setActive={setActive}/>
        </div>
      </div>
    </div>
  );
};

export default OtpPageReg;
