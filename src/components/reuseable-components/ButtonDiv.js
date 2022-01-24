import styles from "./Button.module.css";

function ButtonDiv({ title, clickHandler }) {

    return (
        <div className={styles.button_div}>
            <button onClick = {clickHandler}>{title}</button>
        </div>
    );

}


export default ButtonDiv;