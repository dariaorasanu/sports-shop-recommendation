import { useState } from "react";
import {
    createQuestionnaire,
    getProductsBySport,
    placeOrder,
} from "../api/api";
import {
    ACTIVITY_LEVEL_OPTIONS,
    OBJECTIVE_OPTIONS,
    ACTIVITY_TYPE_OPTIONS,
    ENVIRONMENT_OPTIONS,
    MEDICAL_RESTRICTION_OPTIONS,
} from "../constants/formOptions";
import "./QuestionnairePage.css";


function QuestionnairePage({ selectedUserId }) {
    const [formData, setFormData] = useState({
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

    const [orderLoadingProductId, setOrderLoadingProductId] = useState(null);
    const [orderMessage, setOrderMessage] = useState("");
    const [orderErrorMessage, setOrderErrorMessage] = useState("");
    const [orderFormData, setOrderFormData] = useState({
        cantitate: 1,
        adresaLivrare: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }
    function handleOrderFormChange(event) {
        const { name, value } = event.target;

        setOrderFormData({
            ...orderFormData,
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
            idUtilizator: Number(selectedUserId),
            timpLiberOre: Number(formData.timpLiberOre),
            bugetEstimat: Number(formData.bugetEstimat),
            tolerantaEfort: Number(formData.tolerantaEfort),
        };
        console.log("Questionnaire request:", questionnaireData);
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

        try {
            const data = await getProductsBySport(recommendation.idSport);

            const filteredProducts = data.filter(
                (product) =>
                    product.nivelRecomandat === recommendation.nivelRecomandat &&
                    Number(product.pret) <= Number(recommendation.bugetEstimat)
            );
            setProducts(filteredProducts);
        } catch (error) {
            setProductsErrorMessage(error.message);
        } finally {
            setProductsLoading(false);
        }
    }

    async function handlePlaceOrder(product) {
        if (!orderFormData.adresaLivrare.trim()) {
            setOrderErrorMessage("Te rugăm să introduci adresa de livrare.");
            return;
        }

        if (Number(orderFormData.cantitate) <= 0) {
            setOrderErrorMessage("Cantitatea trebuie să fie mai mare decât 0.");
            return;
        }

        if (Number(orderFormData.cantitate) > product.stoc) {
            setOrderErrorMessage("Cantitatea aleasă depășește stocul disponibil.");
            return;
        }

        setOrderLoadingProductId(product.idProdus);
        setOrderMessage("");
        setOrderErrorMessage("");

        const orderData = {
            idUtilizator: Number(selectedUserId),
            idProdus: product.idProdus,
            cantitate: Number(orderFormData.cantitate),
            adresaLivrare: orderFormData.adresaLivrare,
        };

        try {
            await placeOrder(orderData);

            setOrderMessage(`Comanda pentru ${product.produs} a fost plasată cu succes.`);

            setProducts((currentProducts) =>
                currentProducts.map((currentProduct) =>
                    currentProduct.idProdus === product.idProdus
                        ? {
                            ...currentProduct,
                            stoc: currentProduct.stoc - Number(orderFormData.cantitate),
                        }
                        : currentProduct
                )
            );

            setOrderFormData({
                cantitate: 1,
                adresaLivrare: "",
            });
        } catch (error) {
            setOrderErrorMessage(error.message);
        } finally {
            setOrderLoadingProductId(null);
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
                        Timp liber pe săptămână (ore)
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
                            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Obiectiv
                        <select
                            name="obiectiv"
                            value={formData.obiectiv}
                            onChange={handleChange}
                        >
                            {OBJECTIVE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Restricții medicale
                        <select
                            name="restrictiiMedicale"
                            value={formData.restrictiiMedicale}
                            onChange={handleChange}
                        >
                            {MEDICAL_RESTRICTION_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
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
                            {ACTIVITY_TYPE_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Mediu preferat
                        <select
                            name="preferintaMediu"
                            value={formData.preferintaMediu}
                            onChange={handleChange}
                        >
                            {ENVIRONMENT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Toleranță efort (1-5)
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
                                        className="products-button"
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
                                                    <p>
                                                        Nu există produse disponibile pentru acest sport, nivel și buget.
                                                    </p>
                                                )}

                                            {orderMessage && <p className="order-success">{orderMessage}</p>}

                                            {orderErrorMessage && <p className="form-error">{orderErrorMessage}</p>}
                                            {products.length > 0 && (
                                                <div className="products-list">
                                                    {products.map((product) => (
                                                        <div className="product-card" key={product.idProdus}>
                                                            <h3>{product.produs}</h3>

                                                            <p>
                                                                <strong>Categorie:</strong> {product.categorie}
                                                            </p>

                                                            <p>
                                                                <strong>Sport:</strong> {product.sport}
                                                            </p>

                                                            <p>
                                                                <strong>Preț:</strong> {product.pret} lei
                                                            </p>

                                                            <p>
                                                                <strong>Stoc:</strong> {product.stoc}
                                                            </p>

                                                            <p>
                                                                <strong>Nivel recomandat:</strong> {product.nivelRecomandat}
                                                            </p>
                                                            <p>
                                                                <strong>Buget estimativ:</strong> {recommendation.bugetEstimat} lei
                                                            </p>
                                                            <div className="order-form">
                                                                <label>
                                                                    Cantitate
                                                                    <input
                                                                        type="number"
                                                                        name="cantitate"
                                                                        min="1"
                                                                        max={product.stoc}
                                                                        value={orderFormData.cantitate}
                                                                        onChange={handleOrderFormChange}
                                                                    />
                                                                </label>

                                                                <label>
                                                                    Adresă livrare
                                                                    <input
                                                                        type="text"
                                                                        name="adresaLivrare"
                                                                        placeholder="Ex: Strada Test 10, Iași"
                                                                        value={orderFormData.adresaLivrare}
                                                                        onChange={handleOrderFormChange}
                                                                    />
                                                                </label>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="order-button"
                                                                disabled={orderLoadingProductId === product.idProdus || product.stoc <= 0}
                                                                onClick={() => handlePlaceOrder(product)}
                                                            >
                                                                {orderLoadingProductId === product.idProdus
                                                                    ? "Se plasează..."
                                                                    : "Comandă produs"}
                                                            </button>
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

