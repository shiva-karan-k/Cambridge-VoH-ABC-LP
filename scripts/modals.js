// Modal System for Contact, Donate, and Enroll Forms

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    // Create modal containers if they don't exist
    this.createModalHTML();
    this.attachEventListeners();
  }

  createModalHTML() {
    // Check if modals already exist
    if (document.getElementById('contact-modal')) return;

    const modalsHTML = `
      <!-- Contact Modal -->
      <div id="contact-modal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Contact Us</h2>
            <button class="modal-close" data-modal="contact-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p class="modal-description">Have questions about the ABC Active Breathing Course? We'd love to hear from you!</p>
            <form id="contact-form" class="modal-form">
              <div class="form-group">
                <label class="form-label required">Name</label>
                <input type="text" name="name" class="form-input" required>
                <span class="form-error">Please enter your name</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Email</label>
                <input type="email" name="email" class="form-input" required>
                <span class="form-error">Please enter a valid email</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Subject</label>
                <input type="text" name="subject" class="form-input" required>
                <span class="form-error">Please enter a subject</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Message</label>
                <textarea name="message" class="form-textarea" required></textarea>
                <span class="form-error">Please enter your message</span>
              </div>
            </form>
            <div class="modal-success">
              <div class="success-icon">✓</div>
              <h3 class="success-title">Message Sent!</h3>
              <p class="success-message">Thank you for contacting us. We'll get back to you soon.</p>
              <button class="btn-modal btn-modal-submit" onclick="modalManager.closeModal('contact-modal')">Close</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-modal btn-modal-cancel" data-modal="contact-modal">Cancel</button>
            <button type="submit" form="contact-form" class="btn-modal btn-modal-submit">Send Message</button>
          </div>
        </div>
      </div>

      <!-- Donate Modal -->
      <div id="donate-modal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Support Our Mission</h2>
            <button class="modal-close" data-modal="donate-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p class="modal-description">Your donation helps us provide free breathing courses to children and families in need.</p>
            <form id="donate-form" class="modal-form">
              <div class="form-group">
                <label class="form-label required">Select Amount</label>
                <div class="donation-amounts">
                  <div class="amount-option" data-amount="5">£5</div>
                  <div class="amount-option" data-amount="10">£10</div>
                  <div class="amount-option" data-amount="25">£25</div>
                  <div class="amount-option" data-amount="50">£50</div>
                  <div class="amount-option" data-amount="100">£100</div>
                  <div class="amount-option" data-amount="custom">Custom</div>
                </div>
                <input type="hidden" name="amount" required>
                <input type="number" name="customAmount" class="form-input" placeholder="Enter custom amount" style="display: none;" min="1">
                <span class="form-error">Please select or enter an amount</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Name</label>
                <input type="text" name="name" class="form-input" required>
                <span class="form-error">Please enter your name</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Email</label>
                <input type="email" name="email" class="form-input" required>
                <span class="form-error">Please enter a valid email</span>
              </div>
              <div class="form-group">
                <label class="form-label">Message (Optional)</label>
                <textarea name="message" class="form-textarea" placeholder="Leave a message of support..."></textarea>
              </div>
            </form>
            <div class="modal-success">
              <div class="success-icon">✓</div>
              <h3 class="success-title">Thank You!</h3>
              <p class="success-message">Your generous donation will help children learn healthy breathing habits.</p>
              <button class="btn-modal btn-modal-submit" onclick="modalManager.closeModal('donate-modal')">Close</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-modal btn-modal-cancel" data-modal="donate-modal">Cancel</button>
            <button type="submit" form="donate-form" class="btn-modal btn-modal-submit">Proceed to Donate</button>
          </div>
        </div>
      </div>

      <!-- Enroll Modal -->
      <div id="enroll-modal" class="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h2 class="modal-title">Enroll in ABC Course</h2>
            <button class="modal-close" data-modal="enroll-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p class="modal-description">Join our free 12-week online breathing course for children aged 7 and above.</p>
            <form id="enroll-form" class="modal-form">
              <div class="form-group">
                <label class="form-label required">Parent/Guardian Name</label>
                <input type="text" name="parentName" class="form-input" required>
                <span class="form-error">Please enter your name</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Email</label>
                <input type="email" name="email" class="form-input" required>
                <span class="form-error">Please enter a valid email</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Child's Name</label>
                <input type="text" name="childName" class="form-input" required>
                <span class="form-error">Please enter child's name</span>
              </div>
              <div class="form-group">
                <label class="form-label required">Child's Age</label>
                <input type="number" name="childAge" class="form-input" min="7" max="18" required>
                <span class="form-error">Child must be 7 years or older</span>
              </div>
              <div class="form-group">
                <label class="form-label">Additional Information (Optional)</label>
                <textarea name="additionalInfo" class="form-textarea" placeholder="Any special requirements or questions..."></textarea>
              </div>
            </form>
            <div class="modal-success">
              <div class="success-icon">✓</div>
              <h3 class="success-title">Enrollment Received!</h3>
              <p class="success-message">Thank you for enrolling! We'll send course details to your email shortly.</p>
              <button class="btn-modal btn-modal-submit" onclick="modalManager.closeModal('enroll-modal')">Close</button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-modal btn-modal-cancel" data-modal="enroll-modal">Cancel</button>
            <button type="submit" form="enroll-form" class="btn-modal btn-modal-submit">Submit Enrollment</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalsHTML);
  }

  attachEventListeners() {
    // Close buttons
    document.querySelectorAll('.modal-close, .btn-modal-cancel').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modalId = e.target.getAttribute('data-modal');
        if (modalId) this.closeModal(modalId);
      });
    });

    // Click outside to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.closeModal(overlay.id);
        }
      });
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.closeModal(this.activeModal);
      }
    });

    // Form submissions
    this.setupContactForm();
    this.setupDonateForm();
    this.setupEnrollForm();
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    this.activeModal = modalId;
    document.body.style.overflow = 'hidden';

    // Reset form and hide success message
    const form = modal.querySelector('form');
    const success = modal.querySelector('.modal-success');
    const footer = modal.querySelector('.modal-footer');
    
    if (form) {
      form.reset();
      form.style.display = 'flex';
      form.querySelectorAll('.form-error').forEach(err => err.classList.remove('active'));
      form.querySelectorAll('.error').forEach(input => input.classList.remove('error'));
    }
    if (success) success.classList.remove('active');
    if (footer) footer.style.display = 'flex';
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('active');
    this.activeModal = null;
    document.body.style.overflow = '';
  }

  showSuccess(modalId) {
    const modal = document.getElementById(modalId);
    const form = modal.querySelector('form');
    const success = modal.querySelector('.modal-success');
    const footer = modal.querySelector('.modal-footer');

    if (form) form.style.display = 'none';
    if (success) success.classList.add('active');
    if (footer) footer.style.display = 'none';
  }

  validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('[required]');

    inputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      const error = formGroup?.querySelector('.form-error');

      if (!input.value.trim()) {
        input.classList.add('error');
        error?.classList.add('active');
        isValid = false;
      } else if (input.type === 'email' && !this.isValidEmail(input.value)) {
        input.classList.add('error');
        error?.classList.add('active');
        isValid = false;
      } else {
        input.classList.remove('error');
        error?.classList.remove('active');
      }
    });

    return isValid;
  }

  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this.validateForm(form)) return;

      const submitBtn = form.closest('.modal').querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        // TODO: Replace with actual API endpoint
        await this.submitContactForm(data);
        this.showSuccess('contact-modal');
      } catch (error) {
        console.error('Contact form error:', error);
        alert('Sorry, there was an error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  setupDonateForm() {
    const form = document.getElementById('donate-form');
    if (!form) return;

    // Amount selection
    const amountOptions = form.querySelectorAll('.amount-option');
    const amountInput = form.querySelector('[name="amount"]');
    const customInput = form.querySelector('[name="customAmount"]');

    amountOptions.forEach(option => {
      option.addEventListener('click', () => {
        amountOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        const amount = option.getAttribute('data-amount');
        if (amount === 'custom') {
          customInput.style.display = 'block';
          customInput.required = true;
          amountInput.value = '';
        } else {
          customInput.style.display = 'none';
          customInput.required = false;
          amountInput.value = amount;
        }
      });
    });

    customInput.addEventListener('input', () => {
      amountInput.value = customInput.value;
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this.validateForm(form)) return;

      const submitBtn = form.closest('.modal').querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Processing...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        // TODO: Replace with actual payment API
        await this.submitDonateForm(data);
        this.showSuccess('donate-modal');
      } catch (error) {
        console.error('Donate form error:', error);
        alert('Sorry, there was an error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Proceed to Donate';
      }
    });
  }

  setupEnrollForm() {
    const form = document.getElementById('enroll-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this.validateForm(form)) return;

      const submitBtn = form.closest('.modal').querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      const formData = new FormData(form);
      const data = Object.fromEntries(formData);

      try {
        // TODO: Replace with actual API endpoint
        await this.submitEnrollForm(data);
        this.showSuccess('enroll-modal');
      } catch (error) {
        console.error('Enroll form error:', error);
        alert('Sorry, there was an error. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Enrollment';
      }
    });
  }

  // API submission methods (replace with actual endpoints)
  async submitContactForm(data) {
    console.log('Contact form data:', data);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async submitDonateForm(data) {
    console.log('Donate form data:', data);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }

  async submitEnrollForm(data) {
    console.log('Enroll form data:', data);
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

// Initialize modal manager
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.modalManager = new ModalManager();
  });
} else {
  window.modalManager = new ModalManager();
}
