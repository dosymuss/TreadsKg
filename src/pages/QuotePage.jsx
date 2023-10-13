import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getPostById } from "../api/post";

import QuoteTreads from "../components/quote/quoteTreads/QuoteTreads";
import QuoteBtn from "../components/quote/quoteBtn/QuoteBtn";
import Navbar from "../ui/nav/Navbar/Navbar";
import BigLine from "../ui/design/bigLine/BigLine";
import CreateInp from "../ui/buttons/createTreadsBtn/createInp/CreateInp";

import exit from "../img/follow/exitFollow.svg";
import ava from "../img/profile/initialAva.svg";

import styles from "../styles/QuotePage.module.css";


function QuotePage() {
  const [difference, setDifference] = useState(null);
  const [text, setText] = useState("");
  const [limit, setLimit] = useState(false);
  const [tread, setTread] = useState({});

  const { username, photo } = JSON.parse(localStorage.getItem("userData"));

  const { id } = useParams();
  useEffect(() => {
    getPostById(id)
      .then((res) => {
        setTread(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className={styles.main}>
      <div className={styles.navDiv}>
        <Navbar />
      </div>
      <div className={styles.contentDiv}>
        <Link className={styles.title} to={`/tread/${id}`}>
          <img src={exit} alt="выход" />
          Quote
        </Link>
        <BigLine />
        <div className={styles.quoteDiv}>
          <div className={styles.myAvaDiv}>
            <img className={styles.ava} src={photo ? photo : ava} alt="" />
            <span className={styles.line}></span>
          </div>
          <div>
            <div className={styles.createDiv}>
              <div className={styles.limitDiv}>
                <p className={styles.nickName}>{username}</p>
                <p style={{ color: "red", margin: "0" }}>
                  {difference && `- ${difference}`}
                </p>
              </div>
              <CreateInp
                setText={setText}
                placeholder={"Start a thread..."}
                style={styles.createInp}
                text={text}
                limit={limit}
                setLimit={setLimit}
                setDifference={setDifference}
              />
            </div>
            <QuoteTreads tread={tread} />
          </div>
        </div>
        <QuoteBtn limit={limit} text={text} id={id} />
      </div>
      <div className={styles.invisDiv}></div>
    </div>
  );
}

export default QuotePage;
