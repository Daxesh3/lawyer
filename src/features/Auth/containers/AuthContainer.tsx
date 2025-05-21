import { FC } from 'react';
import Lottie from 'lottie-react';
import loginAnimation from '../../../assets/Json/Login.json';
// import loadingAnimation from '../../../assets/Json/whiteLogin.json';
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
          <div className="animated-image pointer-events-none">
            <Lottie animationData={loginAnimation} loop={true} style={{ height: '600px' }} />
            {/* <Lottie animationData={loadingAnimation} loop={true} style={{ height: '600px' }} /> */}
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
