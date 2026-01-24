// about.js - About Page Specific JavaScript - UPDATED

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Phoenix Professionals About Page loaded successfully!');
    
    // Initialize team member interactions
    initializeTeamMembers();
    
    // Initialize statistics counter animation
    initializeStatisticsCounter();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize value cards hover effects
    initializeValueCards();
    
    // Initialize mission/vision cards
    initializeMissionVisionCards();
    
    // Initialize feature items
    initializeFeatureItems();
    
    // Initialize animations
    initializeAnimations();
});

// Initialize team member interactions
function initializeTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Mouse enter effect
        member.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            
            // Animate member image
            const memberImage = this.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = 'scale(1.05) rotate(5deg)';
                memberImage.style.transition = 'transform 0.3s ease';
            }
            
            // Highlight expertise tags
            const expertiseTags = this.querySelectorAll('.member-expertise span');
            expertiseTags.forEach(tag => {
                tag.style.background = 'var(--gold)';
                tag.style.color = 'var(--black)';
                tag.style.transform = 'translateY(-3px)';
                tag.style.transition = 'all 0.3s ease';
                tag.style.boxShadow = '0 5px 15px rgba(242, 201, 76, 0.3)';
            });
        });
        
        // Mouse leave effect
        member.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            
            // Reset member image
            const memberImage = this.querySelector('.member-image');
            if (memberImage) {
                memberImage.style.transform = 'scale(1) rotate(0)';
            }
            
            // Reset expertise tags
            const expertiseTags = this.querySelectorAll('.member-expertise span');
            expertiseTags.forEach(tag => {
                tag.style.background = 'rgba(242, 201, 76, 0.1)';
                tag.style.color = 'var(--dark-gold)';
                tag.style.transform = 'translateY(0)';
                tag.style.boxShadow = 'none';
            });
        });
    });
}

// Initialize statistics counter animation
function initializeStatisticsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate numbers
    function animateNumber(element, target, duration = 1500) {
        let start = 0;
        const increment = target / (duration / 16); // 60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Observe when stats come into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const text = statNumber.textContent;
                const target = parseInt(text.replace('+', ''));
                
                if (!isNaN(target)) {
                    // Start animation with slight delay
                    statNumber.textContent = '0';
                    setTimeout(() => {
                        animateNumber(statNumber, target);
                        
                        // Animate icon
                        const statIcon = entry.target.querySelector('.stat-icon');
                        if (statIcon) {
                            statIcon.style.transform = 'scale(1.2)';
                            setTimeout(() => {
                                statIcon.style.transform = 'scale(1)';
                                statIcon.style.transition = 'transform 0.3s ease';
                            }, 300);
                        }
                    }, 500);
                }
                
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe each stat item
    statItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize smooth scrolling
function initializeSmoothScrolling() {
    // Smooth scroll for section links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scroll jump
                history.pushState(null, null, targetId);
                
                // Add active class to clicked button
                document.querySelectorAll('.about-hero-buttons a').forEach(btn => {
                    btn.classList.remove('active-section');
                });
                this.classList.add('active-section');
            }
        });
    });
}

// Initialize value cards hover effects
function initializeValueCards() {
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
        // Add staggered animation delay
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.background = 'var(--gold)';
                icon.style.transform = 'rotateY(180deg) scale(1.1)';
                icon.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                const iconInner = icon.querySelector('i');
                if (iconInner) {
                    iconInner.style.color = 'var(--black)';
                    iconInner.style.transform = 'rotateY(-180deg)';
                    iconInner.style.transition = 'transform 0.4s ease';
                }
            }
            
            // Add glow effect
            this.style.boxShadow = '0 15px 40px rgba(242, 201, 76, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.value-icon');
            if (icon) {
                icon.style.background = 'rgba(242, 201, 76, 0.1)';
                icon.style.transform = 'rotateY(0) scale(1)';
                
                const iconInner = icon.querySelector('i');
                if (iconInner) {
                    iconInner.style.color = 'var(--gold)';
                    iconInner.style.transform = 'rotateY(0)';
                }
            }
            
            // Remove glow effect
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });
}

// Initialize mission/vision cards
function initializeMissionVisionCards() {
    const missionVisionCards = document.querySelectorAll('.mission-card, .vision-card');
    
    missionVisionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            
            // Pulse effect for points
            const points = this.querySelectorAll('.mv-points li i');
            points.forEach((point, index) => {
                setTimeout(() => {
                    point.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        point.style.transform = 'scale(1)';
                        point.style.transition = 'transform 0.3s ease';
                    }, 150);
                }, index * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        // Add CSS for animations
        if (!document.querySelector('#mv-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'mv-animation-styles';
            style.textContent = `
                .mission-card, .vision-card {
                    transition: all 0.3s ease;
                }
                
                .active-section {
                    background: rgba(242, 201, 76, 0.2) !important;
                    border-color: var(--gold) !important;
                }
                
                .mv-points li i {
                    transition: transform 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// Initialize feature items
function initializeFeatureItems() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach((item, index) => {
        // Add staggered animation
        item.style.animationDelay = `${index * 0.1}s`;
        
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(15deg) scale(1.1)';
                icon.style.background = 'var(--gold)';
                
                const iconInner = icon.querySelector('i');
                if (iconInner) {
                    iconInner.style.color = 'var(--black)';
                }
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'rotate(0) scale(1)';
                icon.style.background = 'rgba(242, 201, 76, 0.1)';
                
                const iconInner = icon.querySelector('i');
                if (iconInner) {
                    iconInner.style.color = 'var(--gold)';
                }
            }
        });
    });
}

// Initialize animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const fadeElements = document.querySelectorAll('.feature-item, .value-card, .team-member, .benefit-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => observer.observe(el));
    
    // Add CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.id = 'about-animation-styles';
    animationStyles.textContent = `
        .feature-item,
        .value-card,
        .team-member,
        .benefit-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-item.animate-in,
        .value-card.animate-in,
        .team-member.animate-in,
        .benefit-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mission-card,
        .vision-card {
            transition: all 0.3s ease;
        }
        
        .member-image {
            transition: transform 0.3s ease;
        }
        
        .member-expertise span {
            transition: all 0.3s ease;
        }
        
        .stat-icon {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(animationStyles);
    
    // Animate hero section
    setTimeout(() => {
        const heroContent = document.querySelector('.about-hero-content');
        if (heroContent) {
            heroContent.classList.add('hero-animated');
        }
    }, 300);
}

// Window resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        console.log('About page resized to:', window.innerWidth, 'x', window.innerHeight);
        
        // Adjust layout on resize
        const teamStats = document.querySelector('.team-stats');
        if (teamStats) {
            if (window.innerWidth < 768) {
                teamStats.style.gridTemplateColumns = '1fr';
            } else if (window.innerWidth < 1024) {
                teamStats.style.gridTemplateColumns = 'repeat(2, 1fr)';
            } else {
                teamStats.style.gridTemplateColumns = 'repeat(4, 1fr)';
            }
        }
        
    }, 250);
});

// Add loading animation
setTimeout(() => {
    document.body.classList.add('page-loaded');
}, 100);

// Handle page navigation
window.addEventListener('beforeunload', function() {
    // Save scroll position
    sessionStorage.setItem('aboutScrollPosition', window.pageYOffset);
});

// Restore scroll position on load
window.addEventListener('load', function() {
    const savedPosition = sessionStorage.getItem('aboutScrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('aboutScrollPosition');
    }
});

// Team expertise hover effect
document.querySelectorAll('.member-expertise span').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 5px 15px rgba(242, 201, 76, 0.3)';
        this.style.transition = 'all 0.3s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Benefit cards animation
document.querySelectorAll('.benefit-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'rotate(15deg) scale(1.1)';
            icon.style.background = 'var(--gold)';
            
            const iconInner = icon.querySelector('i');
            if (iconInner) {
                iconInner.style.color = 'var(--black)';
            }
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.benefit-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
            icon.style.background = 'rgba(242, 201, 76, 0.1)';
            
            const iconInner = icon.querySelector('i');
            if (iconInner) {
                iconInner.style.color = 'var(--gold)';
            }
        }
    });
});