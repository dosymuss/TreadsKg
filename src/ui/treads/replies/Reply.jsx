import { useEffect, useState } from "react";
import { timeFunc } from "../../../code/otherCode/code";
import { getProfileById } from "../../../api/profile";

import ShortLine from "../../design/shortLine/ShortLine";
import OtherModal from "../../modal/otherModal/OtherModal";
import Loader from "../../loader/Loader";

import ava from "../../../img/profile/initialAva.svg";
import likeIcon from "../../../img/treads/likeIcon.svg";
import likeIconAc from "../../../img/nav/activityAc.svg";
import messageIcon from "../../../img/treads/message.svg";
import rebbotIcon from "../../../img/treads/rebootIcon.svg";
import shareIcon from "../../../img/treads//shareIcon.svg";
import removeTreads from "../../../img/treads/remove.svg";
import quoteTreads from "../../../img/treads/quote.svg";

import styles from "./Reply.module.css";
import { likeComment } from "../../../api/comments";

const Reply = ({
  author,
  time,
  id,
  reply,
  text,
  likes,
  userLike,
  setLike,
  like,
}) => {
  const [repostModalProf, setRepostModalProf] = useState(false);
  const [repostModalMain, setRepostModalMain] = useState(false);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  console.log(userLike);
  const [likeClick, setLikeClick] = useState(userLike);

  const timeDif = timeFunc(time);

  useEffect(() => {
    getProfileById(author)
      .then((res) => {
        console.log(res);
        setUser(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const likeBtnClick = () => {
    setLikeClick(!likeClick);
    likeComment(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setLike(!like);
  };


  const likeResult = likes ? `${likes} likes` : "";

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={styles.imgDiv}>
          <img
            className={styles.ava}
            src={user.photo ? user.photo : ava}
            alt="ava"
          />
          <div className={styles.imgDivNick}>
            <p className={styles.nick}>{user.username}</p>
            <p className={styles.time}>{timeDif}</p>
          </div>
        </div>
        <div className={styles.textAndBtnDiv}>
          <p className={styles.message}>{text}</p>
          <div className={styles.btnAndLikes}>
            <div className={styles.btnDiv}>
              <button className={styles.btn}>
                <img src={messageIcon} alt="" />
              </button>
              <button
                className={styles.btn}
                onClick={() => {
                  likeBtnClick();
                }}
              >
                <img src={likeClick ? likeIconAc : likeIcon} alt="" />
              </button>
              <button
              onClick={()=>{
                // setRepostModalMain(!repostModalMain)
              }}
              className={styles.btn}>
                <img src={rebbotIcon} alt="" />
              </button>
              <button className={styles.btn}>
                <img src={shareIcon} alt="" />
              </button>
            </div>
            {/* <div className={styles.likesDiv}> */}
            <p className={styles.likeTextOnly}>{likeResult}</p>
            {/* </div> */}
          </div>
        </div>
        <ShortLine />
        <OtherModal setActive={setRepostModalProf} active={repostModalProf}>
          <div className={styles.repostModal}>
            <button className={styles.removeBtn}>
              Remove <img src={removeTreads} alt="" />
            </button>
            <button className={styles.quoteBtn}>
              Quote <img src={quoteTreads} alt="" />
            </button>
          </div>
        </OtherModal>
        <OtherModal active={repostModalMain} setActive={setRepostModalMain}>
          <div className={styles.repostModal}>
            <button className={styles.repostBtn}>
              Repost <img src={rebbotIcon} alt="" />
            </button>
            <button className={styles.quoteBtn}>
              Quote <img src={quoteTreads} alt="" />
            </button>
          </div>
        </OtherModal>
      </div>
    );
  }
};

export default Reply;
