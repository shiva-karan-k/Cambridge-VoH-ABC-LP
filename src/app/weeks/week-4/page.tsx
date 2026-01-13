'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState, useRef, useEffect } from 'react';
import '../../../app/original-styles.css';

export default function Week4Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);
  const [week4Unlocked, setWeek4Unlocked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsClient(true);
    const week3Video2Completed = localStorage.getItem('week3-video2-completed') === 'true';
    setWeek4Unlocked(week3Video2Completed);
  }, []);

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      if (progress >= 90) {
        localStorage.setItem('week4-video-completed', 'true');
      }
    }
  };

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  return (
    <div className="week-4-page">
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
            <img src="/assets/images/w4.png" alt="Week 4" className="week-hero-image" />
          </div>
        </section>

        <div className="complete-session-message">
          <p>Complete the previous session to unlock this session.</p>
        </div>

        <section className="exercise-section-main">
          <div className="exercise-title-section">
            <h1 className="exercise-main-title">
              <div className="title-line-1">
                <span className="title-letter title-b">B</span>
                <span className="title-letter title-r">R</span>
                <span className="title-letter title-e1">E</span>
                <span className="title-letter title-a">A</span>
                <span className="title-letter title-t">T</span>
                <span className="title-letter title-h">H</span>
                <span className="title-letter title-i">I</span>
                <span className="title-letter title-n">N</span>
                <span className="title-letter title-g">G</span>
              </div>
              <div className="title-line-2">
                <span className="title-letter title-l">L</span>
                <span className="title-letter title-i2">I</span>
                <span className="title-letter title-k">K</span>
                <span className="title-letter title-e2">E</span>
                <span className="title-space"></span>
                <span className="title-letter title-a2">A</span>
                <span className="title-space"></span>
                <span className="title-letter title-p">P</span>
                <span className="title-letter title-r2">R</span>
                <span className="title-letter title-o">O</span>
              </div>
            </h1>
          </div>

          <div className="exercise-content-wrapper">
            <div className="exercise-intro-text">
              <h3 className="exercise-number"><strong>Exercise 8: Diaphragmatic Breathing Mastery</strong></h3>
              <p className="exercise-description">
                In this exercise, you'll learn how to take deep, controlled breaths. This will help you feel calm,
                focused, and in control of your body.
              </p>
            </div>

            <div className="video-section-container">
              <div className="video-thumbnail-wrapper">
                {!week4Unlocked && (
                  <>
                    <div className="lock-overlay">
                      <div className="lock-icon"></div>
                    </div>
                    <p className="lock-message">Complete Week 3 to unlock</p>
                  </>
                )}
                <video 
                  ref={videoRef}
                  controls={week4Unlocked}
                  className="video-thumbnail-img"
                  poster="/assets/images/w1/Mask group.png"
                  style={{ filter: week4Unlocked ? 'none' : 'blur(4px) brightness(0.5)' }}
                  onTimeUpdate={handleVideoTimeUpdate}
                >
                  <source src="/assets/videos/Session 4 - excercise 12 final.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="blue-rectangle-below-thumbnail">
                  <div className="blue-rectangle"></div>
                  <div className="bear-on-blue-block">
                    <img src="/assets/images/w1/sing 1.png" alt="Bear singing" className="bear-sign-asset" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="exercise-section-main">
          <div className="exercise-title-section">
            <h1 className="exercise-main-title">
              <div className="title-line-1">
                <span className="title-letter title-m">S</span>
                <span className="title-letter title-i3">T</span>
                <span className="title-letter title-g2">R</span>
                <span className="title-letter title-m">E</span>
                <span className="title-letter title-i3">N</span>
                <span className="title-letter title-g2">G</span>
                <span className="title-letter title-m">T</span>
                <span className="title-letter title-i3">H</span>
              </div>
              <div className="title-line-2">
                <span className="title-letter title-g2">B</span>
                <span className="title-letter title-m">U</span>
                <span className="title-letter title-i3">I</span>
                <span className="title-letter title-g2">L</span>
                <span className="title-letter title-m">D</span>
                <span className="title-letter title-i3">I</span>
                <span className="title-letter title-g2">N</span>
                <span className="title-letter title-m">G</span>
              </div>
              <div className="title-line-3">
                <span className="title-letter title-i3">&</span>
                <span className="title-space"></span>
                <span className="title-letter title-g2">R</span>
                <span className="title-letter title-m">E</span>
                <span className="title-letter title-i3">S</span>
                <span className="title-letter title-g2">I</span>
                <span className="title-letter title-m">S</span>
                <span className="title-letter title-i3">T</span>
                <span className="title-letter title-g2">A</span>
                <span className="title-letter title-m">N</span>
                <span className="title-letter title-i3">C</span>
                <span className="title-letter title-g2">E</span>
              </div>
            </h1>
          </div>

          <div className="exercise-content-wrapper">
            <div className="exercise-intro-text">
              <h3 className="exercise-number"><strong>Exercise 9: Straw Phonation - Stage 3</strong></h3>
              <p className="exercise-description">
                In this exercise, we'll be humming and blowing bubbles to help strengthen your breathing muscles. If
                you start feeling a bit out of breath, take a quick break and practice some deep belly breathing.
              </p>
            </div>

            <div className="video-section-container">
              <div className="video-thumbnail-wrapper locked-state">
                <div className="blue-rectangle-top-right">
                  <div className="blue-rectangle"></div>
                </div>
                <div className="lock-overlay">
                  <div className="lock-icon"></div>
                </div>
                <img src="/assets/images/w1/Mask group-1.png" alt="Video thumbnail" className="video-thumbnail-img locked" />
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
