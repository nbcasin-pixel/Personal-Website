// ==================== ADVOCACY.JS - Advocacy Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initAdvocacyAnimations();
    initImpactCounters();
    initVolunteerAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'advocacy.html') {
            link.classList.add('active');
        }
    });
}

// ==================== MOBILE MENU ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : 'none';
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.style.transform = 'none');
                spans[1].style.opacity = '1';
            });
        });
    }
}

// ==================== ADVOCACY CARD ANIMATIONS ====================
function initAdvocacyAnimations() {
    const advocacyCards = document.querySelectorAll('.advocacy-card, .project-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    advocacyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ==================== IMPACT COUNTER ANIMATIONS ====================
function initImpactCounters() {
    const impactNumbers = document.querySelectorAll('.impact-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    impactNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const target = parseInt(text.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 16);
}

// ==================== VOLUNTEER ITEM ANIMATIONS ====================
function initVolunteerAnimations() {
    const volunteerItems = document.querySelectorAll('.volunteer-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    volunteerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// ==================== ADVOCACY ICON ANIMATIONS ====================
const advocacyIcons = document.querySelectorAll('.advocacy-icon, .volunteer-icon-box');
advocacyIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ==================== IMPACT STAT HOVER ====================
const impactStats = document.querySelectorAll('.impact-stat');
impactStats.forEach(stat => {
    stat.addEventListener('mouseenter', function() {
        const number = this.querySelector('.impact-number');
        number.style.transform = 'scale(1.2)';
        number.style.transition = 'transform 0.3s ease';
    });
    
    stat.addEventListener('mouseleave', function() {
        const number = this.querySelector('.impact-number');
        number.style.transform = 'scale(1)';
    });
});

// ==================== SCROLL REVEAL ====================
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.advocacy-card, .volunteer-item, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
});

