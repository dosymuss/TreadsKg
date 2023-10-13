import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getTreadsForFollowing, getTreadsForYou, getTreads } from "../store/treadsSlice";

import CreateTreads from "../ui/buttons/createTreadsBtn/CreateTreads";
import ToggleBtn from "../ui/buttons/toggleBtn/mainTogBtn/ToggleBtn";
import Navbar from "../ui/nav/Navbar/Navbar";
import FollowPanel from "../ui/design/usersPanel/FollowPanel";
import BigLine from "../ui/design/bigLine/BigLine";
import TreadsAndReplies from "../ui/treads/TreadsAndReplies";

import styles from "../styles/Main.module.css";

const MainPage = () => {
  const [showTreads, setShowTreads] = useState(false);
  const [create, setCreate] = useState(false);
  const [like, setLike] = useState(false);

  const treads = useSelector((state) => state.tread);
  
  console.log(treads);
  const dispatch = useDispatch();
  useEffect(() => {
    if (showTreads) {
      dispatch(getTreadsForFollowing());
      // dispatch(getTreads())
    } else {
      dispatch(getTreadsForYou());
    }
  }, [create, showTreads, like]);

  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.treadsDiv}>
        <p className={styles.HomeTitle}>Home</p>
        <ToggleBtn treads={showTreads} setTreads={setShowTreads} />
        <CreateTreads active={create} setActive={setCreate} />
        <BigLine />
        <div className={styles.treadDiv}>
          {treads !== [] &&
            treads.map((tread) => (
              <TreadsAndReplies
                section={"main"}
                message={tread.text}
                photo={tread.photo}
                author={tread.author}
                id={tread.id}
                postLike={tread.total_likes}
                userLike={tread.user_like}
                time={tread.date_posted}
                like={like}
                setLike={setLike}
                image={tread.image}
                video={tread.video}
                quote={tread.repost}
              />
            ))}
        </div>
      </div>
      <div className={styles.followDiv}>
        <FollowPanel />
      </div>
    </div>
  );
};

export default MainPage;
