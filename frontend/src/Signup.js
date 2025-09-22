import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from './firebase';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import UserIcon from './UserIcon';
import MailIcon from './MailIcon';
import LockIcon from './LockIcon';
import EyeIcon from './EyeIcon';
import EyeSlashIcon from './EyeSlashIcon';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Set the user's display name
      await updateProfile(userCredential.user, { displayName: fullName });
      navigate('/app');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        <div className="auth-header">
          <Logo size={48} />
          <h1>Join Agri-AI</h1>
          <p>Create your account to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <UserIcon />
              <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" required />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <MailIcon />
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
          
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <LockIcon />
              <input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required />
              
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">Create Account</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;