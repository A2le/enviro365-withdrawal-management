import { useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { createWithdrawal } from '../services/withdrawalService';

const WithdrawalForm = ({ products, onWithdrawalCreated }) => {
    const [productId, setProductId] = useState('');
    const [amount, setAmount] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setSubmitting(true);
            setSuccess('');
            setError('');

            await createWithdrawal({
                productId: Number(productId),
                amount: Number(amount),
            });

            setSuccess('Withdrawal created successfully.');
            setProductId('');
            setAmount('');

            onWithdrawalCreated();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create withdrawal.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Create Withdrawal
                </Typography>

                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        select
                        fullWidth
                        label="Select Product"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        sx={{ mb: 2 }}
                    >
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.name} — {product.type}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        fullWidth
                        label="Withdrawal Amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        inputProps={{ min: 1 }}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                    >
                        {submitting ? 'Submitting...' : 'Submit Withdrawal'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default WithdrawalForm;