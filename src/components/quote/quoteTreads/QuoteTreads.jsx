import { useEffect } from "react";
import { getProfileById } from "../../../api/profile";
import { useState } from "react";

import ava from "../../../img/profile/initialAva.svg";
import image from "../../../img/main/bigImg.svg";
import { timeFunc } from "../../../code/otherCode/code";

import styles from "./QuoteTreads.module.css";
import { getPostById } from "../../../api/post";

function QuoteTreads({ tread }) {
  const [user, setUser] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [like, setLike] = useState(null);
  const [reply, setReply] = useState(null);
  const time = timeFunc(tread.date_posted);
  useEffect(() => {
    getProfileById(tread.author)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getPostById(tread.id)
      .then((res) => {
        setLike(res.data.total_likes);
        setReply(res.data.total_comments);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [tread]);

  const image = new Image();
  image.src = tread.image;
  image.onload = function () {
    const width = image.width;
    const height = image.height;

    if (width > 458.4) {
      setWidth(458.4);
    } else {
      setWidth(width);
    }
    if (height > width && height > 700) {
      setHeight(500);
      setWidth(null);
    }
  };

  const style = {
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : "auto",
  };

  const replyText =
    Number(reply) > 0 ? `${reply} replies` : "";
  const likesText = like === 0 ? "" : `${like} likes`;

  const resultText =
    replyText && likesText
      ? `${replyText} - ${likesText}`
      : `${replyText}${likesText}`;

  return (
    <div className={styles.main}>
      <div className={styles.nickAndTimeDiv}>
        <div className={styles.nickDiv}>
          <img className={styles.ava} src={user ? user.photo : ava} alt="" />
          <p className={styles.nickName}>{user && user.username}</p>
        </div>
        <p className={styles.time}>{time}</p>
      </div>
      <p className={styles.text}>{tread.text}</p>
      <div className={styles.imageDiv}>
        {tread.image && <img style={style} src={tread.image} alt="" />}
      </div>
      <p className={styles.time}>{resultText}</p>
    </div>
  );
}

export default QuoteTreads;
