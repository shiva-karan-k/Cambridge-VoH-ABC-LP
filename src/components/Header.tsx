'use client';

// Clerk temporarily removed for deployment testing
// import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onOpenModal: (modal: 'contact' | 'donate' | 'enroll') => void;
  activeSection?: string;
}

export default function Header({ onNavigate, onOpenModal, activeSection = 'home' }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logos">
            <img src="/assets/images/VoH logo.png" alt="Voices of Hope" className="logo voices-logo" />
            <img src="/assets/images/KoL logo.png" alt="Kingston University London" className="logo kingston-logo" />
            <img src="/assets/images/cambridge_university2.svg" alt="Cambridge University" className="logo cambridge-logo" />
          </div>
          <img src="/assets/images/ABC Logo 1.png" alt="ABC Active Breathing Course" className="abc-logo" />
        </div>
        
        <nav className="navbar">
          <ul className="nav-list">
            <li><button onClick={() => onNavigate('home')} className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}>HOME</button></li>
            <li><button onClick={() => onNavigate('find-out-more')} className={`nav-link ${activeSection === 'find-out-more' ? 'active' : ''}`}>FIND OUT MORE</button></li>
            <li><button onClick={() => onOpenModal('enroll')} className={`nav-link ${activeSection === 'enroll' ? 'active' : ''}`}>ENROLL</button></li>
            <li><button onClick={() => onOpenModal('contact')} className="nav-link">CONTACT US</button></li>
          </ul>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-donate" onClick={() => onOpenModal('donate')}>DONATE</button>
        </div>
      </div>
    </header>
  );
}
