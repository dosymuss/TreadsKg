import { useNavigate } from "react-router-dom";
import { useState } from "react";

import shareLinkIcon from "../../../../img/profile/shareLink.svg";
import shareViaIcon from "../../../../img/profile/shareVia.svg";

import OtherModal from "../../../modal/otherModal/OtherModal";

import styles from "./EditBtns.module.css";

const EditBtns = () => {
  const [modalActive, setModalActive] = useState(false);

  const navigate = useNavigate();

  const openEditPage = () => {
    navigate("/editprof");
  };

  const copyLink = () => {
    const url = window.location.href;
    console.log(url);
    navigator.clipboard
      .writeText(url)
      .then(() => {
        console.log("все ок");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const shareContent = async () => {
    try {
      await navigator.share({
        url: window.location.href,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };
  
  return (
    <div className={styles.mainDiv}>
      <button
        onClick={() => {
          openEditPage();
        }}
        className={styles.btn}
      >
        Edit profile
      </button>
      <button
        onClick={() => {
          setModalActive(!modalActive);
        }}
        className={styles.btn}
      >
        Share profile
      </button>
      <OtherModal active={modalActive} setActive={setModalActive}>
        <div className={styles.modalDiv}>
          <button onClick={copyLink} className={styles.shareBtns}>
            <img src={shareLinkIcon} alt="linkIcon" />
            Copy link
          </button>
          <button onClick={shareContent} className={styles.shareBtns}>
            <img src={shareViaIcon} alt="viaIcon" />
            Share via...
          </button>
        </div>
      </OtherModal>
    </div>
  );
};

export default EditBtns;
