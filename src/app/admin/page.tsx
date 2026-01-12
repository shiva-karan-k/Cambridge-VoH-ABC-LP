'use client';

import { useState } from 'react';

export default function AdminPage() {
  const [stats] = useState({
    totalVisitors: 245,
    weeklyVisitors: 129,
    monthlyVisitors: 45
  });

  // Temporary admin page without Clerk for deployment testing
  return (
    <>
      {/* Admin Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: '15px 20px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: '#333' }}>ABC Admin Dashboard (Test Mode)</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Test Admin User
            </span>
            <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
              Home
            </a>
          </div>
        </div>
      </header>

      {/* Admin Dashboard Content */}
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        
        {/* Welcome Section */}
        <section style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Admin Dashboard (No Auth Test)</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            ABC Active Breathing Course Analytics & Management - Testing without Clerk
          </p>
        </section>

        {/* Homepage Views Section */}
        <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Homepage Views
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '20px',
            marginBottom: '40px'
          }}>
            <div style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', marginBottom: '10px' }}>PAST 90 DAYS</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>245</div>
              <div style={{ fontSize: '14px' }}>People Visited Site</div>
            </div>
            <div style={{
              backgroundColor: '#17a2b8',
              color: 'white',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', marginBottom: '10px' }}>PAST 60 DAYS</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>129</div>
              <div style={{ fontSize: '14px' }}>People Visited Site</div>
            </div>
            <div style={{
              backgroundColor: '#e83e8c',
              color: 'white',
              padding: '30px',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '12px', marginBottom: '10px' }}>PAST 30 DAYS</div>
              <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>45</div>
              <div style={{ fontSize: '14px' }}>People Visited Site</div>
            </div>
          </div>
        </section>

        {/* Week Pages Views Section */}
        <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Weekly Course Progress
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '15px',
            marginBottom: '40px'
          }}>
            {[1, 2, 3, 4, 5, 6].map((week, index) => {
              const colors = ['#007bff', '#17a2b8', '#e83e8c', '#ffc107', '#fd7e14', '#f8f9fa'];
              const textColors = ['white', 'white', 'white', 'black', 'white', 'black'];
              const numbers = [245, 129, 45, 45, 245, 129];
              return (
                <div key={week} style={{
                  backgroundColor: colors[index],
                  color: textColors[index],
                  padding: '25px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: colors[index] === '#f8f9fa' ? '1px solid #ddd' : 'none'
                }}>
                  <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '5px' }}>{numbers[index]}</div>
                  <div style={{ fontSize: '12px', marginBottom: '5px' }}>WEEK {week}</div>
                  <div style={{ fontSize: '12px' }}>People Visited</div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#343a40',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '40px'
      }}>
        <p style={{ margin: 0 }}>
          ABC Active Breathing Course Admin Dashboard | Total Site Visitors: {stats.totalVisitors}
        </p>
      </footer>
    </>
  );
}