import { useMutation, useQuery } from '@tanstack/react-query';
import {
  editProvService,
  getProviderByUserId,
} from '../services/providerService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

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

export const useEditProvService = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: editProvService,
    onSuccess: (data) => {
      console.log('Edit Success:', data);
      toast.success('Provider Service Updated!');
      navigate('/provider/home');
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.message);
    },
  });
};

export const useServiceCheck = (provider) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (provider && Object.keys(provider?.Service || {}).length === 0) {
      navigate('/provider/home/service');
    }
  }, [provider, navigate]);
};
