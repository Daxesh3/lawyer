import { FC } from 'react';
import Lottie from 'lottie-react';
import groovyWalkAnimation from '../../../assets/Json/Login.json';
import Login from '../components/Login';

const AuthContainer: FC = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-left-container">
        <div className="logo--wrapper"></div>
        <div className="animated-image">
          <Lottie animationData={groovyWalkAnimation} loop={true} />
        </div>
      </div>
      <div className="auth-right-container">
        <div className="auth-form-container">
          <h1 className="auth-title">Login</h1>
          <div className="auth-form-wrapper" style={{ minHeight: '240px' }}>
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
