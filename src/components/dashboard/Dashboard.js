import { useEffect, useState } from "react";
import axios from "axios";
import { fileTypes, services } from "../../libs/data";


// Important link regarding axios progressbar
// https://www.codingdeft.com/posts/react-upload-file-progress-bar/

// Stylesheet
import styles from "./Dashboard.module.css";

// Components
import Navbar from "../reuseable-components/navbar/Navbar";
import Footer from "../reuseable-components/footer/Footer";
import Header from "../reuseable-components/typography/Header";
import Paragraph from "../reuseable-components/typography/Paragraph";
import Button from "../reuseable-components/others/Button";
import TextIcon from "../reuseable-components/others/TextIcon";
import DropdownList from "../reuseable-components/others/DropdownList";
import Dropdown from "../reuseable-components/dropdown/Dropdown";
import FileUploader from "../reuseable-components/file-uploader/FileUploader";
import Icon from "../reuseable-components/others/Icon";


function Dashboard() {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [fileFormats, setFileFormats] = useState([]);
    const [selectableFileFormats, setSelectableFileFormats] = useState([]);
    const [selectedFileType, setSelectedFileType] = useState("");
    const [selectedFileTypeExtension, setSelectedFileTypeExtension] = useState("");
    const [targetFileFormat, setTargetFileFormat] = useState(""); 
    const [downloadUri, setDownloadUri] = useState("");


    useEffect(() => {

        setFileFormats(fileTypes);
        if(!selectedFileType) {
            setSelectedFileType(fileTypes[0].title);
            setSelectedFileTypeExtension(fileTypes[0].fileExtension)
        } 

        for(let x = 0; x < fileTypes.length; x++) {

            const fileType = fileTypes[x];

            if(fileType.title === selectedFileType) {

                const newArray = [];
                const items = fileType.possibleConversionFileTypes.split(",");

                items.forEach((item, index) => {
                    newArray.push({
                        id: index + 1,
                        title: item
                    })
                })

                setSelectableFileFormats(newArray);
                setTargetFileFormat(newArray[0].title)
                break;
            }
        }

    }, [selectedFileType])

    const handleChange = (event) => {

        const { name, value } = event.target;

        if(name === "selectedFileType") {

            for(let x = 0; x < fileTypes.length; x++) {

                const fileType = fileTypes[x];
    
                if(fileType.title === value) {
    
                    setSelectedFileTypeExtension(fileType.fileExtension);
                    break;
                }
            }
            
            return setSelectedFileType(value);
        } 
        setTargetFileFormat(value);
       
    }
    const fileHandler = event => setFile(event.target.files[0]);
    const downloadFile = () => window.location.href = downloadUri;


    const convertFile = async () => {

        if(!file) return alert("Please upload the file");

        const fileExtension = file.name.substring(file.name.indexOf("."), file.name.length);

        if(!fileExtension.includes(selectedFileTypeExtension)) {
            return alert(`Please upload a ${selectedFileType} file`);
        }
        

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

                <div className = {styles.select_file_types}>
                    <Paragraph text = "Convert" />
                    <div className = {styles.select_conversion_file_type}>
                        <Paragraph text = {selectedFileType} />
                        <Icon iconClassName = "fas fa-chevron-down"/>
                        <Dropdown data = {fileTypes} nameKey = "title" />
                    </div>
                    <Paragraph text = "To" />
                    <div className = {styles.select_target_file_type}>
                        <Paragraph text = {targetFileFormat} />
                        <Icon iconClassName = "fas fa-chevron-down"/>
                        <Dropdown data = {selectableFileFormats} nameKey = "title" />
                    </div>
                </div>
                <FileUploader file = {file} fileHandler = {fileHandler} />
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
                                    <Paragraph 
                                        text = {service.description}
                                    />
                                
                                </div>
                            );
                        })
                    }
                </div>
               
            </main>
            <Footer />

        </>
    );

}


export default Dashboard;