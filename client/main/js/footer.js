// Save this as footer.js
// FOOTER FUNCTIONALITY
document.addEventListener('DOMContentLoaded', function() {
    // Footer Dropdown Functionality
    const footerDropdown = document.querySelector('.footer-dropdown');
    const footerDropdownBtn = document.querySelector('.footer-dropdown-btn');
    const footerDropdownContent = document.querySelector('.footer-dropdown-content');
    
    if (footerDropdownBtn && footerDropdownContent) {
        footerDropdownBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            footerDropdown.classList.toggle('active');
        });
        
        // Close footer dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!footerDropdown.contains(e.target) && footerDropdown.classList.contains('active')) {
                footerDropdown.classList.remove('active');
            }
        });
        
        // Close footer dropdown when clicking on links
        const footerDropdownLinks = footerDropdownContent.querySelectorAll('a');
        footerDropdownLinks.forEach(link => {
            link.addEventListener('click', function() {
                footerDropdown.classList.remove('active');
            });
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (validateEmail(email)) {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                this.reset();
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
    
    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">×</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease;
        `;
        
        // Set background color based on type
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
        } else {
            notification.style.background = 'linear-gradient(135deg, #0d0d0d, #141414)';
            notification.style.border = '2px solid #f2c94c';
        }
        
        // Add close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Add to document
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
    
    console.log('Footer loaded successfully!');
});