// Visit Tracking
function trackVisit() {
  const key = 'visitCount';
  const n = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, n);
  console.log(`visits:${n}`);
  updateVisitorCount(n);
}

function updateVisitorCount(count) {
  const visitorElement = document.querySelector('.visitor-count');
  if (visitorElement) {
    visitorElement.textContent = `${count} Site Visitors`;
  }
}

// Enrollment Form Handling
function initEnrollmentForm() {
  const form = document.getElementById('enrollmentForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = document.getElementById('email');
    const submitButton = form.querySelector('.btn-submit');
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Disable form during submission
    submitButton.disabled = true;
    submitButton.textContent = 'SUBMITTING...';

    try {
      // Simulate API call - replace with actual endpoint
      await submitEnrollment(email);
      
      // Success feedback
      submitButton.textContent = 'SUBMITTED! ✓';
      submitButton.style.background = '#10b981';
      emailInput.value = '';
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'SUBMIT';
        submitButton.style.background = '';
      }, 3000);
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Sorry, there was an error submitting your enrollment. Please try again.');
      submitButton.disabled = false;
      submitButton.textContent = 'SUBMIT';
    }
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function submitEnrollment(email) {
  // TODO: Replace with actual API endpoint
  // Example: return fetch('/api/enroll', { method: 'POST', body: JSON.stringify({ email }) });
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Enrollment submitted for:', email);
      resolve({ success: true });
    }, 1000);
  });
}

// Button Interactions
function initButtons() {
  // Contact Us button
  const contactBtn = document.querySelector('.btn-contact');
  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      // TODO: Implement contact modal or redirect
      alert('Contact form coming soon!');
    });
  }

  // Know More button
  const knowMoreBtn = document.querySelector('.btn-know-more');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', () => {
      // Scroll to introduction section
      const introSection = document.querySelector('.introduction');
      if (introSection) {
        introSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // View Exercises buttons
  const viewExerciseBtns = document.querySelectorAll('.btn-view-exercises');
  viewExerciseBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const sessionNumber = index + 1;
      console.log(`View exercises for Session ${sessionNumber}`);
      // TODO: Implement navigation to session exercises
      alert(`Session ${sessionNumber} exercises coming soon!`);
    });
  });
}

// Video Player Interaction
function initVideoPlayer() {
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      // TODO: Implement video playback
      alert('Video player coming soon!');
    });
  }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize on page load
function init() {
  trackVisit();
  initEnrollmentForm();
  initButtons();
  initVideoPlayer();
  initSmoothScroll();
  
  // Load visitor count on page load
  const count = Number(localStorage.getItem('visitCount') || 0);
  if (count > 0) {
    updateVisitorCount(count);
  }
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
