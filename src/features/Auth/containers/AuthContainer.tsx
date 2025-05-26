import { FC } from 'react';
import Login from '../components/Login';
import Logo from '../../../assets/Images/Logo.png';
import Animation from '../components/Animation';

const AuthContainer: FC = () => {
  return (
    <>
      <Animation />
      <div className="auth-wrapper">
        <div className="auth-left-container">
          <div className="logo--wrapper">
            <img src={Logo} className="brand-logo" alt="logo" />
          </div>
          <div className="h-[calc(100vh-300px)] flex flex-col justify-center items-center">
            <h1 className="text-7xl text-white">First Draft</h1>
            <p className="text-white mt-2">First Draft, Done Fast — Your AI-Powered Legal Assistant</p>
          </div>
        </div>
        <div className="auth-right-container">
          <Login />
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
