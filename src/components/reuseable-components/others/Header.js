import styles from "./Common.module.css";

function Header({ text }) {


    return (
        <h1 className={styles.header}>{text}</h1>
    );
}


export default Header;