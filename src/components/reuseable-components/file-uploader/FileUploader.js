import { useRef } from "react";

// STylesheet
import styles from "./FileUploader.module.css";


function FileUploader({ fileHandler, style }) {

    const inputFile = useRef(null); 
    const clickInputFile = () => inputFile.current.click();

 
    return (
        <div className = {styles.file_uploader} style = {style && style}>
            <form>
                <input 
                    type = "file" 
                    ref = {inputFile}
                    onChange = {fileHandler}
                />
                <span to = "" onClick = {clickInputFile}>Upload File</span>
            </form>
        </div>
    );
}


export default FileUploader;