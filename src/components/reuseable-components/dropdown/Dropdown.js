// Stylesheet
import styles from "./Dropdown.module.css";



function Dropdown({ data, nameKey, style, clickHandler }) {

    return (
        <div className = {styles.dropdown} style = {style && style}>
            <ul className = {styles.dropdown_content}>
                {
                    data.map(item => {
                        return (
                            <li 
                                key = {item.id}
                                className = {styles.dropdown_content_item}
                                onClick = {clickHandler}
                            >
                                {item[nameKey]}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );

}


export default Dropdown;