import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createOrder,
  createReport,
  createReview,
  editOrderStatus,
  editUser,
  fetchProviders,
  getOrdersByUserId,
  getProviderById,
  getUserById,
} from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
      provider?.Service.title
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

export const useEditProfile = (isUser) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: editUser,
    onSuccess: (data) => {
      console.log('Edit Success:', data);
      navigate(isUser ? '/user/home' : '/provider/home');
      toast.success('Profile Updated!');
    },
    onError: (error) => {
      console.error('Edit Error:', error);
      toast.error(`${error.message}`);
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

export const useReview = () => {
  const [isOpenReview, setIsOpenReview] = useState(false);
  const handleReviewModal = () => {
    setIsOpenReview((prevState) => !prevState);
  };
  return { isOpenReview, handleReviewModal };
};

export const useEditOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editOrderStatus,
    onSuccess: (data) => {
      queryClient.invalidateQueries('orders');
      console.log('Edit Order Status Success:', data);
      toast.success('Order Status Updated!');
    },
    onError: (error) => {
      console.error('Edit Order Status Error:', error);
      toast.error(`${error.message}`);
    },
  });
};

export const useReport = () => {
  const [isOpenReport, setIsOpenReport] = useState(false);

  const handleReportModal = () => {
    setIsOpenReport((prevState) => !prevState);
  };

  return { isOpenReport, handleReportModal };
};

export const useCreateReport = () => {
  return useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      console.log('Create Report Success:', data);
      toast.success('Report Created!');
    },
    onError: (error) => {
      console.error('Create Report Error:', error);
      toast.error(`${error.message}`);
    },
  });
};

export const useCreateReview = () => {
  return useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      console.log('Create Review Success:', data);
      toast.success('Review Created!');
    },
    onError: (error) => {
      console.error('Create Review Error:', error);
      toast.error(`${error.message}`);
    },
  });
};
