// Visit Tracking
function trackVisit() {
  const key = 'visitCount';
  const n = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, n);
  updateVisitorCount(n);
}

function updateVisitorCount(count) {
  const visitorElement = document.querySelector('.visitor-count');
  if (visitorElement) {
    visitorElement.textContent = `${count} site visits`;
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

    submitButton.disabled = true;
    submitButton.textContent = 'SUBMITTING...';

    try {
      await submitEnrollment(email);
      submitButton.textContent = 'SUBMITTED! ✓';
      submitButton.style.background = '#10b981';
      emailInput.value = '';
      
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
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true }), 1000);
  });
}

// Navigation & Button Interactions
function initButtons() {
  // Exercises button - scroll to sessions
  const exercisesBtn = document.querySelector('.btn-exercises');
  if (exercisesBtn) {
    exercisesBtn.addEventListener('click', () => {
      scrollToSection('#exercises');
    });
  }

  // Donate button - open modal
  const donateBtn = document.querySelector('.btn-donate');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      if (window.modalManager) {
        modalManager.openModal('donate-modal');
      }
    });
  }

  // Enroll Now button in footer - open modal
  const enrollNowBtn = document.querySelector('.btn-enroll-now');
  if (enrollNowBtn) {
    enrollNowBtn.addEventListener('click', () => {
      if (window.modalManager) {
        modalManager.openModal('enroll-modal');
      }
    });
  }

  // Know More button
  const knowMoreBtn = document.querySelector('.btn-know-more');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', () => {
      scrollToSection('#find-out-more');
    });
  }
}

// Smooth scrolling function with offset for fixed header
function scrollToSection(selector) {
  const target = document.querySelector(selector);
  if (!target) return;

  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 80;
  const elementPosition = target.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - headerHeight - 20;

  try {
    window.scrollTo({
      top: offsetPosition,
      left: 0,
      behavior: 'smooth'
    });
  } catch (e) {
    window.scrollTo(0, offsetPosition);
  }

  // Fallback scroll
  setTimeout(() => {
    if (Math.abs(window.scrollY - offsetPosition) > 100) {
      document.documentElement.scrollTop = offsetPosition;
      document.body.scrollTop = offsetPosition;
    }
  }, 100);

  // Highlight effect
  setTimeout(() => {
    target.classList.add('section-highlight');
    setTimeout(() => target.classList.remove('section-highlight'), 2000);
  }, 500);
}

// Video Player Interaction
function initVideoPlayer() {
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', () => {
      alert('Video player coming soon!');
    });
  }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      if (targetId === '#contact') {
        if (window.modalManager) modalManager.openModal('contact-modal');
        return;
      }
      
      if (targetId === '#enroll') {
        if (window.modalManager) modalManager.openModal('enroll-modal');
        return;
      }
      
      const target = document.querySelector(targetId);
      if (target) scrollToSection(targetId);
    });
  });
}

// Active navigation link highlighting
function initActiveNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section, .hero');
  
  function updateActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (section.classList.contains('hero')) {
          document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
        } else if (section.classList.contains('introduction')) {
          document.querySelector('.nav-link[href="#find-out-more"]')?.classList.add('active');
        }
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

// Initialize on page load
function init() {
  trackVisit();
  initEnrollmentForm();
  initVideoPlayer();
  initSmoothScroll();
  initActiveNavigation();
  setTimeout(() => initButtons(), 100);
  
  const count = Number(localStorage.getItem('visitCount') || 0);
  if (count > 0) updateVisitorCount(count);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
