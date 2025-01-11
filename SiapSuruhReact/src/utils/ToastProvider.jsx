import { ToastContainer } from 'react-toastify';

const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer
        autoClose={1000}
        draggable={false}
        position="bottom-right"
      />
    </>
  );
};

export default ToastProvider;
