
function Paragraph({ customClassName, text, style }) {

    return (
        <p 
            className = {customClassName} 
            style = {style && style}
        >
            {text}
        </p>
    );

}


export default Paragraph;