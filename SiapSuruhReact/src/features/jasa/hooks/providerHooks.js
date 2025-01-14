import { useQuery } from '@tanstack/react-query';
import { getProviderByUserId } from '../services/providerService';

export const useProviderByUserId = (id) => {
  const {
    data: provider,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['providers', id],
    queryFn: () => getProviderByUserId(id),
  });

  return { provider, isLoading, error };
};
