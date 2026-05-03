import axios from "axios";

// ✅ Dynamic base URL (local + production)
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
// const BASE_URL ="http://localhost:3000";

// ✅ Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});

// ================= REGISTER =================
export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username,
            email,
            password
        });

        return response.data;

    } catch (err) {
        console.error("Register Error:", err.response?.data || err.message);
        throw err;
    }
}

// ================= LOGIN =================
export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email,
            password
        });

        return response.data;

    } catch (err) {
        console.error("Login Error:", err.response?.data || err.message);
        throw err;
    }
}

// ================= LOGOUT =================
export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;

    } catch (err) {
        console.error("Logout Error:", err.response?.data || err.message);
        throw err;
    }
}

// ================= GET ME =================
export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;

    } catch (err) {
        if (err.response?.status === 401) {
            return null; // user not logged in
        }

        console.error("GetMe Error:", err.response?.data || err.message);
        throw err;
    }
}