import { useState } from "react";
import { loginUser, registerUser } from "../api/api";
import "./AuthPage.css";

function AuthPage({ onLogin }) {
    const [mode, setMode] = useState("login");

    const [loginData, setLoginData] = useState({
        email: "",
        parola: "",
    });

    const [registerData, setRegisterData] = useState({
        nume: "",
        prenume: "",
        dataNastere: "",
        email: "",
        telefon: "",
        parola: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    function handleLoginChange(event) {
        const { name, value } = event.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    }

    function handleRegisterChange(event) {
        const { name, value } = event.target;

        setRegisterData({
            ...registerData,
            [name]: value,
        });
    }

    async function handleLoginSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const user = await loginUser(loginData);
            onLogin(user);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleRegisterSubmit(event) {
        event.preventDefault();

        setLoading(true);
        setErrorMessage("");

        try {
            const user = await registerUser(registerData);
            onLogin(user);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <h1>SportMatch</h1>
                    <p>Găsește-ți sportul care ți se potrivește.</p>
                </div>

                <div className="auth-tabs">
                    <button
                        type="button"
                        className={mode === "login" ? "active" : ""}
                        onClick={() => {
                            setMode("login");
                            setErrorMessage("");
                        }}
                    >
                        Login
                    </button>

                    <button
                        type="button"
                        className={mode === "register" ? "active" : ""}
                        onClick={() => {
                            setMode("register");
                            setErrorMessage("");
                        }}
                    >
                        Creează cont
                    </button>
                </div>

                {mode === "login" ? (
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                            />
                        </label>

                        <label>
                            Parolă
                            <input
                                type="password"
                                name="parola"
                                value={loginData.parola}
                                onChange={handleLoginChange}
                                required
                            />
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? "Se autentifică..." : "Intră în cont"}
                        </button>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <label>
                            Nume
                            <input
                                type="text"
                                name="nume"
                                value={registerData.nume}
                                onChange={handleRegisterChange}
                                required
                            />
                        </label>

                        <label>
                            Prenume
                            <input
                                type="text"
                                name="prenume"
                                value={registerData.prenume}
                                onChange={handleRegisterChange}
                                required
                            />
                        </label>

                        <label>
                            Data nașterii
                            <input
                                type="date"
                                name="dataNastere"
                                value={registerData.dataNastere}
                                onChange={handleRegisterChange}
                                required
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                            />
                        </label>

                        <label>
                            Telefon
                            <input
                                type="text"
                                name="telefon"
                                value={registerData.telefon}
                                onChange={handleRegisterChange}
                            />
                        </label>

                        <label>
                            Parolă
                            <input
                                type="password"
                                name="parola"
                                value={registerData.parola}
                                onChange={handleRegisterChange}
                                required
                            />
                        </label>

                        <button type="submit" disabled={loading}>
                            {loading ? "Se creează contul..." : "Creează cont"}
                        </button>
                    </form>
                )}

                {errorMessage && <p className="auth-error">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default AuthPage;