/**
 * Navigation functionality
 * Handles scroll effects, mobile menu, and search functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const header = document.getElementById('main-header');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const searchToggle = document.querySelector('.search-toggle');
  const searchForm = document.querySelector('.search-form');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  // Check if we're on the homepage
  const isHomePage = document.querySelector('.hero') !== null;
  
  // Set initial header style based on page
  if (isHomePage) {
    header.classList.add('transparent');
  }
  
  // Handle scroll effects
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    // Add scrolled class when scrolled down
    if (scrollPosition > 50) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      // Only add transparent class back on homepage
      if (isHomePage) {
        header.classList.add('transparent');
      }
    }
  });
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Prevent body scrolling when menu is open
    if (mobileMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
  
  // Close mobile menu when clicking a link
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Search form toggle
  searchToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    searchForm.classList.toggle('active');
    
    // Focus input when search is opened
    if (searchForm.classList.contains('active')) {
      setTimeout(() => {
        searchForm.querySelector('input').focus();
      }, 100);
    }
  });
  
  // Close search form when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchForm.contains(e.target) && e.target !== searchToggle) {
      searchForm.classList.remove('active');
    }
  });
  
  // Prevent form submission closing when clicking inside
  searchForm.addEventListener('click', (e) => {
    e.stopPropagation();
  });
  
  // Handle smooth scrolling for navigation links
  function smoothScroll(target) {
    const element = document.querySelector(target);
    if (!element) return;
    
    const headerHeight = header.offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
  
  // Add smooth scroll to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        smoothScroll(href);
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  
  // Add smooth scroll to mobile nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle anchor links
      if (href.startsWith('#')) {
        e.preventDefault();
        smoothScroll(href);
        
        // Update active state
        mobileNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  
  // Update active nav link on scroll
  function updateActiveLink() {
    const scrollPosition = window.scrollY;
    
    // Find all sections
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - header.offsetHeight - 100; // Offset for better UX
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        // Update desktop nav
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        
        // Update mobile nav
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Update active link on scroll
  window.addEventListener('scroll', updateActiveLink);
  
  // Run once on page load
  updateActiveLink();
  
  // Add cart functionality (simplified for demo)
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');
  let count = parseInt(cartCount.textContent);
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      count++;
      cartCount.textContent = count;
      
      // Add animation
      cartCount.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.5)' },
        { transform: 'scale(1)' }
      ], {
        duration: 300,
        easing: 'ease-in-out'
      });
      
      // Show added to cart message
      const product = button.closest('.product-card');
      const productName = product.querySelector('h3').textContent;
      
      const notification = document.createElement('div');
      notification.className = 'notification';
      notification.textContent = `${productName} added to cart`;
      document.body.appendChild(notification);
      
      // Remove notification after 3 seconds
      setTimeout(() => {
        notification.remove();
      }, 3000);
    });
  });
});