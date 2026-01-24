// contact.js - Phoenix Professionals Contact Form - BULLETPROOF FIX
// This file should be loaded LAST to override everything

console.log('🚀 Phoenix Professionals Contact JS Loading...');

// Backend Configuration
const BACKEND_CONFIG = {
    API_URL: '/api/contact',
    TIMEOUT: 10000,
    RETRY_COUNT: 2,
    RETRY_DELAY: 1000
};

// 🔴 CRITICAL: Global flag to track if we're handling submission
let isSubmitting = false;

// Wait for everything to load
window.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM fully loaded');
    initContactPage();
});

// Main initialization function
function initContactPage() {
    console.log('🔧 Initializing contact page...');
    
    // 1. Destroy any default form behavior
    destroyDefaultFormBehavior();
    
    // 2. Setup our custom form handler
    setupCustomFormHandler();
    
    // 3. Initialize other features
    initFormValidation();
    initPhoneFormatting();
    initAnimations();
    
    console.log('✅ Contact page initialized successfully');
}

// 🔴 CRITICAL: Completely destroy default form behavior
function destroyDefaultFormBehavior() {
    console.log('🔨 Destroying default form behavior...');
    
    // Remove all forms from the DOM and recreate them
    const forms = document.querySelectorAll('form');
    
    forms.forEach((form, index) => {
        console.log(`🔨 Processing form ${index + 1}:`, form.id || form.className);
        
        // Save the form HTML
        const formHTML = form.outerHTML;
        
        // Create a new div to replace the form
        const formContainer = document.createElement('div');
        formContainer.className = form.className;
        formContainer.id = form.id;
        
        // Copy all attributes except action, method, onsubmit
        for (let attr of form.attributes) {
            if (attr.name !== 'action' && attr.name !== 'method' && attr.name !== 'onsubmit') {
                formContainer.setAttribute(attr.name, attr.value);
            }
        }
        
        // Copy the inner HTML
        formContainer.innerHTML = form.innerHTML;
        
        // Replace the form with our div
        form.parentNode.replaceChild(formContainer, form);
        
        console.log(`✅ Form ${index + 1} destroyed and replaced`);
    });
    
    // Also remove any submit event listeners from document
    document.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        console.log('❌ Global submit prevented');
        return false;
    }, true); // Use capture phase to catch early
    
    console.log('✅ Default form behavior destroyed');
}

// 🔴 CRITICAL: Setup our custom form handler
function setupCustomFormHandler() {
    console.log('🔧 Setting up custom form handler...');
    
    // Find our contact form wrapper
    const formWrapper = document.getElementById('contactFormWrapper');
    if (!formWrapper) {
        console.error('❌ Contact form wrapper not found!');
        return;
    }
    
    console.log('✅ Found form wrapper:', formWrapper);
    
    // Get the form inside (which is now a div)
    const formDiv = formWrapper.querySelector('.contact-form');
    if (!formDiv) {
        console.error('❌ Form div not found!');
        return;
    }
    
    console.log('✅ Found form div:', formDiv);
    
    // Get the submit button
    const submitBtn = document.getElementById('submitBtn');
    if (!submitBtn) {
        console.error('❌ Submit button not found!');
        return;
    }
    
    console.log('✅ Found submit button:', submitBtn);
    
    // 🔴 CRITICAL: Add click event to button instead of form submit
    submitBtn.addEventListener('click', handleFormSubmit);
    
    // Also prevent any enter key submissions
    const inputs = formDiv.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && e.target.type !== 'textarea') {
                e.preventDefault();
                console.log('❌ Enter key prevented');
            }
        });
    });
    
    console.log('✅ Custom form handler setup complete');
}

// Handle form submission
async function handleFormSubmit(e) {
    console.log('🖱️ Submit button clicked');
    
    // Prevent any default behavior
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Prevent multiple submissions
    if (isSubmitting) {
        console.log('⚠️ Already submitting, ignoring...');
        return false;
    }
    
    isSubmitting = true;
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim()
    };
    
    console.log('📝 Form data:', formData);
    
    // Validate form
    if (!validateFormData(formData)) {
        isSubmitting = false;
        return false;
    }
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        console.log('📤 Sending to backend...');
        
        // Send to backend
        const response = await sendToBackend(formData);
        
        console.log('📥 Backend response:', response);
        
        if (response && response.success) {
            console.log('✅ Form submitted successfully!');
            showNotification('✅ Thank you! Your message has been sent successfully.', 'success');
            
            // Clear form
            clearForm();
            
        } else {
            console.log('❌ Backend error:', response ? response.message : 'Unknown error');
            showNotification('⚠️ ' + (response?.message || 'Failed to send message'), 'warning');
        }
        
    } catch (error) {
        console.error('❌ Submission error:', error);
        showNotification('❌ Network error. Please try again.', 'error');
        
    } finally {
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        isSubmitting = false;
        
        console.log('✅ Form submission process completed');
    }
    
    return false;
}

// Validate form data
function validateFormData(formData) {
    console.log('🔍 Validating form...');
    
    if (!formData.name) {
        showNotification('Please enter your name', 'error');
        document.getElementById('name').focus();
        return false;
    }
    
    if (!formData.email) {
        showNotification('Please enter your email address', 'error');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!validateEmail(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        document.getElementById('email').focus();
        return false;
    }
    
    if (!formData.phone) {
        showNotification('Please enter your phone number', 'error');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!validatePhone(formData.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        document.getElementById('phone').focus();
        return false;
    }
    
    if (!formData.subject) {
        showNotification('Please select a subject', 'error');
        document.getElementById('subject').focus();
        return false;
    }
    
    if (!formData.message) {
        showNotification('Please enter your message', 'error');
        document.getElementById('message').focus();
        return false;
    }
    
    if (formData.message.length < 10) {
        showNotification('Message must be at least 10 characters', 'error');
        document.getElementById('message').focus();
        return false;
    }
    
    console.log('✅ Form validation passed');
    return true;
}

// Send data to backend
async function sendToBackend(formData) {
    console.log('🚀 Sending POST request to:', BACKEND_CONFIG.API_URL);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), BACKEND_CONFIG.TIMEOUT);
    
    try {
        const response = await fetch(BACKEND_CONFIG.API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData),
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return await response.json();
        
    } catch (error) {
        clearTimeout(timeoutId);
        console.error('❌ Fetch error:', error);
        throw error;
    }
}

// Clear form
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
    
    console.log('🧹 Form cleared');
}

// Validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate phone
function validatePhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length >= 10;
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `contact-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
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
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add animation styles if not present
    if (!document.querySelector('#notification-animations')) {
        const style = document.createElement('style');
        style.id = 'notification-animations';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize form validation
function initFormValidation() {
    console.log('🔧 Initializing form validation...');
    
    const inputs = document.querySelectorAll('#contactFormWrapper input, #contactFormWrapper textarea, #contactFormWrapper select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateSingleInput(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error state on input
            this.style.borderColor = '';
            const errorMsg = this.parentElement.querySelector('.error-message');
            if (errorMsg) errorMsg.remove();
        });
    });
    
    console.log('✅ Form validation initialized');
}

// Validate single input
function validateSingleInput(input) {
    const value = input.value.trim();
    const formGroup = input.parentElement;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (input.required && !value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && value && !validateEmail(value)) {
        showInputError(input, 'Please enter a valid email');
        return false;
    }
    
    if (input.id === 'phone' && value && !validatePhone(value)) {
        showInputError(input, 'Please enter a valid phone number');
        return false;
    }
    
    if (input.id === 'message' && value.length < 10) {
        showInputError(input, 'Message must be at least 10 characters');
        return false;
    }
    
    return true;
}

// Show input error
function showInputError(input, message) {
    input.style.borderColor = '#ef4444';
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = 'color: #ef4444; font-size: 12px; margin-top: 5px;';
    
    input.parentElement.appendChild(errorDiv);
}

// Initialize phone formatting
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                value = value.substring(0, 10);
            }
            
            this.value = value;
        });
    }
}

// Initialize animations
function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => observer.observe(el));
}

// Add test function to window for debugging
window.testFormSubmission = function() {
    console.log('🧪 Testing form submission...');
    
    document.getElementById('name').value = 'Test User';
    document.getElementById('email').value = 'test@example.com';
    document.getElementById('phone').value = '9876543210';
    document.getElementById('subject').value = 'accounting';
    document.getElementById('message').value = 'This is a test message for debugging';
    
    console.log('✅ Form filled with test data');
    showNotification('✅ Form filled with test data. Click Send Message.', 'info');
};

// Log that script is loaded
console.log('✅ contact.js loaded successfully');
console.log('💡 Tip: Type testFormSubmission() in console to test');
console.log('💡 Backend URL:', BACKEND_CONFIG.API_URL);