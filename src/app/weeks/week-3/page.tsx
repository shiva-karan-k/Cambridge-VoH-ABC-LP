'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function Week3Page() {
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
            <img src="/assets/images/w3.png" alt="Week 3" className="week-hero-image" />
          </div>
        </section>
        
        <div className="week-content" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Week 3: Emotional Balance</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px', color: '#666' }}>
            Learn breathing techniques for managing emotions and staying calm.
          </p>
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