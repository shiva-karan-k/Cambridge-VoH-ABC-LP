'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState } from 'react';
import '../../../app/original-styles.css';

export default function Week6Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  return (
    <div className="week-6-page">
      <style jsx global>{`
        /* Bear size fix - scaled down 2.5x */
        .bear-sign-asset {
          width: clamp(80px, 10vw, 140px) !important;
          height: auto !important;
          min-width: 80px !important;
          max-width: 140px !important;
        }
        @media (max-width: 768px) {
          .bear-sign-asset {
            width: clamp(60px, 12vw, 100px) !important;
            min-width: 60px !important;
            max-width: 100px !important;
          }
        }
      `}</style>
      <Header 
        onNavigate={scrollToSection} 
        onOpenModal={(modal) => setActiveModal(modal)} 
      />

      <main>
        <section className="week-hero-banner">
          <div className="week-hero-content">
            <img src="/assets/images/w6.png" alt="Week 6" className="week-hero-image" />
          </div>
        </section>

        <div className="complete-session-message">
          <p>Complete the previous session to unlock this session.</p>
        </div>

        <section className="exercise-section-main week-6-special">
          <div className="exercise-title-section week-6-title-section">
            <div className="week-6-title-wrapper">
              <h1 className="exercise-main-title week-6-title">
                <div className="title-line-1">
                  <span className="week6-letter">T</span>
                  <span className="week6-letter">H</span>
                  <span className="week6-letter">E</span>
                  <span className="title-space"></span>
                  <span className="week6-letter">G</span>
                  <span className="week6-letter">R</span>
                  <span className="week6-letter">E</span>
                  <span className="week6-letter">A</span>
                  <span className="week6-letter">T</span>
                  <span className="title-space"></span>
                  <span className="week6-letter">R</span>
                  <span className="week6-letter">E</span>
                  <span className="week6-letter">C</span>
                  <span className="week6-letter">A</span>
                  <span className="week6-letter">P</span>
                </div>
                <div className="title-line-2">
                  <span className="week6-letter-green">A</span>
                  <span className="week6-letter-pink">D</span>
                  <span className="week6-letter-blue">V</span>
                  <span className="week6-letter-green">E</span>
                  <span className="week6-letter-pink">N</span>
                  <span className="week6-letter-blue">T</span>
                  <span className="week6-letter-green">U</span>
                  <span className="week6-letter-pink">R</span>
                  <span className="week6-letter-blue">E</span>
                </div>
              </h1>
              <img src="/assets/images/w1/fish.png" alt="Fish" className="week-6-fish" />
            </div>
            <h3 className="week-6-subtitle"><strong>Goldfish Breathing</strong></h3>
          </div>

          <div className="exercise-content-wrapper">
            <div className="exercise-intro-text">
              <p className="exercise-description">
                Make your goldfish lips and breathe in through your nose...Now blow out through your goldfish lips slowly. We will do this 3 times and see how long you can make your breath last for.
              </p>
            </div>

            <div className="video-section-container">
              <div className="video-thumbnail-wrapper">
                <div className="blue-rectangle-below-thumbnail">
                  <div className="blue-rectangle"></div>
                  <div className="bear-on-blue-block">
                    <img src="/assets/images/w1/bear-stand 1.png" alt="Bear standing" className="bear-sign-asset" />
                  </div>
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon"></div>
                </div>
                <img src="/assets/images/w1/Mask group.png" alt="Video thumbnail" className="video-thumbnail-img" />
              </div>
            </div>
          </div>
        </section>

        <div className="footer-second-block">
          <div className="footer-newsletter">
            <h3>Sign up to our Newsletter</h3>
            <p>Sign up to our newsletter to keep up to date with everything happening with Voice of Hope</p>
            <div className="newsletter-form">
              <input type="text" placeholder="First Name" className="newsletter-input" />
              <input type="text" placeholder="Last Name" className="newsletter-input" />
              <input type="email" placeholder="Email" className="newsletter-input" />
              <button className="newsletter-submit">SUBMIT</button>
            </div>
            <div className="social-links">
              <img src="/assets/images/Listitem → Link.png" alt="Facebook" className="social-icon" />
              <img src="/assets/images/Listitem → Link-1.png" alt="Twitter" className="social-icon" />
              <img src="/assets/images/Listitem → Link-2.png" alt="Instagram" className="social-icon" />
              <img src="/assets/images/Listitem → Link-3.png" alt="YouTube" className="social-icon" />
            </div>
            <div className="footer-info">
              <p className="footer-contact">📧 info@voh.org.uk &nbsp;&nbsp;&nbsp; 📍 161A Clarence Street, Kingston-Upon-Thames, Surrey KT1 1QT</p>
              <p className="footer-charity">UK Charity Commission Registration 1187454</p>
              <p className="footer-privacy">Privacy Policy</p>
              <div className="footer-bottom-line">
                <span className="footer-copyright">Copyright © 2025 Voices of Hope</span>
                <span className="footer-visitors">Site Visitor Numbers: 24</span>
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
    </div>
  );
}
