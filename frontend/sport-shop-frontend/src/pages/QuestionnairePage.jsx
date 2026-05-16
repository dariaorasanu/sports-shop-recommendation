import { useState } from "react";
import { createQuestionnaire, getProductsBySport } from "../api/api";import "./QuestionnairePage.css";

function QuestionnairePage() {
    const [formData, setFormData] = useState({
        idUtilizator: 1,
        timpLiberOre: 5,
        nivelActivitate: "SEDENTAR",
        obiectiv: "RELAXARE",
        restrictiiMedicale: "NU",
        bugetEstimat: 300,
        preferintaTipActivitate: "INDIVIDUAL",
        preferintaMediu: "INTERIOR",
        tolerantaEfort: 2,
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedRecommendationId, setSelectedRecommendationId] = useState(null);
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsErrorMessage, setProductsErrorMessage] = useState("");

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");
        setRecommendations([]);

        const questionnaireData = {
            ...formData,
            idUtilizator: Number(formData.idUtilizator),
            timpLiberOre: Number(formData.timpLiberOre),
            bugetEstimat: Number(formData.bugetEstimat),
            tolerantaEfort: Number(formData.tolerantaEfort),
        };

        try {
            const data = await createQuestionnaire(questionnaireData);
            setRecommendations(data);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }
    async function handleViewProducts(recommendation) {
        setSelectedRecommendationId(recommendation.idRecomandare);
        setProductsLoading(true);
        setProductsErrorMessage("");
        setProducts([]);

        try {
            const data = await getProductsBySport(recommendation.idSport);
            setProducts(data);
        } catch (error) {
            setProductsErrorMessage(error.message);
        } finally {
            setProductsLoading(false);
        }
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
                            <option value="SEDENTAR">Sedentar</option>
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
                            <option value="TONIFIERE">Tonifiere</option>
                            <option value="REZISTENTA">Rezistență</option>
                            <option value="COMPETITIE">Competiție</option>
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

                    <button type="submit" disabled={loading}>
                        {loading ? "Se generează..." : "Generează recomandări"}
                    </button>
                </form>

                {errorMessage && <p className="form-error">{errorMessage}</p>}

                {recommendations.length > 0 && (
                    <div className="recommendations-section">
                        <h2>Recomandări generate</h2>

                        <div className="recommendations-list">
                            {recommendations.map((recommendation) => (
                                <div
                                    className="recommendation-card"
                                    key={recommendation.idRecomandare}
                                >
                                    <h3>{recommendation.sportRecomandat}</h3>

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

                                    <button
                                        type="button"
                                        className="secondary-button"
                                        onClick={() => handleViewProducts(recommendation)}
                                    >
                                        Vezi produse
                                    </button>

                                    {selectedRecommendationId === recommendation.idRecomandare && (
                                        <div className="inline-products-section">
                                            <h4>Produse pentru {recommendation.sportRecomandat}</h4>

                                            {productsLoading && <p>Se încarcă produsele...</p>}

                                            {productsErrorMessage && (
                                                <p className="form-error">{productsErrorMessage}</p>
                                            )}

                                            {!productsLoading &&
                                                !productsErrorMessage &&
                                                products.length === 0 && (
                                                    <p>Nu există produse disponibile pentru acest sport.</p>
                                                )}

                                            {products.length > 0 && (
                                                <div className="products-list">
                                                    {products.map((product) => (
                                                        <div className="product-card" key={product.idProdus}>
                                                            <h3>{product.produs}</h3>

                                                            <p>
                                                                <strong>Categorie:</strong> {product.categorie}
                                                            </p>

                                                            <p>
                                                                <strong>Preț:</strong> {product.pret} lei
                                                            </p>

                                                            <p>
                                                                <strong>Stoc:</strong> {product.stoc}
                                                            </p>

                                                            <p>{product.descriere}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default QuestionnairePage;