import logo from "../../../img/auth/pattern.svg";

import styles from "./LogoDesign.module.css"

const LogoDesign = ()=>{
    return(
        <div className={styles.logoDiv}>
        <img className={styles.logoImg} src={logo} alt="neobis" />
      </div>
    )
}

export default LogoDesign