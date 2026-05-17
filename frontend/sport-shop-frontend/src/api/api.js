const BASE_URL = "http://localhost:8081/api";

export async function getSports() {
    const response = await fetch(`${BASE_URL}/sports`);

    if (!response.ok) {
        throw new Error("Nu s-au putut încărca sporturile.");
    }

    return response.json();
}
export async function createQuestionnaire(questionnaireData) {
    const response = await fetch(`${BASE_URL}/questionnaires`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(questionnaireData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.log("Backend error:", errorData);

        throw new Error(
            errorData?.message ||
            "Chestionarul nu a putut fi trimis. Verifică valorile introduse."
        );
    }

    return response.json();
}


export async function getProductsBySport(sportId) {
    const response = await fetch(`${BASE_URL}/products/sport/${sportId}`);

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error(
            errorText || "Nu s-au putut încărca produsele pentru sportul selectat."
        );
    }

    return response.json();
}
export async function placeOrder(orderData) {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error(errorText || "Nu s-a putut plasa comanda.");
    }

    return response.json();
}

export async function getOrdersByUser(userId) {
    const response = await fetch(`${BASE_URL}/orders/user/${userId}`);

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error(
            errorText || "Nu s-au putut încărca comenzile utilizatorului."
        );
    }

    return response.json();
}

export async function registerUser(registerData) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error("Nu s-a putut crea contul.");
    }

    return response.json();
}

export async function loginUser(loginData) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error("Email sau parolă greșită.");
    }

    return response.json();
}
export async function getRecommendationsByUser(userId) {
    const response = await fetch(`${BASE_URL}/recommendations/user/${userId}`);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.log("Backend error:", errorData);

        throw new Error(
            errorData?.message ||
            "Nu s-au putut încărca recomandările utilizatorului."
        );
    }

    return response.json();
}
export async function updateOrderStatus(orderId, status) {
    const response = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        console.log("Backend error:", errorData);

        throw new Error(
            errorData?.message || "Statusul comenzii nu a putut fi actualizat."
        );
    }

    return response.json();
}