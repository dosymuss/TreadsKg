import { Link, useParams } from "react-router-dom";
import { useState,useEffect } from "react";

import { getPostById } from "../api/post";
import TreadsAndReplies from "../ui/treads/TreadsAndReplies";
import Navbar from "../ui/nav/Navbar/Navbar";
import CreateReply from "../components/reply/createreply/CreateReply";
import BigLine from "../ui/design/bigLine/BigLine";

import exit from "../img/follow/exitFollow.svg"

import styles from "../styles/ReplyPage.module.css";


const ReplyPage = () => {
  const [like, setLike] = useState(false)
  const [tread,setTread] = useState([])

  const {id} = useParams()

  console.log(tread);

  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setTread(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar/>
      </div>
      <div className={styles.contentDiv}>
      <Link className={styles.title} to={`/tread/${id}`}>
      <img src={exit} alt="выход" />
      Reply
      </Link>
      <BigLine/>
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
          />
          <CreateReply author={tread.author}/>
      </div>
      <div className={styles.invisDiv}></div>
    </div>
  );
};

export default ReplyPage;
