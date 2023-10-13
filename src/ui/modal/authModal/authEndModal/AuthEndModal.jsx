import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import treadsLogo from "../../../../img/auth/authModal.svg";

import styles from "./AuthEnd.module.css";

const AuthEndModal = ({ text, setActive, active, path }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (active) {
      const timeoutId = setTimeout(() => {
        setActive(false);
        navigate(`/${path}`);
      }, 1500);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [active, setActive]);

  return (
    <div className={active ? styles.div : styles.divClose}>
      <img src={treadsLogo} alt="" />
      <div className={styles.descDiv}>
        {/* <p className={styles.nick}>{localStorage.getItem("username")}</p> */}
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default AuthEndModal;
