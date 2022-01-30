
function Paragraph({ text, style }) {

    return (
        <p style = {style && style}>{text}</p>
    );

}


export default Paragraph;