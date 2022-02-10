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
import Icon from "../reuseable-components/others/Icon";
import TextIcon from "../reuseable-components/others/TextIcon";
import Dropdown from "../reuseable-components/dropdown/Dropdown";
import FileUploader from "../reuseable-components/file-uploader/FileUploader";
import Loading from "../reuseable-components/others/Loading";
import ProgressBar from "../reuseable-components/others/ProgressBar";


function Dashboard() {


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [file, setFile] = useState(null);
    // If uploaded file's name is too long, show it to user shortened it inside fileHanlder function
    const [filename, setFilename] = useState("");

    // We need to hide convert button after user clicks on it
    const [showConvertButton, setShowConvertButton] = useState(false);
    // Based on loading and uploadProgress states we will display upload, convert progress to the user
    const [loading, setLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Selectable and target file formats
    const [targetFileFormat, setTargetFileFormat] = useState(""); 
    const [selectableFileFormats, setSelectableFileFormats] = useState([]);

    // Selected file type and it's file extension
    const [selectedFileType, setSelectedFileType] = useState("");
    const [selectedFileTypeExtension, setSelectedFileTypeExtension] = useState("");

    // Dropdown displaying conditions
    const [showFileTypeDropdown, setShowFileTypeDropdown] = useState(false);
    const [showTargetFileTypeDropdown, setShowTargetFileTypeDropdown] = useState(false);
    
    // Download URI
    const [downloadUri, setDownloadUri] = useState("");
   


    useEffect(() => {

        // If user hasn't selected any file type yet then update the file type and it's extension states with the first
        // item's file type title and it's extension
        if(!selectedFileType) {
            setSelectedFileType(fileTypes[0].title);
            setSelectedFileTypeExtension(fileTypes[0].fileExtension)
        } 

        // This loop will run whenever user selects a file type to show him/her the selectable file formats. For example -
        // if user select PDF from the dropdown as the file type then we only must show available target file formats. There
        // are three selectable file formats for PDF - JPG, WORD and POWERPOINT
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



    const fileHandler = event => {

        const newFile = event.target.files[0]
        setFile(newFile);

        // If uploaded file's name is too long, need to shorten it to show to the user
        let newFilename = newFile.name;
        const dotIndex = newFilename.indexOf(".");
        const maxTextLength = windowWidth < 800 ? 30 : 50;

        if(newFilename.length >= maxTextLength) {
            newFilename = `${newFilename.substring(0, maxTextLength - 10)}... ${newFilename.substring(dotIndex, newFilename.length)}`
        }

        setFilename(newFilename);
        setShowConvertButton(true);

        // Chrome issue - Upload the same file twice doesn't work if we don't explicitly set event.target.value to empty
        // string at the end of the onChange handler(this fileHandler function is the onChange handler)
        event.target.value = "";
    } 


    const cancelFileUpload = () => {
        setFile(null);
        setFilename("");
        setDownloadUri("");
    }

    const selectConversionFileType = event => {

        const fileType = event.target.textContent

        setSelectedFileType(fileType);

        // And we need to check selected file type's extension against uploaded file's extension
        for(let x = 0; x < fileTypes.length; x++) {

            const item = fileTypes[x];

            if(item.title === fileType) {
                setSelectedFileTypeExtension(item.fileExtension);
                break;
            }
        }

        // After updating selected file and it's extension states hide the file type dropdown
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

        // Get the file extension from the uploaded file 
        const fileExtension = file.name.substring(file.name.indexOf("."), file.name.length);

        // Now check here if uploaded file's extension matches with selected file type's extension. For example - if 
        // uploaded file's extension is .pdf and selected file type's extension is not pdf then alert user 
        // with an error message
        if(!fileExtension.includes(selectedFileTypeExtension)) {
            return alert(`Please upload a ${selectedFileType} file`);
        }

        // After user clicks on convert button, hide it
        setShowConvertButton(false);


        const data = new FormData();
        data.append("file", file);
        data.append("targetFileFormat", targetFileFormat);

        //const endpoint = "http://localhost:5050/convert";
        const endpoint = "https://afternoon-chamber-07941.herokuapp.com/convert";

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
            alert(error.response.data)

        } finally {
            setLoading(false);
            setUploadProgress(0);
        }

    }

    const downloadFile = () => window.location.href = downloadUri;
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth))



    return (
        <>  
            <Navbar />
            <main className={styles.dashboard} onClick = {hideDropdowns}>

                <section className = {styles.welcome}>
                    <div className = {styles.welcome_content}>
                        <div className = {styles.welcome_text_container}>
                            <div className = {styles.welcome_text}>
                                <Header 
                                    text = "Convert Your Imagination" 
                                    style = {{
                                        marginBottom: "10px",
                                        textAlign: "left",
                                        color: "white"
                                    }}
                                />
                                <Paragraph 
                                    text = {
                                        `We let you convert files online with ease.
                                        Just select your conversion and target file types from the dropdown 
                                        and hit convert. That's it. You can now download your file and do
                                        whatever you want with it.`
                                    }
                                    style = {{
                                        color: "white"
                                    }}
                                />
                            </div>
                        </div>
                
                        <div className = {styles.select_file_types_container}>
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
                                            display: showFileTypeDropdown ? "block" : "none",
                                            backgroundColor: "#35858B"
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
                                            display: showTargetFileTypeDropdown ? "block" : "none",
                                            backgroundColor: "#35858B"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className = {styles.convert}>
                    <div className = {styles.convert_content}>
                        <FileUploader 
                            fileHandler = {fileHandler} 
                            style = {{
                                display: !file ? "block" : "none",
                                width: "150px",
                                // To center the filen uploader button
                                margin: "auto",
                                borderRadius: "10px"
                            }}
                        />
                        <div 
                            className = {styles.uploaded_filename_progress} 
                            style = {{ 
                                display: file ? (windowWidth <= 800 ? "block" : "flex") : "none" 
                            }}
                        >
                            <div className = {styles.filename}>
                                <Paragraph text = {filename} />
                            </div>
                            <div className = {styles.convert_to}>
                                <Paragraph 
                                    text = "Convert to"
                                    style = {{ marginRight: "5px" }}
                                />
                                <Paragraph 
                                    text = {targetFileFormat}
                                    style = {{
                                        padding: "4px",
                                        border: "1px solid gray"
                                    }}
                                />
                            </div>
                            <div className = {styles.progress}>
                                <div 
                                    className = {styles.waiting_to_upload} 
                                    style = {{ 
                                        display: loading && uploadProgress <= 1 ? "flex" : "none" 
                                    }}
                                >
                                    Waiting to upload....
                                </div>
                                <ProgressBar 
                                    text = "Uploading"
                                    progress = {uploadProgress} 
                                    style = {{
                                        display: uploadProgress > 0 && uploadProgress < 100 ? "flex" : "none",
                                        height: "20px"
                                    }}
                                />
                                <Loading
                                    text = "Converting...." 
                                    style = {{
                                        display: uploadProgress === 100 ? "flex" : "none",
                                        height: "100%"
                                    }}
                                />
                            </div>
                            <div className = {styles.close_button}>
                                <Button 
                                    text = "X"
                                    clickHandler = {cancelFileUpload} 
                                    style = {{
                                        textAlign: windowWidth <= 800 ? "center" : "right",
                                        background: "none",
                                        color: "black",
                                        fontSize: "1.4rem"
                                    }}
                                />
                            </div>
                        </div>
                        <div className = {styles.convert_downlaod_button} style = {{ display: file ? "block" : "none" }}>
                            <Button
                                text = "Convert"
                                clickHandler = {convertFile} 
                                style = {{ 
                                    display: showConvertButton ? "inline-block" : "none",
                                    backgroundColor: "#FF6464",
                                    width: windowWidth <= 800 && "100px"
                                }}
                            />
                            <Button
                                text = "Download"
                                clickHandler = {downloadFile} 
                                style = {{
                                    display: downloadUri ? "inline" : "none",
                                    backgroundColor: "#064635",
                                    width: windowWidth <= 800 && "100px",
                                    marginLeft: "30px"
                                }}
                            />
                        </div>
                    </div>

                </section>
                <section className = {styles.services}>
                    <Header 
                        text = "Services" 
                        style = {{
                            width: "100%",
                            margin: "0",
                            padding: "10px 0px 5px 0px",
                        }}
                    />
                    <Paragraph 
                        text = {`Lorem Ipsum is simply dummy text of the printing and typesetting 
                        industry. Lorem Ipsum has been the industry's standard dummy text ever since the 
                        1500s, when an unknown printer took a galley`} 
                        style = {{
                            width: "50%",
                            textAlign: "center",
                            margin: "0 auto 30px auto"
                        }}
                    />
                    <div className = {styles.services_content}>
                        {
                            services.map((service) => {
                                return (
                                    <div key = {service.id} className = {styles.service_card}>
                                        <TextIcon 
                                            text = {service.textIcon} 
                                            style = {{
                                                color: "white",
                                                backgroundColor: service.textIconBackgroundColor,
                                                borderRadius: "4px"
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
                </section>
               
            </main>
            <Footer />

        </>
    );

}


export default Dashboard;