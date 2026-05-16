import { useState } from "react";
import SportsPage from "./pages/SportsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("questionnaire");

    return (
        <div className="app">
            <nav className="navbar">
                <div className="brand">
                    <h1>SportMatch</h1>
                    <p>Găsește-ți sportul care ți se potrivește!</p>
                </div>

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