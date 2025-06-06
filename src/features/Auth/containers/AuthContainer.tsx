import { FC } from 'react';
import Logo from '../../../assets/Images/Logo.png';
import Animation from '../components/Animation';
import LoginForm from '../components/LoginForm';

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
            <h1 className="text-7xl text-white">FirstDraft</h1>
            <p className="text-white mt-2">FirstDraft, Done Fast — Your AI-Powered Legal Assistant</p>
          </div>
        </div>
        <div className="auth-right-container">
          {/* <Login /> */}
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default AuthContainer;
