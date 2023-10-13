import styles from "./AuthTitle.module.css"

const AuthTitle = ({ title, desc }) => {
  return (
    <div className={styles.textDiv}>
      <p className={styles.text}>{title}</p>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};


export default AuthTitle
