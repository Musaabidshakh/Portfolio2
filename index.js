// =====================
// PROJECT DATA
// =====================
const myBestProjects = [
    {
        title: "BMI Calculator Web App",
        category: "javascript",
        description: "Real-time health calculator with instant results and dynamic feedback.",
        image: "https://picsum.photos/seed/bmi/600/400",
        github: "https://github.com/Musaabidshakh",
        live: "#"
    },
    {
        title: "Amazon Landing Page",
        category: "bootstrap",
        description: "Responsive e-commerce homepage clone with modern layout and Font Awesome icons.",
        image: "https://picsum.photos/seed/amazon/600/400",
        github: "https://github.com/Musaabidshakh",
        live: "#"
    },
    {
        title: "Portfolio UI",
        category: "ui-ux",
        description: "Modern UI/UX portfolio with clean structure and smooth animations.",
        image: "https://picsum.photos/seed/portfolio/600/400",
        github: "https://github.com/Musaabidshakh",
        live: "#"
    }
];

// =====================
// RENDER PROJECTS
// =====================
function renderProjects(filter = "all") {
    const container = document.getElementById("projects-container");
    if (!container) return;

    const filtered = filter === "all"
        ? myBestProjects
        : myBestProjects.filter(p => p.category === filter);

    if (filtered.length === 0) {
        container.innerHTML = `<p class="no-projects">No projects found.</p>`;
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="project-card">
            <div class="project-img-wrapper">
                <img src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="project-meta">
                <span class="project-category">${p.category}</span>
                <h3 class="project-title">${p.title}</h3>
                <p class="project-description">${p.description}</p>
                <div class="project-links">
                    <a class="link-icon" href="${p.github}" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i> Code
                    </a>
                    <a class="link-icon" href="${p.live}" target="_blank" rel="noopener">
                        <i class="fas fa-external-link-alt"></i> Live
                    </a>
                </div>
            </div>
        </div>
    `).join("");
}

// =====================
// FILTER BUTTONS
// =====================
document.addEventListener("DOMContentLoaded", () => {
    renderProjects();

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            renderProjects(btn.dataset.filter);
        });
    });
});

// =====================
// THEME TOGGLE
// =====================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    body.classList.toggle("dark-theme");
    const icon = themeToggle.querySelector("i");
    if (body.classList.contains("light-theme")) {
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
    }
});

// =====================
// MOBILE HAMBURGER
// =====================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    hamburger.classList.toggle("active");
});

// Close nav on link click (mobile)
navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        hamburger.classList.remove("active");
    });
});

// =====================
// SCROLL REVEAL
// =====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll(".section-reveal").forEach(el => {
    revealObserver.observe(el);
});

// =====================
// ACTIVE NAV LINK ON SCROLL
// =====================
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY + 100;
    sections.forEach(section => {
        if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
            navItems.forEach(a => {
                a.classList.remove("active");
                if (a.getAttribute("href") === "#" + section.id) {
                    a.classList.add("active");
                }
            });
        }
    });
});

// =====================
// SMOOTH CURSOR
// =====================
const cursor = document.querySelector(".cursor");
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = "1";
});

document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
});

// Scale cursor on hover over links/buttons
document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
});

function animateCursor() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    if (cursor) {
        cursor.style.left = currentX + "px";
        cursor.style.top = currentY + "px";
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// =====================
// CONTACT FORM FEEDBACK
// =====================
const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        const btn = contactForm.querySelector("button[type='submit']");
        btn.textContent = "Sending…";
        btn.disabled = true;
        // Re-enable after 3s in case of error
        setTimeout(() => {
            btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
            btn.disabled = false;
        }, 3000);
    });
}