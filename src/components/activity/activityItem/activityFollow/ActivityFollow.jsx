import { useEffect } from "react";
import { useState } from "react";

import { getProfileById } from "../../../../api/profile";
import FollowBtn from "../../../../ui/buttons/FollowBtn/FollowBtn";
import { timeFunc } from "../../../../code/otherCode/code";
import { PostFollow, PostUnFollow } from "../../../../api/profile";

import example from "../../../../img/profile/initialAva.svg";
import followMini from "../../../../img/activity/followMini.svg";

import styles from "./ActivityFollow.module.css";
import Loader from "../../../../ui/loader/Loader";

const ActivityFollow = ({ item }) => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(user.is_followed)
  const [clickAct, setClickAct] = useState(
    user.is_followed === "Mutual Follow"
  );
  console.log(user.is_followed, clickAct);
  const time = timeFunc(item.date_posted);

  useEffect(() => {
    getProfileById(item.related_user)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [item]);

  const activityBtnClick = () => {
    if (!clickAct) {
      PostFollow(item.related_user)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PostUnFollow(item.related_user)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={styles.main}>
          <div className={styles.imgDiv}>
            <img
              className={styles.img}
              src={user.photo ? user.photo : example}
              alt="ava"
            />
            <img className={styles.miniIcon} src={followMini} alt="" />
          </div>
          <div className={styles.descDiv}>
            <div className={styles.nickDiv}>
              <p className={styles.nick}>{user.username}</p>
              <p className={styles.time}>{time}</p>
            </div>
            <p className={styles.descText}>Followed you</p>
          </div>
          <div>
            <button
              className={
                clickAct
                  ? styles.activityFollowClick
                  : styles.activityFollowBtn
              }
              onClick={() => {
                setClickAct(!clickAct);
                activityBtnClick();
              }}
            >
              {clickAct 
                ? "Following"
                : "Follow"}
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ActivityFollow;
