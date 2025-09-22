import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './i18n';
import App from './App';
import Login from './Login';
import Signup from './Signup';
import LandingPage from './LandingPage';
import Profile from './Profile'; // <-- 1. IMPORT

import './App.css';
import './LandingPage.css';
import './Profile.css'; // <-- 2. IMPORT THE NEW CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/app" element={<App />} />
        <Route path="/profile" element={<Profile />} /> {/* <-- 3. ADD THE ROUTE */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);