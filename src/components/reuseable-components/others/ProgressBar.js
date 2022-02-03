// Stylesheet
import styles from "./Common.module.css";


function ProgressBar ({ text, progress, style }) {

    return (
    
        <div className={styles.progress_bar} style = {style && style}>
            <div className = {styles.progress_bar_text}>{text}</div>
            <div className={styles.progress_bar_content_wrapper} >
                <div 
                    className = {styles.progress_bar_content}
                    style = {{ width: `${progress}%` }}
                >
                </div>
            </div>
        </div>
    );
}


export default ProgressBar;