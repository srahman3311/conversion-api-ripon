import { useState } from "react";
import axios from "axios";

// Important link regarding axios progressbar
// https://www.codingdeft.com/posts/react-upload-file-progress-bar/

// Stylesheet
import styles from "./Dashboard.module.css";

// Components
import Navbar from "../reuseable-components/navbar/Navbar";
import Footer from "../reuseable-components/footer/Footer";
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

        const endpoint = "http://localhost:5050/convert";
        const config = {
            maxContentLength: Infinity,
            maxBodyLength: Infinity, 
            onUploadProgress: ProgressEvent => {
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor(loaded * 100 / total)
                console.log('tes get value for progress upload : ',`${loaded} kb of ${total} kb | ${percent}%`)
            }
        }

        try {

            setLoading(true);

            const response = await axios.post(endpoint, imageData, config);
    
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
        <>  
            <Navbar />
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
            <Footer />

        </>
    );

}


export default Dashboard;