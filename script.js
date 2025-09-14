// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active navigation link highlighting
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Set initial active link

    // Load and display events
    loadEvents();

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleFormSubmit);
});

// Sample events data - In a real application, this would come from a backend API or CMS
const eventsData = [
    {
        id: 1,
        title: "LaTeX Workshop Stage 1 - Basics: Document 📄",
        description: "Learn LaTeX fundamentals: document structure, math, tables, and referencing — perfect for reports and assignments.",
        date: "2025-09-15",
        time: "7:00 PM - 9:00 PM",
        location: "S17 04-06",
        url: "https://nus.campuslabs.com/engage/submitter/form/start/696279"
    },
    {
        id: 2,
        title: "LaTeX Workshop Stage 2 - Basics: Presentation 🧮",
        description: "Design polished slides with Beamer: layouts, overlays, visuals, and equations.",
        date: "2025-10-06",
        time: "7:00 PM - 9:00 PM",
        location: "S17 04-06",
        url: "https://nus.campuslabs.com/engage/submitter/form/start/696371"
        
    },
    {
        id: 3,
        title: "LaTeX Workship Stage 3 - Advanced: Typesetting & Visualisation 📊",
        description: "Master TikZ and PGFPlots, customise environments for theorems, proofs, and structured layouts.",
        date: "2025-10-27",
        time: "7:00 PM - 9:00 PM",
        location: "S17 04-06",
        url: "https://nus.campuslabs.com/engage/submitter/form/start/696372"
    },
    {
        id: 4,
        title: "🧩 NUS Cubing: Beginner Workshop! 🎉",
        description: "Ever stared at a Rubik's Cube and wondered “how on earth do I solve this? 🤯\n Join us and solve your first cube — guaranteed! 🚀 No experience needed, just curiosity and a cube in your hands!",
        date: "2025-09-18",
        time: "6:00 PM - 8:00 PM",
        location: "S17 04-04",
        url: "https://forms.cloud.microsoft/r/Gw42DvQP1i"
    },
];

function loadEvents() {
    const eventsContainer = document.getElementById('events-container');
    const noEventsElement = document.getElementById('no-events');
    
    // Filter events to show only upcoming ones
    const today = new Date();
    const upcomingEvents = eventsData.filter(event => new Date(event.date) >= today);
    
    if (upcomingEvents.length === 0) {
        noEventsElement.style.display = 'block';
        return;
    }
    
    // Sort events by date
    upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Create event cards
    eventsContainer.innerHTML = upcomingEvents.map(event => {
        // Use event.url or event.link for the hyperlink
        const titleHtml = event.url
            ? `<a href="${event.url}" target="_blank" rel="noopener noreferrer">${event.title}</a>`
            : event.title;
        return `
            <div class="event-card">
                <div class="event-date">${formatDate(event.date)}</div>
                <h3>${titleHtml}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span>🕒 ${event.time}</span>
                    <span>📍 ${event.location}</span>
                </div>
            </div>
        `;
    }).join('');
}

function formatDate(dateString) {
    const options = { 
        weekday: 'short', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const name = formData.get('name') || event.target.querySelector('input[type="text"]').value;
    const email = formData.get('email') || event.target.querySelector('input[type="email"]').value;
    const message = formData.get('message') || event.target.querySelector('textarea').value;
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);
    
    // Reset form
    event.target.reset();
}

// Smooth scrolling for navigation links (fallback for older browsers)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.about-card, .event-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .about-card, .event-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .about-card.animate, .event-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', animateOnScroll);