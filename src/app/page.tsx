'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Modal from '@/components/Modal';

export default function Home() {
  const [activeModal, setActiveModal] = useState<'contact' | 'donate' | 'enroll' | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [newsletterData, setNewsletterData] = useState({ firstName: '', lastName: '', email: '' });
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const homeRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const sessionsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      const footerElement = document.getElementById('enroll');
      
      if (footerElement && scrollPosition >= footerElement.offsetTop) {
        setActiveSection('enroll');
      } else if (sessionsRef.current && scrollPosition >= sessionsRef.current.offsetTop) {
        setActiveSection('exercises');
      } else if (introRef.current && scrollPosition >= introRef.current.offsetTop) {
        setActiveSection('find-out-more');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (section: string) => {
    let target: HTMLElement | null = null;
    
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (section === 'find-out-more') {
      target = introRef.current;
    } else if (section === 'exercises') {
      target = sessionsRef.current;
    }
    
    if (target) {
      const headerHeight = 80;
      const top = target.offsetTop - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsNewsletterSubmitting(true);
    setNewsletterMessage(null);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newsletterData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed');
      }

      setNewsletterMessage({ type: 'success', text: data.message });
      setNewsletterData({ firstName: '', lastName: '', email: '' });
    } catch (error) {
      setNewsletterMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Failed to subscribe. Please try again.' 
      });
    } finally {
      setIsNewsletterSubmitting(false);
    }
  };

  return (
    <>
      <Header 
        onNavigate={scrollToSection} 
        onOpenModal={(modal) => setActiveModal(modal)}
        activeSection={activeSection}
      />

      {/* Hero Section */}
      <div className="hero-spacer"></div>
      <section ref={homeRef} id="home" className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <img src="/assets/images/BBA LOGO - hero.png" alt="BBA - Big Breathing Adventure" className="hero-bba-logo" />
            <h1 className="hero-title">
              <span className="letter-b1">B</span><span className="letter-e1">E</span><span className="letter-c">C</span>
              <span className="letter-o1">O</span><span className="letter-m">M</span><span className="letter-e2">E</span>
              <span className="letter-a1"> A</span><br />
              <span className="letter-b2">B</span><span className="letter-r">R</span><span className="letter-e3">E</span>
              <span className="letter-a2">A</span><span className="letter-t">T</span><span className="letter-h">H</span><br />
              <span className="letter-h2">H</span><span className="letter-e4">E</span><span className="letter-r2">R</span>
              <span className="letter-o2">O</span>
            </h1>
            <button className="btn-exercises" onClick={() => scrollToSection('exercises')}>EXERCISES</button>
          </div>
          <div className="hero-right">
            <div className="hero-bear-container">
              <img src="/assets/images/Hero-bear-bg.png" alt="Hero Bear Background" className="hero-bear-bg" />
              <img src="/assets/images/Hero-bear.png" alt="Breathing Bear Hero" className="hero-bear" />
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} id="find-out-more" className="introduction">
        <div className="section-content">
          <h2 className="section-title white centered">
            <img src="/assets/images/w1/Introduction to The Big Breathing Adventure.png" alt="Introduction to The Big Breathing Adventure" className="section-title-image" />
          </h2>
          <p className="intro-description">
            <strong>Hey, Breathing Explorer!</strong><br /><br />
            Are you ready for an adventure? This course is your special guide to discovering the power of your breath. 
            You&apos;ll learn how to use it to feel calm, strong, and happy anytime, anywhere! Each session is packed with 
            fun challenges, cool activities, and little missions that help you grow your breathing superpowers. By the end, 
            you&apos;ll be a true Breathing Pro, ready to take on school, play, and every new adventure with confidence.
          </p>
          <div className="introduction-content">
            <div className="video-player-main">
              <video 
                controls 
                poster="/assets/images/Mask group.png"
                className="intro-video"
                style={{ width: '100%', maxWidth: '800px', height: 'auto' }}
              >
                <source src="/assets/videos/Intro Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="section-content">
          <h2 className="section-title centered">
            <img src="/assets/images/w1/What families can expect_.png" alt="What families can expect?" className="section-title-image" />
          </h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <img src="/assets/images/calmness.png" alt="Calmness" className="benefit-icon" />
              <p>Children learn to relax their bodies and minds.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/images/Focus.png" alt="Focus" className="benefit-icon" />
              <p>Breathing techniques that support learning and attention.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/images/Confidence.png" alt="Confidence" className="benefit-icon" />
              <p>A sense of control and self-awareness in everyday life.</p>
            </div>
            <div className="benefit-item">
              <img src="/assets/images/Family connection.png" alt="Family Connection" className="benefit-icon" />
              <p>Parents can practice alongside children for shared moments of calm.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      <section ref={sessionsRef} id="exercises" className="sessions">
        <div className="section-content">
          <h2 className="section-title centered">
            <img src="/assets/images/w1/Sessions.png" alt="Sessions" className="section-title-image" />
          </h2>
          <div className="sessions-grid">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const colors = ['btn-blue', 'btn-teal', 'btn-pink', 'btn-yellow', 'btn-orange', 'btn-beige'];
              const descriptions = [
                'Discover the <strong>power of your breath</strong>! Learn <strong>basic breathing techniques</strong> that help you feel <strong>calm and focused</strong>.',
                'Build on your <strong>breathing skills</strong> with <strong>deeper techniques</strong>. Learn how to <strong>control your breath</strong> to boost <strong>energy</strong>.',
                'Master <strong>advanced breathing patterns</strong> that help you stay <strong>balanced and confident</strong>.',
                'Explore <strong>rhythmic breathing exercises</strong> that sync your <strong>body and mind</strong>.',
                'Develop <strong>powerful breathing techniques</strong> for <strong>focus and clarity</strong>.',
                'Become a <strong>breathing pro</strong>! Master all the <strong>techniques</strong> and create your own <strong>breathing routine</strong>.'
              ];
              return (
                <div key={num} className={`session-card session-${num}`}>
                  <div className="session-header">
                    <img src={`/assets/images/w${num}.png`} alt={`Week ${num}`} className="week-number-img" />
                  </div>
                  <p className="session-description" dangerouslySetInnerHTML={{ __html: descriptions[num - 1] }} />
                  <a href={`/weeks/week-${num}/`} className={`btn-view-exercises ${colors[num - 1]}`}>VIEW EXERCISES</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="enroll" className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src="/assets/images/Every Breath Counts.png" alt="Every Breath Counts" className="every-breath-counts" />
            <p className="footer-tagline">Your child&apos;s journey to better focus, calm, and wellbeing starts here.</p>
          </div>
          <div className="footer-right">
            <div className="enrollment-info">
              <ul className="enrollment-benefits">
                <li>• Receive your course invitation</li>
                <li>• Join our online breathing sessions each week</li>
                <li>• Practice simple exercises at home<br className="mobile-line-break" /> in just 10 minutes a day</li>
                <li>• Watch your child&apos;s confidence and calmness grow</li>
              </ul>
              <button className="btn-enroll-now" onClick={() => setActiveModal('enroll')}>ENROLL NOW</button>
            </div>
          </div>
        </div>
        
        {/* Site Visits - centered below enroll button */}
        <div className="site-visits-section">
          <div className="visitor-icon-circle"></div>
          <span className="visitor-count">24</span>
          <span className="visitor-text">Site Visits</span>
        </div>
      </footer>

      {/* Footer Second Block */}
      <div className="footer-second-block">
        <div className="footer-newsletter">
          <h3>Sign up to our Newsletter</h3>
          <p>Sign up to our newsletter to keep up to date with everything happening with Voice of Hope</p>
          <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input 
              type="text" 
              placeholder="First Name" 
              className="newsletter-input"
              value={newsletterData.firstName}
              onChange={(e) => setNewsletterData({ ...newsletterData, firstName: e.target.value })}
              required
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              className="newsletter-input"
              value={newsletterData.lastName}
              onChange={(e) => setNewsletterData({ ...newsletterData, lastName: e.target.value })}
              required
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="newsletter-input"
              value={newsletterData.email}
              onChange={(e) => setNewsletterData({ ...newsletterData, email: e.target.value })}
              required
            />
            <button 
              type="submit" 
              className="newsletter-submit"
              disabled={isNewsletterSubmitting}
            >
              {isNewsletterSubmitting ? 'SUBMITTING...' : 'SUBMIT'}
            </button>
          </form>
          {newsletterMessage && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '0.75rem', 
              borderRadius: '4px',
              backgroundColor: newsletterMessage.type === 'success' ? '#d1fae5' : '#fee2e2',
              color: newsletterMessage.type === 'success' ? '#065f46' : '#991b1b',
              textAlign: 'center'
            }}>
              {newsletterMessage.text}
            </div>
          )}
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
              <div className="footer-copyright-center">
                <span className="footer-copyright">Copyright © 2026 Voices of Hope</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal !== null} 
        onClose={() => setActiveModal(null)} 
        type={activeModal || 'contact'} 
      />
    </>
  );
}
