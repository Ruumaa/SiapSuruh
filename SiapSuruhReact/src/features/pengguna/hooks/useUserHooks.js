import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createOrder,
  editOrderStatus,
  editUser,
  fetchProviders,
  getOrdersByUserId,
  getProviderById,
  getUserById,
} from '../services/userService';

export const useProvider = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: providers = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['providers'],
    queryFn: fetchProviders,
  });

  let filteredData = providers?.filter(
    (provider) =>
      provider?.provider_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      provider.Categories.some((category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return {
    isLoading,
    error,
    filteredData,
    searchQuery,
    setSearchQuery,
  };
};

export const useProviderById = (id) => {
  const {
    data: provider = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['providers', id],
    queryFn: () => getProviderById(id),
  });

  return { provider, isLoading, error };
};

export const useGetUserById = (id) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById(id),
  });

  return { user, isLoading, error };
};

export const useOrdersByUserId = (id) => {
  const {
    data: orders = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', id],
    queryFn: () => getOrdersByUserId(id),
  });

  return { orders, isLoading, error };
};

export const useEditProfile = () => {
  return useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
      console.log('Edit Success:', data);
    },
    onError: (error) => {
      console.error('Edit Error:', error);
    },
  });
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log('Create Order Success:', data);
    },
    onError: (error) => {
      console.error('Create Order Error:', error);
    },
  });
};

export const useEditOrderStatus = () => {
  return useMutation({
    mutationFn: editOrderStatus,
    onSuccess: (data) => {
      console.log('Edit Order Status Success:', data);
      window.location.reload();
    },
    onError: (error) => {
      console.error('Edit Order Status Error:', error);
    },
  });
};
