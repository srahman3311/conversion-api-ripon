// Stylesheet
import styles from "./InputField.module.css";

// Components
import ValidationErrorMessage from "./ValidationErrorMessage";



function TextAreaInputField({ name, value, handleChange, validationError, validationErrorMessageFor }) {

    return (
        <div className={styles.textarea_input_field}>
            <textarea
                className={styles.textarea}
                rows = "15"
                name = {name}
                value = {value}
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



export default TextAreaInputField;