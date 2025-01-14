import { fetchWithAuth } from '../../../api/fetchWithAuth';

export const getProviderByUserId = async (id) => {
  const response = await fetchWithAuth(`/providers/user/${id}`);
  return response.data;
};
