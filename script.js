const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelectorAll(".site-nav a[href^='#']");
const themeToggle = document.querySelector("[data-theme-toggle]");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  header.classList.toggle("is-open", isOpen);
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-label", "Open navigation");
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

const revealItems = document.querySelectorAll(
  ".section, .project-card, .case-grid article, .skills-grid div, .writing-list article, .profile-panel"
);

revealItems.forEach((item) => item.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sections = [...document.querySelectorAll("main section[id]")];
const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => activeObserver.observe(section));

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
setTheme(localStorage.getItem("theme") || "light");

navLinks.forEach((link) => {
  link.addEventListener("focus", () => header.classList.add("is-scrolled"));
});
