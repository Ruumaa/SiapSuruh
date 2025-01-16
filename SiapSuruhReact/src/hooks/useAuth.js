import { useMutation } from '@tanstack/react-query';
import { loginAdmin, loginJasa, loginUser, register } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.id);
    },
    onError: (error) => {
      console.error('Login Error:', error.message);
    },
  });
};

export const useLoginJasa = () => {
  return useMutation({
    mutationFn: loginJasa,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.id);
    },
    onError: (error) => {
      console.error('Login Error:', error.message);
    },
  });
};

export const useLoginAdmin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginAdmin,
    onSuccess: (data) => {
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('user_id', data.id);
      toast.success('Login Success');
      navigate('/admin');
    },
    onError: (error) => {
      console.error('Login Error:', error.message);
      toast.error(`${error.message}`);
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
