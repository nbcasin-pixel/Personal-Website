// ==================== PORTFOLIO.JS - Portfolio Page JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initMobileMenu();
    initPortfolioAnimations();
    initFilterButtons();
    initPlaceholderAnimations();
    initImageCarousels();
    initLightbox();
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

// ==================== IMAGE CAROUSEL ====================
function initImageCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Wait for images to load, then filter visible slides
        const checkImages = () => {
            const visibleSlides = Array.from(slides).filter(slide => {
                const img = slide.querySelector('img');
                if (!img) return false;
                // Check if image is visible (not hidden by onerror)
                if (img.style.display === 'none') return false;
                // For images with onerror handlers, check if they actually loaded
                // If naturalHeight is 0 and complete is true, image failed to load
                if (img.complete && img.naturalHeight === 0) {
                    // Check if placeholder is showing instead
                    const placeholder = track.querySelector('.portfolio-placeholder');
                    if (placeholder && placeholder.style.display !== 'none') {
                        return false;
                    }
                }
                return true;
            });
            
            initializeCarousel(visibleSlides);
        };
        
        // Wait for all images to load or fail
        const images = Array.from(slides).map(slide => slide.querySelector('img')).filter(Boolean);
        let loadedCount = 0;
        const totalImages = images.length;
        
        if (totalImages === 0) {
            checkImages();
            return;
        }
        
        images.forEach(img => {
            if (img.complete) {
                loadedCount++;
                if (loadedCount === totalImages) {
                    setTimeout(checkImages, 100);
                }
            } else {
                img.addEventListener('load', () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        setTimeout(checkImages, 100);
                    }
                });
                img.addEventListener('error', () => {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        setTimeout(checkImages, 100);
                    }
                });
            }
        });
        
        // Fallback timeout
        setTimeout(checkImages, 2000);
        
        function initializeCarousel(visibleSlides) {
        
            if (visibleSlides.length <= 1) {
                // Hide navigation if only one or no images
                if (prevBtn) prevBtn.style.display = 'none';
                if (nextBtn) nextBtn.style.display = 'none';
                if (dotsContainer) dotsContainer.style.display = 'none';
                return;
            }
            
            let currentIndex = 0;
        
            // Create dot indicators
            if (dotsContainer) {
                dotsContainer.innerHTML = ''; // Clear existing dots
                visibleSlides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'carousel-dot';
                    if (index === 0) dot.classList.add('active');
                    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                });
            }
            
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
            
            function updateCarousel() {
                const translateX = -currentIndex * 100;
                track.style.transform = `translateX(${translateX}%)`;
                
                // Update dots
                dots.forEach((dot, index) => {
                    if (index === currentIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
            
            function goToSlide(index) {
                currentIndex = index;
                if (currentIndex < 0) currentIndex = visibleSlides.length - 1;
                if (currentIndex >= visibleSlides.length) currentIndex = 0;
                updateCarousel();
            }
            
            function nextSlide() {
                currentIndex = (currentIndex + 1) % visibleSlides.length;
                updateCarousel();
            }
            
            function prevSlide() {
                currentIndex = (currentIndex - 1 + visibleSlides.length) % visibleSlides.length;
                updateCarousel();
            }
            
            // Set initial arrow visibility
            if (prevBtn) {
                prevBtn.style.opacity = '0.85';
                prevBtn.onclick = prevSlide;
            }
            
            if (nextBtn) {
                nextBtn.style.opacity = '0.85';
                nextBtn.onclick = nextSlide;
            }
            
            // Touch/swipe support
            let startX = 0;
            let isDragging = false;
            
            track.addEventListener('mousedown', (e) => {
                isDragging = true;
                startX = e.clientX;
            });
            
            track.addEventListener('mousemove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
            });
            
            track.addEventListener('mouseup', (e) => {
                if (!isDragging) return;
                isDragging = false;
                const diffX = e.clientX - startX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) prevSlide();
                    else nextSlide();
                }
            });
            
            track.addEventListener('mouseleave', () => {
                isDragging = false;
            });
            
            // Touch events
            let touchStartX = 0;
            
            track.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            
            track.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diffX = touchStartX - touchEndX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) nextSlide();
                    else prevSlide();
                }
            });
            
            // Keyboard navigation
            carousel.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') prevSlide();
                if (e.key === 'ArrowRight') nextSlide();
            });
            
            // Keep arrows visible but enhance on hover
            const enhanceControls = () => {
                if (prevBtn) prevBtn.style.opacity = '1';
                if (nextBtn) nextBtn.style.opacity = '1';
            };
            
            const reduceControls = () => {
                if (prevBtn) prevBtn.style.opacity = '0.85';
                if (nextBtn) nextBtn.style.opacity = '0.85';
            };
            
            carousel.addEventListener('mouseenter', enhanceControls);
            carousel.addEventListener('mouseleave', reduceControls);
        }
    });
}

// ==================== LIGHTBOX ====================
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    
    if (!lightbox) return;
    
    let currentImages = [];
    let currentIndex = 0;
    
    // Collect all images from all carousels
    function collectAllImages() {
        const allImages = [];
        const carousels = document.querySelectorAll('.carousel-container');
        
        carousels.forEach(carousel => {
            const slides = carousel.querySelectorAll('.carousel-slide img');
            slides.forEach(img => {
                if (img.style.display !== 'none' && img.complete && img.naturalHeight !== 0) {
                    allImages.push({
                        src: img.src,
                        alt: img.alt || 'Project image'
                    });
                }
            });
        });
        
        return allImages;
    }
    
    // Open lightbox
    function openLightbox(imageSrc, imageIndex = 0) {
        currentImages = collectAllImages();
        if (currentImages.length === 0) return;
        
        // Find the index of the clicked image
        const clickedIndex = currentImages.findIndex(img => img.src === imageSrc);
        currentIndex = clickedIndex >= 0 ? clickedIndex : imageIndex;
        
        updateLightbox();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Update lightbox content
    function updateLightbox() {
        if (currentImages.length === 0) return;
        
        const image = currentImages[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        
        if (lightboxCurrent) {
            lightboxCurrent.textContent = currentIndex + 1;
        }
        if (lightboxTotal) {
            lightboxTotal.textContent = currentImages.length;
        }
        
        // Show/hide navigation buttons
        if (lightboxPrev) {
            lightboxPrev.style.display = currentImages.length > 1 ? 'flex' : 'none';
        }
        if (lightboxNext) {
            lightboxNext.style.display = currentImages.length > 1 ? 'flex' : 'none';
        }
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Navigate lightbox
    function nextImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        updateLightbox();
    }
    
    function prevImage() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        updateLightbox();
    }
    
    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', prevImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
    
    // Open lightbox when clicking on carousel images
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('portfolio-thumbnail')) {
            e.preventDefault();
            openLightbox(e.target.src);
        }
    });
}

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

