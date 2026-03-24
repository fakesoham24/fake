// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // revealOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to sections
    const sections = document.querySelectorAll('section, .project-card, .skill-category');
    sections.forEach(section => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "all 0.8s ease-out";
        revealOnScroll.observe(section);
    });

    // Custom visible class logic for the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    sections.forEach(el => observer.observe(el));

    // Simple Form Submission Feedback
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.style.opacity = '0.7';

            // Simulate API call
            setTimeout(() => {
                alert('Thank you! Your message has been sent (simulation).');
                btn.textContent = originalText;
                btn.style.opacity = '1';
                contactForm.reset();
            }, 1500);
        });
    }

    // Smooth scroll for nav links (already handled by CSS, but good for JS fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
