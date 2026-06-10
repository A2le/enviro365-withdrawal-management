import api from '../api/axios';

export const getPortfolio = investorId =>
    api.get(`/investors/${investorId}/portfolio`);

export const createWithdrawal = data =>
    api.post('/withdrawals', data);

export const getWithdrawals = () =>
    api.get('/withdrawals');

export const exportWithdrawals = (investorId) => {
    return api.get('/withdrawals/export', {
        params: { investorId },
        responseType: 'blob',
    });
};