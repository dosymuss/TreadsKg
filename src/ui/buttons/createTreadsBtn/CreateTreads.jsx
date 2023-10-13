import { useSelector } from "react-redux";

import ava from "../../../img/profile/initialAva.svg";
import plus from "../../../img/main/plusIcon.svg";
import CreateModal from "../../modal/CreateModal/CreateModal";

import styles from "./CreateTreads.module.css";

const CreateTreads = ({setActive, active}) => {
  const user = JSON.parse(localStorage.getItem("userData"))
  
  return (
    <div className={styles.createMain}>
      <div className={styles.imageDiv}>
        <div className={styles.imageDivItem}>
          <img className={styles.image} src={user.photo?user.photo:ava} alt="аватарка" />
          <div className={styles.imageDivDesc}>
            <p className={styles.nickName}>{user.username}</p>
            <button
              onClick={() => {
                setActive(true);
              }}
              className={styles.startBtn}
            >
              Start a thread...
            </button>
          </div>
        </div>
        <p className={styles.postName}>Post</p>
      </div>
      <div className={styles.plusDiv}>
        <img src={plus} alt="скрепка" />
        <p>Anyone can reply</p>
      </div>
      <CreateModal active={active} setActive={setActive}>

      </CreateModal>
    </div>
  );
};

export default CreateTreads;
