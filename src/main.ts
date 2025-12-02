// src/main.ts

// 1. Mobile Menu Toggle Implementation
// We use interfaces/types to define the shape of DOM elements we expect
interface MenuToggleElements {
    button: HTMLButtonElement | null;
    menu: HTMLDivElement | null;
}

const getMenuElements = (): MenuToggleElements => ({
    button: document.getElementById('mobile-menu-button') as HTMLButtonElement,
    menu: document.getElementById('mobile-menu') as HTMLDivElement,
});

const setupMobileMenu = (): void => {
    const { button, menu } = getMenuElements();
    
    if (button && menu) {
        button.addEventListener('click', () => {
            // Toggles the visibility of the menu (Tailwind utility class)
            menu.classList.toggle('hidden'); 
            
            // Toggles the aria-expanded attribute for accessibility
            const isMenuOpen = !menu.classList.contains('hidden');
            button.setAttribute('aria-expanded', isMenuOpen.toString());
        });
    }
    // Note: We need the HTML for the mobile menu button and div for this to work!
};

// 2. Scroll Animation Setup (Using Intersection Observer API for performance)
// This animates elements as they enter the viewport
const setupScrollAnimations = (): void => {
    // Define the selector for elements you want to animate on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element comes into view, reveal it by adding a class
                entry.target.classList.add('fade-in-up-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Options: start observing 10% before the element appears
        threshold: 0.1 
    });

    animatedElements.forEach(element => {
        // Apply a class to all elements you want to observe
        observer.observe(element);
    });
};

// 3. Application Entry Point (DOM Ready)
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupScrollAnimations();
    
    // Log for verification
    console.log("Elite Clean site initialized. Watchers running. TypeScript active.");
});

// src/main.ts

// ... (Existing functions: setupMobileMenu, setupScrollAnimations, setCurrentYear) ...

// Define an Interface for our form data—a crucial step in TypeScript!
interface QuoteFormData {
    name: string;
    email: string;
    phone: string;
    serviceType: 'Residential' | 'Commercial' | 'Specialized' | '';
    sqft: number | null;
    details: string;
}

// -------------------------------------------------------------------------
// FORM VALIDATION & HANDLING
// -------------------------------------------------------------------------

// Type-safe validation function
const validateForm = (data: QuoteFormData): boolean => {
    const messageElement = document.getElementById('form-message') as HTMLParagraphElement;
    messageElement.textContent = ''; // Clear previous messages

    if (data.name.trim().length < 2) {
        messageElement.textContent = "Please enter your full name.";
        return false;
    }
    
    // Simple email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        messageElement.textContent = "Please enter a valid email address.";
        return false;
    }

    if (data.serviceType === '') {
        messageElement.textContent = "Please select the type of cleaning service you need.";
        return false;
    }

    // Optional validation for square footage
    if (data.sqft !== null && data.sqft < 100) {
        messageElement.textContent = "Square footage must be realistic (min 100 sq ft).";
        return false;
    }

    return true; // Validation passed!
};


const handleQuoteSubmission = (event: Event): void => {
    event.preventDefault(); // Stop the default form submission

    const form = document.getElementById('quote-form') as HTMLFormElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;
    const serviceSelect = document.getElementById('serviceType') as HTMLSelectElement;
    const sqftInput = document.getElementById('sqft') as HTMLInputElement;
    const detailsTextarea = document.getElementById('details') as HTMLTextAreaElement;
    const messageElement = document.getElementById('form-message') as HTMLParagraphElement;

    // Compile data into the type-safe interface
    const formData: QuoteFormData = {
        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        serviceType: serviceSelect.value as QuoteFormData['serviceType'], // Type assertion for select value
        sqft: sqftInput.value ? parseInt(sqftInput.value) : null,
        details: detailsTextarea.value,
    };

    if (validateForm(formData)) {
        // Validation passed!
        messageElement.classList.remove('text-red-500');
        messageElement.classList.add('text-green-600');
        messageElement.textContent = "✅ Thank you! Your quote request has been sent successfully.";

        // In a real application, you would send formData to a server here (fetch/axios)
        console.log("Form Data to Send:", formData);
        
        // Reset the form after successful submission
        form.reset();
    }
};

const setupQuoteForm = (): void => {
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', handleQuoteSubmission);
    }
}


// 3. Application Entry Point (DOM Ready)
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupScrollAnimations();
    setCurrentYear();
    setupQuoteForm(); // <-- Add the new function call here
    
    console.log("Elite Clean site initialized. Watchers running. TypeScript active.");
});

// 4. Set Current Year in Footer