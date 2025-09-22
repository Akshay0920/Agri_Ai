import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo'; // Using our Logo component
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="header-left"></div> {/* Empty div for spacing */}
        <div className="logo-container">
          <Logo size={40} />
          <h1>Agri-AI</h1>
        </div>
        <div className="auth-buttons">
          {/* Login button now uses btn-primary for the yellow style */}
          <Link to="/login" className="btn btn-primary">Login</Link>
          <Link to="/signup" className="btn btn-secondary">Sign Up</Link>
        </div>
      </header>

      <main className="landing-hero">
        <div className="hero-content">
          <h1>Smart Crop Decisions for a Greener Tomorrow</h1>
          <p>Harness the power of AI to optimize your farm yields, conserve resources, and embrace sustainable agriculture.</p>
          <div className="cta-buttons">
            {/* Get Started button now uses btn-primary for the yellow style */}
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/learn-more" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop" 
            alt="Lush green field" 
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;