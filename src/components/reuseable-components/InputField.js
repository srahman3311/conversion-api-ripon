// Stylesheet
import styles from "./InputField.module.css";

// Components
import ValidationErrorMessage from "./ValidationErrorMessage";

function InputField({ type, name, value, placeholder, handleChange, validationError, validationErrorMessageFor }) {

    return (
        <div className= {styles.input_field}>
            <input 
                type = {type} 
                name = {name}
                value = {value}
                placeholder = {placeholder}
                onChange = {handleChange}
            />

            <ValidationErrorMessage
                value = {value}
                validationError = {validationError} 
                inputFieldLabel = {validationErrorMessageFor}
            />
        </div>
    );

}



export default InputField;