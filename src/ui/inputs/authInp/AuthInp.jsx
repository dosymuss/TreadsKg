import { useState } from "react";

import eye from "../../../img/auth/eye.svg";
import eyeOpen from "../../../img/auth/eyeOpen.svg";

import styles from "./AuthInp.module.css"

const AuthInp = ({
  type,
  placeholder,
  handChan,
  handBlur,
  name,
  value,
  change
}) => {
  const [ctrlType, setCtrlType] = useState("password");


  return (
    <>
      {type === 'text' ? (
        <input
          className={!change ? styles.text : styles.changeInp}
          type="text"
          value={value}
          onChange={handChan}
          onBlur={handBlur}
          name={name}
          placeholder={placeholder}
        />
      ) : (
        <div className={!change ? styles.passDiv : styles.chanPassDiv}>
          <input
            className={styles.passInp}
            value={value}
            onChange={handChan}
            onBlur={handBlur}
            name={name}
            type={ctrlType}
            placeholder={placeholder}
          />
          <button
            className={styles.passBtn}
            onClick={() => {
              setCtrlType(ctrlType === 'password' ? 'text' : 'password');
            }}
          >
            <img src={ctrlType === "text" ? eyeOpen : eye} alt="глазик" />
          </button>
        </div>
      )}
    </>
  );
};

export default AuthInp;

