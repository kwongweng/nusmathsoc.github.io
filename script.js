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
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Validate form data
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create response object
    const response = {
        id: generateId(),
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
        dateFormatted: new Date().toLocaleString()
    };
    
    // Store the response
    try {
        storeFormResponse(response);
        alert(`Thank you, ${name}! Your message has been received and stored. We'll get back to you at ${email} soon.`);
        
        // Reset form
        event.target.reset();
    } catch (error) {
        console.error('Error storing form response:', error);
        alert('There was an error saving your message. Please try again.');
    }
}

// Generate unique ID for each response
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Store form response in localStorage
function storeFormResponse(response) {
    const storageKey = 'mathsoc_contact_responses';
    
    // Get existing responses
    let responses = [];
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            responses = JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error reading stored responses:', error);
        responses = [];
    }
    
    // Add new response
    responses.push(response);
    
    // Store back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(responses));
    
    console.log('Form response stored successfully:', response);
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

    /* Admin interface styles */
    .admin-interface {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 10000;
        padding: 20px;
        overflow-y: auto;
        color: white;
    }
    
    .admin-content {
        max-width: 1200px;
        margin: 0 auto;
        background: #1a1a1a;
        padding: 20px;
        border-radius: 10px;
    }
    
    .admin-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid #333;
        padding-bottom: 20px;
    }
    
    .admin-header h2 {
        color: #4CAF50;
        margin: 0;
    }
    
    .admin-actions {
        display: flex;
        gap: 10px;
    }
    
    .admin-btn {
        background: #4CAF50;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
    }
    
    .admin-btn:hover {
        background: #45a049;
    }
    
    .admin-btn.danger {
        background: #f44336;
    }
    
    .admin-btn.danger:hover {
        background: #da190b;
    }
    
    .response-card {
        background: #2a2a2a;
        margin-bottom: 15px;
        padding: 15px;
        border-radius: 8px;
        border-left: 4px solid #4CAF50;
    }
    
    .response-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }
    
    .response-meta {
        font-size: 0.9em;
        color: #ccc;
    }
    
    .response-id {
        font-family: monospace;
        font-size: 0.8em;
        color: #888;
    }
    
    .response-message {
        margin-top: 10px;
        line-height: 1.5;
        white-space: pre-wrap;
    }
    
    .no-responses {
        text-align: center;
        color: #888;
        font-style: italic;
        padding: 40px;
    }
`;
document.head.appendChild(style);

// Admin interface functionality
function checkAdminAccess() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'mathsoc2025') {
        showAdminInterface();
    }
}

function showAdminInterface() {
    const responses = getStoredResponses();
    
    const adminHTML = `
        <div class="admin-interface" id="admin-interface">
            <div class="admin-content">
                <div class="admin-header">
                    <h2>📧 Contact Form Responses (${responses.length})</h2>
                    <div class="admin-actions">
                        <button class="admin-btn" onclick="exportResponses()">📊 Export CSV</button>
                        <button class="admin-btn danger" onclick="clearAllResponses()">🗑️ Clear All</button>
                        <button class="admin-btn" onclick="closeAdminInterface()">✕ Close</button>
                    </div>
                </div>
                <div class="responses-container">
                    ${responses.length === 0 ? 
                        '<div class="no-responses">No responses yet.</div>' :
                        responses.map(response => createResponseCard(response)).join('')
                    }
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', adminHTML);
}

function createResponseCard(response) {
    return `
        <div class="response-card">
            <div class="response-header">
                <div>
                    <strong>${escapeHtml(response.name)}</strong> &lt;${escapeHtml(response.email)}&gt;
                </div>
                <div class="response-meta">
                    ${response.dateFormatted}
                </div>
            </div>
            <div class="response-id">ID: ${response.id}</div>
            <div class="response-message">${escapeHtml(response.message)}</div>
        </div>
    `;
}

function getStoredResponses() {
    const storageKey = 'mathsoc_contact_responses';
    try {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            return JSON.parse(stored).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        }
    } catch (error) {
        console.error('Error reading stored responses:', error);
    }
    return [];
}

function exportResponses() {
    const responses = getStoredResponses();
    if (responses.length === 0) {
        alert('No responses to export.');
        return;
    }
    
    // Create CSV content
    const headers = ['ID', 'Name', 'Email', 'Message', 'Date'];
    const csvContent = [
        headers.join(','),
        ...responses.map(response => [
            response.id,
            `"${response.name.replace(/"/g, '""')}"`,
            response.email,
            `"${response.message.replace(/"/g, '""')}"`,
            response.dateFormatted
        ].join(','))
    ].join('\n');
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mathsoc-contact-responses-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}

function clearAllResponses() {
    if (confirm('Are you sure you want to clear all contact form responses? This action cannot be undone.')) {
        localStorage.removeItem('mathsoc_contact_responses');
        alert('All responses have been cleared.');
        closeAdminInterface();
    }
}

function closeAdminInterface() {
    const adminInterface = document.getElementById('admin-interface');
    if (adminInterface) {
        adminInterface.remove();
    }
    
    // Remove admin parameter from URL without refreshing
    const url = new URL(window.location);
    url.searchParams.delete('admin');
    window.history.replaceState({}, '', url);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize admin interface if accessed with admin parameter
document.addEventListener('DOMContentLoaded', checkAdminAccess);

// Initialize animations on load
document.addEventListener('DOMContentLoaded', animateOnScroll);