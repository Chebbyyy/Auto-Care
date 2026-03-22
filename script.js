// Navigation Functions
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        window.scroll({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        smoothScroll(this.getAttribute('href'));
    });
});

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Form Validation
function validateForm() {
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    let valid = true;

    inputs.forEach(input => {
        if (!input.value) {
            input.classList.add('error');
            valid = false;
        } else {
            input.classList.remove('error');
        }
    });
    return valid;
}

document.querySelector('form').addEventListener('submit', function (e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Animations
const animatedElements = document.querySelectorAll('.animate');

function animateOnScroll() {
    const windowHeight = window.innerHeight;

    animatedElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Interactive Features
const buttons = document.querySelectorAll('.interactive-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});