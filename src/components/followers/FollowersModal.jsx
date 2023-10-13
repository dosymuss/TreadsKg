import { useState, useEffect } from "react";
import { getFollowers, getFollowing, getPendingPers } from "../../api/profile";

import searchIcon from "../../img/follow/searchIcon.svg";
import exitFollow from "../../img/follow/exitFollow.svg";

import FollowContact from "../../ui/design/followContent/FollowContact";

import styles from "./FollowersModal.module.css";

const FollowersModal = ({ active, setActive, id }) => {

  const [selectedButton, setSelectedButton] = useState("followers");
  const [click, setClick] = useState(false);
  const [empty, setEmpty] = useState(true);
  const [userList, setUserList] = useState([]);
    const myPk = localStorage.getItem("pk")
  
  useEffect(() => {
    let fetchDataFunction;

    if (selectedButton === "followers") {
      fetchDataFunction = getFollowers;
    } else if (selectedButton === "following") {
      fetchDataFunction = getFollowing;
    } else if (selectedButton === "pending") {
      fetchDataFunction = getPendingPers;
    }

    if (fetchDataFunction) {
      fetchDataFunction(id?id:myPk)
        .then((res) => {
          setUserList(res.data.results);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedButton, click, empty]);

  const followersButtonClick = () => {
    setSelectedButton("followers");
  };

  const followingButtonClick = () => {
    setSelectedButton("following");
  };

  const pendingButtonClick = () => {
    setSelectedButton("pending");
  };

  const searchAccount = (searchTerm) => {
    if (searchTerm.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
      if (selectedButton === "followers") {
        const searchResults = userList.filter((user) => {
          const followerName = user.follower?.username || "";
          const followerFullName = user.follower?.full_name || "";
          return (
            followerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            followerFullName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setUserList(searchResults);
      } else if (selectedButton === "following") {
        const searchResults = userList.filter((user) => {
          const followeeName = user.followee?.username || "";
          const followeeFullName = user.followee?.full_name || "";
          return (
            followeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            followeeFullName.toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
        setUserList(searchResults);
      }
    }
  };

  return (
    <div className={active ? "modal-active" : "modal"}>
      <div className={styles.main}>
        <div className={styles.exitDiv}>
          <button
            onClick={() => {
              setActive(false);
            }}
            className={styles.exitBtn}
          >
            <img src={exitFollow} alt="выход" />
          </button>
        </div>
        <div className={styles.toggleDiv}>
          <button
            className={
              selectedButton === "followers"
                ? styles.toggleBtnActive
                : styles.toggleBtn
            }
            onClick={() => {
              setUserList([]);
              followersButtonClick();
            }}
          >
            Followers
          </button>
          <button
            className={
              selectedButton === "following"
                ? styles.toggleBtnActive
                : styles.toggleBtn
            }
            onClick={() => {
              setUserList([]);
              followingButtonClick();
            }}
          >
            Following
          </button>
          <button
            className={
              selectedButton === "pending"
                ? styles.toggleBtnActive
                : styles.toggleBtn
            }
            onClick={() => {
              setUserList([]);
              pendingButtonClick();
            }}
          >
            Pending
          </button>
        </div>
        <div className={styles.inpDiv}>
          <img src={searchIcon} alt="searchIcon" />
          <input
            onChange={(e) => {
              searchAccount(e.target.value);
            }}
            className={styles.inp}
            type="text"
            placeholder="Search"
          />
        </div>
        <div>
          {selectedButton === "followers" &&
            userList.map((item) => (
              <FollowContact
                click={click}
                setClick={setClick}
                key={item.id}
                id={item.follower.pk}
                name={item.follower.full_name}
                nickName={item.follower.username}
                followed={selectedButton}
                photo={item.follower.photo}
                followedStatus={item.is_followed}
              />
            ))}
          {selectedButton === "following" &&
            userList.map((item) => (
              <FollowContact
                click={click}
                setClick={setClick}
                key={item.id}
                id={item.followee.pk}
                name={item.followee.full_name}
                nickName={item.followee.username}
                followed={selectedButton}
                followedStatus={item.is_followed}
                photo={item.followee.photo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FollowersModal;
