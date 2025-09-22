import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import MailIcon from './MailIcon';
import LockIcon from './LockIcon';
import EyeIcon from './EyeIcon';
import EyeSlashIcon from './EyeSlashIcon';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/app');
    } catch (err) {
      setError("Failed to sign in. Please check your email and password.");
      console.error("Login failed:", err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <Logo size={48} />
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <MailIcon />
              <input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email" 
                required 
              />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input 
                id="password" 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Enter your password" 
                required 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;