import axios from 'axios';

// Credentials are kept in memory only and are attached to every API request.
let basicCredentials = null;

export const setBasicCredentials = (credentials) => {
    basicCredentials = credentials;
};

export const clearBasicCredentials = () => {
    basicCredentials = null;
};

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
    if (basicCredentials) {
        config.auth = { ...basicCredentials };
    }
    return config;
});

export default api;
