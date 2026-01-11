'use client';

import { useState } from 'react';

export default function TestAdminPage() {
  const [result, setResult] = useState('');

  const testAPI = async () => {
    try {
      const response = await fetch('/api/admin/create-admin-simple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clerkUserId: 'shiva_uk',
          email: 'shiva@example.com',
          name: 'Shiva',
          role: 'super_admin'
        }),
      });

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error);
    }
  };

  const checkAdmins = async () => {
    try {
      const response = await fetch('/api/admin/create-admin-simple');
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>Admin API Test</h1>
      
      <button 
        onClick={testAPI}
        style={{ 
          padding: '10px 20px', 
          margin: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px' 
        }}
      >
        Create Admin (shiva_uk)
      </button>
      
      <button 
        onClick={checkAdmins}
        style={{ 
          padding: '10px 20px', 
          margin: '10px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px' 
        }}
      >
        Check Existing Admins
      </button>
      
      <pre style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '4px', 
        marginTop: '20px',
        whiteSpace: 'pre-wrap'
      }}>
        {result || 'Click a button to test the API'}
      </pre>
    </div>
  );
}