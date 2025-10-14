// ==================== PORTFOLIO.JS - Portfolio Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initPortfolioAnimations();
    initFilterButtons();
    initPlaceholderAnimations();
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'portfolio.html') {
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

// ==================== PORTFOLIO ANIMATIONS ====================
function initPortfolioAnimations() {
    const portfolioItems = document.querySelectorAll('.portfolio-item, .stat-card');
    
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

    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
}

// ==================== FILTER FUNCTIONALITY ====================
function initFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(40px) scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== PLACEHOLDER ANIMATIONS ====================
function initPlaceholderAnimations() {
    const placeholders = document.querySelectorAll('.placeholder-card, .project-placeholder');
    
    placeholders.forEach((placeholder, index) => {
        placeholder.style.opacity = '0';
        placeholder.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            placeholder.style.transition = 'all 0.5s ease';
            placeholder.style.opacity = '1';
            placeholder.style.transform = 'scale(1)';
        }, index * 150);
    });
}

// ==================== COMING SOON PULSE EFFECT ====================
const comingSoonElements = document.querySelectorAll('.coming-soon-overlay');
comingSoonElements.forEach(element => {
    setInterval(() => {
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 500);
    }, 2000);
});

// ==================== PORTFOLIO CARD HOVER EFFECTS ====================
const portfolioCards = document.querySelectorAll('.portfolio-item');
portfolioCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const image = this.querySelector('.portfolio-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
            image.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const image = this.querySelector('.portfolio-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// ==================== GRID LAYOUT TOGGLE ====================
function toggleGridLayout(layout) {
    const grid = document.querySelector('.portfolio-grid');
    
    if (layout === 'masonry') {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
    } else if (layout === 'wide') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(350px, 1fr))';
    }
}

// ==================== SCROLL REVEAL ====================
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.portfolio-item, .placeholder-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
});

// ==================== RESUME VIEWER ====================
function openResume(pdfPath, imagePath, title) {
    // Try to open PDF first, then fallback to image
    const pdfWindow = window.open(pdfPath, '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
    
    // If PDF fails to load, try image
    pdfWindow.onload = function() {
        // PDF loaded successfully
    };
    
    pdfWindow.onerror = function() {
        // PDF failed, try image
        pdfWindow.close();
        const imageWindow = window.open(imagePath, '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
        
        if (!imageWindow) {
            // Both failed, show alert
            alert(`Unable to open ${title}. Please check if the file exists.`);
        }
    };
}

