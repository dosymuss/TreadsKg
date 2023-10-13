import { Link } from "react-router-dom";

import styles from "./NavItem.module.css"

const NavItem = ({isActive, img,imgClick, desc, path,weight, onClick }) => {
  return (<Link onClick={onClick} className={styles.navItem} to={path}>
    <img src={isActive?imgClick:img} alt="" />
    <p style={{fontWeight:isActive?"bold":"normal"}} className={styles.navText}>{desc}</p>
  </Link>)
};

export default NavItem;
