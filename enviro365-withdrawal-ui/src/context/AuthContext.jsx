import { createContext, useContext, useMemo, useState } from 'react';
import api, { clearBasicCredentials, setBasicCredentials } from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [checking, setChecking] = useState(false);

    const login = async (username, password) => {
        setChecking(true);
        setBasicCredentials({ username, password });
        try {
            // /auth/me is protected; a successful response confirms the credentials.
            const response = await api.get('/auth/me');
            setUser(response.data);
            return response.data;
        } catch (error) {
            clearBasicCredentials();
            setUser(null);
            throw error;
        } finally {
            setChecking(false);
        }
    };

    const logout = () => {
        clearBasicCredentials();
        setUser(null);
    };

    const value = useMemo(() => ({ user, checking, login, logout }), [user, checking]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
