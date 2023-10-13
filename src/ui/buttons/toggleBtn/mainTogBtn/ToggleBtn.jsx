import styles from "./ToggleBtn.module.css"

const ToggleBtn = ({treads, setTreads})=>{
    return(
        <div className={styles.toggleDiv}>
            <button className={!treads?styles.toggleBtnActive:styles.toggleBtn} onClick={()=>{setTreads(false)}}>For you</button>
            <button className={treads?styles.toggleBtnActive:styles.toggleBtn} onClick={()=>{setTreads(true)}}>Following</button>
        </div>
    )
}


export default ToggleBtn