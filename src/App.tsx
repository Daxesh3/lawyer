import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import FeeLetter from './features/FeeLetter/components/FeeLetter';
import AuthContainer from './features/Auth/containers/AuthContainer';
import Layout from './hoc/layout/Layout';
import Dashboard from './features/Dashboard/containers/Dashboard';
import LetterCreation from './features/LetterCreation/containers/LetterCreation';
import { LetterProvider } from './features/LetterCreation/context/LetterContext';
import Cover from './features/FacilityType/container/Cover';

function App() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') === 'true');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      const newLoginState = localStorage.getItem('isLogin') === 'true';
      setIsLogin(newLoginState);

      // Only navigate if we're not already on the correct route
      if (newLoginState && location.pathname === '/login') {
        navigate('/home', { replace: true });
      } else if (!newLoginState && location.pathname !== '/login') {
        navigate('/login', { replace: true });
      }
    };

    // Listen for storage changes from other tabs
    window.addEventListener('storage', handleStorageChange);

    // Initial check and route
    handleStorageChange();

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate, location]);

  return (
    <>
      {!isLogin ? (
        <Routes>
          <Route path="/cover" element={<Cover />} />
          <Route path="/login" element={<AuthContainer />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/letter" element={<LetterCreation />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Layout>
          <LetterProvider>
            <Routes>
              <Route path="/cover" element={<Cover />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/letter" element={<LetterCreation />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </LetterProvider>
        </Layout>
      )}
    </>
  );
}

export default App;
