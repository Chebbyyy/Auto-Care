// ============================================
// Z ELITE AUTO CARE - PREMIUM SCRIPT
// Enhanced Animations & Interaction Management
// ============================================

'use strict';

// ============================================
// BOOTSTRAP INTEGRATION & ENHANCED INTERACTIONS
// ============================================

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Initialize all enhancement functions
    initMobileMenu();
    initFormValidation();
    initScrollAnimations();
    initDataAttributeAnimations();
    setMinDate();
    initPhoneFormatting();
    initAnalytics();
    initNavbarScroll();
    initInteractiveElements();
    initColorfulAnimations();
    initSmoothScroll();
    enhancePagePerformance();
});

// ============================================
// INTERACTIVE ELEMENTS
// ============================================
function initInteractiveElements() {
    // Add click effects to service cards
    const serviceCards = document.querySelectorAll('.service-card, .garage-service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // Create ripple effect
            createRippleEffect(this, event);
            
            // Add temporary highlight
            this.style.transform = this.style.transform ? this.style.transform + ' scale(0.95)' : 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Add vibration feedback
            if (navigator.vibrate) {
                navigator.vibrate([10, 5, 10]);
            }
        });
        
        // Add glow effect on hover
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 15px rgba(225, 6, 0, 0.4))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });

    // Add hover sound effects (optional)
    const interactiveElements = document.querySelectorAll('.btn, .service-card, .garage-service-card, .feature-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Add subtle vibration effect on mobile
            if (navigator.vibrate && window.innerWidth <= 768) {
                navigator.vibrate(5);
            }
        });
    });

    // Add floating animation to important buttons
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        setInterval(() => {
            if (!button.matches(':hover')) {
                button.style.animation = 'none';
                setTimeout(() => {
                    button.style.animation = 'float 3s ease-in-out infinite';
                }, 10);
            }
        }, 5000);
    });
    

}

// ============================================
// COLORFUL ANIMATIONS
// ============================================
function initColorfulAnimations() {
    // Add rainbow effect to garage service icons on hover
    const garageIcons = document.querySelectorAll('.garage-icon');
    garageIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)';
            this.style.backgroundSize = '400% 400%';
            this.style.animation = 'gradientShift 2s ease infinite';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, var(--accent-color) 0%, #c90500 100%)';
            this.style.animation = '';
        });
    });

    // Add particle effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            createParticleEffect(this);
        });
    });

    // Add color-changing text effect
    const heroWords = document.querySelectorAll('.hero-headline .word');
    heroWords.forEach((word, index) => {
        setTimeout(() => {
            word.addEventListener('mouseenter', function() {
                const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#f093fb'];
                this.style.color = colors[Math.floor(Math.random() * colors.length)];
                this.style.textShadow = `0 0 20px ${this.style.color}`;
            });
            
            word.addEventListener('mouseleave', function() {
                this.style.color = '';
                this.style.textShadow = '';
            });
        }, index * 100);
    });
}

// ============================================
// RIPPLE EFFECT
// ============================================
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// ============================================
// PARTICLE EFFECT
// ============================================
function createParticleEffect(element) {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            element.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }, i * 100);
    }
}

// ============================================
// ENHANCED FORM INTERACTIONS
// ============================================
function initEnhancedFormInteractions() {
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    
    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
            createInputGlow(this);
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // Add typing animation
        input.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });
}

function createInputGlow(input) {
    const glow = document.createElement('div');
    glow.className = 'input-glow';
    input.parentElement.appendChild(glow);
    
    setTimeout(() => {
        glow.remove();
    }, 1000);
}

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
function initScrollTriggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add different animations based on element type
                if (element.classList.contains('service-card')) {
                    element.style.animation = 'slideInUp 0.6s ease-out forwards';
                } else if (element.classList.contains('garage-service-card')) {
                    element.style.animation = 'slideInLeft 0.6s ease-out forwards';
                } else if (element.classList.contains('feature-card')) {
                    element.style.animation = 'slideInRight 0.6s ease-out forwards';
                } else if (element.classList.contains('stat-card')) {
                    element.style.animation = 'zoomIn 0.6s ease-out forwards';
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .garage-service-card, .feature-card, .stat-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// DYNAMIC COLOR THEME SWITCHER (Optional)
// ============================================
function initColorThemeSwitcher() {
    const themes = {
        default: { primary: '#000000', accent: '#E10600' },
        blue: { primary: '#1a1a2e', accent: '#16213e' },
        green: { primary: '#0f3460', accent: '#16a085' },
        purple: { primary: '#2c3e50', accent: '#9b59b6' }
    };
    
    // Add theme switcher button (optional)
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = '<i class="bi bi-palette"></i>';
    themeSwitcher.style.cssText = `
        position: fixed;
        top: 50%;
        right: 20px;
        width: 50px;
        height: 50px;
        background: var(--accent-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1000;
        transition: all 0.3s ease;
        color: white;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(themeSwitcher);
    
    let currentTheme = 0;
    const themeKeys = Object.keys(themes);
    
    themeSwitcher.addEventListener('click', function() {
        currentTheme = (currentTheme + 1) % themeKeys.length;
        const theme = themes[themeKeys[currentTheme]];
        
        document.documentElement.style.setProperty('--primary-color', theme.primary);
        document.documentElement.style.setProperty('--accent-color', theme.accent);
        
        // Add animation to theme switcher
        this.style.transform = 'scale(0.8) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 200);
    });
}

// ============================================
// ENHANCED MOBILE INTERACTIONS
// ============================================
function initMobileEnhancements() {
    if ('ontouchstart' in window) {
        // Add touch feedback
        const touchElements = document.querySelectorAll('.btn, .service-card, .garage-service-card');
        
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
        
        // Add swipe gestures for service cards
        let startX, startY;
        
        document.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            if (!startX || !startY) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Detect swipe direction
            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 50) {
                    // Swipe left - could trigger next service
                    console.log('Swiped left');
                } else if (diffX < -50) {
                    // Swipe right - could trigger previous service
                    console.log('Swiped right');
                }
            }
            
            startX = null;
            startY = null;
        });
    }
}

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations here
        }, 10);
    });
}

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    initEnhancedFormInteractions();
    initScrollTriggeredAnimations();
    initMobileEnhancements();
    initPerformanceOptimizations();
    // initColorThemeSwitcher(); // Uncomment if you want the theme switcher
});

// ============================================
// DOM READY & INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initFormValidation();
    initScrollAnimations();
    initDataAttributeAnimations();
    setMinDate();
    initPhoneFormatting();
    initAnalytics();
    initNavbarScroll();
});

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2500);
    }
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
    });
    
    // Scroll to top on click
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ============================================
// PARALLAX HERO EFFECT
// ============================================
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-image');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px) scale(1.05)`;
    }
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

// ============================================
// DATA ATTRIBUTE ANIMATIONS
// ============================================
function initDataAttributeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            const animationType = entry.target.getAttribute('data-animate');

            if (entry.isIntersecting && animationType) {
                // Already has animation in CSS, observer just triggers visibility
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with data-animate attributes
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================
function initFormValidation() {
    const form = document.getElementById('bookingForm');
    
    if (!form) return;

    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const serviceSelect = document.getElementById('service');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');

    // Real-time validation
    if (nameInput) nameInput.addEventListener('blur', () => validateName());
    if (phoneInput) phoneInput.addEventListener('blur', () => validatePhone());
    if (emailInput) emailInput.addEventListener('blur', () => validateEmail());
    if (serviceSelect) serviceSelect.addEventListener('change', () => validateService());
    if (dateInput) dateInput.addEventListener('change', () => validateDate());
    if (timeInput) timeInput.addEventListener('change', () => validateTime());

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isServiceValid = validateService();
        const isDateValid = validateDate();
        const isTimeValid = validateTime();

        if (isNameValid && isPhoneValid && isEmailValid && isServiceValid && isDateValid && isTimeValid) {
            submitBooking();
        }
    });
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================
function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (!nameInput || !nameError) return true;

    const nameValue = nameInput.value.trim();

    if (!nameValue) {
        showError(nameInput, nameError, 'Name is required');
        return false;
    }

    if (nameValue.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    }

    clearError(nameInput, nameError);
    return true;
}

function validatePhone() {
    const phoneInput = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    
    if (!phoneInput || !phoneError) return true;

    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^(\+?61|0)4\d{8}$/;

    if (!phoneValue) {
        showError(phoneInput, phoneError, 'Phone number is required');
        return false;
    }

    if (!phoneRegex.test(phoneValue.replace(/\s/g, ''))) {
        showError(phoneInput, phoneError, 'Please enter a valid Australian phone number');
        return false;
    }

    clearError(phoneInput, phoneError);
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput || !emailError) return true;

    const emailValue = emailInput.value.trim();

    if (!emailValue) {
        clearError(emailInput, emailError);
        return true; // Email is optional
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }

    clearError(emailInput, emailError);
    return true;
}

function validateService() {
    const serviceSelect = document.getElementById('service');
    const serviceError = document.getElementById('serviceError');
    
    if (!serviceSelect || !serviceError) return true;

    const serviceValue = serviceSelect.value;

    if (!serviceValue) {
        showError(serviceSelect, serviceError, 'Please select a service');
        return false;
    }

    clearError(serviceSelect, serviceError);
    return true;
}

function validateDate() {
    const dateInput = document.getElementById('date');
    const dateError = document.getElementById('dateError');
    
    if (!dateInput || !dateError) return true;

    const dateValue = dateInput.value;

    if (!dateValue) {
        showError(dateInput, dateError, 'Please select a preferred date');
        return false;
    }

    const selectedDate = new Date(dateValue);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        showError(dateInput, dateError, 'Please select a future date');
        return false;
    }

    clearError(dateInput, dateError);
    return true;
}

function validateTime() {
    const timeInput = document.getElementById('time');
    const timeError = document.getElementById('timeError');
    
    if (!timeInput || !timeError) return true;

    const timeValue = timeInput.value;

    if (!timeValue) {
        showError(timeInput, timeError, 'Please select a preferred time');
        return false;
    }

    clearError(timeInput, timeError);
    return true;
}

// Helper functions for error handling
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.classList.add('show');
    input.style.borderColor = '#dc2626';
}

function clearError(input, errorElement) {
    errorElement.classList.remove('show');
    errorElement.textContent = '';
    input.style.borderColor = '#e5e7eb';
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    dateInput.min = `${year}-${month}-${day}`;
}

// Submit booking
function submitBooking() {
    const form = document.getElementById('bookingForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (!form || !formSuccess) return;

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const message = document.getElementById('message').value;

    // Send email using Formspree (FREE - no backend needed)
    sendBookingEmail({
        name: name,
        phone: phone,
        email: email,
        service: service,
        date: date,
        time: time,
        message: message
    });

    // Display confirmation
    const confirmPhone = document.getElementById('confirmPhone');
    const confirmDate = document.getElementById('confirmDate');
    
    if (confirmPhone) confirmPhone.textContent = phone;
    if (confirmDate) {
        const dateObj = new Date(date);
        const formattedDate = dateObj.toLocaleDateString('en-AU', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Convert 24-hour time to 12-hour format with AM/PM
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        const formattedTime = `${hour12}:${minutes} ${ampm}`;
        
        confirmDate.textContent = `${formattedDate} at ${formattedTime}`;
    }

    // Hide form, show success message
    form.style.display = 'none';
    formSuccess.classList.remove('hidden');
    formSuccess.classList.add('show');
    formSuccess.style.display = 'block';

    // Scroll to success message
    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Track conversion
    trackConversion('booking_submission', {
        service: service,
        date: date,
        time: time,
        phone: phone
    });
}

// Send booking email via Web3Forms
function sendBookingEmail(bookingData) {
    const WEB3FORMS_KEY = 'b9328dd0-046e-4699-9523-3c806566fa89';
    
    // Convert time to 12-hour format with AM/PM
    const [hours, minutes] = bookingData.time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    const formattedTime = `${hour12}:${minutes} ${ampm}`;
    
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_KEY);
    formData.append('subject', `New Booking: ${bookingData.service} - ${bookingData.name}`);
    formData.append('from_name', 'Z Elite Auto Care Website');
    formData.append('name', bookingData.name);
    formData.append('phone', bookingData.phone);
    formData.append('email', bookingData.email || 'Not provided');
    formData.append('service', bookingData.service);
    formData.append('date', bookingData.date);
    formData.append('time', formattedTime);
    formData.append('message', bookingData.message || 'No additional notes');

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Booking email sent successfully');
        } else {
            console.error('Failed to send booking email');
        }
    })
    .catch(error => {
        console.error('Error sending booking:', error);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation for stats
                if (entry.target.classList.contains('stat-card')) {
                    const numberEl = entry.target.querySelector('[data-count]');
                    if (numberEl) {
                        animateCounter(numberEl);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe fade-up elements (for backward compatibility)
    const fadeUpElements = document.querySelectorAll('[data-animate="fade-up"]');
    fadeUpElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ============================================
// PHONE NUMBER FORMATTING
// ============================================
function initPhoneFormatting() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.startsWith('61')) {
                    value = value.substring(2);
                }
                
                if (value.length > 10) {
                    value = value.substring(0, 10);
                }
                
                if (value.length <= 4) {
                    e.target.value = value;
                } else if (value.length <= 7) {
                    e.target.value = value.substring(0, 4) + ' ' + value.substring(4);
                } else {
                    e.target.value = value.substring(0, 4) + ' ' + value.substring(4, 7) + ' ' + value.substring(7);
                }
            }
        });
    }
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Don't prevent default for links without content
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// ANALYTICS & CONVERSION TRACKING
// ============================================
function initAnalytics() {
    // Track page load
    trackPageView();

    // Track click-to-call
    trackClickToCall();

    // Track button clicks
    trackButtonClicks();
}

function trackPageView() {
    console.log('Page loaded:', {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString()
    });

    // Google Analytics (if available)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view');
    }
}

function trackClickToCall() {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            const phoneNumber = this.href.replace('tel:', '');
            console.log('Click to call:', phoneNumber);

            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click_to_call', {
                    'phone_number': phoneNumber
                });
            }
        });
    });
}

function trackButtonClicks() {
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const sectionName = this.closest('section')?.id || 'unknown';
            
            console.log('Button clicked:', {
                text: buttonText,
                section: sectionName,
                timestamp: new Date().toISOString()
            });

            // Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'button_click', {
                    'button_text': buttonText,
                    'section': sectionName
                });
            }
        });
    });
}

function trackConversion(conversionType, data = {}) {
    console.log('Conversion:', {
        type: conversionType,
        data: data,
        timestamp: new Date().toISOString()
    });

    // Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'conversion_type': conversionType,
            ...data
        });
    }
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    
    console.log('Performance Metrics:', {
        pageLoadTime: pageLoadTime + 'ms',
        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.navigationStart + 'ms',
        firstPaint: perfData.responseEnd - perfData.navigationStart + 'ms'
    });

    // Check animation frame rate (simplified FPS check)
    checkAnimationPerformance();
});

function checkAnimationPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();

    function countFrame() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            console.log('Average FPS:', frameCount);
            frameCount = 0;
            lastTime = currentTime;
        }

        requestAnimationFrame(countFrame);
    }

    // Only run for first 3 seconds to avoid performance impact
    requestAnimationFrame(countFrame);
    setTimeout(() => {
        /* Stop counting */
    }, 3000);
}

// ============================================
// UTILITY: Send booking to server (optional)
// ============================================
/*
function sendBookingToServer(name, phone, service, date) {
    const bookingData = {
        name: name,
        phone: phone,
        service: service,
        date: date,
        timestamp: new Date().toISOString()
    };

    // Example using fetch API
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Handle success response
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error
    });
}
*/

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // Skip to main content on Tab + Alt
    if (event.altKey && event.key === 'm') {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) mainContent.focus();
    }
});

// Add CSS for new animations and effects
const additionalCSS = `
/* Ripple effect */
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(225, 6, 0, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* Particle effect */
.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    animation: particle-float 3s ease-out forwards;
    pointer-events: none;
}

@keyframes particle-float {
    0% {
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    100% {
        transform: translateY(-100px) scale(0);
        opacity: 0;
    }
}

/* Gradient shift animation */
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

/* Float animation */
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

/* Slide animations */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Input glow effect */
.input-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: linear-gradient(45deg, transparent, rgba(225, 6, 0, 0.2), transparent);
    animation: input-glow 1s ease-out;
    pointer-events: none;
}

@keyframes input-glow {
    0% {
        opacity: 0;
        transform: scale(0.8);
    }
    50% {
        opacity: 1;
        transform: scale(1.05);
    }
    100% {
        opacity: 0;
        transform: scale(1);
    }
}

/* Enhanced hover states */
.service-card, .garage-service-card {
    cursor: pointer;
    user-select: none;
}

.service-card:active, .garage-service-card:active {
    transform: scale(0.98);
}

/* Mobile touch feedback */
@media (max-width: 768px) {
    .btn:active, .service-card:active, .garage-service-card:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
    }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ============================================
// ERROR LOGGING
// ============================================
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});


// ============================================
// PRICE CALCULATOR
// ============================================
function calculatePrice() {
    const service = document.getElementById('calcService').value;
    const vehicle = document.getElementById('calcVehicle').value;
    const result = document.getElementById('calcResult');
    
    if (service) {
        const total = parseInt(service) + parseInt(vehicle);
        result.textContent = '$' + total;
    } else {
        result.textContent = '$0';
    }
}

// ============================================
// FAQ TOGGLE
// ============================================
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ============================================
// BEFORE/AFTER SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('comparisonSlider');
    const afterImage = document.querySelector('.slider-image.after');
    const divider = document.getElementById('sliderDivider');
    
    if (slider && afterImage && divider) {
        slider.addEventListener('input', function() {
            const value = this.value;
            afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
            divider.style.left = value + '%';
        });
    }
});

// ============================================
// NEWSLETTER SUBSCRIPTION
// ============================================
function subscribeNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // You can integrate with email service here (Mailchimp, ConvertKit, etc.)
    console.log('Newsletter subscription:', email);
    
    alert('Thanks for subscribing! We\'ll send you exclusive deals and tips.');
    form.reset();
}


// ============================================
// TECH COUNTER ANIMATION
// ============================================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter on scroll
document.addEventListener('DOMContentLoaded', function() {
    const statCards = document.querySelectorAll('.stat-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('[data-count]');
                if (counter && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => observer.observe(card));
});

// Enhanced work section interactions
function initWorkSectionInteractions() {
    const workCards = document.querySelectorAll('.work-card');
    workCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.bi-arrow-right-circle-fill');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(90deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.bi-arrow-right-circle-fill');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL ENHANCEMENT
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// PERFORMANCE ENHANCEMENTS
// ============================================
function enhancePagePerformance() {
    // Lazy load images for better performance
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInImage 0.6s ease-out forwards';
                    observer.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            if (!img.closest('nav')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // Prefetch key pages
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = window.location.origin;
    document.head.appendChild(link);
}

// ============================================
// ADD FADE IN IMAGE ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInImage {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
// Add to initialization
document.addEventListener('DOMContentLoaded', function() {
    initWorkSectionInteractions();
});