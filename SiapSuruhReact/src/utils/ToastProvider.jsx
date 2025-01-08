import { ToastContainer } from 'react-toastify';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer autoClose={1000} draggable={false} />
    </>
  );
};

export default ToastProvider;
