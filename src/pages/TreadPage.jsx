import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "../ui/nav/Navbar/Navbar";
import FollowPanel from "../ui/design/usersPanel/FollowPanel";
import TreadsAndReplies from "../ui/treads/TreadsAndReplies";
import exit from "../img/profile/editFormExit.svg";
import Reply from "../ui/treads/replies/Reply";
import ReplyTreadsInp from "../components/treads/ReplyTreadsInp";
import { useEffect } from "react";
import { getPostById } from "../api/post";
import { getPostComments } from "../api/post";
import { getProfileById } from "../api/profile";

import styles from "../styles/TreadPage.module.css";

const TreadPage = () => {
  const { id } = useParams();
  const [tread, setTread] = useState({});
  const [reply, setReply] = useState([]);
  const [like, setLike] = useState(false);
  console.log(reply);
  // const treads = useSelector(state => state.tread);
  // const tread = treads.find(item => item.id === parseInt(id));
  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setTread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getPostComments(id)
      .then((res) => {
        setReply(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [id, like]);
  
  return (
    <div className={styles.mainDiv}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.treadsDiv}>
        <div className={styles.treadsAndRep}>
          <div className={styles.linkDiv}>
            <Link className={styles.Link} to={"/main"}>
              <img src={exit} alt="" />
              Thread
            </Link>
          </div>
          <TreadsAndReplies
                      // section={"treadPage"}
                      // message={"hi"}
                      // photo={null}
                      // author={"i"}
                      // id={15}
                      // postLike={15}
                      // userLike={true}
                      // time={"1d"}
                      // like={like}
                      // setLike={setLike}
            section={"treadPage"}
            message={tread.text}
            image={tread.image}
            author={tread.author}
            id={tread.id}
            postLike={tread.total_likes}
            userLike={tread.user_like}
            time={tread.date_posted}
            like={like}
            setLike={setLike}
            video={tread.video}
            quote={tread.repost}
          />
                        {/* <Reply
                author={"i"}
                time={"1h"}
                id={2}
                reply={2}
                text={"hello"}
                likes={5}
                userLike={true}
              /> */}
          {reply.map((item) => {
            return (
              <Reply
                author={item.author}
                time={item.date_posted}
                id={item.id}
                reply={item.reply}
                text={item.text}
                likes={item.total_likes}
                userLike={item.user_like}
                setLike={setLike}
                like={like}
              />
            );
          })}
        </div>
        <ReplyTreadsInp id={id} author={tread.author}/>
      </div>
      <div className={styles.followDiv}>
        <FollowPanel />
      </div>
    </div>
  );
};

export default TreadPage;
