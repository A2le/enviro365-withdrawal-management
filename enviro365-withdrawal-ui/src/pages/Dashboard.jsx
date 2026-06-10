import { useEffect, useState } from 'react';
import { Box, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { getPortfolio, getWithdrawals } from '../services/withdrawalService';
import PortfolioCard from "../components/PortfolioCard.jsx";
import WithdrawalHistory from "../components/WithdrawalHistory.jsx";
import WithdrawalForm from "../components/WithdrawalForm.jsx";
import CsvExportButton from "../components/CsvExportButton.jsx";

const INVESTOR_ID = 1;

const Dashboard = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const refreshDashboard = async () => {
        const [portfolioResponse, withdrawalsResponse] = await Promise.all([
            getPortfolio(INVESTOR_ID),
            getWithdrawals(),
        ]);

        setPortfolio(portfolioResponse.data);
        setWithdrawals(withdrawalsResponse.data);
    };

    // const loadDashboardData = async () => {
    //     try {
    //         setLoading(true);
    //         setError('');
    //
    //         const [portfolioResponse, withdrawalsResponse] = await Promise.all([
    //             getPortfolio(INVESTOR_ID),
    //             getWithdrawals(),
    //         ]);
    //
    //         setPortfolio(portfolioResponse.data);
    //         setWithdrawals(withdrawalsResponse.data);
    //     } catch (err) {
    //         setError(err.response?.data?.message || 'Failed to load dashboard data');
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    useEffect(() => {
        let isMounted = true;

        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError('');

                const [portfolioResponse, withdrawalsResponse] = await Promise.all([
                    getPortfolio(INVESTOR_ID),
                    getWithdrawals(),
                ]);

                if (!isMounted) return;

                setPortfolio(portfolioResponse.data);
                setWithdrawals(withdrawalsResponse.data);
            } catch (err) {
                if (!isMounted) return;
                setError(err.response?.data?.message || 'Failed to load dashboard data');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchDashboardData();

        return () => {
            isMounted = false;
        };
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
                Enviro365 Withdrawal Management
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <PortfolioCard portfolio={portfolio} />
            <WithdrawalForm
                products={portfolio?.products || []}
                onWithdrawalCreated={refreshDashboard}
            />
            <CsvExportButton investorId={INVESTOR_ID} />

            <WithdrawalHistory withdrawals={withdrawals} />
        </Container>
    );
};

export default Dashboard;