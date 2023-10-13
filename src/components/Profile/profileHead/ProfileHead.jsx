import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import enter from "../../../img/profile/enter.svg";
import LogOutModal from "../../../ui/modal/LogOutModal/LogOutModal";
import ava from "../../../img/profile/initialAva.svg"
import FollowersModal from "../../followers/FollowersModal";
import { profInfo, showFollow } from "../../../store/userSlice";
import { logout } from "../../../api/profile";

import styles from "./ProfileHead.module.css";
import Loader from "../../../ui/loader/Loader";

const ProfileHead = () => {
  const [modalActive, setModalActive] = useState(false);
  const [followModal, setFollowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userInfo, followInfo] = await Promise.all([dispatch(profInfo()), dispatch(showFollow())]);
        // Здесь вы можете использовать userInfo и followInfo для дальнейших операций
        console.log(userInfo);
        console.log(followInfo);
    
        // После успешной загрузки данных, установите isLoading в false
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Обработка ошибки, также установите isLoading в false
      }
    };
    
    fetchData();
  }, []);
  

  const user = useSelector((state) => state.user);
  console.log(user)

  const logOutFunc = () => {
    logout()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // localStorage.removeItem("refresh");
  };

if(isLoading){
  return(
    <Loader/>
  )
}
else{
  return (
    <div className={styles.main}>
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
          {user.bio && user.bio!=="null" && <p className={styles.bio}>{user.bio}</p>}
          <div>
            <button
              onClick={() => {
                setFollowModal(!followModal);
              }}
              className={styles.followersBtn}
            >
              <p className={styles.followers}>{`${user.follow} followers`}</p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setModalActive(true);
          }}
          className={styles.enterBtn}
        >
          <img src={enter} alt="выход" />
        </button>
      </div>
      <LogOutModal active={modalActive}>
        <div className={styles.modalDiv}>
          <p className={styles.modalTitle}>Log out of Threads ?</p>
          <Link onClick={logOutFunc} className={styles.enterLink} to={"/"}>
            Log out
          </Link>
          <button
            className={styles.cancelBtn}
            onClick={() => {
              setModalActive(false);
            }}
          >
            Cancel
          </button>
        </div>
      </LogOutModal>
      <FollowersModal active={followModal} setActive={setFollowModal} />
    </div>
  );
}

};

export default ProfileHead;
