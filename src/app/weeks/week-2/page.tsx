'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function Week2Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  return (
    <>
      <Header 
        onNavigate={scrollToSection} 
        onOpenModal={(modal) => setActiveModal(modal)} 
      />

      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <section className="week-hero-banner">
          <div className="week-hero-content">
            <img src="/assets/images/w2.png" alt="Week 2" className="week-hero-image" />
          </div>
        </section>

        <div className="week-content" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Week 2: Building Strength</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px', color: '#666' }}>
            This week we focus on building your breathing strength and control.
          </p>
          
          <div className="exercises">
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Exercises for Week 2</h2>
            <div className="exercise-list" style={{ display: 'grid', gap: '20px' }}>
              <div className="exercise-item" style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h3 style={{ color: '#17a2b8', marginBottom: '10px' }}>Exercise 3: Strength Building</h3>
                <p>Develop stronger breathing muscles with targeted exercises.</p>
              </div>
              <div className="exercise-item" style={{ 
                padding: '20px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: '1px solid #e9ecef'
              }}>
                <h3 style={{ color: '#17a2b8', marginBottom: '10px' }}>Exercise 4: Control Techniques</h3>
                <p>Learn to control your breath for better focus and energy.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        type={activeModal || 'contact'} 
      />
    </>
  );
}