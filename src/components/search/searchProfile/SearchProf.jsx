import { useState } from "react";
import { useParams } from "react-router-dom";

import ProfileSwitch from "../../Profile/ProfileSwitch/ProfileSwitch";
import SearchProfHead from "./searchProfHead/SearchProfHead";
import SearchShare from "./searchFollowAndShare/SearchShare";
import ProfileDesign from "../../../ui/design/profilePageDesign/ProfileDesign";
import Navbar from "../../../ui/nav/Navbar/Navbar";

import styles from "./SearchProf.module.css";
import { useEffect } from "react";
import { getUserPost, mutualFoll } from "../../../api/search";

const SearchProf = () => {
  const { id } = useParams();
  const [searchUser, setSearchUser] = useState({});
  const [isFollowed, setIsFollowed] = useState(null)
  const [change, setChange] = useState(false);
  const [userTreads, setUserTreads] = useState([]);
  const [like, setLike] = useState(false);
  console.log(userTreads);

  useEffect(() => {
    mutualFoll(id)
    .then((res) => {
      console.log(res);
      setIsFollowed(res.data.detail);
    })
    .catch((error) => {
      console.log(error);
    });
    if (change) {
      getUserPost(id)
        .then((res) => {
          console.log(res);
          setUserTreads(res.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.data.message === "Access denied") {
            setUserTreads([]);
          }
        });
    }
  }, [id, change]);
  

  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.profDiv}>
        <div className={styles.infoDiv}>
          <SearchProfHead setSearchUser={setSearchUser} />
          <SearchShare  isFollowed={isFollowed} />
          <ProfileDesign />
          <ProfileSwitch
            section={"search"}
            MyTreads={userTreads}
            setChange={setChange}
            change={change}
            like={like}
            setLike={setLike}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchProf;
