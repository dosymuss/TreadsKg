import styles from './ShortLine.module.css';


const ShortLine = ({search})=>{
    return(
        <div className={search?styles.searchLineDiv:styles.mainDiv}>
            <span className={search?styles.searchLine:styles.line}></span>
        </div>
    )
}


export default ShortLine