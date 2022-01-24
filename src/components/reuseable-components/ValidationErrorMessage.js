function ValidationErrorMessage ({ value, validationError, inputFieldLabel }) {

    // Error message will contain the dynamic label of input fields. For example - user forgot to fill 
    // the input field of blog title so error message will be 'blog title can't be blank  

    return (
        <div 
            className="validation_error_message" 
            style = {{display: validationError && !value ? "block" : "none"}}
        >
            <p style = {{color: "red"}}>{inputFieldLabel} can't be blank</p>
        </div>
    );

}


export default ValidationErrorMessage;