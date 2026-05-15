import { useEffect, useState } from "react";
import { getSports } from "../api/api";

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
        return <p>Se încarcă sporturile...</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    return (
        <div>
            <h1>Sporturi disponibile</h1>

            {sports.map((sport) => (
                <div key={sport.idSport || sport.id}>                    <h2>{sport.denumire}</h2>
                    <p>Mediu: {sport.mediu}</p>
                    <p>Tip activitate: {sport.tipActivitate}</p>
                    <p>Nivel efort: {sport.nivelEfort}</p>
                    <p>Obiectiv: {sport.obiectivPrincipal}</p>
                    <p>{sport.descriere}</p>
                </div>
            ))}
        </div>
    );
}

export default SportsPage;