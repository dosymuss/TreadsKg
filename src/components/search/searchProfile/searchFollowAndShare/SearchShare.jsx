import { useEffect, useState } from "react";

import points from "../../../../img/search/3points.svg";
import shareLink from "../../../../img/profile/shareLink.svg";
import shareVia from "../../../../img/profile/shareVia.svg";
import OtherModal from "../../../../ui/modal/otherModal/OtherModal";
import { useParams } from "react-router-dom";
import { PostFollow, PostUnFollow } from "../../../../api/profile";

import styles from "./SearchShare.module.css";
import { mutualFoll } from "../../../../api/search";
import Loader from "../../../../ui/loader/Loader";

const SearchShare = ({ isFollowed }) => {
  const [modalActive, setModalActive] = useState(false);
  const [click, setClick] = useState(
    isFollowed !== "Not followed" ? true : false
  );
  const params = useParams();
  console.log(isFollowed);

  const followBtnClick = () => {
    if (!click) {
      PostFollow(params.id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      PostUnFollow(params.id)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const copyUrl = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const shareContent = async () => {
    try {
      await navigator.share({
        url: window.location.href,
      });
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className={styles.mainDiv}>
      <button
        onClick={() => {
          setClick(!click);
          followBtnClick();
        }}
        className={click&&isFollowed !== "Not followed" ? styles.btnClick : styles.btn}
      >
        {click&&isFollowed !== "Not followed" ? "Following" : "Follow"}
      </button>
      <button
        className={styles.pointBtn}
        onClick={() => {
          setModalActive(!modalActive);
        }}
      >
        <img src={points} alt="" />
      </button>
      <OtherModal active={modalActive} setActive={setModalActive}>
        <div className={styles.modalDiv}>
          <button onClick={copyUrl} className={styles.modalBtn}>
            <img src={shareLink} alt="link" />
            Copy link
          </button>
          <button onClick={shareContent} className={styles.modalBtn}>
            <img src={shareVia} alt="link" />
            Share via...
          </button>
          <button className={styles.blockBtn}>Block</button>
        </div>
      </OtherModal>
    </div>
  );
};

export default SearchShare;
