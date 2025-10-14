// ==================== SKILLS.JS - Skills Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initSkillBarAnimations();
    initCircularSkills();
    initSkillCardAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'skills.html') {
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

// ==================== SKILL BAR ANIMATIONS ====================
function initSkillBarAnimations() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percentage = entry.target.getAttribute('data-percentage');
                setTimeout(() => {
                    entry.target.style.width = percentage + '%';
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ==================== CIRCULAR SKILL ANIMATIONS ====================
function initCircularSkills() {
    const circularSkills = document.querySelectorAll('.circular-skill');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCircularProgress(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    circularSkills.forEach(skill => {
        observer.observe(skill);
    });
}

function animateCircularProgress(skillElement) {
    const progressFill = skillElement.querySelector('.circle-progress-fill');
    const percentage = parseInt(skillElement.getAttribute('data-percentage'));
    
    if (progressFill) {
        const degrees = (percentage / 100) * 360;
        
        let currentDegree = 0;
        const interval = setInterval(() => {
            if (currentDegree >= degrees) {
                clearInterval(interval);
            } else {
                currentDegree += 3;
                progressFill.style.transform = `rotate(${currentDegree}deg)`;
            }
        }, 10);
    }
}

// ==================== SKILL CARD ANIMATIONS ====================
function initSkillCardAnimations() {
    const skillCards = document.querySelectorAll('.skill-card, .tool-item, .soft-skill-tag');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    skillCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        card.style.transition = 'all 0.5s ease';
        observer.observe(card);
    });
}

// ==================== SKILL ITEM ANIMATION ON SCROLL ====================
function animateSkillsOnScroll() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight - 100) {
            const skillProgress = item.querySelector('.skill-progress');
            const percentage = skillProgress.getAttribute('data-percentage');
            
            if (!skillProgress.classList.contains('animated')) {
                skillProgress.style.width = percentage + '%';
                skillProgress.classList.add('animated');
            }
        }
    });
}

window.addEventListener('scroll', animateSkillsOnScroll);

// ==================== INTERACTIVE SKILL HOVER ====================
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

