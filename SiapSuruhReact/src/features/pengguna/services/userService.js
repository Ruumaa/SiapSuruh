import { fetchWithAuth } from '../../../api/fetchWithAuth';
import { parseDate } from '../../../utils/ParseDate';

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

export const getProviderById = async (id) => {
  const response = await fetchWithAuth(`/providers/${id}`);
  return response.data;
};

export const createOrder = async (data) => {
  const parsedData = {
    ...data,
    order_date: parseDate(data.order_date).toISOString(),
    total_price: parseFloat(data.total_price),
  };

  const result = await fetchWithAuth('/orders', {
    method: 'POST',
    body: JSON.stringify(parsedData),
  });

  return result;
};

export const getOrdersByUserId = async (id) => {
  const response = await fetchWithAuth(`/orders/user/${id}`);
  return response.data;
};

export const editOrderStatus = async ({ id, data }) => {
  const response = await fetchWithAuth(`/orders/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status: data.status }),
  });
  return response.data;
};

export const createReport = async (data) => {
  const response = await fetchWithAuth('/reports', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return response.data;
};

export const createReview = async (data) => {
  const repsponse = await fetchWithAuth('/reviews', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  return repsponse.data;
};
