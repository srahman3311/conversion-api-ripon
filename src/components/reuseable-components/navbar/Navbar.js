import { Link } from "react-router-dom";

// Stylesheet
import styles from "./Navbar.module.css";

function Navbar() {

    return (
        <nav className = {styles.navbar}>
            <div className = {styles.navbar_brand}>
                <Link to ="/dashboard">Conversion API</Link>
            </div>
            <div className="">
                <Link to ="/dashboard">Signup</Link>
                <Link to ="/dashboard">Login</Link>
            </div>
        </nav>
    );

}


export default Navbar;