import { useEffect, useState } from "react";
import {
    getRecommendationsByUser,
    getProductsBySport,
    placeOrder,
} from "../api/api";
import "./MyRecommendationsPage.css";

function MyRecommendationsPage({ selectedUserId }) {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
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
    function handleOrderFormChange(event) {
        const { name, value } = event.target;

        setOrderFormData({
            ...orderFormData,
            [name]: value,
        });
    }

    async function handleViewProducts(recommendation) {
        setSelectedRecommendationId(recommendation.idRecomandare);
        setProductsLoading(true);
        setProductsErrorMessage("");
        setOrderMessage("");
        setOrderErrorMessage("");

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
                            <p>
                                <strong>Buget estimativ:</strong> {recommendation.bugetEstimat} lei
                            </p>
                            <button
                                type="button"
                                className="products-button"
                                onClick={() => handleViewProducts(recommendation)}
                            >
                                Vezi produse
                            </button>

                            {selectedRecommendationId === recommendation.idRecomandare && (
                                <div className="products-section">
                                    <h3>Produse recomandate pentru nivelul tău</h3>

                                    {productsLoading && <p>Se încarcă produsele...</p>}

                                    {productsErrorMessage && (
                                        <p className="error-message">{productsErrorMessage}</p>
                                    )}

                                    {orderMessage && <p className="success-message">{orderMessage}</p>}

                                    {orderErrorMessage && (
                                        <p className="error-message">{orderErrorMessage}</p>
                                    )}

                                    {!productsLoading && products.length === 0 && (
                                        <p>
                                            Nu există produse disponibile pentru acest sport, nivel și buget.
                                        </p>                                    )}

                                    <div className="products-list">
                                        {products.map((product) => (
                                            <div className="product-card" key={product.idProdus}>
                                                <h4>{product.produs}</h4>

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
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecommendationsPage;