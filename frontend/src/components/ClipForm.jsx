import React, { useState } from 'react';
import axios from 'axios';

const ClipForm = ({ token, onClipCreated }) => {
  const [type, setType] = useState('Text');
  const [content, setContent] = useState('');
  const [expiryMinutes, setExpiryMinutes] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const response = await axios.post('/api/clip/add', {
        type,
        content,
        expiryMinutes
      }, config);
      
      onClipCreated(response.data);
      // Reset form
      setContent('');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clip-form">
      <h2>Create New Clip</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Clip Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Text">Text</option>
            <option value="Link">Link</option>
            <option value="Code">Code</option>
          </select>
        </div>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows="6"
            placeholder="Enter your clipboard content here..."
          />
        </div>
        <div>
          <label>Expiry (minutes):</label>
          <input
            type="number"
            value={expiryMinutes}
            onChange={(e) => setExpiryMinutes(e.target.value)}
            min="1"
            max="1440" // 24 hours
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Clip'}
        </button>
      </form>
    </div>
  );
};

export default ClipForm;