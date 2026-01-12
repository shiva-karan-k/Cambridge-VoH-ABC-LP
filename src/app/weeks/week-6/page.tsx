'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';

export default function Week6Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);

  return (
    <>
      <Header onNavigate={() => {}} onOpenModal={(modal) => setActiveModal(modal)} />
      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <h1 style={{ textAlign: 'center', padding: '40px' }}>Week 6: Mastery & Confidence</h1>
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#666' }}>
          Master your breathing skills and build lasting confidence for any challenge.
        </p>
      </main>
      <Modal isOpen={activeModal !== null} onClose={() => setActiveModal(null)} type={activeModal || 'contact'} />
    </>
  );
}