'use client';

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';

interface HeaderProps {
  onNavigate: (section: string) => void;
  onOpenModal: (modal: 'contact' | 'donate' | 'enroll') => void;
}

export default function Header({ onNavigate, onOpenModal }: HeaderProps) {
  const { isSignedIn, isLoaded } = useUser();

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <div className="logos">
            <img src="/assets/images/VoH logo.png" alt="Voices of Hope" className="logo voices-logo" />
            <img src="/assets/images/KoL logo.png" alt="Kingston University London" className="logo kingston-logo" />
          </div>
          <img src="/assets/images/ABC Logo 1.png" alt="ABC Active Breathing Course" className="abc-logo" />
        </div>
        
        <nav className="navbar">
          <ul className="nav-list">
            <li><button onClick={() => onNavigate('home')} className="nav-link active">HOME</button></li>
            <li><button onClick={() => onNavigate('find-out-more')} className="nav-link">FIND OUT MORE</button></li>
            <li><button onClick={() => onOpenModal('enroll')} className="nav-link">ENROLL</button></li>
            <li><button onClick={() => onOpenModal('contact')} className="nav-link">CONTACT US</button></li>
          </ul>
        </nav>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button className="btn-donate" onClick={() => onOpenModal('donate')}>DONATE</button>
          
          <div id="auth-container" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!isLoaded ? (
              <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>Loading...</span>
            ) : isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: {
                      width: '36px',
                      height: '36px',
                      border: '2px solid #2dd4bf'
                    },
                    userButtonPopoverCard: {
                      pointerEvents: 'initial'
                    }
                  }
                }}
              />
            ) : (
              <>
                <SignUpButton mode="redirect" redirectUrl="/" signUpUrl="/sign-up">
                  <button className="btn-auth btn-signup">SIGN UP</button>
                </SignUpButton>
                <SignInButton mode="redirect" redirectUrl="/" signInUrl="/sign-in">
                  <button className="btn-auth btn-signin">SIGN IN</button>
                </SignInButton>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
