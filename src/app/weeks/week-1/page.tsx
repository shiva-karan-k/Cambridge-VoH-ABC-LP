'use client';

import Header from '@/components/Header';
import Modal from '@/components/Modal';
import { useState, useRef, useEffect } from 'react';
import '../../../app/original-styles.css';

export default function Week1Page() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);
  const [video1Completed, setVideo1Completed] = useState(false);
  const [video2Unlocked, setVideo2Unlocked] = useState(false);
  const [video2Completed, setVideo2Completed] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if videos were previously completed
    const v1Completed = localStorage.getItem('week1-video1-completed') === 'true';
    const v2Completed = localStorage.getItem('week1-video2-completed') === 'true';
    setVideo1Completed(v1Completed);
    setVideo2Completed(v2Completed);
    setVideo2Unlocked(v1Completed);
  }, []);

  const handleVideo1TimeUpdate = () => {
    const video = video1Ref.current;
    if (video && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      if (progress >= 90 && !video1Completed) {
        setVideo1Completed(true);
        setVideo2Unlocked(true);
        localStorage.setItem('week1-video1-completed', 'true');
      }
    }
  };

  const handleVideo2TimeUpdate = () => {
    const video = video2Ref.current;
    if (video && video.duration) {
      const progress = (video.currentTime / video.duration) * 100;
      if (progress >= 90 && !video2Completed) {
        setVideo2Completed(true);
        localStorage.setItem('week1-video2-completed', 'true');
      }
    }
  };

  const scrollToSection = (section: string) => {
    if (section === 'home') {
      window.location.href = '/';
    }
  };

  const resetProgress = () => {
    localStorage.removeItem('week1-video1-completed');
    localStorage.removeItem('week1-video2-completed');
    setVideo1Completed(false);
    setVideo2Completed(false);
    setVideo2Unlocked(false);
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
    }
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0;
    }
  };

  return (
    <div className="week-1-page">
      <style jsx global>{`
        /* Bear size fix v2 - scaled down 2.5x */
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
      <style jsx>{`
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
      `}</style>
      <Header 
        onNavigate={scrollToSection} 
        onOpenModal={(modal) => setActiveModal(modal)} 
      />

      <main>
        {/* Week 1 Hero Banner */}
        <section className="week-hero-banner">
          <div className="week-hero-content">
            <img src="/assets/images/w1.png" alt="Week 1" className="week-hero-image" />
          </div>
        </section>

        {/* Exercise 1: Breathing Like a Pro */}
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
              <h3 className="exercise-number"><strong>Exercise 1: Belly Breathing</strong></h3>
              <p className="exercise-description">
                Welcome to Your Breathing Adventure! In this first session, You will learn how to do Belly Breathing. This
                breathing exercise can help you feel calm, focused, and ready for anything!
              </p>
            </div>

            {/* Video Section */}
            <div className="video-section-container">
              <div className="video-thumbnail-wrapper">
                <video 
                  ref={video1Ref}
                  controls 
                  className="video-thumbnail-img"
                  poster="/assets/images/w1/Mask group.png"
                  onTimeUpdate={handleVideo1TimeUpdate}
                >
                  <source src="/assets/videos/Session 1 - excercise 1, part 2 final.mp4" type="video/mp4" />
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

        {/* Exercise 2: Mighty Movers */}
        <section className="exercise-section-main">
          <div className="exercise-title-section">
            <h1 className="exercise-main-title">
              <div className="title-line-1">
                <span className="title-letter title-m">M</span>
                <span className="title-letter title-i3">I</span>
                <span className="title-letter title-g2">G</span>
                <span className="title-letter title-h2">H</span>
                <span className="title-letter title-t2">T</span>
                <span className="title-letter title-y">Y</span>
              </div>
              <div className="title-line-2">
                <span className="title-letter title-m2">M</span>
                <span className="title-letter title-o2">O</span>
                <span className="title-letter title-v">V</span>
                <span className="title-letter title-e3">E</span>
                <span className="title-letter title-r3">R</span>
                <span className="title-letter title-s">S</span>
              </div>
            </h1>
          </div>

          <div className="exercise-content-wrapper">
            <div className="exercise-intro-text">
              <h3 className="exercise-number"><strong>Exercise 2: Pursed lip breathing</strong></h3>
              <p className="exercise-description">
                In this activity, you'll practice blowing through your lips when they're pressed together. It's a fun way to
                learn how to control your breath - though you might look a bit like a goldfish!
              </p>
            </div>

            {/* Video Section */}
            <div className="video-section-container">
              <div className="video-thumbnail-wrapper locked-state">
                {!video2Unlocked && (
                  <>
                    <div className="lock-overlay">
                      <div className="lock-icon"></div>
                    </div>
                    <p className="lock-message">Complete Exercise 1 to unlock</p>
                  </>
                )}
                <video 
                  ref={video2Ref}
                  controls={video2Unlocked}
                  className="video-thumbnail-img locked"
                  poster="/assets/images/w1/Mask group-1.png"
                  style={{ filter: video2Unlocked ? 'none' : 'blur(4px) brightness(0.5)' }}
                  onTimeUpdate={handleVideo2TimeUpdate}
                >
                  <source src="/assets/videos/Session 1 - excercise 2 final.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="blue-rectangle-top-right">
                  <div className="blue-rectangle"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Second Block */}
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
              <p className="footer-contact">📧 info@voh.org.uk &nbsp;&nbsp;&nbsp; 📍 161A Clarence Street, Kingston-Upon-Thames,
                Surrey KT1 1QT</p>
              <p className="footer-charity">UK Charity Commission Registration 1187454</p>
              <p className="footer-privacy">Privacy Policy</p>
              <div className="footer-bottom-line">
                <div className="footer-copyright-center">
                  <span className="footer-copyright">Copyright © 2026 Voices of Hope</span>
                </div>
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
