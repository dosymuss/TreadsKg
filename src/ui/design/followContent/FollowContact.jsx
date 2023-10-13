import { Link } from "react-router-dom";

import ava from "../../../img/profile/initialAva.svg";

import FollowBtnModal from "../../buttons/FollowBtn/followModalBtn/FollowBtnModal";

import styles from "./FollowContact.module.css";

const FollowContact = ({click, setClick, id, name, nickName, followed, followedStatus,photo }) => {


  return (
    <div key={id}>
      <div className={styles.main}>
        <img className={styles.avaImg} src={photo?photo:ava} alt="ava" />
        <div className={styles.descDiv}>
          <Link to={`/searchprof/${id}`} className={styles.name}>{name}</Link>
          <p className={styles.nick}>{nickName}</p>
        </div>
        <FollowBtnModal id={id} click={click} setClick={setClick} isFollowed={followedStatus}/>
      </div>
      <div className={styles.lineDiv}>
        <span className={styles.line}></span>
      </div>
    </div>
  );
};

export default FollowContact;
