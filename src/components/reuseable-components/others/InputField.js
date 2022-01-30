// Stylesheet
import styles from "./Common.module.css";



function InputField({ type, name, value, placeholder, handleChange, style, inputStyle }) {

    return (
        <div className= {styles.input_field} style = {style && style}>
            <input
                style = {inputStyle && inputStyle} 
                type = {type} 
                name = {name}
                value = {value}
                placeholder = {placeholder}
                onChange = {handleChange}
            />
        </div>
    );

}



export default InputField;