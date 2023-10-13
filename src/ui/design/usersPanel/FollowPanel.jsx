import ava from "../../../img/profile/initialAva.svg";
import FollowPanelPerson from "./FollowPanelPerson/FollowPanelPerson";

import styles from "./FollowPanel.module.css";
import { useEffect, useState } from "react";
import { getFollowers, getMyProfile,getFollowing,getPendingPers } from "../../../api/profile";
import { Link } from "react-router-dom";
import FollowersModal from "../../../components/followers/FollowersModal";

const FollowPanel = () => {
  const [user, setUser] = useState("");
  const [followers, setFollowers] = useState([]);
  const [followModal, setFollowModal] = useState(false);
  const { photo, username } = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    getMyProfile()
      .then((res) => {
        setUser(res.data);
      })
      .catch(console.error());
    getFollowing(localStorage.getItem("pk"))
      .then((res) => {
        console.log(res);
        setFollowers(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.myDiv}>
        <div className={styles.descDiv}>
          <div className={styles.imageDivItem}>
            <img
              className={styles.image}
              src={photo ? photo : ava}
              alt="аватарка"
            />
            <div className={styles.imageDivDesc}>
              <p className={styles.name}>{username}</p>
              <p className={styles.nickname}>{user.full_name}</p>
            </div>
          </div>
        </div>
        <Link to={"/profile"} className={styles.switchBtn}>
          Switch
        </Link>
      </div>
      <div className={styles.activDiv}>
        <div className={styles.navPan}>
          <p className={styles.navPanText}>Suggested for you</p>
          <button
            onClick={() => {
              setFollowModal(!followModal);
            }}
            className={styles.navPanBtn}
          >
            See All
          </button>
        </div>
        <div className={styles.follDiv}>
          {followers.length === 0 ? (
            <p className={styles.emptyText}>Пусто</p>
          ) : (
            followers.map((item) => {
              console.log(item);
              return (
                <FollowPanelPerson
                id={item.followee.pk}
                  photo={item.followee.photo}
                  username={item.followee.username}
                  fullName={item.followee.full_name}
                  isFollowed={item.is_followed}
                />
              );
            })
          )}
        </div>
      </div>
      <FollowersModal active={followModal} setActive={setFollowModal} />
    </div>
  );
};

export default FollowPanel;
