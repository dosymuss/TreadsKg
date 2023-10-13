import { useEffect, useState } from "react";

import LogoDesign from "../ui/design/logoDesign/LogoDesigtn";

import styles from "../styles/ForgotPass.module.css";
import AuthTitle from "../ui/text/AuthText/AuthTitle";
import ConfirmEmail from "../components/Auth/forgotForm/confirmEmail/ConfirmEmail";

const ConfirmEmailPage = () => {
  const conf = localStorage.getItem("conf")

  useEffect(() => {
    if (conf === "true") {
      // Вызываем перезагрузку страницы
      window.location.reload();
      // Устанавливаем shouldReload в false, чтобы больше не вызывать перезагрузку
      localStorage.setItem("conf", false)
    }
  }, [conf]);

  return (
    <div className={styles.main}>
      <LogoDesign />
      <div className={styles.formDiv}>
        <div>
          <AuthTitle
            title={"Forgot password ?"}
            desc={"Enter your email address to reset password"}
          />
          <ConfirmEmail />
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmailPage;
