// STylesheet
import styles from "./FileUploader.module.css";

function FileUploader({ file, fileHandler }) {

    return (
        <div className = {styles.file_upload_container}>
            <form className = {styles.image_file_input}>
                <input type = "file" onChange = {fileHandler} />
                <span className={styles.image_filename}>{ file === null ? "No File Selected" : file.name}</span>
                <span className={styles.image_upload_button}>Choose File</span>
            </form>
        </div>
    );

}


export default FileUploader;