import { useState } from "react";
import SportsPage from "./pages/SportsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import "./App.css";
import OrdersPage from "./pages/OrdersPage";

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

                    <button
                        className={currentPage === "orders" ? "active" : ""}
                        onClick={() => setCurrentPage("orders")}
                    >
                        Comenzile mele
                    </button>
                </div>
            </nav>

            {currentPage === "sports" && <SportsPage />}
            {currentPage === "questionnaire" && <QuestionnairePage />}
            {currentPage === "orders" && <OrdersPage />}{currentPage === "orders" && <OrdersPage />}
        </div>
    );
}

export default App;