import styles from "./Common.module.css";

function HiddenDiv({ text, clickHandler, style }) {

    return (
        <div 
            className={styles.hidden_div} 
            onClick = {clickHandler}
            style = {style && style}
        >
            {text}
        </div>
    );

}


export default HiddenDiv;