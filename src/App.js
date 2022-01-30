import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Stylesheet
import styles from "./App.module.css";

// Route Components
import Dashboard from "./components/dashboard/Dashboard";


function App() {

    return (
        <div className={styles.App}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;