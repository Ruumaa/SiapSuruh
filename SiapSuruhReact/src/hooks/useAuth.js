import { useMutation } from '@tanstack/react-query';
import { loginUser, register } from '../api/auth';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
    },
    onError: (error) => {
      console.error('Login Error:', error.message);
    },
  });
};

export const useLoginJasa = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
    },
    onError: (error) => {
      console.error('Login Error:', error.message);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      console.log('Register Success:', data);
    },
    onError: (error) => {
      console.error('Register Error:', error.message);
    },
  });
};
