import styles from "./BlackBtn.module.css"

const BlackBtn = ({ children, onClick, dis }) => {
  return <button type="submit" onClick={onClick} disabled={dis}className={styles.button}>{children}</button>;
};

export default BlackBtn;
