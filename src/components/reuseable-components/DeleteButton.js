// Stylesheet
import styles from "./Button.module.css";

function DeleteButton({itemId, deleteHandler}) {

    return (
        <button className={styles.delete_button} onClick={() => deleteHandler(itemId)}>Delete</button>
    );

}


export default DeleteButton;