import { useState } from "react";
import requestImg from "../../../img/activity/requestImg.svg";

import styles from "./ApproveBtn.module.css";

const ApproveBtn = () => {
  const [click, setClick] = useState(false);
  return (
    <div className={styles.main}>
      <div className={styles.imgDiv}>
        <img src={requestImg} alt="" />
        <p className={styles.text}>6 requests</p>
      </div>
      <button
        onClick={() => {
          setClick(!click);
        }}
        className={click ?styles.approveBtnClick:styles.approveBtn}
      >
        Approve all
      </button>
    </div>
  );
};

export default ApproveBtn;
