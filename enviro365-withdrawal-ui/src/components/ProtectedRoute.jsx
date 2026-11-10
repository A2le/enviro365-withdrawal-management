import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from '../context/RouterContext';

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => { if (!user) navigate('/login', { replace: true }); }, [user, navigate]);
    return user ? children : null;
}
