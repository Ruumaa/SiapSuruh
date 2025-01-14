import { fetchWithAuth } from '../../../api/fetchWithAuth';

export const getProviderByUserId = async (id) => {
  const response = await fetchWithAuth(`/providers/user/${id}`);
  return response.data;
};

export const editProvService = async ({ id, data }) => {
  const parsedData = {
    ...data,
    price: data.price && parseInt(data.price),
  };

  const response = await fetchWithAuth(`/providers/service/${id}`, {
    method: 'PUT',
    body: JSON.stringify(parsedData),
  });
  return response.data;
};
