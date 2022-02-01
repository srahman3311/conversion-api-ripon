import { Link } from "react-router-dom";

// Stylesheet
import styles from "./Navbar.module.css";

function Navbar() {

    return (
        <nav className = {styles.navbar}>
            <div className = {styles.navbar_brand}>
                <Link to ="/">Convert Imagination</Link>
            </div>
            <div className="">
                <Link to ="/">Signup</Link>
                <Link to ="/">Login</Link>
            </div>
        </nav>
    );

}


export default Navbar;