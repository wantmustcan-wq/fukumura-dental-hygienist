const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");
const navLinks = [...document.querySelectorAll(".global-nav a")];
document.documentElement.classList.add("has-js");

toggle?.addEventListener("click", () => {
  header?.classList.toggle("is-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("is-open");
    navLinks.forEach((item) => item.classList.toggle("is-active", item === link));
  });
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-28% 0px -60% 0px", threshold: [0, .2, .45, .7] }
);

sections.forEach((section) => observer.observe(section));

document.querySelector('.global-nav a[href="#home"]')?.classList.add("is-active");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { rootMargin: "0px 0px -12% 0px", threshold: .15 }
);

document.querySelectorAll("[data-reveal]").forEach((el) => revealObserver.observe(el));

setTimeout(() => {
  document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.12) el.classList.add("is-visible");
  });
}, 1200);
