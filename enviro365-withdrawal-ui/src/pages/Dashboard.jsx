import { useCallback, useEffect, useState } from 'react';
import { Alert, AppBar, Avatar, Box, Button, CircularProgress, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import { AccountCircleOutlined, AccountBalanceWalletOutlined, AssessmentOutlined, DashboardOutlined, HistoryOutlined, Logout, Menu as MenuIcon, NatureOutlined, Refresh } from '@mui/icons-material';
import { useNavigate } from '../context/RouterContext';
import { getPortfolio, getWithdrawals } from '../services/withdrawalService';
import { useAuth } from '../context/AuthContext';
import PortfolioCard from '../components/PortfolioCard';
import WithdrawalHistory from '../components/WithdrawalHistory';
import WithdrawalForm from '../components/WithdrawalForm';
import CsvExportButton from '../components/CsvExportButton';

const drawerWidth = 252;

export default function Dashboard() {
    const [portfolio, setPortfolio] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const refreshDashboard = useCallback(async (initial = false) => {
        try {
            if (initial) setLoading(true); else setRefreshing(true);
            setError('');
            const [portfolioResponse, withdrawalsResponse] = await Promise.all([getPortfolio(), getWithdrawals()]);
            setPortfolio(portfolioResponse.data); setWithdrawals(withdrawalsResponse.data);
        } catch (err) {
            if (err.response?.status === 401) { logout(); navigate('/login', { replace: true }); return; }
            setError(err.response?.data?.message || 'Unable to load your dashboard information.');
        } finally { setLoading(false); setRefreshing(false); }
    }, [logout, navigate]);

    useEffect(() => { refreshDashboard(true); }, [refreshDashboard]);

    const handleLogout = () => { setMenuAnchor(null); logout(); navigate('/login', { replace: true }); };
    const navigation = <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#123F32', color: 'white' }}>
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ px: 3, py: 3 }}><NatureOutlined sx={{ fontSize: 30, color: '#A8D9BD' }} /><Box><Typography fontWeight={700} fontSize={19}>Enviro365</Typography><Typography variant="caption" sx={{ color: '#B5CFC3' }}>INVESTOR PORTAL</Typography></Box></Stack>
        <Divider sx={{ borderColor: 'rgba(255,255,255,.12)', mx: 2 }} />
        <Typography variant="overline" sx={{ color: '#A8C2B5', px: 3, pt: 3, pb: 1 }}>WORKSPACE</Typography>
        <List sx={{ px: 1.5 }}><ListItemButton selected sx={{ borderRadius: 2, color: 'white', '&.Mui-selected': { bgcolor: 'rgba(255,255,255,.13)' }, '&.Mui-selected:hover': { bgcolor: 'rgba(255,255,255,.18)' } }} onClick={() => { document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }}><ListItemIcon sx={{ color: '#B8D9C8', minWidth: 40 }}><DashboardOutlined /></ListItemIcon><ListItemText primary="Overview" /></ListItemButton>
        <ListItemButton sx={{ borderRadius: 2, color: '#D1E1D9' }} onClick={() => { document.getElementById('withdrawal-form')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }}><ListItemIcon sx={{ color: '#B8D9C8', minWidth: 40 }}><AccountBalanceWalletOutlined /></ListItemIcon><ListItemText primary="Make a withdrawal" /></ListItemButton>
        <ListItemButton sx={{ borderRadius: 2, color: '#D1E1D9' }} onClick={() => { document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }}><ListItemIcon sx={{ color: '#B8D9C8', minWidth: 40 }}><HistoryOutlined /></ListItemIcon><ListItemText primary="Withdrawal history" /></ListItemButton>
        <ListItemButton sx={{ borderRadius: 2, color: '#D1E1D9' }} onClick={() => { document.getElementById('history')?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); }}><ListItemIcon sx={{ color: '#B8D9C8', minWidth: 40 }}><AssessmentOutlined /></ListItemIcon><ListItemText primary="Reports & exports" /></ListItemButton></List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2.5, m: 2, borderRadius: 3, bgcolor: 'rgba(255,255,255,.08)' }}><Typography variant="body2" fontWeight={600}>Need assistance?</Typography><Typography variant="caption" sx={{ color: '#C0D5CA' }}>Contact your investment support team for help with your account.</Typography></Box>
    </Box>;

    return <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F7F5' }}>
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}><Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: drawerWidth, border: 0 } }}>{navigation}</Drawer><Drawer variant="permanent" open sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', border: 0 } }}>{navigation}</Drawer></Box>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #E6ECE8', bgcolor: 'rgba(255,255,255,.94)', backdropFilter: 'blur(10px)' }}><Toolbar sx={{ minHeight: '72px !important', px: { xs: 2, md: 4 } }}><IconButton onClick={() => setMobileOpen(true)} sx={{ display: { md: 'none' }, mr: 1 }}><MenuIcon /></IconButton><Box sx={{ flexGrow: 1 }}><Typography fontWeight={700} color="#19392D">Investor dashboard</Typography><Typography variant="caption" color="text.secondary">Your portfolio at a glance</Typography></Box><Stack direction="row" alignItems="center" spacing={1.5}><Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'right' }}><Typography variant="body2" fontWeight={600}>{user?.investorName}</Typography><Typography variant="caption" color="text.secondary">Investor account</Typography></Box><IconButton onClick={e => setMenuAnchor(e.currentTarget)}><Avatar sx={{ width: 38, height: 38, bgcolor: '#DDEFE5', color: '#176B52' }}>{user?.investorName?.charAt(0) || 'I'}</Avatar></IconButton><Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={() => setMenuAnchor(null)}><MenuItem onClick={handleLogout}><Logout fontSize="small" sx={{ mr: 1 }} />Sign out</MenuItem></Menu></Stack></Toolbar></AppBar>
            <Box sx={{ maxWidth: 1440, mx: 'auto', px: { xs: 2, sm: 3, lg: 5 }, py: { xs: 3, md: 4 } }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 3 }}><Box><Typography variant="h4" fontWeight={700} color="#19392D">Good day, {user?.investorName?.split(' ')[0] || 'Investor'}</Typography><Typography color="text.secondary" sx={{ mt: .5 }}>Here is what's happening with your investments.</Typography></Box><Button variant="outlined" startIcon={<Refresh />} onClick={() => refreshDashboard()} disabled={refreshing}>{refreshing ? 'Refreshing...' : 'Refresh data'}</Button></Stack>
                {error && <Alert severity="error" sx={{ mb: 3 }} action={<Button color="inherit" size="small" onClick={() => refreshDashboard()}>Retry</Button>}>{error}</Alert>}
                {loading ? <Box sx={{ minHeight: 300, display: 'grid', placeItems: 'center' }}><CircularProgress color="success" /></Box> : <>
                    <Box id="overview" sx={{ mb: 4 }}><Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>Portfolio overview</Typography><PortfolioCard portfolio={portfolio} /></Box>
                    <Box id="withdrawal-form" sx={{ mb: 4 }}><WithdrawalForm products={portfolio?.products || []} onWithdrawalCreated={() => refreshDashboard()} /></Box>
                    <Box id="history"><Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ sm: 'center' }} spacing={2} sx={{ mb: 2 }}><Box><Typography variant="h6" fontWeight={700}>Activity</Typography><Typography variant="body2" color="text.secondary">Your recent withdrawal records</Typography></Box><CsvExportButton /></Stack><WithdrawalHistory withdrawals={withdrawals} /></Box>
                </>}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 5 }}>Enviro365 Investor Portal · Your information is private and secure</Typography>
            </Box>
        </Box>
    </Box>;
}
