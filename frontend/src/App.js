import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import UserIcon from './UserIcon';
import LogoutIcon from './LogoutIcon';
import GlobeIcon from './GlobeIcon';
import cropImages from './cropImages';
import Profile from './Profile';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState('');
  
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', temperature: '',
    humidity: '', ph: '', rainfall: ''
  });

  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // ... (All your functions like useEffect, handleLogout, getPrediction, etc. remain here)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error("Failed to log out", err);
    }
  };

  const getPrediction = async (data) => {
    setLoading(true);
    setError('');
    try {
      const numericData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, parseFloat(value)])
      );
      const response = await axios.post('http://127.0.0.1:5000/predict', numericData);
      setResult(response.data.prediction);
    } catch (err) {
      console.error(err);
      setError('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetLocationAndPredict = () => {
    if (!process.env.REACT_APP_WEATHERAPI_KEY) {
      setError("WeatherAPI.com key is missing.");
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const weatherApiKey = process.env.REACT_APP_WEATHERAPI_KEY;
        const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${latitude},${longitude}`;
        const weatherResponse = await axios.get(weatherApiUrl);

        const newFormData = {
          N: 90,
          P: 42,
          K: 43,
          temperature: weatherResponse.data.current.temp_c,
          humidity: weatherResponse.data.current.humidity,
          ph: 6.5,
          rainfall: 202.9,
        };
        
        setFormData(newFormData);
        await getPrediction(newFormData);

      } catch (err) {
        console.error(err);
        setError('Failed to fetch live data.');
        setLoading(false);
      }
    }, (err) => {
      setError('Could not get location. Please enable location services.');
      setLoading(false);
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    getPrediction(formData);
    console.log("Submit button clicked! Form data is:", formData);
  };

  if (!user) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="app-dashboard-container">
      <header className="app-header">
        <div className="logo-container">
          <Logo size={32} />
          <h1>Agri-AI</h1>
        </div>
        <nav className="app-nav">
          <Link to="/profile" className="nav-item">
            <UserIcon />
            {t('profile')}
          </Link>
          <button onClick={handleLogout} className="nav-item logout-button">
            <LogoutIcon />
            {t('logout')}
          </button>
        </nav>
      </header>

      <main className="dashboard-content">
        {/* ... (welcome section and form JSX are unchanged) ... */}
        <div className="welcome-section">
          <h2>{t('welcomeMessage', { name: user.displayName || user.email.split('@')[0] })}</h2>
          <p>{t('findPerfectCrop')}</p>
          <button onClick={handleGetLocationAndPredict} className="btn btn-primary location-button" disabled={loading}>
            {loading ? t('locating') : (
              <>
                <GlobeIcon /> {t('useMyCurrentLocation')}
              </>
            )}
          </button>
        </div>

        <form onSubmit={handleManualSubmit} className="manual-form">
          <div className="form-grid">
            {Object.keys(formData).map((key) => (
              <div className="input-group" key={key}>
                <label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  id={key}
                  name={key}
                  type="number"
                  step="0.1"
                  value={formData[key]}
                  onChange={handleFormChange}
                  placeholder={`e.g., ${key === 'N' ? '90' : '6.5'}`}
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('analyzing') : t('getRecommendation')}
          </button>
        </form>
        
        {result && (
          <div className="result-card">
            <img 
              src={cropImages[result.toLowerCase()] || cropImages.default} 
              alt={result} 
              className="crop-image"
              referrerPolicy="no-referrer" // <-- THIS IS THE FIX
            />
            <h3>{t('recommendedCrop')}:</h3>
            <p className="crop-name">{t(`crops.${result.toLowerCase()}`, { defaultValue: result })}</p>
          </div>
        )}
        
        {error && <p className="error-message">{error}</p>}
      </main>

      <div className="language-switcher-bottom">
        <button onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>English</button>
        <button onClick={() => i18n.changeLanguage('hi')} className={i18n.language === 'hi' ? 'active' : ''}>हिन्दी</button>
        <button onClick={() => i18n.changeLanguage('te')} className={i18n.language === 'te' ? 'active' : ''}>తెలుగు</button>
      </div>
    </div>
  );
}

export default App;