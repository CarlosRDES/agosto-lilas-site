document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScrolling();
    initViolenceCards();
    initFAQ();
    initAnonymousForm();
    initMobileMenu();
    initHeaderScroll();
    initEmergencyHighlight();
    initAccessibility();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Violence cards expansion functionality - Fixed
function initViolenceCards() {
    const violenceCards = document.querySelectorAll('.violence-card');
    
    violenceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state immediately
            this.classList.toggle('expanded');
        });
        
        // Add keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('expanded');
            }
        });
        
        // Make cards focusable
        card.setAttribute('tabindex', '0');
    });
}

// FAQ accordion functionality - Fixed
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items first
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// Anonymous form functionality - Fixed
function initAnonymousForm() {
    const form = document.getElementById('anonymousForm');
    const successMessage = document.getElementById('formSuccess');
    
    if (form && successMessage) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitButton.disabled = true;
            
            // Simulate form submission with shorter delay
            setTimeout(() => {
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Reset form after delay
                setTimeout(() => {
                    form.style.display = 'block';
                    successMessage.style.display = 'none';
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    form.reset();
                }, 5000);
                
            }, 1500); // Reduced delay to 1.5 seconds
        });
        
        // Form validation and emergency alert
        const helpTypeSelect = document.getElementById('helpType');
        if (helpTypeSelect) {
            helpTypeSelect.addEventListener('change', function() {
                if (this.value === 'emergencia') {
                    showEmergencyAlert();
                }
            });
        }
    }
}

// Show emergency alert - Improved
function showEmergencyAlert() {
    // Remove any existing alert
    const existingAlert = document.querySelector('.emergency-alert-container');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    const alertContainer = document.createElement('div');
    alertContainer.className = 'emergency-alert-container';
    alertContainer.innerHTML = `
        <div class="emergency-overlay" onclick="this.parentElement.remove()"></div>
        <div class="emergency-alert">
            <h4>⚠️ Situação de Emergência</h4>
            <p>Se você está em risco imediato, ligue agora:</p>
            <div class="emergency-buttons">
                <a href="tel:190" class="emergency-btn">190 - Polícia</a>
                <a href="tel:180" class="emergency-btn">180 - Atendimento</a>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="close-btn">Fechar</button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .emergency-alert-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .emergency-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            cursor: pointer;
        }
        
        .emergency-alert {
            background: #dc2626;
            color: white;
            padding: 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            max-width: 400px;
            text-align: center;
            position: relative;
            z-index: 10000;
        }
        
        .emergency-alert h4 {
            margin: 0 0 16px 0;
            color: white;
            font-size: 18px;
        }
        
        .emergency-alert p {
            margin: 0 0 20px 0;
        }
        
        .emergency-buttons {
            margin: 16px 0;
            display: flex;
            gap: 12px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        .emergency-btn {
            display: inline-block;
            background: white;
            color: #dc2626;
            padding: 12px 20px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: bold;
            transition: transform 0.2s;
        }
        
        .emergency-btn:hover {
            transform: scale(1.05);
        }
        
        .close-btn {
            background: none;
            border: 1px solid white;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-top: 12px;
            transition: background-color 0.2s;
        }
        
        .close-btn:hover {
            background: rgba(255,255,255,0.1);
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(alertContainer);
}

// Mobile menu functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.header__nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            const isVisible = nav.style.display === 'flex';
            nav.style.display = isVisible ? 'none' : 'flex';
            
            // Update icon
            const icon = this.querySelector('i');
            if (isVisible) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking nav links
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.style.display = 'none';
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                nav.style.display = 'none';
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Header scroll effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', updateHeader);
}

// Emergency button highlight effect
function initEmergencyHighlight() {
    const emergencyButtons = document.querySelectorAll('a[href="tel:190"], a[href="tel:180"]');
    
    // Add pulse keyframes
    if (!document.querySelector('#pulse-keyframes')) {
        const style = document.createElement('style');
        style.id = 'pulse-keyframes';
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            .pulse-animation {
                animation: pulse 1s infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    emergencyButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse-animation');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse-animation');
        });
    });
}

// Accessibility improvements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.id = 'main';
        heroSection.setAttribute('role', 'main');
    }
    
    // Improve focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open alerts
            const alertContainer = document.querySelector('.emergency-alert-container');
            if (alertContainer) {
                alertContainer.remove();
            }
        }
    });
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Analytics tracking placeholder
function trackEvent(category, action, label) {
    console.log(`Analytics Event: ${category} - ${action} - ${label}`);
}

// Track important interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    
    // Track emergency calls
    if (target.href && (target.href.includes('tel:190') || target.href.includes('tel:180'))) {
        trackEvent('Emergency', 'Call', target.href.replace('tel:', ''));
        showNotification('Conectando com atendimento de emergência...', 'info');
    }
    
    // Track help channel clicks
    if (target.closest('.help-card') && target.href && target.href.startsWith('tel:')) {
        trackEvent('Help', 'Channel_Call', target.textContent.trim());
    }
    
    // Track violence type expansion
    if (target.closest('.violence-card')) {
        const violenceType = target.closest('.violence-card').querySelector('h3')?.textContent || 'Unknown';
        trackEvent('Education', 'Violence_Type_Expand', violenceType);
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    showNotification('Ocorreu um erro. Recarregue a página se necessário.', 'error');
});

// Prevent form resubmission on page reload
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// Initialize smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add loading protection
window.addEventListener('beforeunload', function() {
    // Clean up any intervals or ongoing processes
    document.querySelectorAll('.btn--loading').forEach(btn => {
        btn.classList.remove('btn--loading');
        btn.disabled = false;
    });
});