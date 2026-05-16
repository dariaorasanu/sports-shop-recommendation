import { useEffect, useState } from "react";
import { getRecommendationsByUser } from "../api/api";
import "./MyRecommendationsPage.css";

function MyRecommendationsPage({ selectedUserId }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!selectedUserId) {
            return;
        }

        getRecommendationsByUser(selectedUserId)
            .then((data) => {
                setRecommendations(data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedUserId]);

    if (loading) {
        return <p className="recommendations-message">Se încarcă recomandările...</p>;
    }

    if (errorMessage) {
        return <p className="recommendations-message error">{errorMessage}</p>;
    }
    const latestQuestionnaireId =
        recommendations.length > 0
            ? Math.max(...recommendations.map((rec) => rec.idChestionar))
            : null;

    const latestRecommendations = recommendations
        .filter((rec) => rec.idChestionar === latestQuestionnaireId)
        .sort((a, b) => b.scorCompatibilitate - a.scorCompatibilitate)
        .slice(0, 5);
    return (
        <div className="my-recommendations-page">
            <header className="my-recommendations-header">
                <h1>Recomandările mele</h1>
                <p>
                    Aici poți vedea cele mai recente recomandări generate pe baza ultimului
                    chestionar completat.
                </p>
            </header>

            {latestRecommendations.length === 0 ? (
                <div className="empty-recommendations-card">
                    <h2>Nu ai recomandări încă</h2>
                    <p>
                        Completează chestionarul pentru a primi recomandări sportive
                        personalizate.
                    </p>
                </div>
            ) : (
                <div className="my-recommendations-list">
                    {latestRecommendations.map((recommendation) => (
                        <div
                            className="my-recommendation-card"
                            key={recommendation.idRecomandare}
                        >
                            <h2>{recommendation.sportRecomandat}</h2>

                            <p>
                                <strong>Scor compatibilitate:</strong>{" "}
                                {recommendation.scorCompatibilitate}
                            </p>

                            <p>
                                <strong>Nivel recomandat:</strong>{" "}
                                {recommendation.nivelRecomandat}
                            </p>

                            <p>
                                <strong>Mediu:</strong> {recommendation.mediu}
                            </p>

                            <p>
                                <strong>Tip activitate:</strong>{" "}
                                {recommendation.tipActivitate}
                            </p>

                            <p>
                                <strong>Nivel efort:</strong> {recommendation.nivelEfort}
                            </p>

                            <p>
                                <strong>Obiectiv:</strong> {recommendation.obiectiv}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecommendationsPage;