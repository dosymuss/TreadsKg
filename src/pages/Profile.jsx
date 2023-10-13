import { useEffect, useState } from "react";

import ProfileHead from "../components/Profile/profileHead/ProfileHead";
import EditBtns from "../ui/buttons/profileBtn/EditBtns/EditBtns";
import ProfileDesign from "../ui/design/profilePageDesign/ProfileDesign";
import Navbar from "../ui/nav/Navbar/Navbar";

import styles from "../styles/Profile.module.css";
import ProfileSwitch from "../components/Profile/ProfileSwitch/ProfileSwitch";
import { getPost } from "../api/post";

const Profile = () => {
  const [change, setChange] = useState(false);
  const [myTreads, setMyTreads] = useState([]);
  const [like, setLike] = useState(false);
  const [remove, setRemove] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (change) {
      getPost()
        .then((res) => {
          setMyTreads(res.data.results);
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [change,like,remove]);

  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.profDiv}>
        <div className={styles.infoDiv}>
          <ProfileHead />
          <EditBtns />
          <ProfileDesign />
          <ProfileSwitch
            MyTreads={myTreads}
            change={change}
            setChange={setChange}
            like={like}
            setLike={setLike}
            remove={remove}
            setRemove={setRemove}
            loading={loading}
            section={"prof"}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
