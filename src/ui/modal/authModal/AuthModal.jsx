import { Children } from "react"
import styles from "./AuthModal.module.css"


const AuthModal = ({children,active})=>{
    return(
        <div className={active ? styles.modalActive : styles.modal}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    )
}



export default AuthModal 