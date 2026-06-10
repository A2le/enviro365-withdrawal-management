import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
    Chip,
} from '@mui/material';

const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR',
    }).format(amount);

const PortfolioCard = ({ portfolio }) => {
    if (!portfolio) return null;

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    Investor Portfolio
                </Typography>

                <Typography>
                    <strong>Name:</strong> {portfolio.investorName}
                </Typography>

                <Typography sx={{ mb: 3 }}>
                    <strong>Age:</strong> {portfolio.age}
                </Typography>

                <Grid container spacing={2}>
                    {portfolio.products.map((product) => (
                        <Grid item xs={12} md={6} key={product.id}>
                            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}>
                                <Typography fontWeight={700}>{product.name}</Typography>

                                <Chip
                                    label={product.type}
                                    size="small"
                                    sx={{ my: 1 }}
                                />

                                <Typography>
                                    Balance: {formatCurrency(product.balance)}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default PortfolioCard;