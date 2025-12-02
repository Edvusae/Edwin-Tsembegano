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