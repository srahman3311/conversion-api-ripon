import styles from "./Common.module.css";

function DropdownList ({ name, nameKey, data, handleChange, dropdownStyle }) {

    return (
        <div className = {styles.dropdown_list}>
            <select name = {name} onChange = {handleChange} style = {typeof dropdownStyle && dropdownStyle}>
                {data.map(item => {
                    return (
                        <option key = {item.id} value = {item[nameKey]}>
                            {item[nameKey]}
                        </option>
                    )
                })}
            </select>
        </div>
    );
}

export default DropdownList;



/*
Reusable Dropdown/Select Component
https://stackoverflow.com/questions/52789363/react-how-to-fit-json-api-data-into-reusable-select-component
*/