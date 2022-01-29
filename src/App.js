import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Stylesheet
import styles from "./App.module.css";

// Route Components
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";


function App() {

    return (
        <div className={styles.App}>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;