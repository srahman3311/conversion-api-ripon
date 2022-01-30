// Stylesheet
import styles from "./Common.module.css";

function TextIcon({ text, style }) {

    return (
        <div className = {styles.text_icon}>
            <span 
                className = {styles.text_icon_content}
                style = {style && style}
            >
                {text}
            </span>
        </div>
    );

}


export default TextIcon;