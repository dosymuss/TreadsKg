import { useEffect } from "react";

import treadsLogo from "../../../img/auth/authModal.svg";

import styles from "./ErrorModal.module.css";

const ErrorModal = ({ text, setActive, active, path }) => {
  
//   useEffect(() => {
//     if (active) {
//       const timeoutId = setTimeout(() => {
//         setActive(false);
//       }, 1500);
//     }
//   }, [active, setActive]);

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

export default ErrorModal;
