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
        title: "Mathematics Olympiad Workshop",
        description: "Join us for an intensive workshop on problem-solving techniques for mathematical olympiads. Suitable for all levels.",
        date: "2025-09-25",
        time: "2:00 PM - 5:00 PM",
        location: "Math Department Seminar Room",
        type: "Workshop"
    },
    {
        id: 2,
        title: "Guest Lecture: Applications of Topology",
        description: "Professor Jane Smith from MIT will discuss modern applications of topology in data science and machine learning.",
        date: "2025-10-02",
        time: "4:00 PM - 5:30 PM",
        location: "LT15, Science Block",
        type: "Lecture"
    },
    {
        id: 3,
        title: "Math Society Annual General Meeting",
        description: "Join us for our annual general meeting where we'll discuss society activities, elect new committee members, and plan for the year ahead.",
        date: "2025-10-10",
        time: "6:00 PM - 8:00 PM",
        location: "Math Department Conference Room",
        type: "Meeting"
    },
    {
        id: 4,
        title: "Study Group: Real Analysis",
        description: "Weekly study group for students taking real analysis. Collaborative problem-solving and peer learning.",
        date: "2025-10-15",
        time: "7:00 PM - 9:00 PM",
        location: "Math Department Study Room",
        type: "Study Group"
    },
    {
        id: 5,
        title: "Career Talk: Mathematics in Finance",
        description: "Industry professionals will share insights about careers in quantitative finance and mathematical modeling.",
        date: "2025-10-22",
        time: "3:00 PM - 4:30 PM",
        location: "Business School Auditorium",
        type: "Career Talk"
    }
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
    eventsContainer.innerHTML = upcomingEvents.map(event => `
        <div class="event-card">
            <div class="event-date">${formatDate(event.date)}</div>
            <h3>${event.title}</h3>
            <p>${event.description}</p>
            <div class="event-meta">
                <span>🕒 ${event.time}</span>
                <span>📍 ${event.location}</span>
                <span>📋 ${event.type}</span>
            </div>
        </div>
    `).join('');
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