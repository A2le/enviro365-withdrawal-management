import { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { exportWithdrawals } from '../services/withdrawalService';

export default function CsvExportButton() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleExport = async () => {
        try {
            setLoading(true); setError('');
            const response = await exportWithdrawals();
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv;charset=utf-8;' }));
            const link = document.createElement('a');
            link.href = url; link.download = 'my-withdrawals.csv';
            document.body.appendChild(link); link.click(); link.remove();
            window.URL.revokeObjectURL(url);
        } catch { setError('Export failed. Please try again.'); }
        finally { setLoading(false); }
    };
    return <Tooltip title={error}><span><Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExport} disabled={loading}>{loading ? 'Preparing...' : 'Export CSV'}</Button></span></Tooltip>;
}
