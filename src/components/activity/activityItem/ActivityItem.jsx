import { useState } from "react";

import example from "../../../img/main/exempleAva.svg";
import followMini from "../../../img/activity/followMini.svg";
import requestMini from "../../../img/activity/requestMini.svg";
import commentMini from "../../../img/activity/commentMini.svg";

import FollowBtn from "../../../ui/buttons/FollowBtn/FollowBtn";

import styles from "./ActivityItem.module.css";
import { getProfileById } from "../../../api/profile";
import { useEffect } from "react";

const ActivityItem = ({ section, item }) => {
  const [clickCon, setClickCon] = useState(false);
  const [clickHid, setClickHid] = useState(false);

  // console.log(item.pk);

  // useEffect(() => {
  //   getProfileById(item.pk)
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  if (section === "request") {
    return (
      <div className={styles.main}>
        <div className={styles.imgDiv}>
          <img className={styles.img} src={example} alt="ava" />
          <img className={styles.miniIcon} src={requestMini} alt="" />
        </div>
        <div className={styles.descDiv}>
          <div className={styles.nickDiv}>
            <p className={styles.nick}>dosam</p>
            <p className={styles.time}>1m</p>
          </div>
          <p className={styles.descText}>Follow request</p>
        </div>
        <button
          onClick={() => {
            setClickCon(!clickCon);
          }}
          className={clickCon ? styles.requestBtnClick : styles.requestBtn}
        >
          Confirm
        </button>
        <button
          className={clickHid ? styles.requestBtnClick : styles.requestBtn}
          onClick={() => {
            setClickHid(!clickHid);
          }}
        >
          Hide
        </button>
      </div>
    );
  }
  if (section === "comment") {
    return (
      <div className={styles.mainComment}>
        <div className={styles.imgDiv}>
          <img className={styles.img} src={example} alt="ava" />
          <img className={styles.miniIcon} src={commentMini} alt="" />
        </div>
        <div className={styles.descDiv}>
          <div className={styles.nickDiv}>
            <p className={styles.nick}>dosam</p>
            <p className={styles.time}>1m</p>
          </div>
          <p className={styles.descText}>Focusing is about saying no...</p>
          <p className={styles.comment}>pjiojoihiuj</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.main}>
      <div className={styles.imgDiv}>
        <img className={styles.img} src={example} alt="ava" />
        <img className={styles.miniIcon} src={followMini} alt="" />
      </div>
      <div className={styles.descDiv}>
        <div className={styles.nickDiv}>
          <p className={styles.nick}>dosa</p>
          <p className={styles.time}>1m</p>
        </div>
        <p className={styles.descText}>Followed you</p>
      </div>
      <div>
        {/* <FollowBtn section={"activity"} /> */}
      </div>
    </div>
  );
};

export default ActivityItem;
