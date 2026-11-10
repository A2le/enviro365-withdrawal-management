import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const navigate = useCallback((nextPath, options = {}) => {
        if (options.replace) window.history.replaceState({}, '', nextPath);
        else window.history.pushState({}, '', nextPath);
        setPath(nextPath);
    }, []);

    return <RouterContext.Provider value={{ path, navigate }}>{children}</RouterContext.Provider>;
}

export function useNavigate() {
    const context = useContext(RouterContext);
    if (!context) throw new Error('useNavigate must be used inside RouterProvider');
    return context.navigate;
}

export function useCurrentPath() {
    const context = useContext(RouterContext);
    if (!context) throw new Error('useCurrentPath must be used inside RouterProvider');
    return context.path;
}
