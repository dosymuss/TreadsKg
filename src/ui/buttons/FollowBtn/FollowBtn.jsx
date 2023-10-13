import { useEffect, useState } from "react";

import styles from "./FollowBtn.module.css";
import { PostFollow, PostUnFollow } from "../../../api/profile";

const FollowBtn = ({ isFollowed,  id }) => {
  const [click, setClick] = useState(
    isFollowed !== "Not Followed" ? true : false
  );

  console.log(isFollowed);

  useEffect(() => {
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
  }, [click]);

  return (
    <div className={isFollowed === "You" && styles.hide}>
      <button
        className={click ? styles.searchFollowClick : styles.searchFollowBtn}
        onClick={() => {
          setClick(!click);
        }}
      >
        {click && isFollowed !== "Not Followed" ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default FollowBtn;
