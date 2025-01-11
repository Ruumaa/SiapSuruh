import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { editUser, fetchProviders, getUserById } from '../services/userService';

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

export const useGetUserById = async (id) => {
  const data = await getUserById(id);
  return data;
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
