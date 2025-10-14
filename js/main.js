// ==================== MAIN.JS - Home Page JavaScript ====================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScroll();
    initAnimations();
    initMobileMenu();
    setActiveNavLink();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== SCROLL ANIMATIONS ====================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.section, .bio-section, .profile-card, .bio-content');
    animateElements.forEach(el => observer.observe(el));
}

// ==================== MOBILE MENU TOGGLE ====================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
            spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : 'none';
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// ==================== SET ACTIVE NAV LINK ====================
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ==================== TYPING EFFECT (Optional) ====================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ==================== SCROLL TO TOP ====================
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
});

// ==================== BIO SCROLL FUNCTIONALITY ====================
function scrollBio() {
    const bioScroll = document.getElementById('bioScroll');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (bioScroll) {
        // Check if already at bottom
        const isAtBottom = bioScroll.scrollHeight - bioScroll.scrollTop === bioScroll.clientHeight;
        
        if (isAtBottom) {
            // Scroll back to top
            bioScroll.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            scrollIndicator.innerHTML = '<span>↓</span>';
        } else {
            // Scroll to bottom
            bioScroll.scrollTo({
                top: bioScroll.scrollHeight,
                behavior: 'smooth'
            });
            scrollIndicator.innerHTML = '<span>↑</span>';
        }
    }
}

// Hide scroll indicator when user manually scrolls
document.addEventListener('DOMContentLoaded', function() {
    const bioScroll = document.getElementById('bioScroll');
    const scrollIndicator = document.getElementById('scrollIndicator');
    
    if (bioScroll && scrollIndicator) {
        bioScroll.addEventListener('scroll', function() {
            const isAtBottom = bioScroll.scrollHeight - bioScroll.scrollTop === bioScroll.clientHeight;
            
            if (isAtBottom) {
                scrollIndicator.innerHTML = '<span>↑</span>';
            } else if (bioScroll.scrollTop === 0) {
                scrollIndicator.innerHTML = '<span>↓</span>';
            }
        });
    }
});

