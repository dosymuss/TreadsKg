import { useState } from "react";
import { Link } from "react-router-dom";
import { PostFollow, PostUnFollow } from "../../../../api/profile";

import ava from "../../../../img/profile/initialAva.svg";

import styles from "./FollowPanPers.module.css";

const FollowPanelPerson = ({ id, photo, username, fullName, isFollowed }) => {
  const [click, setClick] = useState(isFollowed === "Followed" ? true : false);

  const btnClick = () => {
    if (click) {
      PostUnFollow(id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PostFollow(id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={styles.myDiv} key={id}>
      <div className={styles.descDiv}>
        <div className={styles.imageDivItem}>
          <img
            className={styles.image}
            src={photo ? photo : ava}
            alt="аватарка"
          />
          <div className={styles.imageDivDesc}>
            <Link className={styles.link} to={`/searchprof/${id}`}>
              <p className={styles.name}>{username}</p>
            </Link>
            <p className={styles.nickname}>{fullName}</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setClick(!click);
          btnClick();
        }}
        className={click ? styles.followBtnActive : styles.followBtn}
      >
        {click ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default FollowPanelPerson;
