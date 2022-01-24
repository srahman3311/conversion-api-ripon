import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";


import InputField from "../reuseable-components/InputField";
import ButtonDiv from "../reuseable-components/ButtonDiv";
import Header from "../reuseable-components/Header";

export default function Login () {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({ email: "", password: "" });
    const [validationError, setValidationError] = useState(false);

    useEffect(() => {

        if(localStorage.getItem("user")) return navigate("/dashboard");

    }, [])

    

    function handleChange (event) {

        const { name, value } = event.target;

        setUserInfo(currentValue => {
            return {
                ...currentValue,
                [name]: value
            }
        });
    }


    function login (event) {

        event.preventDefault();

        const { email, password } = userInfo;

        // Form Validation
        if(!email || !password) return setValidationError(true); 

        // Save user email in localStorage 
        localStorage.setItem("user", email);

        navigate("/dashboard");

    }


    
    
    return (
        <div className={styles.login_wrapper}>
            <div className={styles.login}>
                <Header text = "Please login" />
                <form className={styles.login_credentials}>
                    <InputField
                        type = "text"
                        name = "email"
                        value = {userInfo.email}
                        placeholder = "email or username"
                        validationError = {validationError}
                        validationErrorMessageFor = "email"
                        handleChange = {handleChange}
                    />
                    <InputField
                        type = "password"
                        name = "password"
                        value = {userInfo.password}
                        placeholder = "password"
                        validationError = {validationError}
                        validationErrorMessageFor = "password"
                        handleChange = {handleChange}
                    />
                    
                    <ButtonDiv title="Login" clickHandler = {login} />
                </form>
            </div>
        </div>
    );
}