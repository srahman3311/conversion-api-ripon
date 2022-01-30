import styles from "./Common.module.css";

function Button({ text, clickHandler, style }) {

    return (
        <button 
            className={styles.button} 
            onClick = {clickHandler}
            style = {style && style}
        >
            {text}
        </button>
    );

}


export default Button;