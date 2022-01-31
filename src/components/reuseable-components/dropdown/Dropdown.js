// Stylesheet
import styles from "./Dropdown.module.css";

// Components
import Paragraph from "../typography/Paragraph";



function Dropdown({ data, nameKey, style }) {

    return (
        <div className = {styles.dropdown} style = {style && style}>
            {
                data.map(item => {
                    return (
                        <Paragraph
                            key = {item.id}
                            customClassName = {styles.dropdown_content}
                            text = {item[nameKey]}
                        />
                    );

                })
            }
        </div>
    );

}


export default Dropdown;