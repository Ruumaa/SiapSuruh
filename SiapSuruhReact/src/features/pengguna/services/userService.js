import { fetchWithAuth } from '../../../api/fetchWithAuth';

export const fetchProviders = async () => {
  const response = await fetchWithAuth('/providers');
  const providersWithService = response.data.filter(
    (provider) => provider.Service !== null
  );
  return providersWithService;
};

export const editUser = async ({ id, data }) => {
  const response = await fetchWithAuth(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  return response.data;
};

export const getUserById = async (id) => {
  const response = await fetchWithAuth(`/users/${id}`);
  return response.data;
};
