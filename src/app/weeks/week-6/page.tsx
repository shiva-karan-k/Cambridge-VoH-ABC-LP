'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState, useRef, useEffect } from 'react';
import '../../../app/original-styles.css';

export default function Week6Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);
  const [week6Unlocked, setWeek6Unlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
    const week5Video2Completed = localStorage.getItem('week5-video2-completed') === 'true';
    setWeek6Unlocked(week5Video2Completed);
  }, []);

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  return (
    <div className="week-6-page">
      <style dangerouslySetInnerHTML={{__html: `
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
        .lock-message {
          color: #fff;
          font-size: 16px;
          text-align: center;
          margin-top: 16px;
          position: absolute;
          bottom: -50px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
        }
      `}} />
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
            <h1 className="exercise-main-title week-6-title">
              <div className="title-line-1">
                <span style={{color: '#E91E63'}}>T</span>
                <span style={{color: '#4CAF50'}}>H</span>
                <span style={{color: '#2196F3'}}>E</span>
                <span className="title-space"></span>
                <span style={{color: '#E91E63'}}>G</span>
                <span style={{color: '#4CAF50'}}>R</span>
                <span style={{color: '#2196F3'}}>E</span>
                <span style={{color: '#E91E63'}}>A</span>
                <span style={{color: '#4CAF50'}}>T</span>
                <span className="title-space"></span>
                <span style={{color: '#2196F3'}}>R</span>
                <span style={{color: '#E91E63'}}>E</span>
                <span style={{color: '#4CAF50'}}>C</span>
                <span style={{color: '#2196F3'}}>A</span>
                <span style={{color: '#E91E63'}}>P</span>
              </div>
              <div className="title-line-2">
                <span style={{color: '#4CAF50'}}>A</span>
                <span style={{color: '#E91E63'}}>D</span>
                <span style={{color: '#2196F3'}}>V</span>
                <span style={{color: '#4CAF50'}}>E</span>
                <span style={{color: '#E91E63'}}>N</span>
                <span style={{color: '#2196F3'}}>T</span>
                <span style={{color: '#4CAF50'}}>U</span>
                <span style={{color: '#E91E63'}}>R</span>
                <span style={{color: '#2196F3'}}>E</span>
              </div>
            </h1>
            <h3 className="week-6-subtitle"><strong>Goldfish Breathing</strong></h3>
          </div>

          <div className="exercise-content-wrapper">
            <div className="exercise-intro-text">
              <p className="exercise-description">
                Make your goldfish lips and breathe in through your nose...Now blow out through your goldfish lips slowly. We will do this 3 times and see how long you can make your breath last for.
              </p>
            </div>

            <div className="video-section-container" style={{position: 'relative'}}>
              {/* Rectangle behind video - positioned at right edge */}
              <div style={{
                position: 'absolute',
                top: '-250px',
                right: '0',
                width: 'clamp(50px, 12vw, 70px)',
                height: 'clamp(250px, 30vw, 350px)',
                backgroundColor: '#F5DEB3',
                zIndex: 1
              }}></div>
              
              {/* Fish at top-left of rectangle */}
              <img 
                src="/assets/images/w1/fish.png" 
                alt="Fish" 
                style={{
                  position: 'absolute',
                  top: '-250px',
                  right: 'clamp(50px, 12vw, 70px)',
                  width: 'clamp(90px, 12vw, 140px)',
                  height: 'auto',
                  zIndex: 2
                }}
              />
              
              <div className="video-thumbnail-wrapper" style={{position: 'relative', zIndex: 5}}>
                {!week6Unlocked && (
                  <>
                    <div className="lock-overlay">
                      <div className="lock-icon"></div>
                    </div>
                    <p className="lock-message">Complete Week 5 to unlock</p>
                  </>
                )}
                <video 
                  ref={videoRef}
                  controls={week6Unlocked}
                  className="video-thumbnail-img"
                  poster="/assets/images/w1/Mask group.png"
                  style={{ filter: week6Unlocked ? 'none' : 'blur(4px) brightness(0.5)' }}
                >
                  <source src="/assets/videos/Sesssion 6 - excercise 19 final.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
