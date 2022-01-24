import { useState } from "react";
import axios from "axios";

// Stylesheet
import styles from "./Dashboard.module.css";

// Components
import Header from "../reuseable-components/Header";


function Dashboard() {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [targetFileFormat, setTargetFileFormat] = useState(""); 
    const [downloadUri, setDownloadUri] = useState("");


    const fileHandler = event => setFile(event.target.files[0]);
    const downloadFile = () => window.location.href = downloadUri;


    const convertFile = async () => {

        if(!file) return alert("Please upload the file");

        const imageData = new FormData();
        imageData.append("file", file);

        try {

            setLoading(true);

            const response = await axios.post("http://localhost:5050/upload", imageData);
    
            setDownloadUri(response.data);

        } catch(error) {

            setError(true);

        } finally {

            setLoading(false);
        }

    }

    


    if(loading) return <div>Loading...</div>
    if(error) return <div>Something went wrong</div>

    return (
        <main className={styles.dashboard}>
            <Header text = "Welcome to Conversion API Software" />

            <div className = {styles.file_upload_container}>
                <form className = {styles.image_file_input}>
                    <input type = "file" onChange = {fileHandler} />
                    <span className={styles.image_filename}>{ file === null ? "No File Selected" : file.name}</span>
                    <span className={styles.image_upload_button}>Choose File</span>
                </form>
                
            </div>
            <button onClick = {convertFile}>Convert</button>
            <button
                style = {{
                    display: downloadUri ? "inline" : "none"
                }} 
                onClick = {downloadFile}
            >
                Download File
            </button>

        </main>
    );

}


export default Dashboard;