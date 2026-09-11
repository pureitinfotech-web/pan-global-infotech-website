/**
 * PAN GLOBAL INFOTECH - CLIENT INTERACTIONS & CONFIGURATOR
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Footer Year
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar with Elevation Effect
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    // Close menu when link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // 4. Smooth Active Navigation Highlighting
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinksList = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNavLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // 5. Interactive Solution & Quote Configurator
  const categoryOptions = {
    "Hardware Sales": [
      "Commercial Laptops & MacBooks (HP, Dell, Lenovo, Apple)",
      "High-Performance Desktops & Workstations",
      "Enterprise Servers & Centralized NAS Storage",
      "Cisco/D-Link Managed Switches, Routers & Firewalls",
      "Office Laser Printers & Surveillance CCTV Setup"
    ],
    "Hardware Repair & AMC": [
      "Comprehensive Annual Maintenance Contract (AMC) for Office",
      "Chip-Level Motherboard & Laptop Repair (Power/Display/Spill)",
      "Emergency On-Site Hardware & Network Troubleshooting",
      "Safe HDD/SSD Data Recovery & Ultra-Fast NVMe Upgrades",
      "Routine Preventive Hardware Health Check & Servicing"
    ],
    "Software Sales (Licenses)": [
      "Microsoft Windows 11 Pro & Windows Server CALs",
      "Microsoft 365 Business Standard / Enterprise Suites",
      "Seqrite / Quick Heal / Kaspersky Endpoint Antivirus",
      "TallyPrime Multi-User & Cloud Accounting Licenses",
      "Adobe Creative Cloud & Productivity Tool Licenses"
    ],
    "Custom Software Development": [
      "Custom Enterprise Resource Planning (ERP) Software",
      "Custom Customer Relationship Management (CRM) Tool",
      "Custom GST-Compliant Invoicing & Inventory Management",
      "Bespoke Client Portals, Web Applications & Dashboards",
      "Workflow Automation, API Integration & Mobile Web App"
    ]
  };

  const categoryInputs = document.querySelectorAll('input[name="itCategory"]');
  const serviceDetailSelect = document.getElementById('serviceDetailSelect');
  const scaleInputs = document.querySelectorAll('input[name="scale"]');
  const summaryTitle = document.getElementById('summaryTitle');
  const summarySub = document.getElementById('summarySub');
  const sendConfigWhatsApp = document.getElementById('sendConfigWhatsApp');
  const configToFormBtn = document.getElementById('configToFormBtn');

  function populateServiceDetails(category) {
    if (!serviceDetailSelect) return;
    serviceDetailSelect.innerHTML = '';
    const options = categoryOptions[category] || [];
    options.forEach(opt => {
      const optionElem = document.createElement('option');
      optionElem.value = opt;
      optionElem.textContent = opt;
      serviceDetailSelect.appendChild(optionElem);
    });
    updateEstimateSummary();
  }

  function getSelectedCategory() {
    const checked = document.querySelector('input[name="itCategory"]:checked');
    return checked ? checked.value : "Hardware Sales";
  }

  function getSelectedScale() {
    const checked = document.querySelector('input[name="scale"]:checked');
    return checked ? checked.value : "1 - 5 Units / Startup";
  }

  function updateEstimateSummary() {
    const cat = getSelectedCategory();
    const detail = serviceDetailSelect ? serviceDetailSelect.value : "";
    const scale = getSelectedScale();

    if (summaryTitle) {
      summaryTitle.textContent = `${cat} (${scale})`;
    }
    if (summarySub) {
      summarySub.textContent = `Selected Requirement: ${detail}. Authorized warranty & direct engineer consultation from Mulund HQ.`;
    }
  }

  // Handle Category Radio Changes
  categoryInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      document.querySelectorAll('.pill-option').forEach(p => p.classList.remove('active'));
      e.target.closest('.pill-option').classList.add('active');
      populateServiceDetails(e.target.value);
    });
  });

  // Handle Scale Radio Changes
  scaleInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      document.querySelectorAll('.scale-pill').forEach(p => p.classList.remove('active'));
      e.target.closest('.scale-pill').classList.add('active');
      updateEstimateSummary();
    });
  });

  if (serviceDetailSelect) {
    serviceDetailSelect.addEventListener('change', updateEstimateSummary);
  }

  // Initial population
  populateServiceDetails("Hardware Sales");

  // Configurator WhatsApp Button
  if (sendConfigWhatsApp) {
    sendConfigWhatsApp.addEventListener('click', () => {
      const cat = getSelectedCategory();
      const detail = serviceDetailSelect ? serviceDetailSelect.value : "";
      const scale = getSelectedScale();

      const message = `Hello Pan Global Infotech,\nI would like to inquire about an IT solution:\n\n• Category: ${cat}\n• Requirement: ${detail}\n• Scale: ${scale}\n\nPlease share quotation, brand options, and consultation details.`;
      const encodedMsg = encodeURIComponent(message);
      window.open(`https://wa.me/917021478955?text=${encodedMsg}`, '_blank');
    });
  }

  // Auto-fill Contact Form from Configurator
  if (configToFormBtn) {
    configToFormBtn.addEventListener('click', () => {
      const cat = getSelectedCategory();
      const detail = serviceDetailSelect ? serviceDetailSelect.value : "";
      const scale = getSelectedScale();

      const interestSelect = document.getElementById('interestCategory');
      const messageText = document.getElementById('messageText');

      if (interestSelect) {
        if (cat.includes("Hardware Sales")) {
          interestSelect.value = "Hardware Sales (Laptops, Desktops, Servers)";
        } else if (cat.includes("Repair")) {
          interestSelect.value = "Hardware Repair & AMC Maintenance";
        } else if (cat.includes("Software Sales")) {
          interestSelect.value = "Software Sales (OS, Office 365, Antivirus)";
        } else if (cat.includes("Custom Software")) {
          interestSelect.value = "Custom Software Development (ERP, Billing, Web App)";
        }
      }

      if (messageText) {
        messageText.value = `Requirement: ${detail}\nEstimated Scale: ${scale}`;
      }
    });
  }

  // 6. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');
  const sendDirectWhatsAppBtn = document.getElementById('sendDirectWhatsAppBtn');

  function validateContactForm() {
    let isValid = true;
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('emailAddress');
    const categoryInput = document.getElementById('interestCategory');

    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');

    // Reset errors
    if (nameError) nameError.textContent = '';
    if (phoneError) phoneError.textContent = '';
    if (emailError) emailError.textContent = '';

    if (!nameInput.value.trim()) {
      if (nameError) nameError.textContent = 'Please enter your name or company name.';
      isValid = false;
    }

    const phoneDigits = phoneInput.value.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit mobile number.';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!categoryInput.value) {
      categoryInput.focus();
      isValid = false;
    }

    return isValid;
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateContactForm()) {
        return;
      }

      const name = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phoneNumber').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const category = document.getElementById('interestCategory').value;
      const message = document.getElementById('messageText').value.trim();

      // Show success feedback
      if (formFeedback) {
        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `<strong>Thank you, ${name}!</strong> Your inquiry regarding <em>${category}</em> has been recorded. Our IT consulting team will contact you at <strong>${phone}</strong> shortly.`;
        formFeedback.classList.remove('hidden');
      }

      // Reset form
      contactForm.reset();

      // Auto hide after 8s
      setTimeout(() => {
        if (formFeedback) formFeedback.classList.add('hidden');
      }, 8000);
    });
  }

  // Direct WhatsApp Button inside form
  if (sendDirectWhatsAppBtn) {
    sendDirectWhatsAppBtn.addEventListener('click', () => {
      const name = document.getElementById('fullName').value.trim() || "Visitor";
      const phone = document.getElementById('phoneNumber').value.trim();
      const email = document.getElementById('emailAddress').value.trim();
      const category = document.getElementById('interestCategory').value || "General IT Inquiry";
      const message = document.getElementById('messageText').value.trim();

      let text = `Hello Pan Global Infotech,\n\n*Name/Company:* ${name}\n*Category:* ${category}`;
      if (phone) text += `\n*Contact Phone:* ${phone}`;
      if (email) text += `\n*Email:* ${email}`;
      if (message) text += `\n*Details:* ${message}`;

      const encoded = encodeURIComponent(text);
      window.open(`https://wa.me/917021478955?text=${encoded}`, '_blank');
    });
  }
});
