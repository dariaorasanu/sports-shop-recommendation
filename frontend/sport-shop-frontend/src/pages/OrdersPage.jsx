import { useEffect, useState } from "react";
import { getOrdersByUser, updateOrderStatus } from "../api/api";
import "./OrdersPage.css";

function OrdersPage({ selectedUserId }) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [statusLoadingOrderId, setStatusLoadingOrderId] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [statusErrorMessage, setStatusErrorMessage] = useState("");
    const [statusModal, setStatusModal] = useState(null);

    function formatDate(dateValue) {
        if (!dateValue) {
            return "-";
        }

        return new Date(dateValue).toLocaleString("ro-RO");
    }
    function loadOrders() {
        if (!selectedUserId) {
            return;
        }

        getOrdersByUser(selectedUserId)
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    function handleOpenStatusModal(order, status) {
        let title = "";
        let message = "";
        let confirmText = "Confirmă";

        if (status === "CONFIRMATA") {
            title = "Confirmare comandă";
            message = `Confirmi comanda #${order.idComanda}? Adresa de livrare este: ${order.adresaLivrare}.`;
            confirmText = "Confirmă comanda";
        }

        if (status === "ANULATA") {
            title = "Anulare comandă";
            message = `Sigur vrei să anulezi comanda #${order.idComanda}? Nu renunța la mișcare!`;
            confirmText = "Anulează comanda";
        }

        if (status === "FINALIZATA") {
            title = "Finalizare comandă";
            message = `Confirmi finalizarea comenzii #${order.idComanda}? Această acțiune marchează comanda ca livrată în condiții optime.`;
            confirmText = "Finalizează comanda";
        }

        setStatusModal({
            order,
            status,
            title,
            message,
            confirmText,
        });
    }

    async function confirmStatusUpdate() {
        if (!statusModal) {
            return;
        }

        const { order, status } = statusModal;

        setStatusLoadingOrderId(order.idComanda);
        setStatusMessage("");
        setStatusErrorMessage("");

        try {
            await updateOrderStatus(order.idComanda, status);

            setStatusMessage("Statusul comenzii a fost actualizat.");

            const updatedOrders = await getOrdersByUser(selectedUserId);
            setOrders(updatedOrders);

            setStatusModal(null);
        } catch (error) {
            setStatusErrorMessage(error.message);
        } finally {
            setStatusLoadingOrderId(null);
        }
    }
    useEffect(() => {
        loadOrders();
    }, [selectedUserId]);

    if (loading) {
        return <p className="orders-message">Se încarcă comenzile...</p>;
    }

    if (errorMessage) {
        return <p className="orders-message error">{errorMessage}</p>;
    }

    return (
        <div className="orders-page">
            <header className="orders-header">
                <h1>Comenzile mele</h1>
                <p>
                    Aici poți vedea comenzile plasate pentru utilizatorul curent.
                </p>

            </header>
            {statusMessage && <p className="success-message">{statusMessage}</p>}

            {statusModal && (
                <div className="modal-overlay">
                    <div className="status-modal">
                        <h2>{statusModal.title}</h2>

                        <p>{statusModal.message}</p>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="modal-secondary-button"
                                onClick={() => setStatusModal(null)}
                            >
                                Renunță
                            </button>

                            <button
                                type="button"
                                className={
                                    statusModal.status === "ANULATA"
                                        ? "modal-danger-button"
                                        : "modal-primary-button"
                                }
                                onClick={confirmStatusUpdate}
                                disabled={statusLoadingOrderId === statusModal.order.idComanda}
                            >
                                {statusModal.confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {statusErrorMessage && (
                <p className="error-message">{statusErrorMessage}</p>
            )}

            {orders.length === 0 ? (
                <div className="empty-orders-card">
                    <h2>Nu există comenzi încă</h2>
                    <p>
                        După ce comanzi un produs recomandat, comanda va apărea aici.
                    </p>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div className="order-card" key={order.idComanda}>
                            <h2>Comanda #{order.idComanda}</h2>

                            <p>
                                <strong>Utilizator:</strong> {order.nume} {order.prenume}
                            </p>

                            <p>
                                <strong>Email:</strong> {order.email}
                            </p>
                            <p>
                                <strong>Produs comandat:</strong> {order.produs}
                            </p>

                            <p>
                                <strong>Cantitate:</strong> {order.cantitate}
                            </p>

                            <p>
                                <strong>Preț unitar:</strong> {order.pretUnitar} lei
                            </p>
                            <p>
                                <strong>Total:</strong> {order.total} lei
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                <span className="status-badge">{order.status}</span>
                            </p>
                            <div className="order-status-actions">
                                {order.status === "NOUA" && (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleOpenStatusModal(order, "CONFIRMATA")}
                                            disabled={statusLoadingOrderId === order.idComanda}
                                        >
                                            Confirmă comanda
                                        </button>

                                        <button
                                            type="button"
                                            className="cancel-status-button"
                                            onClick={() => handleOpenStatusModal(order, "ANULATA")}
                                            disabled={statusLoadingOrderId === order.idComanda}
                                        >
                                            Anulează comanda
                                        </button>
                                    </>
                                )}

                                {order.status === "CONFIRMATA" && (
                                    <button
                                        type="button"
                                        onClick={() => handleOpenStatusModal(order, "FINALIZATA")}
                                        disabled={statusLoadingOrderId === order.idComanda}
                                    >
                                        Finalizează comanda
                                    </button>
                                )}
                            </div>

                            <p>
                                <strong>Adresă livrare:</strong> {order.adresaLivrare}
                            </p>

                            <p>
                                <strong>Data comenzii:</strong> {formatDate(order.dataComanda)}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrdersPage;