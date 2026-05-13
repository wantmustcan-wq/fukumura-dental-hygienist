const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll(".global-nav a")];

toggle?.addEventListener("click", () => {
  header?.classList.toggle("is-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => header?.classList.remove("is-open"));
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0, .25, .5, .75] }
);

sections.forEach((section) => observer.observe(section));
