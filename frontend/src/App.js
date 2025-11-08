import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import ClipForm from './components/ClipForm';
import ClipView from './components/ClipView';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [currentView, setCurrentView] = useState('login'); // login, signup, dashboard, clipView
  const [clipCode, setClipCode] = useState('');
  const [createdClip, setCreatedClip] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-color-scheme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Clear token if user is not authenticated
  useEffect(() => {
    if (token) {
      // Optionally verify token validity
    }
  }, [token]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    setCurrentView('login');
    setCreatedClip(null);
    setClipCode('');
  };

  const handleClipCreated = (clip) => {
    setCreatedClip(clip);
    setClipCode(clip.code);
    setCurrentView('clipView');
  };

  const handleViewClip = (e) => {
    e.preventDefault();
    if (clipCode.trim()) {
      setCurrentView('clipView');
    }
  };

  return (
    <div className="App">
      {/* Theme Toggle */}
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
      </button>

      <header className="App-header">
        <div className="header-content">
          <h1>☁️ Cloud Clipboard</h1>
          <p className="header-subtitle">Secure clipboard sharing made simple</p>
        </div>
        {token && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </header>
      
      <main className="App-main">
        {!token ? (
          <div className="auth-container">
            <div className="auth-tabs">
              <button 
                className={`auth-tab ${currentView === 'login' ? 'active' : ''}`}
                onClick={() => setCurrentView('login')}
              >
                Login
              </button>
              <button 
                className={`auth-tab ${currentView === 'signup' ? 'active' : ''}`}
                onClick={() => setCurrentView('signup')}
              >
                Sign Up
              </button>
            </div>
            {currentView === 'login' ? (
              <Login setToken={setToken} switchToSignup={() => setCurrentView('signup')} />
            ) : (
              <Signup setToken={setToken} switchToLogin={() => setCurrentView('login')} />
            )}
          </div>
        ) : (
          <>
            {currentView === 'clipView' ? (
              <ClipView 
                token={token} 
                clipCode={clipCode} 
                onBack={() => {
                  setCurrentView('dashboard');
                  setClipCode('');
                  setCreatedClip(null);
                }} 
              />
            ) : (
              <div className="dashboard">
                <div className="dashboard-header">
                  <h2>Create & Share Clips</h2>
                  <p>Share text, links, and code snippets securely</p>
                </div>

                <ClipForm token={token} onClipCreated={handleClipCreated} />
                
                {createdClip && (
                  <div className="clip-share">
                    <h3>✅ Your Clip is Ready!</h3>
                    <div className="share-code-display">
                      <span className="share-label">Share Code:</span>
                      <code className="share-code">{createdClip.code}</code>
                    </div>
                    <p className="expiry-info">
                      <span>⏰ Expires:</span> {new Date(createdClip.expiresAt).toLocaleString()}
                    </p>
                    <button 
                      className="btn-view-clip"
                      onClick={() => {
                        setClipCode(createdClip.code);
                        setCurrentView('clipView');
                      }}
                    >
                      View Clip Details
                    </button>
                  </div>
                )}
                
                <div className="view-clip-section">
                  <h3>📋 Access a Clip</h3>
                  <form onSubmit={handleViewClip}>
                    <input
                      type="text"
                      value={clipCode}
                      onChange={(e) => setClipCode(e.target.value.toUpperCase())}
                      placeholder="Enter share code (e.g., A7G3ZQ)"
                      maxLength="8"
                    />
                    <button type="submit">Access</button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="App-footer">
        <p>Cloud Clipboard MVP · Secure · Fast · Simple</p>
      </footer>
    </div>
  );
}

export default App;