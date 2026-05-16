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
        const errorText = await response.text();
        console.log("Backend error:", errorText);

        throw new Error(
            errorText || "Nu s-a putut trimite chestionarul."
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