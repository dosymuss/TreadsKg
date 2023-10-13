import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import example from "../../img/profile/initialAva.svg";
import likeIcon from "../../img/treads/likeIcon.svg";
import messageIcon from "../../img/treads/message.svg";
import rebbotIcon from "../../img/treads/rebootIcon.svg";
import shareIcon from "../../img/treads//shareIcon.svg";
import removeTreads from "../../img/treads/remove.svg";
import quoteTreads from "../../img/treads/quote.svg";
import treadsPlus from "../../img/treads/treadsPlus.svg";
import likeAcc from "../../img/nav/activityAc.svg";

import OtherModal from "../modal/otherModal/OtherModal";

import styles from "./Treads.module.css";
import BigLine from "../design/bigLine/BigLine";

import {
  postLikeUnlike,
  deletePost,
  getPostComments,
  postRepost,
} from "../../api/post";
import { timeFunc } from "../../code/otherCode/code";
import { getProfileById } from "../../api/profile";
import VideoPlayer from "../../components/videoComp/VideoPlayer";
import Loader from "../loader/Loader";
import QuoteTreads from "../../components/quote/quoteTreads/QuoteTreads";

const TreadsAndReplies = ({
  section,
  message,
  photo,
  id,
  author,
  postLike,
  userLike,
  time,
  setLike,
  like,
  removeClick,
  setRemoveClick,
  image,
  video,
  quote,
}) => {
  const totaltime = timeFunc(time);
  const [repostModalProf, setRepostModalProf] = useState(false);
  const [repostModalMain, setRepostModalMain] = useState(false);
  const [user, setUser] = useState({});
  const [likePict, setLikePict] = useState(userLike);
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  // console.log(user)

  const navigate = useNavigate();

  useEffect(() => {
    getPostComments(id)
      .then((res) => {
        setReply(res.data.results.length);
      })
      .catch((error) => {
        console.log(error);
      });
    getProfileById(author)
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author, id, removeClick]);

  const makeRemove = () => {
    deletePost(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeBtnClick = () => {
    postLikeUnlike(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setLike(!like);
  };
  const repostBtnClick = () => {
    section === "main" || section === "treadPage" || section === "search"
      ? setRepostModalMain(true)
      : setRepostModalProf(true);
  };

  const addRepost = () => {
    postRepost(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEmptySpaceClick = () => {
    // Переходим по ссылке только при клике на пустое место
    if (section === "main" || section === "prof"|| section === "search") {
      navigate(`/tread/${id}`);
    }
  };

  const img = new Image();
  img.src = image;
  img.onload = function () {
    const width = img.width;
    const height = img.height;
    // console.log(height, width);
    // Получите ширину изображения
    if (width > 567) {
      setWidth(567);
    } else {
      setWidth(width);
    }
    if (height > width && height > 700) {
      setHeight(600);
      setWidth(null);
    }
  };

  const style = {
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : undefined,
  };

  const copyLink = () => {
    const url = `http://localhost:3000/tread/${id}`;
    navigator.clipboard.writeText(url).then((res) => {
      console.log("все скопировано");
    });
  };

  const replyText = Number(reply) > 0 ? `${reply} replies` : "";
  const likesText = postLike === 0 ? "" : `${postLike} likes`;

  const resultText =
    replyText && likesText
      ? `${replyText} - ${likesText}`
      : `${replyText}${likesText}`;

  const makeQuote = () => {
    navigate(`/quote/${id}`);
  };

  // _____________________component__________________________

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div>
        <div className={styles.main}>
          <button className={styles.imgBtn}>
            <img
              className={styles.img}
              src={user.photo ? user.photo : example}
              alt=""
            />
            <img className={styles.plusIcon} src={treadsPlus} alt="" />
          </button>

          <div className={styles.descDiv}>
            <div className={styles.nickDiv}>
              <Link to={`/searchprof/${user.pk}`} className={styles.nick}>
                {user.username}
              </Link>
              <p className={styles.time}>{totaltime}</p>
            </div>
            <p className={styles.message}>{message}</p>
            <div className={styles.imgDiv}>
              {quote && <QuoteTreads tread={quote} />}
              {image && (
                <img
                  className={styles.bigImg}
                  style={style}
                  src={image}
                  alt="treadsImg"
                />
              )}
              {video && <VideoPlayer videoSource={video} />}
            </div>

            <div className={styles.btnAndLikes}>
              <div className={styles.btnDiv}>
                <button className={styles.btn}>
                  <img src={messageIcon} alt="" />
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    likeBtnClick();
                    setLikePict(!likePict);
                  }}
                  className={styles.btn}
                >
                  <img src={likePict ? likeAcc : likeIcon} alt="" />
                </button>
                <button onClick={repostBtnClick} className={styles.btn}>
                  <img src={rebbotIcon} alt="" />
                </button>
                <button className={styles.btn} onClick={copyLink}>
                  <img src={shareIcon} alt="" />
                </button>
              </div>
              <div className={styles.likesDiv}>
                <p className={styles.likeText}>{resultText}</p>
              </div>
            </div>
          </div>
          {section !== "treadPage" && (
            <div
              onClick={handleEmptySpaceClick}
              className={styles.emptySpace}
            ></div>
          )}
        </div>

        {<BigLine section={section} />}
        <OtherModal setActive={setRepostModalProf} active={repostModalProf}>
          <div className={styles.repostModal}>
            <button
              className={styles.removeBtn}
              onClick={() => {
                makeRemove();
                setRemoveClick(!removeClick);
              }}
            >
              Remove <img src={removeTreads} alt="" />
            </button>
            <button onClick={makeQuote} className={styles.quoteBtn}>
              Quote <img src={quoteTreads} alt="" />
            </button>
          </div>
        </OtherModal>
        <OtherModal active={repostModalMain} setActive={setRepostModalMain}>
          <div className={styles.repostModal}>
            <button onClick={addRepost} className={styles.repostBtn}>
              Repost <img src={rebbotIcon} alt="" />
            </button>
            <button onClick={makeQuote} className={styles.quoteBtn}>
              Quote <img src={quoteTreads} alt="" />
            </button>
          </div>
        </OtherModal>
      </div>
    );
  }
};

export default TreadsAndReplies;
