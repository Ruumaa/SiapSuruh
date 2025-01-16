import { fetchWithAuth } from '../../../api/fetchWithAuth';

export const getReports = async () => {
  const response = await fetchWithAuth('/reports');
  return response.data;
};

export const editReport = async ({ id, data }) => {
  const response = await fetchWithAuth(`/reports/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data;
};
