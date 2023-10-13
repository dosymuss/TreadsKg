import changeIcon from "../../../img/treads/changeIcon.svg";
import Loader from "../../../ui/loader/Loader";
import TreadsAndReplies from "../../../ui/treads/TreadsAndReplies";

import styles from "./Switch.module.css";

const ProfileSwitch = ({
  RepTreads,
  MyTreads,
  change,
  setChange,
  like,
  setLike,
  remove,
  setRemove,
  loading,
  section
}) => {
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setChange(!change);
          }}
          className={styles.changeBtn}
        >
          <img src={changeIcon} alt="" />
          {change ? "Your posts" : "You reposted"}
        </button>
      </div>
      {change ? (
        loading ? (
          <Loader/>
        ) : (
          <div>
            {MyTreads.length !== 0 ? (
              MyTreads.map((item) => {
                console.log(item);
                return (
                  <TreadsAndReplies
                    section={section}
                    // section={"main"}
                    author={item.author}
                    time={item.date_posted}
                    id={item.id}
                    photo={item.image}
                    postLike={item.total_likes}
                    userLike={item.user_like}
                    like={like}
                    setLike={setLike}
                    message={item.text}
                    removeClick={remove}
                    setRemoveClick={setRemove}
                    image={item.image}
                    video={item.video}
                    quote={item.repost}
                  />
                );
              })
            ) : (
              <p className={styles.nothingTxt}>
                You haven’t posted any threads yet.
              </p>
            )}
          </div>
        )
      ) : (
        <div>
          {RepTreads ? (
            <TreadsAndReplies section={"prof"} />
          ) : (
            <p className={styles.nothingTxt}>
              You haven't reposted any topics yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSwitch;
