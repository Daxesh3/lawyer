import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import FeeLetter from './features/FeeLetter/components/FeeLetter';
import AuthContainer from './features/Auth/containers/AuthContainer';
import Layout from './hoc/layout/Layout';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const newLoginState = localStorage.getItem('isLogin') === 'true';
      setIsLogin(newLoginState);
      if (newLoginState) {
        navigate('/letter');
      } else {
        navigate('/login');
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Initial check and route
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  return (
    <>
      {!isLogin ? (
        <Routes>
          <Route path="/login" element={<AuthContainer />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/letter" element={<FeeLetter />} />
            <Route path="*" element={<Navigate to="/letter" replace />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;
