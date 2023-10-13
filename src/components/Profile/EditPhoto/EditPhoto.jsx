import { useState } from "react";
import { useSelector } from "react-redux";


import ava from "../../../img/profile/initialAva.svg"

import OtherModal from "../../../ui/modal/otherModal/OtherModal";
import PhotoReader from "../photoReader/PhotoReader";

import styles from "./EditPhoto.module.css";

const EditPhoto = () => {

  const [modalActive, setModalActive] = useState(false);
  const user = useSelector((state) => state.user);
  
  return (
    <div className={styles.main}>
      <img className={styles.photo} src={user.photo?user.photo:ava} alt="ava" />
      <button
        onClick={() => {
          setModalActive(true);
        }}
        className={styles.btn}
      >
        Edit photo
      </button>
      <OtherModal active={modalActive} setActive={setModalActive}>
        <div className={styles.modalDiv}>
          <PhotoReader />
        </div>
      </OtherModal>
    </div>
  );
};

export default EditPhoto;
