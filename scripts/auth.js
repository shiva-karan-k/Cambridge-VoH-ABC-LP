// Clerk Authentication Integration

const CLERK_PUBLISHABLE_KEY = process.env.VITE_CLERK_PUBLISHABLE_KEY || 'your_publishable_key_here';

class AuthManager {
  constructor() {
    this.clerk = null;
    this.isInitialized = false;
    this.initAttempts = 0;
    this.maxAttempts = 20;
    this.init();
  }

  async init() {
    // Show loading state
    this.showLoadingUI();
    
    // Wait for Clerk to load (it's async)
    await this.waitForClerk();
    
    if (typeof Clerk === 'undefined') {
      console.warn('Clerk SDK not loaded after waiting. Using fallback UI.');
      this.setupFallbackUI();
      return;
    }

    try {
      this.clerk = new Clerk(CLERK_PUBLISHABLE_KEY);
      await this.clerk.load();
      this.isInitialized = true;
      console.log('Clerk initialized successfully');
      this.updateAuthUI();
      this.setupAuthListeners();
    } catch (error) {
      console.error('Failed to initialize Clerk:', error);
      this.setupFallbackUI();
    }
  }

  waitForClerk() {
    return new Promise((resolve) => {
      const checkClerk = () => {
        this.initAttempts++;
        if (typeof Clerk !== 'undefined') {
          resolve();
        } else if (this.initAttempts >= this.maxAttempts) {
          resolve(); // Give up after max attempts
        } else {
          setTimeout(checkClerk, 250);
        }
      };
      checkClerk();
    });
  }

  showLoadingUI() {
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
      authContainer.innerHTML = `
        <button class="btn-auth btn-signin" disabled style="opacity: 0.7;">
          Loading...
        </button>
      `;
    }
  }

  setupFallbackUI() {
    const authContainer = document.getElementById('auth-container');
    if (authContainer) {
      authContainer.innerHTML = `
        <button class="btn-auth btn-signin" onclick="window.authManager.showSetupMessage()">
          SIGN IN
        </button>
      `;
    }
  }

  showSetupMessage() {
    alert('Authentication is loading. Please wait a moment and try again.');
  }

  updateAuthUI() {
    const authContainer = document.getElementById('auth-container');
    if (!authContainer || !this.clerk) return;

    if (this.clerk.user) {
      // User is signed in - show user icon
      const user = this.clerk.user;
      const initials = this.getInitials(user.firstName, user.lastName);
      const imageUrl = user.imageUrl;

      authContainer.innerHTML = `
        <div class="user-menu">
          <button class="user-avatar" onclick="window.authManager.toggleUserMenu()">
            ${imageUrl 
              ? `<img src="${imageUrl}" alt="Profile" class="avatar-img">` 
              : `<span class="avatar-initials">${initials}</span>`
            }
          </button>
          <div class="user-dropdown" id="user-dropdown">
            <div class="user-info">
              <span class="user-name">${user.firstName || 'User'}</span>
              <span class="user-email">${user.primaryEmailAddress?.emailAddress || ''}</span>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item" onclick="window.authManager.openProfile()">
              <span>👤</span> Profile
            </button>
            <button class="dropdown-item" onclick="window.authManager.signOut()">
              <span>🚪</span> Sign Out
            </button>
          </div>
        </div>
      `;
    } else {
      // User is not signed in - show sign in button
      authContainer.innerHTML = `
        <button class="btn-auth btn-signin" onclick="window.authManager.openSignIn()">
          SIGN IN
        </button>
      `;
    }
  }

  getInitials(firstName, lastName) {
    const first = firstName ? firstName.charAt(0).toUpperCase() : '';
    const last = lastName ? lastName.charAt(0).toUpperCase() : '';
    return first + last || 'U';
  }

  toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown');
    if (dropdown) {
      dropdown.classList.toggle('active');
    }
  }

  setupAuthListeners() {
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('user-dropdown');
      const avatar = document.querySelector('.user-avatar');
      if (dropdown && !dropdown.contains(e.target) && !avatar?.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    // Listen for auth state changes
    if (this.clerk) {
      this.clerk.addListener(() => {
        this.updateAuthUI();
      });
    }
  }

  async openSignIn() {
    if (!this.isInitialized) {
      alert('Authentication is still loading. Please wait a moment.');
      return;
    }

    try {
      await this.clerk.openSignIn({
        appearance: {
          elements: {
            rootBox: {
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              borderRadius: '16px'
            },
            card: {
              borderRadius: '16px'
            }
          }
        }
      });
    } catch (error) {
      console.error('Sign in error:', error);
    }
  }

  async openSignUp() {
    if (!this.isInitialized) {
      alert('Authentication is still loading. Please wait a moment.');
      return;
    }

    try {
      await this.clerk.openSignUp();
    } catch (error) {
      console.error('Sign up error:', error);
    }
  }

  async openProfile() {
    if (!this.isInitialized || !this.clerk.user) return;

    try {
      await this.clerk.openUserProfile();
    } catch (error) {
      console.error('Profile error:', error);
    }
  }

  async signOut() {
    if (!this.isInitialized) return;

    try {
      await this.clerk.signOut();
      this.updateAuthUI();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
}

// Initialize auth manager when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
  });
} else {
  window.authManager = new AuthManager();
}
