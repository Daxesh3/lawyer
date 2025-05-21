import { useState, useEffect, useCallback } from 'react';
import Webcam from 'webcamjs';
import { baseUrl } from '../../../shared/constants/constant';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ imageData: '' });
  const [userName, setUserName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWebCam, setIsWebCam] = useState<boolean>(true);
  const [isWebcamReady, setIsWebcamReady] = useState(false);

  const setupWebcam = useCallback(async () => {
    try {
      // First check if we have permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      Webcam.set({
        width: 360,
        height: 270,
        image_format: 'jpeg',
        jpeg_quality: 90,
        force_flash: false,
        fps: 45,
        swfURL: undefined,
      });

      const cameraElement = document.getElementById('my_camera');
      if (!cameraElement) {
        throw new Error('Camera element not found');
      }

      // Attach webcam and wait for it to be ready
      await new Promise<void>((resolve, reject) => {
        Webcam.attach('#my_camera');

        // Check if webcam is ready every 100ms
        const checkInterval = setInterval(() => {
          const videoElement = document.querySelector('#my_camera video') as HTMLVideoElement;
          if (videoElement && videoElement.readyState === 4) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);

        // Timeout after 5 seconds
        setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error('Webcam initialization timeout'));
        }, 5000);
      });

      setIsWebcamReady(true);
      setErrorMessage('');

      // Stop the initial stream after webcam is attached
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      console.error('Webcam setup error:', error);
      setErrorMessage('Could not access the webcam. Please allow camera permissions in your browser.');
      setIsWebcamReady(false);
    }
  }, []);

  useEffect(() => {
    setupWebcam();
    return () => {
      Webcam.reset();
    };
  }, [setupWebcam]);

  const takeSnapshot = useCallback(() => {
    if (!isWebcamReady) {
      setErrorMessage('Camera is not ready. Please wait...');
      return;
    }

    const videoElement = document.querySelector('#my_camera video') as HTMLVideoElement;
    if (!videoElement || videoElement.readyState !== 4) {
      setErrorMessage('Camera not initialized properly. Please try again.');
      return;
    }

    setIsLoading(true);
    try {
      // Create a canvas element
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;

      // Draw the video frame to the canvas
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convert canvas to data URL
      const data_uri = canvas.toDataURL('image/jpeg');

      if (!data_uri) {
        throw new Error('Failed to capture image');
      }

      setFormData({ imageData: data_uri });
      getAuthData(data_uri);
    } catch (error) {
      console.error('Snapshot error:', error);
      setErrorMessage('Failed to capture image. Please try again.');
      handleRedirect();
    }
  }, [isWebcamReady]);

  const getAuthData = async (data_uri: string) => {
    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: data_uri.replace('data:image/jpeg;base64,', '') }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.firstName) {
        setUserName(`${data.firstName} ${data.lastName || ''}`);
        setNoRecordFound(false);
        setIsWebCam(false);
        handleRedirect();
      } else {
        handleRedirect();
      }
    } catch (error) {
      handleRedirect();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isWebcamReady) {
      setErrorMessage('Camera is not ready. Please wait...');
      return;
    }
    takeSnapshot();
  };

  const handleRedirect = () => {
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('isLogin', 'true');
      window.dispatchEvent(new StorageEvent('storage', { key: 'isLogin' }));
      navigate('/home', { replace: true });
    }, 3000);
  };

  const handleRetry = () => {
    setErrorMessage('');
    setNoRecordFound(false);
    setUserName(null);
    setIsWebCam(true);
    setupWebcam();
  };

  return (
    <div className="webcam-wrapper">
      {isWebCam && <div id="my_camera" className="camera-container" />}
      {errorMessage && (
        <div className="error-container">
          <p className="error-text">{errorMessage}</p>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      )}
      {isWebCam && (
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="btn-wrapper">
            <button
              type="submit"
              className="main-button primary-btn"
              disabled={!isWebcamReady || isLoading}
              onClick={(e) => {
                e.preventDefault();
                if (isWebcamReady && !isLoading) {
                  takeSnapshot();
                }
              }}
            >
              {isLoading ? <span className="spinner" /> : 'Sign in'}
            </button>
          </div>
        </form>
      )}
      {noRecordFound && (
        <div className="error-container">
          <p className="error-text">No record found</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      )}
      {!isWebCam && userName && (
        <>
          <h4 className="welcome-text">Welcome, {userName}!</h4>
          {formData.imageData && <img src={formData.imageData} alt="Captured" />}
        </>
      )}
    </div>
  );
};

export default Login;
