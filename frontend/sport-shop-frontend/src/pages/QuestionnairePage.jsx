import { useState } from "react";
import "./QuestionnairePage.css";

function QuestionnairePage() {
    const [formData, setFormData] = useState({
        idUtilizator: 1,
        timpLiberOre: 5,
        nivelActivitate: "INCEPATOR",
        obiectiv: "RELAXARE",
        restrictiiMedicale: "NU",
        bugetEstimat: 300,
        preferintaTipActivitate: "INDIVIDUAL",
        preferintaMediu: "INTERIOR",
        tolerantaEfort: 2,
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log("Date formular:", formData);
        alert("Formularul funcționează. Urmează să îl conectăm la backend.");
    }

    return (
        <div className="questionnaire-page">
            <div className="questionnaire-card">
                <h1>Chestionar recomandări</h1>
                <p>
                    Completează preferințele utilizatorului pentru a genera recomandări de
                    sporturi.
                </p>

                <form onSubmit={handleSubmit} className="questionnaire-form">
                    <label>
                        ID utilizator
                        <input
                            type="number"
                            name="idUtilizator"
                            value={formData.idUtilizator}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Timp liber pe săptămână
                        <input
                            type="number"
                            name="timpLiberOre"
                            value={formData.timpLiberOre}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Nivel activitate
                        <select
                            name="nivelActivitate"
                            value={formData.nivelActivitate}
                            onChange={handleChange}
                        >
                            <option value="INCEPATOR">Începător</option>
                            <option value="INTERMEDIAR">Intermediar</option>
                            <option value="AVANSAT">Avansat</option>
                        </select>
                    </label>

                    <label>
                        Obiectiv
                        <select
                            name="obiectiv"
                            value={formData.obiectiv}
                            onChange={handleChange}
                        >
                            <option value="RELAXARE">Relaxare</option>
                            <option value="SLABIRE">Slăbire</option>
                            <option value="MASA_MUSCULARA">Masă musculară</option>
                            <option value="REZISTENTA">Rezistență</option>
                            <option value="SOCIALIZARE">Socializare</option>
                        </select>
                    </label>

                    <label>
                        Restricții medicale
                        <input
                            type="text"
                            name="restrictiiMedicale"
                            value={formData.restrictiiMedicale}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Buget estimat
                        <input
                            type="number"
                            name="bugetEstimat"
                            value={formData.bugetEstimat}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Tip activitate preferată
                        <select
                            name="preferintaTipActivitate"
                            value={formData.preferintaTipActivitate}
                            onChange={handleChange}
                        >
                            <option value="INDIVIDUAL">Individual</option>
                            <option value="ECHIPA">Echipă</option>
                            <option value="AMBELE">Ambele</option>
                        </select>
                    </label>

                    <label>
                        Mediu preferat
                        <select
                            name="preferintaMediu"
                            value={formData.preferintaMediu}
                            onChange={handleChange}
                        >
                            <option value="INTERIOR">Interior</option>
                            <option value="EXTERIOR">Exterior</option>
                            <option value="AMBELE">Ambele</option>
                        </select>
                    </label>

                    <label>
                        Toleranță efort
                        <input
                            type="number"
                            min="1"
                            max="5"
                            name="tolerantaEfort"
                            value={formData.tolerantaEfort}
                            onChange={handleChange}
                        />
                    </label>

                    <button type="submit">Generează recomandări</button>
                </form>
            </div>
        </div>
    );
}

export default QuestionnairePage;