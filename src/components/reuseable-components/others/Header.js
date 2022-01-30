import styles from "./Common.module.css";

function Header({ text, style }) {


    return (
        <h1 className={styles.header} style = { style && style }>{text}</h1>
    );
}


export default Header;