'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function Week4Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);

  return (
    <>
      <Header onNavigate={() => {}} onOpenModal={(modal) => setActiveModal(modal)} />
      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', padding: '40px' }}>Week 4: Daily Integration</h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          Integrate breathing techniques into your daily routine for lasting wellbeing.
        </p>
      </main>
      <Modal isOpen={activeModal !== null} onClose={() => setActiveModal(null)} type={activeModal || 'contact'} />
    </>
  );
}