import { useState } from "react";
import SportsPage from "./pages/SportsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("questionnaire");

    return (
        <div>
            <nav className="navbar">
                <h2>Sports Recommendation App</h2>

                <div className="nav-buttons">
                    <button
                        className={currentPage === "sports" ? "active" : ""}
                        onClick={() => setCurrentPage("sports")}
                    >
                        Sporturi
                    </button>

                    <button
                        className={currentPage === "questionnaire" ? "active" : ""}
                        onClick={() => setCurrentPage("questionnaire")}
                    >
                        Chestionar
                    </button>
                </div>
            </nav>

            {currentPage === "sports" && <SportsPage />}
            {currentPage === "questionnaire" && <QuestionnairePage />}
        </div>
    );
}

export default App;