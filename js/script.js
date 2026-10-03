/**
 * THE CONFIDENT YOU — MASTER LANDING PAGE CONTROLLER
 * Comprehensive, lightweight, accessible JavaScript
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. CENTRALIZED CHECKOUT & PURCHASE CONFIGURATION (Sections 1, 2, 43)
  // ==========================================================================
  // Replace these variables with your actual checkout/payment links when ready.
  // When you update BOOK_PURCHASE_URL, every primary CTA button updates automatically.
  const BOOK_PURCHASE_URL = "https://superprofile.bio/vp/the-confident-you--female-weight-loss-guide";

  // Language-specific purchase links (if separate checkout links are used):
  const ENGLISH_BOOK_URL = "https://superprofile.bio/vp/the-confident-you--female-weight-loss-guide";
  const HINDI_BOOK_URL = "https://superprofile.bio/vp/the-confident-you--female-weight-loss-guide";

  // ==========================================================================
  // 2. PRICING & GUARANTEE CONFIGURATION (Section 25 & 26)
  // ==========================================================================
  const PRICING_CONFIG = {
    CURRENCY_SYMBOL: "₹",    // e.g. '₹' for INR or '$' for USD
    PRICE_REGULAR: "999",     // Regular catalog price
    PRICE_AMOUNT: "299",      // Limited-time launch offer price
    SAVINGS_AMOUNT: "700",    // Save ₹700
    DISCOUNT_PERCENT: "70%",  // 70% discount
    SHOW_GUARANTEE: false     // Set to true when guarantee details are finalized
  };

  // ==========================================================================
  // 3. IMAGE ASSET CONFIGURATION (Section 38)
  // ==========================================================================
  const IMAGE_CONFIG = {
    BOOK_COVER_FULL: "assets/images/book-cover-full.jpg",
    BOOK_COVER_FRONT: "assets/images/book-cover-front.jpg",
    BOOK_SPINE: "assets/images/book-spine.jpg",
    BOOK_COVER_BACK: "assets/images/book-cover-back.jpg"
  };

  // ==========================================================================
  // 4. CTA ROUTING & BUTTON SYNC
  // ==========================================================================
  function initCTALinks() {
    // 1. Primary purchase buttons
    const primaryCTAs = document.querySelectorAll('.btn-cta:not([data-lang-target])');
    primaryCTAs.forEach(btn => {
      btn.href = BOOK_PURCHASE_URL;
      
      // If purchase URL is still placeholder '#', smoothly scroll to the pricing/offer card
      btn.addEventListener('click', function (e) {
        if (BOOK_PURCHASE_URL === '#' || BOOK_PURCHASE_URL.trim() === '') {
          e.preventDefault();
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // 2. Language-specific buttons
    const langButtons = document.querySelectorAll('[data-lang-target]');
    langButtons.forEach(btn => {
      const target = btn.getAttribute('data-lang-target');
      if (target === 'en') {
        btn.href = ENGLISH_BOOK_URL;
        btn.addEventListener('click', function (e) {
          if (ENGLISH_BOOK_URL === '#' || ENGLISH_BOOK_URL.trim() === '') {
            e.preventDefault();
            const pricing = document.getElementById('pricing');
            if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
          }
        });
      } else if (target === 'hi') {
        btn.href = HINDI_BOOK_URL;
        btn.addEventListener('click', function (e) {
          if (HINDI_BOOK_URL === '#' || HINDI_BOOK_URL.trim() === '') {
            e.preventDefault();
            const pricing = document.getElementById('pricing');
            if (pricing) pricing.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    });
  }

  // ==========================================================================
  // 5. PRICING & GUARANTEE SETUP
  // ==========================================================================
  function initPricing() {
    const currencyEl = document.getElementById('price-currency');
    const amountEl = document.getElementById('price-amount');
    const regularEl = document.getElementById('price-regular');
    const guaranteeBox = document.getElementById('guarantee-container');

    if (currencyEl) currencyEl.textContent = PRICING_CONFIG.CURRENCY_SYMBOL;
    if (amountEl) amountEl.textContent = PRICING_CONFIG.PRICE_AMOUNT;
    if (regularEl) regularEl.textContent = PRICING_CONFIG.PRICE_REGULAR;

    if (guaranteeBox && PRICING_CONFIG.SHOW_GUARANTEE) {
      guaranteeBox.style.display = 'block';
    }
  }

  // ==========================================================================
  // 6. FAQ ACCORDION (Section 27)
  // ==========================================================================
  function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other opened FAQs for clean, single-open experience
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle clicked FAQ
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================================================
  // 7. BOOK INTERIOR PREVIEW FILTER & LIGHTBOX (Section 16)
  // ==========================================================================
  function initPreviewGallery() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const previewCards = document.querySelectorAll('.preview-card');
    
    // Lightbox modal elements (for unlocked pages)
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');



    // 1. Tab Filtering (shows exactly 4 cards for the active tab)
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        previewCards.forEach(card => {
          const cardTab = card.getAttribute('data-tab');
          if (cardTab === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // 2. Unlocked Page Click -> Open Lightbox
    const unlockedCards = document.querySelectorAll('.unlocked-card');
    unlockedCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.preview-img-container img');
        const title = card.querySelector('.page-title');
        const meta = card.querySelector('.page-meta');

        if (img && lightboxModal && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          if (lightboxCaption && title && meta) {
            lightboxCaption.textContent = `${meta.textContent} — ${title.textContent}`;
          }
          lightboxModal.classList.add('active');
          lightboxModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // 3. Locked Page Click -> Direct CTA Action (No extra popup)
    const lockedCards = document.querySelectorAll('.locked-card');
    lockedCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        if (BOOK_PURCHASE_URL && BOOK_PURCHASE_URL !== '#' && BOOK_PURCHASE_URL.trim() !== '') {
          window.location.href = BOOK_PURCHASE_URL;
        } else {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });

    // Lightbox Modal Close Functions
    function closeAllModals() {
      if (lightboxModal) {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
      }
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeAllModals);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeAllModals);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  // ==========================================================================
  // 8. MOBILE NAVIGATION & STICKY CTA (Section 8 & 30)
  // ==========================================================================
  function initMobileUI() {
    const navToggle = document.getElementById('nav-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const stickyBar = document.getElementById('sticky-mobile-bar');
    const heroSection = document.getElementById('hero');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.contains('open');
        mainNav.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', !isOpen);
      });

      // Close menu when any nav link or CTA button inside drawer is clicked
      const drawerLinks = mainNav.querySelectorAll('a');
      drawerLinks.forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Sticky mobile bar on scroll
    if (stickyBar && heroSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // If hero is NOT intersecting (scrolled past), show sticky bar
          if (!entry.isIntersecting) {
            stickyBar.classList.add('visible');
          } else {
            stickyBar.classList.remove('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      observer.observe(heroSection);
    }
  }

  // ==========================================================================
  // 9. AUTOMATIC COPYRIGHT YEAR
  // ==========================================================================
  function initCopyright() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // ==========================================================================
  // INITIALIZE ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initCTALinks();
    initPricing();
    initFAQ();
    initPreviewGallery();
    initMobileUI();
    initCopyright();
  });

})();
