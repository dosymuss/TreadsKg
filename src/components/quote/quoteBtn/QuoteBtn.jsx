import { postQuote } from "../../../api/post";
import { useNavigate } from "react-router-dom";
import ava from "../../../img/profile/initialAva.svg";

import styles from "./QuoteBtn.module.css";

function QuoteBtn({ limit, text, id }) {
  const navigate = useNavigate();

  const addQuote = () => {
    postQuote(id, text)
      .then((res) => {
        if (res.statusText === "Created") {
          navigate(`/tread/${id}`);
        }
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.main}>
      <img className={styles.ava} src={ava} alt="" />
      <button
        onClick={addQuote}
        disabled={limit || text === ""}
        className={styles.btn}
      >
        Add to thread
      </button>
    </div>
  );
}

export default QuoteBtn;
