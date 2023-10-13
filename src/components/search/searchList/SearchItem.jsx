import { Link } from "react-router-dom";

import ava from "../../../img/profile/initialAva.svg";
import FollowBtn from "../../../ui/buttons/FollowBtn/FollowBtn";
import { useEffect, useState } from "react";
import { getFollowersById, getProfileById } from "../../../api/profile";

import styles from "./SearchList.module.css";
import Loader from "../../../ui/loader/Loader";

const SearchItem = ({ id, username, isFollowed }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [follow, setFollow] = useState("")
  console.log(follow);

  useEffect(() => {
    getProfileById(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
      
    getFollowersById(id)
      .then((res) => {
        if(res){
          console.log(res);
          setFollow(res.data.results.length)
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(()=>{
        setLoading(false)
      })
  }, [id]);

  if(loading){
    return <Loader/>
  }
  else{
    return (
      <div className={styles.main} key={id}>
        <img
          className={styles.ava}
          src={user.photo ? user.photo : ava}
          alt=""
        />
        <div className={styles.descDiv}>
          <div className={styles.nickDiv}>
          <Link to={`/searchprof/${id}`}  className={styles.nickname}>
              {username}
            </Link>
            <p className={styles.job}>{user.full_name?user.full_name:""}</p>
          </div>
          <p className={styles.follow}>{`${follow} followers`}</p>
        </div>
        <FollowBtn isFollowed={isFollowed}  id={id}/>
      </div>
    );
  }


  }


export default SearchItem;
