// Watson's Flowers - JavaScript Interactions
// Dark Luxe E-commerce Experience

// ===================================
// Navbar Scroll Effect
// ===================================
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ===================================
// Mobile Menu Toggle
// ===================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Product Card Animations on Scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
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

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Observe occasion cards
document.querySelectorAll('.occasion-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// ===================================
// Add to Cart Functionality
// ===================================
let cartCount = 3; // Starting count from badge

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        
        // Increment cart count
        cartCount++;
        updateCartBadge();
        
        // Visual feedback
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        
        // Create floating notification
        showNotification(`${productName} added to cart!`);
        
        // Animate button
        button.style.transform = 'scale(1.2) rotate(15deg)';
        setTimeout(() => {
            button.style.transform = '';
        }, 300);
    });
});

function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    badge.textContent = cartCount;
    
    // Pulse animation
    badge.style.animation = 'none';
    setTimeout(() => {
        badge.style.animation = 'pulse 0.5s ease';
    }, 10);
}

// ===================================
// Notification System
// ===================================
function showNotification(message) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${message}</span>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: 'linear-gradient(135deg, #FF6B9D, #F4A261)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        fontWeight: '600',
        boxShadow: '0 0 20px rgba(255, 107, 157, 0.6), 0 0 40px rgba(255, 107, 157, 0.3)',
        zIndex: '10000',
        animation: 'slideInRight 0.4s ease-out',
        fontFamily: "'Inter', sans-serif"
    });
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 400);
    }, 3000);
}

// Add notification animations to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Product Quick View
// ===================================
document.querySelectorAll('.product-card').forEach(card => {
    const quickView = card.querySelector('.product-quick-view');
    
    if (quickView) {
        quickView.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            
            const productName = card.querySelector('.product-name').textContent;
            const productPrice = card.querySelector('.product-price').textContent;
            const productDesc = card.querySelector('.product-description').textContent;
            
            showQuickViewModal(productName, productPrice, productDesc);
        });
    }
});

function showQuickViewModal(name, price, description) {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-image">
                <div class="product-image-placeholder">🌸</div>
            </div>
            <div class="modal-info">
                <h2>${name}</h2>
                <p class="modal-price">${price}</p>
                <p class="modal-description">${description}</p>
                <div class="modal-actions">
                    <button class="btn btn-primary glow-btn modal-add-to-cart">
                        <span>Add to Cart</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(45, 49, 66, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            background: #2D3142;
            border: 1px solid rgba(248, 245, 241, 0.2);
            border-radius: 20px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            padding: 3rem;
            animation: slideUp 0.4s ease;
        }
        
        .modal-close {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            background: transparent;
            border: none;
            color: #F8F5F1;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 107, 157, 0.2);
            color: #FF6B9D;
        }
        
        .modal-image {
            background: linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(244, 162, 97, 0.1));
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8rem;
            opacity: 0.3;
        }
        
        .modal-info h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.75rem;
            font-weight: 700;
            color: #F8F5F1;
            margin-bottom: 1rem;
            letter-spacing: -0.3px;
        }
        
        .modal-price {
            font-family: 'Inter', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(135deg, #D89CA6, #E8B4B8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 1.5rem;
        }
        
        .modal-description {
            color: #E9ECEF;
            line-height: 1.8;
            margin-bottom: 2rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
        }
        
        .modal-add-to-cart {
            width: 100%;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                grid-template-columns: 1fr;
                padding: 2rem;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#quick-view-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'quick-view-styles';
        styleEl.textContent = modalStyles;
        document.head.appendChild(styleEl);
    }
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    const closeModal = () => {
        modal.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Add to cart from modal
    modal.querySelector('.modal-add-to-cart').addEventListener('click', () => {
        cartCount++;
        updateCartBadge();
        showNotification(`${name} added to cart!`);
        closeModal();
    });
}

// ===================================
// Contact Form Submission
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Message Sent!</span>
            `;
            
            showNotification('Thank you! We\'ll be in touch soon.');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// ===================================
// Parallax Effect for Hero
// ===================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const heroContent = hero.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    }
});

// ===================================
// Stats Counter Animation
// ===================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
};

// Observe stats for animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNum = entry.target.querySelector('.stat-num');
            if (statNum && !statNum.classList.contains('animated')) {
                const text = statNum.textContent.trim();
                const number = parseInt(text.replace(/,/g, ''));
                
                if (!isNaN(number)) {
                    statNum.classList.add('animated');
                    animateCounter(statNum, number);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box').forEach(box => {
    statsObserver.observe(box);
});

// ===================================
// Initialize
// ===================================
console.log('%cWatson\'s Flowers', 'font-size: 24px; font-weight: bold; color: #D89CA6; font-family: Playfair Display, serif;');
console.log('%cTwilight Garden Design', 'font-size: 14px; color: #5B6B8F; font-family: Inter, sans-serif;');
console.log('💙 Elevating moments since 1995');

// Prevent default behavior for demo links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        if (!link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
        }
    });
});
