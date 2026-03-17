// ============================================
// Z ELITE AUTO CARE - PREMIUM SCRIPT
// Enhanced Animations & Interaction Management
// ============================================

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
