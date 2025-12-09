// Cursor Glow Effect with Animated Color Change
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;
let currentBlue = 35, currentOrange = 254;
let targetBlue = 35, targetOrange = 254;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.opacity = '1';
    
    // Calculate position ratio (0 = left, 0.5 = center, 1 = right)
    const windowWidth = window.innerWidth;
    const positionRatio = mouseX / windowWidth;
    
    if (positionRatio < 0.33) {
        // Left side - More Blue
        targetBlue = 100;  // Brighter blue
        targetOrange = 45; // Less orange
    } else if (positionRatio > 0.66) {
        // Right side - More Orange
        targetBlue = 35;   // Less blue
        targetOrange = 127; // More intense orange
    } else {
        // Middle - Balanced
        targetBlue = 70;
        targetOrange = 90;
    }
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// Smooth cursor glow animation with color lerp
function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    
    // Smoothly interpolate colors
    currentBlue += (targetBlue - currentBlue) * 0.08;
    currentOrange += (targetOrange - currentOrange) * 0.08;
    
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    
    // Create gradient with interpolated colors - higher opacity for blue
    const blueColor = `rgba(35, ${Math.round(currentBlue)}, ${Math.round(currentBlue)}, 0.25)`;
    const orangeColor = `rgba(${Math.round(currentOrange * 2)}, ${Math.round(currentOrange * 0.6)}, 45, 0.15)`;
    
    cursorGlow.style.background = `radial-gradient(circle, ${blueColor}, ${orangeColor}, transparent 70%)`;
    
    requestAnimationFrame(animateCursorGlow);
}
animateCursorGlow();

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbar = document.querySelector('.navbar');
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

let lastScrollTop = 0;
let isScrollingDown = true;

// Track scroll direction
window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    isScrollingDown = currentScrollTop > lastScrollTop;
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            // Only reset if scrolling down and element is below viewport
            const rect = entry.target.getBoundingClientRect();
            if (isScrollingDown && rect.top > window.innerHeight) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(50px)';
            }
        }
    });
}, observerOptions);

// Observe elements for animation - including titles and labels
const animateElements = document.querySelectorAll('.project-card, .skill-card, .about-content, .contact-buttons, .section-title, .section-label, .section-description, .hero-title, .hero-subtitle, .label, .hero-buttons');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)'; // Start from below
    el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(el);
});

// Add scroll-triggered stagger animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Stagger hero section elements
const heroElements = document.querySelectorAll('.hero .label, .hero .hero-title, .hero .hero-subtitle, .hero .hero-buttons');
heroElements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1 + 0.2}s`;
});

// Stagger section headers
const sectionLabels = document.querySelectorAll('.section-label');
const sectionTitles = document.querySelectorAll('.section-title');
const sectionDescriptions = document.querySelectorAll('.section-description');

sectionLabels.forEach(el => el.style.transitionDelay = '0.1s');
sectionTitles.forEach(el => el.style.transitionDelay = '0.2s');
sectionDescriptions.forEach(el => el.style.transitionDelay = '0.3s');

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c🚀 Portfolio Website', 'color: #FE7F2D; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with animated gradient blobs', 'color: #233D4D; font-size: 14px;');
