// Main JavaScript for Gridam Tech Clone

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.createElement('div');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const menuClose = document.createElement('div');
    menuClose.className = 'menu-close';
    menuClose.innerHTML = '<i class="fas fa-times"></i>';
    
    const navMenu = document.querySelector('.nav-menu');
    const headerWrap = document.querySelector('.header-wrap');
    
    if (window.innerWidth < 992) {
        headerWrap.appendChild(mobileMenuToggle);
        navMenu.appendChild(menuClose);
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth < 992 && !document.querySelector('.mobile-menu-toggle')) {
            headerWrap.appendChild(mobileMenuToggle);
            navMenu.appendChild(menuClose);
        } else if (window.innerWidth >= 992) {
            if (document.querySelector('.mobile-menu-toggle')) {
                document.querySelector('.mobile-menu-toggle').remove();
            }
            if (document.querySelector('.menu-close')) {
                document.querySelector('.menu-close').remove();
            }
            navMenu.classList.remove('active');
        }
    });
    
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.add('active');
    });
    
    menuClose.addEventListener('click', function() {
        navMenu.classList.remove('active');
    });
    
    // Submenu Toggle
    const hasSubmenu = document.querySelectorAll('.main-menu li a:not(:only-child)');
    
    hasSubmenu.forEach(function(item) {
        const submenuToggle = document.createElement('span');
        submenuToggle.className = 'submenu-toggle';
        submenuToggle.innerHTML = '<i class="fas fa-angle-down"></i>';
        item.appendChild(submenuToggle);
        
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // Header Scroll
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Hero Section Service Boxes Animation
    const serviceBoxes = document.querySelectorAll('.service-box-item');
    
    if (serviceBoxes.length > 0) {
        // Add entrance animation
        serviceBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('animated');
            }, 200 * index);
            
            // Add hover effect
            box.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            box.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
    }
    
    // Service Box Hover Effects
    const serviceBoxes2 = document.querySelectorAll('.service-box');
    
    if (serviceBoxes2.length > 0) {
        serviceBoxes2.forEach(box => {
            box.addEventListener('mouseenter', () => {
                // Reset all boxes
                serviceBoxes2.forEach(otherBox => {
                    if (otherBox !== box) {
                        otherBox.style.flex = '1';
                        otherBox.style.opacity = '0.5';
                    }
                });
                
                // Expand current box
                box.style.flex = '3';
                box.style.opacity = '1';
            });
            
            box.addEventListener('mouseleave', () => {
                // Reset all boxes
                serviceBoxes2.forEach(otherBox => {
                    otherBox.style.flex = '1';
                    otherBox.style.opacity = '1';
                });
            });
        });
        
        // Add click handler for mobile devices
        serviceBoxes2.forEach(box => {
            box.addEventListener('click', function(e) {
                if (window.innerWidth <= 991) {
                    const content = this.querySelector('.expanded-content');
                    const isExpanded = content.style.opacity === '1';
                    
                    // Reset all boxes
                    serviceBoxes2.forEach(otherBox => {
                        const otherContent = otherBox.querySelector('.expanded-content');
                        otherContent.style.opacity = '0';
                        otherContent.style.visibility = 'hidden';
                        otherBox.style.backgroundColor = '';
                    });
                    
                    if (!isExpanded) {
                        content.style.opacity = '1';
                        content.style.visibility = 'visible';
                        this.style.backgroundColor = 'var(--secondary-color)';
                    }
                }
            });
        });
    }
    
    // Portfolio Filtering
    const portfolioFilter = document.querySelector('.portfolio-filter');
    if (portfolioFilter) {
        const filterItems = portfolioFilter.querySelectorAll('li');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterItems.forEach(item => {
            item.addEventListener('click', function() {
                // Remove active class from all filter items
                filterItems.forEach(filter => filter.classList.remove('active'));
                
                // Add active class to clicked filter
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(portfolioItem => {
                    if (filterValue === '*') {
                        portfolioItem.style.display = 'block';
                    } else if (portfolioItem.classList.contains(filterValue.replace('.', ''))) {
                        portfolioItem.style.display = 'block';
                    } else {
                        portfolioItem.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Portfolio Item Hover Effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.portfolio-overlay');
            if (overlay) {
                overlay.style.transform = 'translateY(100%)';
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Here you would typically send the data to a server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted with values:', formValues);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Scroll Animation
    const animatedElements = document.querySelectorAll('.fade-in-element');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            if ((elementBottomPosition >= windowTopPosition) && (elementTopPosition <= windowBottomPosition)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add animation class to elements
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check elements on load and scroll
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Add smooth scrolling to all links
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if the href is not just "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Info Boxes Animation
    const infoBoxes = document.querySelectorAll('.info-box');
    
    if (infoBoxes.length > 0) {
        infoBoxes.forEach(box => {
            const content = box.querySelector('.info-box-content');
            const header = box.querySelector('.info-box-header');
            
            // Get content height for smooth animation
            function getContentHeight() {
                content.style.height = 'auto';
                content.style.opacity = '1';
                const height = content.offsetHeight;
                content.style.height = '0';
                content.style.opacity = '0';
                return height;
            }
            
            // Store original height
            const contentHeight = getContentHeight();
            
            // Add hover effects
            box.addEventListener('mouseenter', () => {
                content.style.height = contentHeight + 'px';
                content.style.opacity = '1';
                content.style.padding = '0 30px 30px';
            });
            
            box.addEventListener('mouseleave', () => {
                content.style.height = '0';
                content.style.opacity = '0';
                content.style.padding = '0 30px';
            });
            
            // Add click handler for mobile
            header.addEventListener('click', (e) => {
                const isExpanded = content.style.height !== '0px';
                
                // Close all other boxes
                infoBoxes.forEach(otherBox => {
                    if (otherBox !== box) {
                        const otherContent = otherBox.querySelector('.info-box-content');
                        otherContent.style.height = '0';
                        otherContent.style.opacity = '0';
                        otherContent.style.padding = '0 30px';
                    }
                });
                
                // Toggle current box
                if (!isExpanded) {
                    content.style.height = contentHeight + 'px';
                    content.style.opacity = '1';
                    content.style.padding = '0 30px 30px';
                } else {
                    content.style.height = '0';
                    content.style.opacity = '0';
                    content.style.padding = '0 30px';
                }
            });
        });
    }
});
