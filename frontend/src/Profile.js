import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import BackArrowIcon from './BackArrowIcon';
import EditIcon from './EditIcon';
import UserIcon from './UserIcon';
import StatsIcon from './StatsIcon';
import EyeIcon from './EyeIcon';
import EyeSlashIcon from './EyeSlashIcon';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // State for form fields
  const [displayName, setDisplayName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for UI feedback
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Update Display Name
    if (user.displayName !== displayName) {
      try {
        await updateProfile(auth.currentUser, { displayName });
        setSuccess('Profile updated successfully!');
      } catch (err) {
        setError(err.message);
      }
    }

    // Update Password if fields are filled
    if (currentPassword && newPassword) {
      if (newPassword !== confirmPassword) {
        setError('New passwords do not match.');
        setLoading(false);
        return;
      }
      if (currentPassword === newPassword) {
        setError('New password cannot be the same as the old password.');
        setLoading(false);
        return;
      }

      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setSuccess('Password updated successfully!');
        // Clear password fields after successful update
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } catch (err) {
        setError('Failed to update password. Please check your current password.');
        console.error(err);
      }
    }
    
    setLoading(false);
    setTimeout(() => { // Hide messages after a few seconds
      setSuccess('');
      setError('');
      setIsEditing(false);
    }, 3000);
  };

  if (!user) {
    return <div className="loading-screen">Loading...</div>;
  }

  const initials = (displayName || user.email.split('@')[0]).charAt(0).toUpperCase();

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <header className="profile-header">
          <Link to="/app" className="back-link">
            <BackArrowIcon /> Back to Dashboard
          </Link>
        </header>

        <div className="avatar-section">
          <div className="avatar">{initials}</div>
          <h2 className="profile-name">{displayName || user.email}</h2>
          <p className="profile-membership">AgriAI Member since 2024</p>
        </div>

        {isEditing ? (
          // EDITING VIEW
          <form onSubmit={handleUpdateProfile} className="edit-form">
            {success && <p className="success-message">{success}</p>}
            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <label htmlFor="displayName">Full Name</label>
              <input id="displayName" type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
            </div>

            <h3 className="form-section-header">Change Password</h3>
            <div className="input-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="password-wrapper">
                <input id="currentPassword" type={showPassword ? "text" : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Enter your current password" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-wrapper">
                <input id="newPassword" type={showPassword ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter your new password" />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm New Password</label>
              <div className="password-wrapper">
                <input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          // DISPLAY VIEW
          <>
            <div className="profile-details">
              <div className="profile-section">
                <h3><UserIcon /> Personal Information</h3>
                <p><span className="label">Full Name</span> <span className="value">{displayName}</span></p>
                <p><span className="label">Email Address</span> <span className="value">{user.email}</span></p>
              </div>
            </div>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary edit-profile-btn">
              <EditIcon /> Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;