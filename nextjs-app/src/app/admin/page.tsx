'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [stats] = useState({
    totalVisitors: 245,
    weeklyVisitors: 129,
    monthlyVisitors: 45
  });

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
      return;
    }

    if (isLoaded && user) {
      checkAdminStatus();
    }
  }, [isLoaded, user, router]);

  const checkAdminStatus = async () => {
    try {
      // For now, check if admin exists in our simple storage
      const response = await fetch('/api/admin/create-admin-simple');
      const data = await response.json();
      
      // Check if current user is in the admin list
      const userIsAdmin = data.admins?.some((admin: any) => 
        admin.email === user?.emailAddresses[0]?.emailAddress ||
        user?.username === 'shiva_uk'
      );
      
      if (userIsAdmin) {
        setIsAdmin(true);
      } else {
        router.push('/admin/setup');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      router.push('/admin/setup');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Checking admin access</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Please sign in</div>
          <a href="/sign-in" style={{ color: '#007bff', textDecoration: 'none' }}>
            Go to Sign In
          </a>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px', color: '#dc3545' }}>
            Access Denied
          </div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            You need admin privileges to access this page
          </div>
          <a href="/admin/setup" style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            padding: '10px 20px',
            border: '1px solid #007bff',
            borderRadius: '4px'
          }}>
            Set up Admin Account
          </a>
        </div>
      </div>
    );
  }

  // Only render admin dashboard if user is authenticated and is admin
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
          <h1 style={{ margin: 0, color: '#333' }}>ABC Admin Dashboard</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#666', fontSize: '14px' }}>
              Welcome, {user.firstName || user.username || 'Admin'}
            </span>
            <a href="/" style={{ color: '#007bff', textDecoration: 'none' }}>
              Home
            </a>
            <a href="/sign-out" style={{ color: '#dc3545', textDecoration: 'none' }}>
              Sign Out
            </a>
          </div>
        </div>
      </header>

      {/* Admin Dashboard Content */}
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        
        {/* Welcome Section */}
        <section style={{ padding: '40px 20px', textAlign: 'center' }}>
          <h2 style={{ color: '#333', marginBottom: '10px' }}>Admin Dashboard</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            ABC Active Breathing Course Analytics & Management
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

        {/* Exercises Views Section */}
        <section style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h3 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Exercise Video Views
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '15px',
            marginBottom: '40px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((exercise, index) => {
              const colors = [
                '#007bff', '#17a2b8', '#e83e8c', '#ffc107', '#fd7e14', '#f8f9fa', 
                '#343a40', '#6f42c1', '#e83e8c', '#28a745', '#fd7e14'
              ];
              const textColors = [
                'white', 'white', 'white', 'black', 'white', 'black',
                'white', 'white', 'white', 'white', 'white'
              ];
              const numbers = [245, 129, 45, 45, 245, 129, 45, 45, 245, 129, 45];
              return (
                <div key={exercise} style={{
                  backgroundColor: colors[index],
                  color: textColors[index],
                  padding: '20px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  border: colors[index] === '#f8f9fa' ? '1px solid #ddd' : 'none'
                }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '5px' }}>{numbers[index]}</div>
                  <div style={{ fontSize: '11px', marginBottom: '3px' }}>EXERCISE {exercise}</div>
                  <div style={{ fontSize: '10px' }}>Video Views</div>
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