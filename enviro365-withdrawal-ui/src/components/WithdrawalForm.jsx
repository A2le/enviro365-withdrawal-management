import { useState } from 'react';
import { Alert, Box, Button, Card, CardContent, MenuItem, Stack, TextField, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlined';
import { createWithdrawal } from '../services/withdrawalService';
import { formatCurrency } from './PortfolioCard';

export default function WithdrawalForm({ products = [], onWithdrawalCreated }) {
    const [productId, setProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const selectedProduct = products.find(product => String(product.id) === String(productId));

    const handleSubmit = async event => {
        event.preventDefault(); setSubmitting(true); setSuccess(''); setError('');
        try {
            await createWithdrawal({ productId: Number(productId), amount: Number(amount) });
            setSuccess('Your withdrawal has been recorded successfully.'); setProductId(''); setAmount('');
            await onWithdrawalCreated?.();
        } catch (err) { setError(err.response?.data?.message || 'Unable to create withdrawal. Please check the amount and try again.'); }
        finally { setSubmitting(false); }
    };

    return <Card><CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}><AddCircleOutlineIcon color="success" /><Typography variant="h6" fontWeight={700}>Request a withdrawal</Typography></Stack>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 3 }}>Select an investment product and enter the amount you would like to withdraw.</Typography>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'flex-start' }}>
                <TextField select fullWidth label="Investment product" value={productId} onChange={e => setProductId(e.target.value)} required><MenuItem value="" disabled>Select a product</MenuItem>{products.map(product => <MenuItem key={product.id} value={product.id}>{product.name} — {formatCurrency(product.balance)}</MenuItem>)}</TextField>
                <TextField fullWidth label="Withdrawal amount (ZAR)" type="number" value={amount} onChange={e => setAmount(e.target.value)} required inputProps={{ min: '0.01', step: '0.01', max: selectedProduct?.balance }} helperText={selectedProduct ? `Current balance: ${formatCurrency(selectedProduct.balance)}` : 'Choose a product to view its balance'} />
                <Button type="submit" variant="contained" disabled={submitting || !products.length || !productId || Number(amount) <= 0} sx={{ minWidth: 175, py: 1.8 }}>{submitting ? 'Submitting...' : 'Submit request'}</Button>
            </Stack>
        </Box>
    </CardContent></Card>;
}
