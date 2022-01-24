import styles from "./Button.module.css";

function Button({ title, clickHandler }) {

    return (
        <button className={styles.button} onClick = {clickHandler}>{title}</button>
    );

}


export default Button;