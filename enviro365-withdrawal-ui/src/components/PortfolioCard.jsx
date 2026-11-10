import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';

export const formatCurrency = (amount) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 2 }).format(Number(amount || 0));

export default function PortfolioCard({ portfolio }) {
    if (!portfolio) return null;
    const totalBalance = (portfolio.products || []).reduce((total, product) => total + Number(product.balance || 0), 0);
    return (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 2 }}>
            <Card sx={{ bgcolor: '#176B52', color: 'white', border: 0, overflow: 'hidden', position: 'relative' }}>
                <CardContent sx={{ p: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography sx={{ opacity: .82 }}>Total portfolio value</Typography><AccountBalanceWalletOutlinedIcon /></Stack>
                    <Typography variant="h4" fontWeight={700} sx={{ mt: 2 }}>{formatCurrency(totalBalance)}</Typography>
                    <Typography variant="body2" sx={{ opacity: .75, mt: 1 }}>Across {portfolio.products?.length || 0} investment products</Typography>
                </CardContent>
            </Card>
            <Card><CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center"><Typography color="text.secondary">Investor profile</Typography><TrendingUpOutlinedIcon color="success" /></Stack>
                <Typography variant="h5" fontWeight={700} sx={{ mt: 2 }}>{portfolio.investorName}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}><Chip size="small" label={`Age ${portfolio.age}`} /><Chip size="small" color="success" variant="outlined" label="Investor account" /></Stack>
            </CardContent></Card>
            {(portfolio.products || []).map(product => (
                <Card key={product.id}><CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start"><Box><Typography fontWeight={700}>{product.name}</Typography><Chip size="small" label={product.type} sx={{ mt: 1 }} /></Box><AccountBalanceWalletOutlinedIcon color="success" /></Stack>
                    <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>{formatCurrency(product.balance)}</Typography>
                    <Typography variant="caption" color="text.secondary">Current product balance</Typography>
                </CardContent></Card>
            ))}
        </Box>
    );
}
