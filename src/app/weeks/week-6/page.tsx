'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function Week6Page() {
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
            <img src="/assets/images/w6.png" alt="Week 6" className="week-hero-image" />
          </div>
        </section>
        
        <div className="week-content" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Week 6: Mastery & Confidence</h1>
          <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '40px', color: '#666' }}>
            Master your breathing skills and build lasting confidence for any challenge.
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