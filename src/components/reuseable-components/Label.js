import styles from "./Label.module.css";

function Label({ text }) {

    return (
        <label className={styles.label}>{text}</label>
    )

}


export default Label;