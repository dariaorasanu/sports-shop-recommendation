import { useEffect, useState } from "react";
import { getOrdersByUser } from "../api/api";
import "./OrdersPage.css";

function OrdersPage() {
    const userId = 1;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getOrdersByUser(userId)
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                setErrorMessage(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                                <strong>Total:</strong> {order.total} lei
                            </p>

                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>

                            <p>
                                <strong>Adresă livrare:</strong> {order.adresaLivrare}
                            </p>

                            <p>
                                <strong>Data comenzii:</strong> {order.dataComanda}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default OrdersPage;