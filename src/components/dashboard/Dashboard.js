import { useState } from "react";
import axios from "axios";
import { services } from "../../libs/data";

// Important link regarding axios progressbar
// https://www.codingdeft.com/posts/react-upload-file-progress-bar/

// Stylesheet
import styles from "./Dashboard.module.css";

// Components
import Navbar from "../reuseable-components/navbar/Navbar";
import Footer from "../reuseable-components/footer/Footer";
import Header from "../reuseable-components/others/Header";
import Button from "../reuseable-components/others/Button";
import TextIcon from "../reuseable-components/others/TextIcon";
import FileUploader from "../reuseable-components/file-uploader/FileUploader";


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
                <FileUploader file = {file} fileHandler = {fileHandler} />
                <div className = {styles.services}>
                    {
                        services.map((service) => {
                            return (
                                <div key = {service.id} className = {styles.service_card}>
                                    <TextIcon 
                                        text = {service.textIcon} 
                                        style = {{
                                            color: service.textIconColor,
                                            backgroundColor: service.textIconBackgroundColor
                                        }}
                                    />
                                    <Header 
                                        text = {service.title}
                                        style = {{
                                            fontSize: "1.5rem",
                                            marginBottom: "5px"
                                        }} 
                                    />
                                    {/* <h2>{service.title}</h2> */}
                                    <p>{service.description}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <Button
                    text = "Convert"
                    clickHandler = {convertFile} 
                    style = {{
                        backgroundColor: "darkblue"
                    }}
                />
                <Button
                    text = "Download"
                    clickHandler = {downloadFile} 
                    style = {{
                        display: downloadUri ? "inline" : "none",
                        backgroundColor: "darkblue"
                    }}
                />
            </main>
            <Footer />

        </>
    );

}


export default Dashboard;