// ==================== EXPERIENCE.JS - Experience Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initExperienceAnimations();
    initSkillTagAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'experience.html') {
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

// ==================== EXPERIENCE CARD ANIMATIONS ====================
function initExperienceAnimations() {
    const experienceCards = document.querySelectorAll('.experience-card');
    
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

    experienceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// ==================== SKILL TAG ANIMATIONS ====================
function initSkillTagAnimations() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.3s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, index * 50);
    });
}

// ==================== EXPAND/COLLAPSE RESPONSIBILITIES ====================
function toggleResponsibilities(cardElement) {
    const responsibilities = cardElement.querySelector('.responsibilities');
    if (responsibilities) {
        responsibilities.classList.toggle('expanded');
    }
}

// ==================== FILTER EXPERIENCES ====================
function filterExperiences(type) {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        if (type === 'all' || card.dataset.type === type) {
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateX(-50px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ==================== SCROLL ANIMATIONS ====================
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.experience-card');
    
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            card.classList.add('visible');
        }
    });
});

