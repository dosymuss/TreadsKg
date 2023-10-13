import { useEffect, useState } from "react";
import { PostFollow, PostUnFollow } from "../../../../api/profile";

import styles from "./FollowBtnModal.module.css";

const FollowBtnModal = ({ id, isFollowed, click, setClick }) => {
  console.log(isFollowed)
  const [follow, setFollow] = useState(
    isFollowed !== "Not Followed" ? true : false
  );

    const btnClick = ()=>{
      if (click) {
        PostFollow(id)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        PostUnFollow(id)
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }



  return (
    <button
      className={
        follow  ? styles.followBtnActive :styles.followBtn 
      }
      onClick={() => {
        btnClick()
        setFollow(!follow);
        setClick(!click);
      }}
    >
      {follow&& isFollowed !== "Not Followed" ? "Following" : "Follow"}
    </button>
  );
};

export default FollowBtnModal;
