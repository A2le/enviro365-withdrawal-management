import { AuthProvider, useAuth } from './context/AuthContext';
import { RouterProvider, useCurrentPath } from './context/RouterContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function AppContent() {
    const path = useCurrentPath();
    const { user } = useAuth();

    if (path === '/login') return user ? <Dashboard /> : <Login />;
    if (path === '/' || path === '/dashboard') {
        return <ProtectedRoute><Dashboard /></ProtectedRoute>;
    }
    return <ProtectedRoute><Dashboard /></ProtectedRoute>;
}

export default function App() {
    return <AuthProvider><RouterProvider><AppContent /></RouterProvider></AuthProvider>;
}
