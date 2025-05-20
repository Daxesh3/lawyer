import { useState, useEffect } from 'react';
import Webcam from 'webcamjs';
import { baseUrl } from '../../../shared/constants/constant';

const Login = () => {
  const [formData, setFormData] = useState({ imageData: '' });
  const [userName, setUserName] = useState<string | null>(null); // To store user's name
  const [errorMessage, setErrorMessage] = useState('');
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCam, setIsWebCam] = useState<boolean>(true);

  useEffect(() => {
    const setupWebcam = async () => {
      Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90,
      });

      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        Webcam.attach('#my_camera');
      } catch (error) {
        setErrorMessage('Could not access the webcam. Please allow camera permissions in your browser.');
      }
    };

    setupWebcam();

    return () => {
      Webcam.reset();
    };
  }, []);

  const takeSnapshot = () => {
    setIsLoading(true);
    Webcam.snap((data_uri) => {
      setFormData({ imageData: data_uri });
      getAuthData(data_uri);
    });
  };

  const getAuthData = async (data_uri: string) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: data_uri.replace('data:image/jpeg;base64,', '') }),
      });
      const data = await response.json();
      if (data.firstName) {
        setUserName(`${data.firstName} ${data.lastName || ''}`); // Store the user's name
      } else {
        setNoRecordFound(true);
      }
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('Error during authentication.');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    takeSnapshot();
    setIsWebCam(false);
  };

  return (
    <div className="webcam-wrapper">
      {isWebCam && <div id="my_camera" className="camera-container" />}
      {errorMessage && <p className="error-text">{errorMessage}</p>}
      {isWebCam && (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="btn-wrapper">
            <button type="submit" className="main-button primary-btn">
              {isLoading ? <span className="spinner" /> : 'Login'}
            </button>
          </div>
        </form>
      )}
      {noRecordFound && <p className="error-text">No record found</p>}
      {!isWebCam && userName && (
        <>
          <h4 className="welcome-text">Welcome, {userName}!</h4>
          {formData.imageData && <img src={formData.imageData} alt="Captured" />}
        </>
      )}
      {isLoading && (
        <div className="spinner-wrapper">
          <span className="spinner page-spinner" />
        </div>
      )}
    </div>
  );
};

export default Login;
