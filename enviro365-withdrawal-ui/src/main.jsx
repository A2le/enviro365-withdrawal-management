import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import App from './App.jsx';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: '#176B52', dark: '#104B3A', light: '#E7F3EE' },
        secondary: { main: '#64766E' },
        background: { default: '#F4F7F5', paper: '#FFFFFF' },
        success: { main: '#21865B' },
    },
    shape: { borderRadius: 12 },
    typography: { fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', button: { textTransform: 'none', fontWeight: 600 } },
    components: {
        MuiCard: { styleOverrides: { root: { border: '1px solid #E7ECE9', boxShadow: '0 4px 18px rgba(20, 55, 42, 0.045)' } } },
        MuiButton: { styleOverrides: { root: { borderRadius: 10, paddingInline: 18 } } },
    },
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>,
);
