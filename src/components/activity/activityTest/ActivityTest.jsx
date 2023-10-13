import { useState } from "react";

import ava from "../../../img/profile/initialAva.svg";
import followMini from "../../../img/activity/followMini.svg";
import requestMini from "../../../img/activity/requestMini.svg";
import commentMini from "../../../img/activity/commentMini.svg";

import FollowBtn from "../../../ui/buttons/FollowBtn/FollowBtn";

import styles from "./ActivityTest.module.css";
import { getProfileById } from "../../../api/profile";
import { useEffect } from "react";
import { timeFunc } from "../../../code/otherCode/code";
import Loader from "../../../ui/loader/Loader";

function ActivityTest({ item }) {
  const [user, setUser] = useState([]);
  const time = timeFunc(item.date_posted);

  console.log(user)

  useEffect(() => {
    if (item.related_user) {
      getProfileById(item.related_user)
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

    return (
      <div className={styles.main}>
        <div className={styles.imgDiv}>
          <img
            className={styles.img}
            src={user.photo ? user.photo : ava}
            alt="ava"
          />
          <img className={styles.miniIcon} src={followMini} alt="" />
        </div>
        <div className={item.related_user?styles.descDiv:styles.onlyDesc}>
          <div className={styles.nickDiv}>
            <p className={styles.nick}>
              {user.username ? user.username : null}
            </p>
            <p className={styles.time}>{time}</p>
          </div>
          <p className={styles.descText}>{item.text}</p>
        </div>
        <div>{item.related_user&&<FollowBtn activitiFollow={item.is_followed} id={item.related_user} section={"activity"} />}</div>
      </div>
    );
  }


export default ActivityTest;
