import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getProfileById } from "../../api/profile";
import initialAva from "../../img/profile/initialAva.svg"

import styles from "./ReplyTreadsInp.module.css";

const ReplyTreadsInp = ({ id, author }) => {
  const [treadAuthor, setTreadAuthor] = useState("");
  const ava = JSON.parse(localStorage.getItem("userData")).photo;

  console.log(author);

  useEffect(() => {
    getProfileById(author)
      .then((res) => {
        setTreadAuthor(res.data.username);
        // setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author]);

  return (
    <Link className={styles.link} to={`/replypost/${id}`}>
      <label className={styles.main}>
        <img className={styles.ava} src={ava?ava:initialAva} alt="ava" />
        <input
          className={styles.inp}
          type="text"
          placeholder={`Reply to ${treadAuthor}`}
        />
      </label>
    </Link>
  );
};

export default ReplyTreadsInp;
