import styles from "./Common.module.css";

function Loading({ text, style }) {

    return (
        <div className = {styles.loading} style = {style && style}>
            {text}
        </div>
    );

}


export default Loading;