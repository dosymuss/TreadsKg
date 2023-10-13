import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import FollowersModal from "../../../followers/FollowersModal";
import { getFollowersById, getProfileById } from "../../../../api/profile";
import ava from "../../../../img/profile/initialAva.svg";
import { mutualFoll } from "../../../../api/search";

import styles from "./SearchProfHead.module.css";

const SearchProfHead = ({ setSearchUser }) => {
  const [modalActive, setModalActive] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [followers, setFollowers] = useState(1)
  const [user, setUser] = useState({});

  const params = useParams();

  console.log(user);
  useEffect(() => {
    getProfileById(params.id)
      .then((res) => {
        if (res) {
          setUser(res.data);
          setSearchUser(res.data);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });


    getFollowersById(params.id)
      .then((res) => {
        console.log(res);
        setFollowers(res.data.count)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  return (
    <div className={styles.main} key={params.id}>
      <div className={styles.profDescDiv}>
        <img
          className={styles.profImg}
          src={user.photo ? user.photo : ava}
          alt="аватарка"
        />
        <div className={styles.descDiv}>
          <p className={styles.name}>{user.full_name}</p>
          <div className={styles.treadBtnDiv}>
            <p className={styles.nickName}>{user.username}</p>
            <button className={styles.treadBtn}>treads.net</button>
          </div>
          <div>
            <button
              onClick={() => {
                setFollowModal(!followModal);
              }}
              className={styles.followersBtn}
            >
              <p className={styles.followers}>{`${followers} followers`}</p>
            </button>
          </div>
        </div>
      </div>
      <FollowersModal id={params.id} active={followModal} setActive={setFollowModal} />
    </div>
  );
};

export default SearchProfHead;
