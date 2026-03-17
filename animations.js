// Enhanced animation and interaction script
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animations to child elements
                const children = entry.target.querySelectorAll('[class*="stagger-"]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Create floating particles
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);

        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.opacity = Math.random() * 0.5 + 0.3;
            particleContainer.appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 6000);
        }, 300);
    }

    // Initialize particles
    createParticles();

    // Enhanced hover effects for service cards
    document.querySelectorAll('.garage-service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(225,6,0,0.3)';
            
            const icon = this.querySelector('.garage-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg) scale(1.2)';
                icon.style.boxShadow = '0 0 30px rgba(225,6,0,0.8)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            
            const icon = this.querySelector('.garage-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
                icon.style.boxShadow = '0 4px 15px rgba(225,6,0,0.3)';
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});