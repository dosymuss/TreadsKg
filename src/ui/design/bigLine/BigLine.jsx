import styles from "./BigLine.module.css";

const BigLine = ({section}) => {
  return (
    <div className={ section === "treadPage"?styles.mainReply:styles.main}>
      <span className={section === "treadPage"?styles.lineReply:styles.line}></span>
    </div>
  );
};

export default BigLine;
