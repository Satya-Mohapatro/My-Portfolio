// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const logo = document.querySelector('.nav-logo');

// Logo interactions
if (logo) {
    logo.addEventListener('click', () => {
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        gsap.to(logo.querySelector('.logo-icon'), {
            rotation: 360,
            scale: 1.2,
            duration: 0.6,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
        });
    });
    
    logo.addEventListener('mouseenter', () => {
        gsap.to(logo.querySelector('.logo-icon'), {
            rotation: 15,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    logo.addEventListener('mouseleave', () => {
        gsap.to(logo.querySelector('.logo-icon'), {
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Navbar Scroll Effect
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    
    if (currentScrollY > 100) {
        navbar.style.background = isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
});

// Dark Theme Functionality
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Update navbar background for theme change
    const isDarkMode = newTheme === 'dark';
    navbar.style.background = isDarkMode ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    
    // Animate theme toggle
    gsap.to(themeToggle, {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out"
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

window.addEventListener('scroll', updateActiveNavLink);

// Algorithm Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Ensure supervised learning tab is active on page load
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for AOS to initialize
    setTimeout(() => {
        const supervisedTab = document.getElementById('supervised');
        const supervisedButton = document.querySelector('[data-tab="supervised"]');
        
        if (supervisedTab && supervisedButton) {
            // Force active states
            supervisedTab.classList.add('active');
            supervisedButton.classList.add('active');
            
            // Make sure supervised content is visible
            supervisedTab.style.display = 'block';
            supervisedTab.style.opacity = '1';
            
            // Initialize project cards visibility and override AOS
            const projectCards = supervisedTab.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.visibility = 'visible';
                // Remove AOS attributes temporarily to ensure visibility
                const aosAttr = card.getAttribute('data-aos');
                if (aosAttr) {
                    card.removeAttribute('data-aos');
                    // Re-add after a short delay
                    setTimeout(() => {
                        card.setAttribute('data-aos', aosAttr);
                    }, 1000);
                }
            });
        }
        
        // Also ensure unsupervised tab content exists
        const unsupervisedTab = document.getElementById('unsupervised');
        if (unsupervisedTab) {
            const unsupervisedCards = unsupervisedTab.querySelectorAll('.project-card');
            unsupervisedCards.forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.visibility = 'visible';
            });
        }
    }, 500);
});

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(targetTab);
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
        
        // Animate tab content
        gsap.fromTo(`#${targetTab} .project-card`, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
        );
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Project Card Hover Effects with GSAP
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -8,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(card.querySelector('.project-icon'), {
            rotation: 5,
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
        
        gsap.to(card.querySelector('.project-icon'), {
            rotation: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// ML Animation Enhancement
const dataPoints = document.querySelectorAll('.data-point');
const brainCore = document.querySelector('.brain-core');
const algoCards = document.querySelectorAll('.algo-card');

// Add random animation delays to data points
dataPoints.forEach((point, index) => {
    const delay = Math.random() * 3;
    point.style.animationDelay = `${delay}s`;
    
    // Add click interaction
    point.addEventListener('click', () => {
        gsap.to(point, {
            scale: 1.5,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    });
});

// Brain core interaction
if (brainCore) {
    brainCore.addEventListener('mouseenter', () => {
        gsap.to(brainCore, {
            scale: 1.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    brainCore.addEventListener('mouseleave', () => {
        gsap.to(brainCore, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
}

// Algorithm cards hover effects
algoCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.2,
            backgroundColor: "#6366f1",
            color: "#ffffff",
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            backgroundColor: "",
            color: "",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Floating Badge Interactions
const floatingBadges = document.querySelectorAll('.floating-badge');

floatingBadges.forEach((badge, index) => {
    // Enhanced hover effects
    badge.addEventListener('mouseenter', () => {
        gsap.to(badge, {
            scale: 1.1,
            rotateY: 10,
            duration: 0.4,
            ease: "power2.out"
        });
        
        // Create burst effect
        gsap.to(badge.querySelector('.skill-particles'), {
            scale: 1.2,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    badge.addEventListener('mouseleave', () => {
        gsap.to(badge, {
            scale: 1,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out"
        });
        
        gsap.to(badge.querySelector('.skill-particles'), {
            scale: 1,
            opacity: 0.7,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Click effect
    badge.addEventListener('click', () => {
        gsap.to(badge, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
            pointer-events: none;
        `;
        
        badge.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Button Hover Effects
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            y: -2,
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            y: 0,
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    button.addEventListener('click', () => {
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    });
});

// Scroll-triggered Animations for Hero Elements
gsap.timeline()
    .from('.hero-title', { opacity: 0, y: 50, duration: 1, ease: "power2.out" })
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.5")
    .from('.hero-description', { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.3")
    .from('.hero-buttons', { opacity: 0, y: 30, duration: 0.8, ease: "power2.out" }, "-=0.3")
    .from('.ml-brain', { opacity: 0, scale: 0.5, duration: 1, ease: "back.out(1.7)" }, "-=0.8")
    .from('.data-point', { opacity: 0, scale: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.5")
    .from('.algo-card', { opacity: 0, rotation: 180, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.4")
    .from('.floating-badge', { opacity: 0, x: -50, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "-=0.6");

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in effect
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Tech Badge Hover Effects
const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        gsap.to(badge, {
            scale: 1.1,
            backgroundColor: "#6366f1",
            color: "#ffffff",
            duration: 0.2,
            ease: "power2.out"
        });
    });
    
    badge.addEventListener('mouseleave', () => {
        gsap.to(badge, {
            scale: 1,
            backgroundColor: "",
            color: "",
            duration: 0.2,
            ease: "power2.out"
        });
    });
});

// Simplified animations without ScrollTrigger
// Skills Grid Animation on Scroll using Intersection Observer
const animationObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const techObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const techItems = entry.target.querySelectorAll('.tech-item');
            techItems.forEach((item, index) => {
                gsap.from(item, {
                    opacity: 0,
                    y: 30,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out"
                });
            });
            techObserver.unobserve(entry.target);
        }
    });
}, animationObserverOptions);

// Project Cards Animation
const projectsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const projectCards = entry.target.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out"
                });
            });
            projectsObserver.unobserve(entry.target);
        }
    });
}, animationObserverOptions);

// Observe elements
const techCategories = document.querySelectorAll('.tech-category');
const projectsGrids = document.querySelectorAll('.projects-grid');

techCategories.forEach(category => techObserver.observe(category));
projectsGrids.forEach(grid => projectsObserver.observe(grid));

// Performance Optimization: Debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Cleanup function for memory management
window.addEventListener('beforeunload', () => {
    // Clean up GSAP animations
    gsap.killTweensOf("*");
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all animations are ready
    gsap.set('.fade-in', { opacity: 0, y: 30 });
    
    // Start initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Error handling for external libraries
window.addEventListener('error', (e) => {
    console.warn('An error occurred:', e.message);
    // Fallback functionality if animations fail
    if (e.message.includes('gsap') || e.message.includes('AOS')) {
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Tab navigation for mobile menu
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Preload critical resources
const preloadImages = () => {
    const imageUrls = [
        // Add any critical image URLs here if needed
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};

// Call preload function
preloadImages();

console.log('ML Portfolio Website initialized successfully! 🚀');
