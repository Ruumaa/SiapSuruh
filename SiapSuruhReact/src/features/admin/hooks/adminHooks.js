import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { editReport, getReports } from '../services/adminService';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useGetReports = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: reports = [],
    isLoading,
    error,
  } = useQuery({ queryKey: ['reports'], queryFn: () => getReports() });

  let filteredData = reports?.filter(
    (report) =>
      report?.User.username
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      report?.Provider.provider_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isLoading,
    error,
    filteredData,
    searchQuery,
    setSearchQuery,
    handleModal,
    isOpen,
  };
};

export const useEditReport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editReport,
    onSuccess: (data) => {
      queryClient.invalidateQueries('reports');
      console.log('Edit Success:', data);
      toast.success('Report Updated!');
    },
    onError: (error) => {
      console.error('Edit Error:', error);
      toast.error(`${error.message}`);
    },
  });
};
