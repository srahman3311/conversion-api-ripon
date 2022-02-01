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
import Loading from "../reuseable-components/others/Loading";
import ProgressBar from "../reuseable-components/others/ProgressBar";


function Dashboard() {


    const [uploadProgress, setUploadProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [file, setFile] = useState(null);
    const [selectableFileFormats, setSelectableFileFormats] = useState([]);
    const [selectedFileType, setSelectedFileType] = useState("");
    const [selectedFileTypeExtension, setSelectedFileTypeExtension] = useState("");
    const [targetFileFormat, setTargetFileFormat] = useState(""); 
    const [downloadUri, setDownloadUri] = useState("");
    const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);
    const [showTargetFileTypeDropdown, setShowTargetFileTypeDropdown] = useState(false);


    useEffect(() => {

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

    const fileHandler = event => setFile(event.target.files[0]);

    const selectConversionFileType = event => {

        const fileType = event.target.textContent

        setSelectedFileType(fileType);

        for(let x = 0; x < fileTypes.length; x++) {

            const item = fileTypes[x];

            if(item.title === fileType) {
                setSelectedFileTypeExtension(item.fileExtension);
                break;
            }
        }
        setShowFileTypeDropdown(false);
    }

    const selectTargetFileType = event => setTargetFileFormat(event.target.textContent) 

    // Toggle file type dropdown
    const toggleFileTypeDropdown = () => {

        showFileTypeDropdown ? setShowFileTypeDropdown(false) : setShowFileTypeDropdown(true);

        // Hide target file type dropdown if it was displayed
        setShowTargetFileTypeDropdown(false);

    }

    // Toggle target file type dropdown
    const toggleTargetFileTypeDropdown = () => {

        showTargetFileTypeDropdown ? setShowTargetFileTypeDropdown(false) : setShowTargetFileTypeDropdown(true);

        // Hide file type dropdown if it was displayed
        setShowFileTypeDropdown(false);

    }

    // Hide dropdowns if user click anywhere on the main UI
    const hideDropdowns = () => {
        showFileTypeDropdown && setShowFileTypeDropdown(false);
        showTargetFileTypeDropdown && setShowTargetFileTypeDropdown(false);
    }

    const convertFile = async () => {

        if(!file) return alert("Please upload the file");

        const fileExtension = file.name.substring(file.name.indexOf("."), file.name.length);

        if(!fileExtension.includes(selectedFileTypeExtension)) {
            return alert(`Please upload a ${selectedFileType} file`);
        }
        

        const data = new FormData();
        data.append("file", file);
        data.append("targetFileFormat", targetFileFormat);

        const endpoint = "http://localhost:5050/convert";

        const config = {
            maxContentLength: Infinity,
            maxBodyLength: Infinity, 
            onUploadProgress: ProgressEvent => {
                const {loaded, total} = ProgressEvent;
                let percent = Math.floor(loaded * 100 / total);
                setUploadProgress(percent);
            }
        }

        try {
            setLoading(true);

            const response = await axios.post(endpoint, data, config);
            setDownloadUri(response.data);

        } catch(error) {

            setError(true);

        } finally {
            
            setLoading(false);
            setUploadProgress(0);

        }

    }

    const downloadFile = () => window.location.href = downloadUri;

    if(error) return <div>Something went wrong</div>

    return (
        <>  
            <Navbar />
            <main className={styles.dashboard} onClick = {hideDropdowns}>
                <Header text = "Welcome to Conversion API Software" />

                <div className = {styles.select_file_types}>
                    <Paragraph text = "Convert" />
                    <div 
                        className = {styles.select_conversion_file_type}
                        onClick = {toggleFileTypeDropdown}
                    >
                        <Paragraph text = {selectedFileType} />
                        <Icon iconClassName = "fas fa-chevron-down"/>
                        <Dropdown 
                            data = {fileTypes} 
                            nameKey = "title" 
                            clickHandler = {selectConversionFileType}
                            style = {{
                                display: showFileTypeDropdown ? "block" : "none"
                            }}
                        />
                    </div>
                    <Paragraph text = "To" />
                    <div 
                        className = {styles.select_target_file_type}
                        onClick = {toggleTargetFileTypeDropdown}
                    >
                        <Paragraph text = {targetFileFormat} />
                        <Icon iconClassName = "fas fa-chevron-down"/>
                        <Dropdown 
                            data = {selectableFileFormats} 
                            nameKey = "title" 
                            clickHandler = {selectTargetFileType}
                            style = {{
                                display: showTargetFileTypeDropdown ? "block" : "none"
                            }}
                        />
                    </div>
                </div>
                <FileUploader file = {file} fileHandler = {fileHandler} />

                <section 
                    className = {styles.uploading_converting_progress} 
                    style = {{ display: loading ? "block" : "none" }}
                >
                    <ProgressBar 
                        progress = {uploadProgress} 
                        style={{
                            display: uploadProgress > 0 && uploadProgress < 100 ? "flex" : "none"
                        }}
                    />
                    <Loading
                        text = "Converting...." 
                        style = {{
                            display: uploadProgress === 100 ? "flex" : "none",
                            height: "100%"
                        }}
                    />
                </section>
               
                <Button
                    text = "Convert"
                    clickHandler = {convertFile} 
                    style = {{
                        display: file ? "inline-block" : "none",
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