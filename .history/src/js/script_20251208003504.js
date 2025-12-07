// ===== CAROUSEL FUNCTIONALITY =====
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        // Clone items for infinite loop
        const items = carousel.querySelectorAll('.carousel-item');
        items.forEach(item => {
            const clone = item.cloneNode(true);
            carousel.appendChild(clone);
        });
    });
}

// ===== DOM ELEMENTS =====
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('themeToggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// ===== MOBILE MENU FUNCTIONALITY =====
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = 'auto';
    }
}

// Mobile menu event listener
mobileMenu.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenu.contains(e.target)) {
        toggleMobileMenu();
    }
});

// ===== THEME TOGGLE FUNCTIONALITY =====
function toggleTheme() {
    body.classList.toggle('dark-theme');
    
    const isDark = body.classList.contains('dark-theme');
    const icon = themeToggle.querySelector('i');
    
    // Update icon
    if (isDark) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Theme toggle event listener
themeToggle.addEventListener('click', toggleTheme);

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.remove('dark-theme');
        icon.className = 'fas fa-moon';
    }
}

// Initialize carousels
initCarousels();
loadTheme();

// ===== NAVBAR SCROLL EFFECTS =====
function handleNavbarScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Scroll event listener with throttling for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(handleNavbarScroll);
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
function smoothScrollToTarget(targetId) {
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Add smooth scrolling to nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an anchor link
        if (href.startsWith('#')) {
            e.preventDefault();
            smoothScrollToTarget(href);
            
            // Update active link
            updateActiveNavLink(href);
        }
    });
});

// ===== ACTIVE NAVIGATION LINK MANAGEMENT =====
function updateActiveNavLink(activeSection) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeSection) {
            link.classList.add('active');
        }
    });
}

// Update active link based on scroll position
function updateActiveOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });
    
    if (currentSection) {
        updateActiveNavLink(currentSection);
    }
}

// Add scroll event for active link updates
window.addEventListener('scroll', updateActiveOnScroll);

// ===== DROPDOWN MENU FUNCTIONALITY =====
function handleDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
        
        // Toggle dropdown on click (for mobile)
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
}

// ===== ANIMATION ON SCROLL =====
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// ===== CTA BUTTON INTERACTIONS =====
function setupCTAButton() {
    const ctaBtn = document.querySelector('.cta-btn');
    
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            // Add a ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ctaBtn.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Example action - you can customize this
            console.log('CTA Button clicked!');
            // You could redirect to a contact form, open a modal, etc.
        });
    }
}

// ===== KEYBOARD NAVIGATION =====
function setupKeyboardNavigation() {
    // ESC key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        }
    });
    
    // Tab navigation improvements
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--primary-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function optimizePerformance() {
    // Lazy load images if any
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== INITIALIZATION =====
function initializeNavbar() {
    loadTheme();
    handleDropdownMenus();
    setupCTAButton();
    setupKeyboardNavigation();
    animateOnScroll();
    optimizePerformance();
    
    // Initial call to set active link
    updateActiveOnScroll();
    
    console.log('🚀 Modern Navbar initialized successfully!');
}

// ===== EVENT LISTENERS =====
// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeNavbar);
} else {
    initializeNavbar();
}

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on desktop
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ===== UTILITY FUNCTIONS =====
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

// Export functions for potential external use
window.NavbarUtils = {
    toggleMobileMenu,
    toggleTheme,
    updateActiveNavLink,
    smoothScrollToTarget
};