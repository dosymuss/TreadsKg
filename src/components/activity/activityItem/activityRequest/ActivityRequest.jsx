import { useState } from "react";
import { useEffect } from "react";

import { getProfileById } from "../../../../api/profile";
import { userConf, userHide } from "../../../../api/activity";
import { timeFunc } from "../../../../code/otherCode/code";

import example from "../../../../img/profile/initialAva.svg";
import requestMini from "../../../../img/activity/requestMini.svg";

import styles from "./ActivityRequest.module.css";

const ActivityRequest = ({ item }) => {
  const [clickCon, setClickCon] = useState(false);
  const [clickHid, setClickHid] = useState(false);
  const [user, setUser] = useState({});
  const time = timeFunc(item.date_posted);

  useEffect(() => {
    getProfileById(item.related_user)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [item]);

  const clickConfirmBtn = () => {
    userConf(item.related_user)
      .then((res) => {
        console.log(res);
        setClickCon(!clickCon);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const ClickHidBtn = () => {
    userHide(item.related_user)
      .then((res) => {
        console.log(res);
        setClickHid(!clickHid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.imgDiv}>
          <img
            className={styles.img}
            src={user.photo ? user.photo : example}
            alt="ava"
          />
          <img className={styles.miniIcon} src={requestMini} alt="" />
        </div>
        <div className={styles.descDiv}>
          <div className={styles.nickDiv}>
            <p className={styles.nick}>{user.username}</p>
            <p className={styles.time}>{time}</p>
          </div>
          <p className={styles.descText}>{item.text}</p>
        </div>
        <button
          onClick={() => {
            clickConfirmBtn()
          }}
          className={clickCon ? styles.requestBtnClick : styles.requestBtn}
        >
          Confirm
        </button>
        <button
          className={clickHid ? styles.requestBtnClick : styles.requestBtn}
          onClick={() => {
            ClickHidBtn()
        }}
        >
          Hide
        </button>
      </div>
    </div>
  );
};

export default ActivityRequest;
