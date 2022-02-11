import { useState } from "react";
import { Link } from "react-router-dom";

// Stylesheet
import styles from "./Navbar.module.css";

// Components
import Icon from "../others/Icon";



function Navbar() {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showNavbarRoutes, setShowNavbarRoutes] = useState(false);


    const toggleNavbarRoutes = () => setShowNavbarRoutes(!showNavbarRoutes);
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));


    return (
        <nav className = {styles.navbar}>
            <Link className = {styles.menu_icon} to = "" onClick = {toggleNavbarRoutes} >
                <Icon iconClassName = "fas fa-bars" style = {{ fontSize: "32px" }} />
            </Link>

            <div className = {styles.navbar_content}>
                <div className = {styles.navbar_brand}>
                    <Link to ="/">Convert Imagination</Link>
                </div>
                <div 
                    className = {styles.other_routes} 
                    style = {{ 
                        display: windowWidth > 800 || showNavbarRoutes ? "block" : "none" 
                    }}
                >
                    <Link to ="/">About</Link>
                    <Link to = "/">Contact Us</Link>
                </div>
                <div 
                    className = {styles.navbar_login_signup} 
                    style = {{ 
                        display: windowWidth > 800 || showNavbarRoutes ? "block" : "none" 
                    }}
                >
                    <Link to ="/">Signup</Link>
                    <Link to ="/">Login</Link>
                </div>
            </div>
        </nav>
    );

}


export default Navbar;