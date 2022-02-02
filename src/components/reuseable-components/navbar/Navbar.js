import { Link } from "react-router-dom";

// Stylesheet
import styles from "./Navbar.module.css";

function Navbar() {

    return (
        <nav className = {styles.navbar}>
            <div className = {styles.navbar_content}>
                <div className = {styles.navbar_brand}>
                    <Link to ="/">Convert Imagination</Link>
                </div>
                <div className = {styles.navbar_routes}>
                    <Link to ="/">Signup</Link>
                    <Link to ="/">Login</Link>
                </div>
            </div>
        </nav>
    );

}


export default Navbar;