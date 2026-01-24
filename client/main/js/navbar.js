// NAVBAR JS - COMPLETE WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('Navbar JS loaded');
    
    // Get all elements
    const mobileMenuBtn = document.getElementById('hamburgerBtn');
    const mobileCloseBtn = document.getElementById('closeBtn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    
    // Toggle mobile menu function
    function toggleMobileMenu() {
        const isOpening = !mobileNav.classList.contains('active');
        
        // Toggle mobile nav
        mobileNav.classList.toggle('active');
        
        // Toggle overlay
        mobileNavOverlay.classList.toggle('active');
        
        // Toggle body scroll
        if (isOpening) {
            document.body.style.overflow = 'hidden';
            document.body.classList.add('no-scroll');
            
            // Hide hamburger button
            mobileMenuBtn.classList.add('hidden');
            
            // Show cross button (already handled by CSS)
            console.log('Menu opened: Hamburger hidden, Cross visible');
        } else {
            document.body.style.overflow = '';
            document.body.classList.remove('no-scroll');
            
            // Show hamburger button
            mobileMenuBtn.classList.remove('hidden');
            
            // Hide cross button (already handled by CSS)
            console.log('Menu closed: Hamburger visible, Cross hidden');
        }
        
        console.log('Mobile menu is now:', mobileNav.classList.contains('active') ? 'OPEN' : 'CLOSED');
    }
    
    // Event Listeners
    
    // 1. Hamburger button click (opens menu)
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Hamburger button clicked');
            toggleMobileMenu();
        });
    }
    
    // 2. Cross button click (closes menu)
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Cross button clicked');
            toggleMobileMenu();
        });
    }
    
    // 3. Overlay click (closes menu)
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Overlay clicked');
            toggleMobileMenu();
        });
    }
    
    // 4. Mobile links click (closes menu)
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-btn');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Mobile link clicked');
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });
    
    // Set active link based on current page
    function setActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        console.log('Current page:', currentPage);
        
        // Desktop links
        const desktopLinks = document.querySelectorAll('.nav-link');
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Mobile links
        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Close menu on window resize (if resized to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            console.log('Resized to desktop, closing menu');
            toggleMobileMenu();
        }
        
        // Ensure hamburger button is visible when resized to mobile
        if (window.innerWidth <= 768 && !mobileNav.classList.contains('active')) {
            mobileMenuBtn.classList.remove('hidden');
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            console.log('ESC pressed, closing menu');
            toggleMobileMenu();
        }
    });
    
    // Initialize
    setActiveLink();
    
    console.log('Navbar initialized successfully');
    console.log('Mobile menu button:', mobileMenuBtn ? 'Found' : 'Not found');
    console.log('Mobile close button:', mobileCloseBtn ? 'Found' : 'Not found');
});