import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    }).format(amount);

const formatDate = (date) =>
    new Date(date).toLocaleString('en-ZA');

const WithdrawalHistory = ({ withdrawals }) => {
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Withdrawal History
                </Typography>

                {withdrawals.length === 0 ? (
                    <Typography color="text.secondary">
                        No withdrawals have been made yet.
                    </Typography>
                ) : (
                    <TableContainer component={Paper} variant="outlined">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Remaining Balance</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {withdrawals.map((withdrawal) => (
                                    <TableRow key={withdrawal.id}>
                                        <TableCell>{withdrawal.productName}</TableCell>
                                        <TableCell>{formatCurrency(withdrawal.amount)}</TableCell>
                                        <TableCell>
                                            {formatCurrency(withdrawal.remainingBalance)}
                                        </TableCell>
                                        <TableCell>{formatDate(withdrawal.withdrawalDate)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
};

export default WithdrawalHistory;