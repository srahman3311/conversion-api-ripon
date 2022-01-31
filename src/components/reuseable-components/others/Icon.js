import styles from "./Common.module.css";


function Icon({ iconClassName, style }) {
    return (
        <div className = {styles.icon_container} style = {style && style}>
            <i className = {iconClassName} ></i>
        </div>
    );
}


export default Icon;
