import { useState } from "react";
import SportsPage from "./pages/SportsPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import OrdersPage from "./pages/OrdersPage";
import AuthPage from "./pages/AuthPage";
import MyRecommendationsPage from "./pages/MyRecommendationsPage";
import "./App.css";

function App() {
    const [currentPage, setCurrentPage] = useState("questionnaire");

    const [loggedUser, setLoggedUser] = useState(() => {
        const savedUser = localStorage.getItem("loggedUser");

        if (savedUser) {
            return JSON.parse(savedUser);
        }

        return null;
    });

    function handleLogin(user) {
        setLoggedUser(user);
        localStorage.setItem("loggedUser", JSON.stringify(user));
    }

    function handleLogout() {
        setLoggedUser(null);
        localStorage.removeItem("loggedUser");
        setCurrentPage("questionnaire");
    }

    if (!loggedUser) {
        return <AuthPage onLogin={handleLogin} />;
    }
    function formatName(value) {
        if (!value) {
            return "";
        }

        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }


    return (
        <div className="app">
            <nav className="navbar">
                <div className="brand">
                    <h1>SportMatch</h1>
                    <p>Găsește-ți sportul care ți se potrivește.</p>
                </div>

                <div className="nav-right">
                    <div className="logged-user">
                        <span>Conectat ca</span>
                        <strong>
                            {formatName(loggedUser.prenume)} {formatName(loggedUser.nume)}                        </strong>
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
                            className={currentPage === "myRecommendations" ? "active" : ""}
                            onClick={() => setCurrentPage("myRecommendations")}
                        >
                            Recomandările mele
                        </button>

                        <button
                            className={currentPage === "orders" ? "active" : ""}
                            onClick={() => setCurrentPage("orders")}
                        >
                            Comenzile mele
                        </button>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {currentPage === "sports" && <SportsPage />}

            {currentPage === "questionnaire" && (
                <QuestionnairePage selectedUserId={loggedUser.idUtilizator} />
            )}

            {currentPage === "orders" && (
                <OrdersPage selectedUserId={loggedUser.idUtilizator} />
            )}
            {currentPage === "myRecommendations" && (
                <MyRecommendationsPage selectedUserId={loggedUser.idUtilizator} />
            )}
        </div>
    );
}

export default App;