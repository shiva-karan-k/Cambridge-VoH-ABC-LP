'use client';

import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'contact' | 'donate' | 'enroll';
}

export default function Modal({ isOpen, onClose, type }: ModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<string>('');
  const [customAmount, setCustomAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSuccess(false);
      setSelectedAmount('');
      setCustomAmount('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, any> = {};
    
    // Collect form data
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Add selected amount for donation
    if (type === 'donate') {
      data.amount = selectedAmount;
      if (selectedAmount === 'custom') {
        data.customAmount = customAmount;
      }
    }

    try {
      const endpoint = type === 'contact' ? '/api/contact' : 
                     type === 'donate' ? '/api/donate' : 
                     '/api/enroll';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      const result = await response.json();
      console.log('Submission successful:', result);
      
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const titles = {
    contact: 'Contact Us',
    donate: 'Support Our Mission',
    enroll: 'Enroll in ABC Course'
  };

  const descriptions = {
    contact: "Have questions about the ABC Active Breathing Course? We'd love to hear from you!",
    donate: 'Your donation helps us provide free breathing courses to children and families in need.',
    enroll: 'Join our free 12-week online breathing course for children aged 7 and above.'
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{titles[type]}</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {type === 'contact' ? 'Message Sent!' : type === 'donate' ? 'Thank You!' : 'Enrollment Received!'}
              </h3>
              <p className="text-gray-600 mb-6">
                {type === 'contact' 
                  ? "Thank you for contacting us. We'll get back to you soon."
                  : type === 'donate'
                  ? 'Your generous donation will help children learn healthy breathing habits.'
                  : "Thank you for enrolling! We'll send course details to your email shortly."}
              </p>
              <button onClick={onClose} className="btn-modal btn-modal-submit">
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{descriptions[type]}</p>
              
              <form onSubmit={handleSubmit}>
                {type === 'donate' && (
                  <div className="form-group">
                    <label className="form-label">Select Amount</label>
                    <div className="donation-amounts">
                      {['5', '10', '25', '50', '100', 'custom'].map((amount) => (
                        <div
                          key={amount}
                          className={`amount-option ${selectedAmount === amount ? 'selected' : ''}`}
                          onClick={() => setSelectedAmount(amount)}
                        >
                          {amount === 'custom' ? 'Custom' : `£${amount}`}
                        </div>
                      ))}
                    </div>
                    {selectedAmount === 'custom' && (
                      <input
                        type="number"
                        className="form-input mt-2"
                        placeholder="Enter custom amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        min="1"
                        required
                      />
                    )}
                  </div>
                )}

                {type === 'enroll' && (
                  <div className="form-group">
                    <label className="form-label">Parent/Guardian Name *</label>
                    <input type="text" name="parentName" className="form-input" required />
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{type === 'enroll' ? 'Email *' : 'Name *'}</label>
                  <input 
                    type={type === 'enroll' ? 'email' : 'text'} 
                    name={type === 'enroll' ? 'email' : 'name'} 
                    className="form-input" 
                    required 
                  />
                </div>

                {type === 'contact' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subject *</label>
                      <input type="text" name="subject" className="form-input" required />
                    </div>
                  </>
                )}

                {type === 'enroll' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Child&apos;s Name *</label>
                      <input type="text" name="childName" className="form-input" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Child&apos;s Age *</label>
                      <input type="number" name="childAge" className="form-input" min="7" max="18" required />
                    </div>
                  </>
                )}

                {type === 'donate' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input type="email" name="email" className="form-input" required />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label className="form-label">
                    {type === 'contact' ? 'Message *' : 'Additional Information (Optional)'}
                  </label>
                  <textarea 
                    name={type === 'contact' ? 'message' : type === 'enroll' ? 'additionalInfo' : 'message'}
                    className="form-textarea" 
                    required={type === 'contact'}
                    placeholder={type === 'donate' ? 'Leave a message of support...' : ''}
                  />
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button type="button" onClick={onClose} className="btn-modal btn-modal-cancel">
                    Cancel
                  </button>
                  <button type="submit" className="btn-modal btn-modal-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 
                      type === 'contact' ? 'Send Message' : 
                      type === 'donate' ? 'Proceed to Donate' : 
                      'Submit Enrollment'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
