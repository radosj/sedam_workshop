/**
 * Red Edition Website - Main JavaScript
 * Modern, clean implementation with GSAP animations
 */

class RedEditionSite {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 3;
        this.currentGallerySlide = 0;
        this.totalGallerySlides = 5;
        this.isAnimating = false;
        
        this.init();
    }

    init() {
        this.setupGSAP();
        this.setupNavigation();
        this.setupHeroSlideshow();
        this.setupGallerySlideshow();
        this.setupScrollAnimations();
        this.setupSmoothScroll();
        // Removed auto slideshow - now static
        this.handlePageLoad();
        
        console.log('Red Edition site initialized');
    }

    setupGSAP() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Set default animation settings
        gsap.defaults({
            duration: 0.8,
            ease: "power2.out"
        });
    }

    setupNavigation() {
        const nav = document.getElementById('main-nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.querySelector('.nav__menu');
        const navLinks = document.querySelectorAll('.nav__link');

        // Mobile menu toggle
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle?.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });

        // Active link highlighting
        this.updateActiveNavLink();
        window.addEventListener('scroll', () => this.updateActiveNavLink());
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id], main[id]');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    setupHeroSlideshow() {
        const slides = document.querySelectorAll('.slide');
        const bullets = document.querySelectorAll('.slide-bullet');
        const prevArrow = document.querySelector('.slide-arrow-prev');
        const nextArrow = document.querySelector('.slide-arrow-next');
        
        // Set initial background
        if (slides[0]) {
            const bgImage = slides[0].dataset.bg;
            slides[0].style.backgroundImage = `url(${bgImage})`;
        }

        // Preload all slide backgrounds
        slides.forEach((slide, index) => {
            const bgImage = slide.dataset.bg;
            if (bgImage) {
                const img = new Image();
                img.src = bgImage;
                slide.style.backgroundImage = `url(${bgImage})`;
            }
        });

        // Bullet navigation
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => {
                if (index !== this.currentSlide && !this.isAnimating) {
                    this.goToSlide(index);
                }
            });
        });

        // Arrow navigation with debugging
        prevArrow?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous arrow clicked');
            if (!this.isAnimating) {
                this.prevSlide();
            }
        });

        nextArrow?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next arrow clicked');
            if (!this.isAnimating) {
                this.nextSlide();
            }
        });

        // Additional event listeners for better compatibility
        prevArrow?.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Previous arrow touched');
            if (!this.isAnimating) {
                this.prevSlide();
            }
        });

        nextArrow?.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Next arrow touched');
            if (!this.isAnimating) {
                this.nextSlide();
            }
        });

        // Initialize slide animations
        this.initSlideAnimations();
        
        // Add touch/swipe support for hero slideshow
        this.setupHeroSwipe();
    }

    initSlideAnimations() {
        const activeSlide = document.querySelector('.slide.active');
        const title = activeSlide?.querySelector('.slide-title');
        const cta = activeSlide?.querySelector('.slide-cta');
        const counter = activeSlide?.querySelector('.slide-counter');

        if (title) {
            gsap.set(title.querySelectorAll('.word'), { y: '100%', opacity: 0 });
            gsap.to(title.querySelectorAll('.word'), {
                y: '0%',
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });
        }

        if (cta) {
            gsap.fromTo(cta, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1.2 }
            );
        }

        if (counter) {
            gsap.fromTo(counter,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.8, delay: 1.4 }
            );
        }
    }

    goToSlide(index) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const slides = document.querySelectorAll('.slide');
        const bullets = document.querySelectorAll('.slide-bullet');
        const counter = document.querySelector('.slide-counter .current');
        
        // Update bullets
        bullets.forEach((bullet, i) => {
            bullet.classList.toggle('active', i === index);
        });

        // Update counter
        if (counter) {
            counter.textContent = String(index + 1).padStart(2, '0');
        }

        // Animate slide transition
        const currentSlide = slides[this.currentSlide];
        const nextSlide = slides[index];
        
        if (currentSlide && nextSlide) {
            // Fade out current slide
            gsap.to(currentSlide, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => {
                    currentSlide.classList.remove('active');
                    nextSlide.classList.add('active');
                    
                    // Fade in next slide
                    gsap.fromTo(nextSlide, 
                        { opacity: 0 },
                        { 
                            opacity: 1, 
                            duration: 0.5,
                            onComplete: () => {
                                this.isAnimating = false;
                                this.animateSlideContent(nextSlide);
                            }
                        }
                    );
                }
            });
        }
        
        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = this.currentSlide === 0 
            ? this.totalSlides - 1 
            : this.currentSlide - 1;
        this.goToSlide(prevIndex);
    }

    animateSlideContent(slide) {
        const title = slide.querySelector('.slide-title');
        const cta = slide.querySelector('.slide-cta');
        const counter = slide.querySelector('.slide-counter');

        if (title) {
            gsap.fromTo(title.querySelectorAll('.word'),
                { y: '100%', opacity: 0 },
                { 
                    y: '0%', 
                    opacity: 1, 
                    duration: 0.8, 
                    stagger: 0.1,
                    ease: "power3.out"
                }
            );
        }

        if (cta) {
            gsap.fromTo(cta,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.4 }
            );
        }

        if (counter) {
            gsap.fromTo(counter,
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.6, delay: 0.6 }
            );
        }
    }

    setupHeroSwipe() {
        const heroSlideshow = document.querySelector('.hero-slideshow');
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (!heroSlideshow || !slideshowContainer) return;

        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let isDragging = false;
        let startTime = 0;
        let dragOffset = 0;

        // Touch events for mobile
        heroSlideshow.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            currentX = startX;
            startTime = Date.now();
            isDragging = true;
            
            // Add visual feedback
            heroSlideshow.style.transition = 'none';
        }, { passive: true });

        heroSlideshow.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = currentX - startX;
            const diffY = Math.abs(currentY - startY);
            
            // If horizontal swipe is more significant than vertical, prevent scrolling
            if (Math.abs(diffX) > diffY && Math.abs(diffX) > 10) {
                e.preventDefault();
                
                // Add smooth visual feedback during drag
                dragOffset = diffX * 0.3; // Reduce movement for smoother feel
                slideshowContainer.style.transform = `translateX(${dragOffset}px)`;
                
                // Add opacity feedback
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) {
                    const opacity = Math.max(0.7, 1 - Math.abs(diffX) / 300);
                    activeSlide.style.opacity = opacity;
                }
            }
        }, { passive: false });

        heroSlideshow.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - e.changedTouches[0].clientY);
            const timeDiff = Date.now() - startTime;
            
            // Reset visual feedback
            heroSlideshow.style.transition = '';
            slideshowContainer.style.transform = '';
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) activeSlide.style.opacity = '';
            
            // Trigger slide change with lower threshold for better responsiveness
            if (Math.abs(diffX) > diffY && 
                Math.abs(diffX) > 25 && 
                (timeDiff < 800 || Math.abs(diffX) > 60)) {
                
                if (!this.isAnimating) {
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }
            
            isDragging = false;
            dragOffset = 0;
        }, { passive: true });

        // Mouse events for desktop drag support
        heroSlideshow.addEventListener('mousedown', (e) => {
            startX = e.clientX;
            startY = e.clientY;
            currentX = startX;
            startTime = Date.now();
            isDragging = true;
            heroSlideshow.style.cursor = 'grabbing';
            heroSlideshow.style.transition = 'none';
            e.preventDefault();
        });

        heroSlideshow.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            currentX = e.clientX;
            const currentY = e.clientY;
            const diffX = currentX - startX;
            const diffY = Math.abs(currentY - startY);
            
            // Show visual feedback for dragging
            if (Math.abs(diffX) > diffY && Math.abs(diffX) > 5) {
                heroSlideshow.style.cursor = 'grabbing';
                
                // Add smooth visual feedback during drag
                dragOffset = diffX * 0.2; // Subtle movement for desktop
                slideshowContainer.style.transform = `translateX(${dragOffset}px)`;
                
                // Add opacity feedback
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) {
                    const opacity = Math.max(0.8, 1 - Math.abs(diffX) / 400);
                    activeSlide.style.opacity = opacity;
                }
            }
        });

        heroSlideshow.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            
            const endX = e.clientX;
            const diffX = startX - endX;
            const diffY = Math.abs(startY - e.clientY);
            const timeDiff = Date.now() - startTime;
            
            // Reset visual feedback
            heroSlideshow.style.cursor = 'grab';
            heroSlideshow.style.transition = '';
            slideshowContainer.style.transform = '';
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) activeSlide.style.opacity = '';
            
            // Trigger slide change
            if (Math.abs(diffX) > diffY && 
                Math.abs(diffX) > 25 && 
                (timeDiff < 800 || Math.abs(diffX) > 60)) {
                
                if (!this.isAnimating) {
                    if (diffX > 0) {
                        this.nextSlide();
                    } else {
                        this.prevSlide();
                    }
                }
            }
            
            isDragging = false;
            dragOffset = 0;
        });

        heroSlideshow.addEventListener('mouseleave', () => {
            if (isDragging) {
                // Reset everything on mouse leave
                heroSlideshow.style.cursor = 'grab';
                heroSlideshow.style.transition = '';
                slideshowContainer.style.transform = '';
                const activeSlide = document.querySelector('.slide.active');
                if (activeSlide) activeSlide.style.opacity = '';
                isDragging = false;
                dragOffset = 0;
            }
        });

        // Set initial cursor style
        heroSlideshow.style.cursor = 'grab';
    }

    setupAutoSlideshow() {
        setInterval(() => {
            if (!this.isAnimating) {
                const nextSlide = (this.currentSlide + 1) % this.totalSlides;
                this.goToSlide(nextSlide);
            }
        }, 5000); // Change slide every 5 seconds
    }

    setupGallerySlideshow() {
        const track = document.querySelector('.gallery-track');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        const bullets = document.querySelectorAll('.gallery-bullets .bullet');

        if (!track) return;

        // Navigation buttons
        prevBtn?.addEventListener('click', () => this.prevGallerySlide());
        nextBtn?.addEventListener('click', () => this.nextGallerySlide());

        // Bullet navigation
        bullets.forEach((bullet, index) => {
            bullet.addEventListener('click', () => this.goToGallerySlide(index));
        });

        // Touch/swipe support
        this.setupGallerySwipe(track);
    }

    nextGallerySlide() {
        this.currentGallerySlide = (this.currentGallerySlide + 1) % this.totalGallerySlides;
        this.updateGallerySlide();
    }

    prevGallerySlide() {
        this.currentGallerySlide = this.currentGallerySlide === 0 
            ? this.totalGallerySlides - 1 
            : this.currentGallerySlide - 1;
        this.updateGallerySlide();
    }

    goToGallerySlide(index) {
        this.currentGallerySlide = index;
        this.updateGallerySlide();
    }

    updateGallerySlide() {
        const track = document.querySelector('.gallery-track');
        const bullets = document.querySelectorAll('.gallery-bullets .bullet');
        
        if (track) {
            const translateX = -this.currentGallerySlide * 100;
            gsap.to(track, {
                x: `${translateX}%`,
                duration: 0.8,
                ease: "power2.inOut"
            });
        }

        // Update bullets
        bullets.forEach((bullet, index) => {
            bullet.classList.toggle('active', index === this.currentGallerySlide);
        });

        // Animate slide content
        const currentSlide = document.querySelectorAll('.gallery-slide')[this.currentGallerySlide];
        if (currentSlide) {
            const productName = currentSlide.querySelector('.product-name');
            if (productName) {
                gsap.fromTo(productName.querySelectorAll('.word'),
                    { y: 30, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 0.6, 
                        stagger: 0.1,
                        delay: 0.3
                    }
                );
            }
        }
    }

    setupGallerySwipe(track) {
        let startX = 0;
        let isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextGallerySlide();
                } else {
                    this.prevGallerySlide();
                }
            }
            
            isDragging = false;
        });
    }

    setupScrollAnimations() {
        // Animate elements on scroll
        gsap.utils.toArray('.animate-fade').forEach(element => {
            gsap.fromTo(element, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        gsap.utils.toArray('.animate-scale').forEach(element => {
            gsap.fromTo(element,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate words with stagger
        gsap.utils.toArray('.animate-words').forEach(element => {
            const words = element.querySelectorAll('.word');
            gsap.fromTo(words,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Animate text with reveal effect
        gsap.utils.toArray('.animate-text').forEach(element => {
            const words = element.querySelectorAll('.word');
            gsap.fromTo(words,
                { y: '100%', opacity: 0 },
                {
                    y: '0%',
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Parallax effect for images
        gsap.utils.toArray('.card-image img, .gallery-slide img').forEach(img => {
            gsap.fromTo(img,
                { scale: 1.1 },
                {
                    scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.closest('.card, .gallery-slide'),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                    
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: offsetTop, autoKill: false },
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }

    handlePageLoad() {
        // Add loading class initially
        document.body.classList.add('loading');
        
        // Remove loading class when everything is loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            
            // Trigger initial animations
            this.initSlideAnimations();
        });

        // Preload critical images
        this.preloadImages();
    }

    preloadImages() {
        const criticalImages = [
            'assets/images/hero-1.jpg',
            'assets/images/hero-2.jpg',
            'assets/images/hero-5.jpg',
            'assets/images/collections.jpg',
            'assets/images/showroom.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RedEditionSite();
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));

// Utility function for debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
