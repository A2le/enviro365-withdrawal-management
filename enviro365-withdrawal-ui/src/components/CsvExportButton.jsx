import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { exportWithdrawals } from '../services/withdrawalService';

const CsvExportButton = ({ investorId }) => {
    const handleExport = async () => {
        const response = await exportWithdrawals(investorId);

        const blob = new Blob([response.data], {
            type: 'text/csv;charset=utf-8;',
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'withdrawals.csv');

        document.body.appendChild(link);
        link.click();

        link.remove();
        window.URL.revokeObjectURL(url);
    };

    return (
        <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={handleExport}
            sx={{ mb: 3 }}
        >
            Download CSV
        </Button>
    );
};

export default CsvExportButton;