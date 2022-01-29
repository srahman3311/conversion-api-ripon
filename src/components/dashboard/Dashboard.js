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

    async function convertToPDF() {


        const endpoint = "https://api2.online-convert.com/jobs";
        const config = {
            headers: {
                "x-oc-api-key": process.env.REACT_APP_API_KEY,
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        }

        const requestBody = {
            "conversion": [{
                "category": "audio",
                "target": "mp3"
            }]
        }

        try {

            setLoading(true);
            const response = await axios.post(endpoint, requestBody, config);

            console.log(response.data);

            const { id, server } = response.data;

            const conversionEndpoint = `${server}/upload-file/${id}`;
            const newConfig = {
                headers: {
                    "x-oc-api-key": process.env.REACT_APP_API_KEY,
                    "x-oc-upload-uuid": "random_tex",
                    "Content-Type": "multipart/form-data"
                }
            }

            const formData = new FormData();


            formData.append("file", file);

            try {

                setLoading(true);

                const conversionResponse = await axios.post(conversionEndpoint, formData, newConfig);

                console.log(conversionResponse.data);

                const jobConfig = {
                    headers: {
                        "x-oc-api-key": process.env.REACT_APP_API_KEY,
                        "Cache-Control": "no-cache"
                    }
                }

                const jobEndpoint = "https://api2.online-convert.com/jobs/" + id

                try {
                    setLoading(true)

                    getJobInfo();

                    function getJobInfo() {

                        setTimeout(async () => {

                            const jobResponse = await axios.get(jobEndpoint, jobConfig);

                            console.log(jobResponse.data);
                            if(jobResponse.data.status.code === "completed") {
                                return response.status(200).send(jobResponse.data.output[0].uri)
                            }

                            getJobInfo();
                            
                        }, 2000);

                    }

                } catch(error) {
                    alert("something went wrong");
                } finally {
                    setLoading(false);
                }

            } catch(error) {
                console.log(error);
                alert("Something went wrong");

            } finally {
                setLoading(false);
            }


        } catch(error) {

            console.log(error);
            alert("Something went wrong");

        } finally {
            setLoading(false);
        }


    }


    const convertFile = async () => {

        if(!file) return alert("Please upload the file");

        const imageData = new FormData();
        imageData.append("file", file);

        const endpoint = "http://localhost:5050/upload";
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