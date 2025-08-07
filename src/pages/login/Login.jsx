import LoginForm from "./components/LoginForm"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 font-inter'>
      <LoginForm />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}
