const BASE_URL = "http://localhost:8081/api";

export async function getSports() {
    const response = await fetch(`${BASE_URL}/sports`);

    if (!response.ok) {
        throw new Error("Nu s-au putut încărca sporturile.");
    }

    return response.json();
}