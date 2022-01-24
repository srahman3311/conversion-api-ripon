import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Stylesheet
import styles from "./Dashboard.module.css";

// Components
import Header from "../reuseable-components/Header";


function Dashboard() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [downloadUri, setDownloadUri] = useState("");



    useEffect(() => {

        if(!localStorage.getItem("user")) navigate("/")

    }, [])




    function fileHandler(event) {

        event.preventDefault();

        setFile(event.target.files[0])

    }

    async function converToPDF() {


        if(!file) return alert("Please upload the file");

        const imageData = new FormData();
        imageData.append("file", file);

        console.log(file)

        try {

            const response = await axios.post("http://localhost:5050/upload", imageData);
            window.location.href = `${response.data}`;
            // return setDownloadUri(response.data);

        } catch(error) {
            return console.log(error);
        }

        // return;

        //return console.log(typeof file);
        //const newBlob = new Blob(file, {type: file.type});
        //return console.log(newBlob);


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
                "category": "image",
                "target": "png"
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
                    //'Accept': 'application/json',
                    "Content-Type": "multipart/form-data",
                    // "Content-Type": file.type,
                    // "Cache-Control": "no-cache",
                    //"Content-Disposition": `form-data; name=file; filename=${file.name}`
                }
            }

            const formData = new FormData();

            
            formData.append("file", file);

            console.log(formData);
            console.log(file);

            try {

                setLoading(true);

                const conversionResponse = await axios.post(conversionEndpoint, formData, newConfig);
                // const conversionResponse = await axios({
                //     method: "post",
                //     url: `${server}/upload-file/${id}`,
                //     data: formData,
                //     headers: newConfig.headers,
                // });

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

                    const jobResponse = await axios.get(jobEndpoint, jobConfig);
                    console.log(jobResponse.data);

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


    async function remoteUpload() {

        try {

            const response = await axios.post("http://localhost:5050/remote-upload");

            console.log(response.data);

        } catch(error) {
            console.log(error.response.data)
            alert(error.response.data)
        }

    }

    if(loading) return <div>Loading...</div>

    // if(downloadUri) return <Link to ={downloadUri} target="_blank"></Link>

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
            <button onClick = {converToPDF}>Convert</button>
            <button onClick={remoteUpload}>Remote</button>
        </main>
    );

}


export default Dashboard;