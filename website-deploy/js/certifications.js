// ==================== CERTIFICATIONS.JS - Certifications Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initCertificateAnimations();
    initFilterButtons();
    initCounterAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'certifications.html') {
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

// ==================== CERTIFICATE ANIMATIONS ====================
function initCertificateAnimations() {
    const certificates = document.querySelectorAll('.certificate-card, .training-item, .seminar-card');
    
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
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    certificates.forEach(cert => {
        cert.style.opacity = '0';
        cert.style.transform = 'translateY(30px)';
        cert.style.transition = 'all 0.6s ease';
        observer.observe(cert);
    });
}

// ==================== FILTER FUNCTIONALITY ====================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.category-filter');
    const certificates = document.querySelectorAll('.certificate-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            certificates.forEach(cert => {
                if (filterValue === 'all' || cert.getAttribute('data-category') === filterValue) {
                    cert.style.display = 'block';
                    setTimeout(() => {
                        cert.style.opacity = '1';
                        cert.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    cert.style.opacity = '0';
                    cert.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        cert.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== COUNTER ANIMATIONS ====================
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
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

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== CERTIFICATE BADGE ROTATION ====================
const badges = document.querySelectorAll('.badge-icon');
badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'rotate(360deg) scale(1.2)';
        this.style.transition = 'transform 0.6s ease';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'rotate(0deg) scale(1)';
    });
});

// ==================== SEARCH/FILTER CERTIFICATES ====================
function filterCertificates(searchTerm) {
    const certificates = document.querySelectorAll('.certificate-card');
    
    certificates.forEach(cert => {
        const title = cert.querySelector('.certificate-title').textContent.toLowerCase();
        const issuer = cert.querySelector('.certificate-issuer').textContent.toLowerCase();
        
        if (title.includes(searchTerm.toLowerCase()) || issuer.includes(searchTerm.toLowerCase())) {
            cert.style.display = 'block';
        } else {
            cert.style.display = 'none';
        }
    });
}

// ==================== CERTIFICATE VIEWER ====================
function openCertificate(pdfPath, imagePath, title) {
    // Try to open PDF first, then fallback to image
    const pdfWindow = window.open(pdfPath, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    
    // If PDF fails to load, try image
    pdfWindow.onload = function() {
        // PDF loaded successfully
    };
    
    pdfWindow.onerror = function() {
        // PDF failed, try image
        pdfWindow.close();
        const imageWindow = window.open(imagePath, '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
        
        if (!imageWindow) {
            // Both failed, show alert
            alert(`Unable to open ${title}. Please check if the file exists.`);
        }
    };
}

// ==================== CERTIFICATE HOVER EFFECTS ====================
document.addEventListener('DOMContentLoaded', function() {
    const certImages = document.querySelectorAll('.certification-image');
    
    certImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

