'use client';

import { useState } from 'react';

export default function AdminSetupPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    clerkUserId: 'shiva_uk',
    email: '',
    name: 'Shiva'
  });

  const createAdmin = async () => {
    if (!formData.email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsCreating(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/create-admin-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkUserId: formData.clerkUserId,
          email: formData.email,
          name: formData.name,
          role: 'super_admin'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Admin account created successfully! You can now sign in with Clerk and access the admin dashboard.');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to create admin account. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#333' }}>Admin Account Setup</h1>
        
        <div style={{ marginBottom: '30px', textAlign: 'left' }}>
          <p><strong>Username:</strong> {formData.clerkUserId}</p>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email:
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Enter your email address"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <p><strong>Name:</strong> {formData.name}</p>
        </div>

        <p style={{ marginBottom: '30px', color: '#666' }}>
          Enter your email address and click the button below to create your admin account.
        </p>

        <button
          onClick={createAdmin}
          disabled={isCreating}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 30px',
            borderRadius: '4px',
            cursor: isCreating ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            opacity: isCreating ? 0.6 : 1
          }}
        >
          {isCreating ? 'Creating Admin Account...' : 'Create Admin Account'}
        </button>

        {message && (
          <div style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '4px',
            backgroundColor: message.includes('Error') ? '#f8d7da' : '#d4edda',
            color: message.includes('Error') ? '#721c24' : '#155724',
            border: `1px solid ${message.includes('Error') ? '#f5c6cb' : '#c3e6cb'}`
          }}>
            {message}
          </div>
        )}

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'left' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>After creating admin:</h3>
          <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
            <li>Sign in at <a href="/sign-in">/sign-in</a> with username: shiva_uk</li>
            <li>Access admin dashboard at <a href="/admin">/admin</a></li>
            <li>Update MongoDB URI in .env.local for full functionality</li>
          </ol>
        </div>
      </div>
    </div>
  );
}