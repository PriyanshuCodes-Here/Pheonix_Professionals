// services.js - Services Page Specific JavaScript

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Services page loaded successfully!');
    
    // Service cards hover effects
    initializeServiceCards();
    
    // Smooth scroll to service sections
    initializeServiceNavigation();
    
    // Newsletter form submission
    initializeNewsletterForm();
    
    // Active service highlighting
    highlightActiveService();
});

// Initialize service cards with enhanced effects
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Add subtle glow effect
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 30px rgba(242, 201, 76, 0.1)';
            
            // Highlight the icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = 'linear-gradient(135deg, rgba(242, 201, 76, 0.25), rgba(242, 201, 76, 0.15))';
                icon.style.transform = 'scale(1.05)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            
            // Reset icon
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.background = 'linear-gradient(135deg, rgba(242, 201, 76, 0.15), rgba(242, 201, 76, 0.05))';
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Click effect - show service details
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const serviceType = this.getAttribute('data-service');
            console.log('Selected service:', serviceType);
            
            // Add temporary active class
            this.classList.add('card-clicked');
            setTimeout(() => {
                this.classList.remove('card-clicked');
            }, 300);
            
            // Scroll to enquiry button smoothly
            const enquiryBtn = this.querySelector('.service-enquiry-btn');
            if (enquiryBtn && isElementInViewport(enquiryBtn)) {
                enquiryBtn.focus({ preventScroll: true });
            }
        });
    });
}

// Initialize service navigation
function initializeServiceNavigation() {
    // Get all service enquiry buttons
    const enquiryButtons = document.querySelectorAll('.service-enquiry-btn');
    
    enquiryButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get service name from parent card
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('.service-card-title').textContent;
            
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
            this.disabled = true;
            
            // Simulate API call or navigation delay
            setTimeout(() => {
                // Store service info in sessionStorage for contact page
                sessionStorage.setItem('selectedService', serviceTitle);
                
                // Navigate to contact page
                window.location.href = this.href;
            }, 800);
        });
    });
    
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-primary-btn, .cta-secondary-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href.includes('contact.html')) {
                e.preventDefault();
                
                // Store that user came from services CTA
                sessionStorage.setItem('contactSource', 'services_cta');
                
                // Show loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecting...';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 600);
            }
        });
    });
}

// Initialize newsletter form
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value.trim();
            
            // Validate email
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                emailInput.focus();
                return;
            }
            
            // Disable form during submission
            const submitBtn = this.querySelector('.newsletter-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success simulation
                showNotification('Thank you for subscribing to our newsletter! You\'ll receive financial tips and updates.', 'success');
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Store in localStorage (simulating backend)
                const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
                subscribers.push({
                    email: email,
                    date: new Date().toISOString(),
                    source: 'services_page'
                });
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
                
            }, 1500);
        });
    }
}

// Highlight active service based on URL hash
function highlightActiveService() {
    const hash = window.location.hash;
    if (hash) {
        const serviceElement = document.querySelector(`[data-service="${hash.substring(1)}"]`);
        if (serviceElement) {
            // Scroll to service with offset for navbar
            setTimeout(() => {
                const yOffset = -100;
                const y = serviceElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
                
                // Add highlight class
                serviceElement.classList.add('service-highlight');
                setTimeout(() => {
                    serviceElement.classList.remove('service-highlight');
                }, 3000);
            }, 500);
        }
    }
}

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Helper function to check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .service-highlight {
        animation: highlightPulse 2s ease;
    }
    
    @keyframes highlightPulse {
        0% { box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
        50% { box-shadow: 0 0 30px rgba(242, 201, 76, 0.3); }
        100% { box-shadow: 0 10px 30px rgba(0,0,0,0.08); }
    }
    
    .card-clicked {
        transform: scale(0.98) !important;
        transition: transform 0.2s ease !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

document.head.appendChild(notificationStyles);

// Window resize handler for services grid
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('Services page resized to:', window.innerWidth, 'x', window.innerHeight);
        
        // Adjust service cards on resize if needed
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            if (window.innerWidth < 768) {
                card.style.minHeight = 'auto';
            } else {
                card.style.minHeight = '';
            }
        });
    }, 250);
});