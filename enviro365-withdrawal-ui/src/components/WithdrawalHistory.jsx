import { useMemo, useState } from 'react';
import { Box, Card, CardContent, Chip, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { formatCurrency } from './PortfolioCard';

const formatDate = date => new Date(date).toLocaleString('en-ZA', { dateStyle: 'medium', timeStyle: 'short' });

export default function WithdrawalHistory({ withdrawals = [] }) {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('newest');
    const visibleWithdrawals = useMemo(() => withdrawals
        .filter(item => item.productName?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => sort === 'newest' ? new Date(b.withdrawalDate) - new Date(a.withdrawalDate) : new Date(a.withdrawalDate) - new Date(b.withdrawalDate)), [withdrawals, search, sort]);
    return (
        <Card><CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
                <Box><Typography variant="h6" fontWeight={700}>Withdrawal history</Typography><Typography variant="body2" color="text.secondary">A record of withdrawals from your products</Typography></Box>
                <Stack direction="row" spacing={1}><TextField size="small" placeholder="Search product" value={search} onChange={e => setSearch(e.target.value)} /><TextField size="small" select value={sort} onChange={e => setSort(e.target.value)} sx={{ minWidth: 130 }}><MenuItem value="newest">Newest first</MenuItem><MenuItem value="oldest">Oldest first</MenuItem></TextField></Stack>
            </Stack>
            {visibleWithdrawals.length === 0 ? <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>{withdrawals.length ? 'No withdrawals match your search.' : 'No withdrawals have been made yet.'}</Typography> : (
                <TableContainer><Table size="small"><TableHead><TableRow sx={{ '& th': { color: 'text.secondary', fontWeight: 700, bgcolor: '#F7F9F8' } }}><TableCell>Product</TableCell><TableCell>Withdrawal amount</TableCell><TableCell>Remaining balance</TableCell><TableCell>Date</TableCell><TableCell>Record</TableCell></TableRow></TableHead><TableBody>{visibleWithdrawals.map(item => <TableRow hover key={item.id}><TableCell sx={{ fontWeight: 600 }}>{item.productName}</TableCell><TableCell>{formatCurrency(item.amount)}</TableCell><TableCell>{formatCurrency(item.remainingBalance)}</TableCell><TableCell>{formatDate(item.withdrawalDate)}</TableCell><TableCell><Chip size="small" color="success" variant="outlined" label="Recorded" /></TableCell></TableRow>)}</TableBody></Table></TableContainer>
            )}
        </CardContent></Card>
    );
}
