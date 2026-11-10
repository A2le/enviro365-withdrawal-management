import { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, InputAdornment, TextField, Typography } from '@mui/material';
import { AccountCircleOutlined, LockOutlined, NatureOutlined } from '@mui/icons-material';
import { useNavigate } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, checking } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        try {
            await login(username.trim(), password);
            navigate('/dashboard', { replace: true });
        } catch (err) {
            setError(err.response?.status === 401
                ? 'The username or password you entered is incorrect.'
                : 'Unable to connect to Enviro365. Please check that the API is running.');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }, bgcolor: '#F4F7F5' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', justifyContent: 'space-between', p: 7, color: 'white', background: 'linear-gradient(145deg, #103F32 0%, #176B52 58%, #2D8A68 100%)' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}><NatureOutlined sx={{ fontSize: 34 }} /><Typography variant="h5" fontWeight={700}>Enviro365</Typography></Box>
                <Box sx={{ maxWidth: 520 }}><Typography variant="overline" sx={{ letterSpacing: 2, opacity: .8 }}>INVESTOR PORTAL</Typography><Typography variant="h2" fontWeight={700} sx={{ lineHeight: 1.12, my: 2 }}>Manage your investments with confidence.</Typography><Typography sx={{ opacity: .82, fontSize: 17, lineHeight: 1.8 }}>A clear view of your portfolio, balances and withdrawal activity — all in one secure place.</Typography></Box>
                <Typography variant="body2" sx={{ opacity: .65 }}>© {new Date().getFullYear()} Enviro365. All rights reserved.</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 2, sm: 5 } }}>
                <Card sx={{ width: '100%', maxWidth: 440, borderRadius: 4 }}>
                    <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
                        <Box sx={{ display: { md: 'none' }, alignItems: 'center', gap: 1, mb: 4, color: 'primary.main' }}><NatureOutlined /><Typography fontWeight={700}>Enviro365</Typography></Box>
                        <Typography variant="h4" fontWeight={700} color="#19392D">Welcome back</Typography>
                        <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>Sign in to access your investor dashboard.</Typography>
                        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField fullWidth label="Username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} required sx={{ mb: 2 }} InputProps={{ startAdornment: <InputAdornment position="start"><AccountCircleOutlined color="action" /></InputAdornment> }} />
                            <TextField fullWidth label="Password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required sx={{ mb: 3 }} InputProps={{ startAdornment: <InputAdornment position="start"><LockOutlined color="action" /></InputAdornment> }} />
                            <Button fullWidth type="submit" variant="contained" size="large" disabled={checking} sx={{ py: 1.4 }}>{checking ? 'Signing in...' : 'Sign in'}</Button>
                        </Box>
                        <Typography variant="caption" color="text.secondary" display="block" textAlign="center" sx={{ mt: 3 }}>Your connection is protected by HTTP Basic authentication over HTTPS.</Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
