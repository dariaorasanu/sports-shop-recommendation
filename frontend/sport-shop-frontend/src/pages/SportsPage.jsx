import { useEffect, useState } from "react";
import { getSports } from "../api/api";
import "./SportsPage.css";


function SportsPage() {
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getSports()
            .then((data) => {
                setSports(data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="message">Se încarcă sporturile...</p>;
    }

    if (errorMessage) {
        return <p className="message error">{errorMessage}</p>;
    }

    return (
        <div className="sports-page">
            <header className="sports-header">
                <h1>Sporturi disponibile</h1>
                <p>
                    Aici poți vedea sporturile existente în aplicație, împreună cu
                    detaliile lor principale.
                </p>
            </header>

            <div className="sports-grid">
                {sports.map((sport) => (
                    <div className="sport-card" key={sport.idSport}>
                        <h2>{sport.denumire}</h2>

                        <div className="sport-details">
                            <p>
                                <strong>Mediu:</strong> {sport.mediu}
                            </p>
                            <p>
                                <strong>Tip activitate:</strong> {sport.tipActivitate}
                            </p>
                            <p>
                                <strong>Nivel efort:</strong> {sport.nivelEfort}
                            </p>
                            <p>
                                <strong>Obiectiv:</strong> {sport.obiectivPrincipal}
                            </p>
                        </div>

                        <p className="sport-description">{sport.descriere}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SportsPage;