import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

const ClipView = ({ token, clipCode, onBack }) => {
  const [clip, setClip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClip = async () => {
      try {
        const config = token ? {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        } : {};
        
        const response = await axios.get(`${API_URL}/api/clip/${clipCode}`, config);
        setClip(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    if (clipCode) {
      fetchClip();
    }
  }, [clipCode, token]);

  if (loading) return (
    <div className="clip-view">
      <div className="loading-state">Loading clip...</div>
    </div>
  );
  if (error) return (
    <div className="clip-view">
      <button onClick={onBack} className="back-button">← Back</button>
      <div className="error">{error}</div>
    </div>
  );
  if (!clip) return (
    <div className="clip-view">
      <button onClick={onBack} className="back-button">← Back</button>
      <div className="error">Clip not found</div>
    </div>
  );

  const getClipIcon = () => {
    switch(clip.type) {
      case 'Text': return '📝';
      case 'Link': return '🔗';
      case 'Code': return '💻';
      default: return '📄';
    }
  };

  const renderClipContent = () => {
    if (clip.type === 'Link') {
      return (
        <div className="clip-card clip-card-link">
          <div className="clip-card-header">
            <span className="clip-type-badge link">{getClipIcon()} {clip.type}</span>
            <span className="clip-share-code">{clip.code}</span>
          </div>
          <div className="clip-content">
            <a href={clip.content} target="_blank" rel="noopener noreferrer" className="clip-link">
              {clip.content}
            </a>
            <button 
              className="btn-copy"
              onClick={() => {
                navigator.clipboard.writeText(clip.content);
              }}
            >
              📋 Copy Link
            </button>
          </div>
        </div>
      );
    }

    if (clip.type === 'Code') {
      return (
        <div className="clip-card clip-card-code">
          <div className="clip-card-header">
            <span className="clip-type-badge code">{getClipIcon()} {clip.type}</span>
            <span className="clip-share-code">{clip.code}</span>
          </div>
          <div className="clip-content clip-content-code">
            <pre><code>{clip.content}</code></pre>
            <button 
              className="btn-copy"
              onClick={() => {
                navigator.clipboard.writeText(clip.content);
              }}
            >
              📋 Copy Code
            </button>
          </div>
        </div>
      );
    }

    // Default: Text
    return (
      <div className="clip-card clip-card-text">
        <div className="clip-card-header">
          <span className="clip-type-badge text">{getClipIcon()} {clip.type}</span>
          <span className="clip-share-code">{clip.code}</span>
        </div>
        <div className="clip-content clip-content-text">
          <pre>{clip.content}</pre>
          <button 
            className="btn-copy"
            onClick={() => {
              navigator.clipboard.writeText(clip.content);
            }}
          >
            📋 Copy Text
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="clip-view">
      <button onClick={onBack} className="back-button">← Back to Dashboard</button>
      
      <div className="clip-view-header">
        <h2>{getClipIcon()} Clip Details</h2>
      </div>

      {renderClipContent()}
      
      <div className="clip-details">
        <h3>📊 Clip Information</h3>
        <div className="detail-row">
          <span className="detail-label">⏰ Expires:</span>
          <span className="detail-value">{new Date(clip.expiresAt).toLocaleString()}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">📅 Created:</span>
          <span className="detail-value">{new Date(clip.createdAt).toLocaleString()}</span>
        </div>
      </div>

      {clip.accessLogs && clip.accessLogs.length > 0 && (
        <div className="access-logs">
          <h3>👁️ Access History</h3>
          <ul>
            {clip.accessLogs.map((log, index) => (
              <li key={index}>
                <span className="log-user">
                  {log.viewerEmail ? `👤 ${log.viewerEmail}` : '🔒 Anonymous'}
                </span>
                <span className="log-time">
                  {new Date(log.accessedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClipView;