const body = document.body;
const modal = document.querySelector("[data-modal]");
const openButtons = document.querySelectorAll("[data-open-form]");
const closeButtons = document.querySelectorAll("[data-close-form]");
const form = document.querySelector("[data-contact-form]");
const inputState = document.querySelector("[data-input-state]");
const thanksState = document.querySelector("[data-thanks-state]");
const menuButton = document.querySelector("[data-menu-button]");
const mobileNav = document.querySelector("[data-mobile-nav]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const sections = document.querySelectorAll("[data-section]");
const revealGroups = [
  [".hero-copy", "reveal-from-left"],
  [".lead-band p", "reveal-zoom"],
  [".support-grid article", "reveal-zoom"],
  [".flow-list li", "reveal-zoom"],
  [".time-box", "reveal-zoom"],
  [".program-list li", "reveal-from-left"],
  [".profile-card", "reveal-zoom"],
  [".portrait", "reveal-from-left"],
  [".metric", "reveal-zoom"],
  [".contact-card", "reveal-zoom"],
];

const headerOffset = () => {
  const header = document.querySelector(".site-header");
  return (header?.getBoundingClientRect().height || 0) + 12;
};

const setCurrentNav = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-current", link.dataset.navLink === id);
  });
};

const scrollToSection = (id) => {
  const target = id === "top" ? document.body : document.getElementById(id);
  if (!target) return;
  const top = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - headerOffset();
  window.scrollTo({ top, behavior: "smooth" });
  setCurrentNav(id);
  body.classList.remove("menu-open");
};

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.dataset.navLink;
    if (!id) return;
    event.preventDefault();
    history.replaceState(null, "", id === "top" ? "#top" : `#${id}`);
    scrollToSection(id);
  });
});

const updateCurrentFromScroll = () => {
  const marker = window.scrollY + headerOffset() + 80;
  let current = "top";
  sections.forEach((section) => {
    if (section.offsetTop <= marker) {
      current = section.dataset.section;
    }
  });
  if (window.scrollY < 80) current = "top";
  setCurrentNav(current);
};

window.addEventListener("scroll", updateCurrentFromScroll, { passive: true });
window.addEventListener("resize", updateCurrentFromScroll);
window.addEventListener("load", updateCurrentFromScroll);

const revealTargets = [];
revealGroups.forEach(([selector, className]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add("reveal-target", className);
    element.style.setProperty("--reveal-delay", `${Math.min(index * 80, 360)}ms`);
    revealTargets.push(element);
  });
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

menuButton?.addEventListener("click", () => {
  body.classList.toggle("menu-open");
});

mobileNav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    body.classList.remove("menu-open");
  }
});

const openModal = () => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  inputState.hidden = false;
  thanksState.hidden = true;
  const firstInput = modal.querySelector("input");
  window.setTimeout(() => firstInput?.focus(), 80);
};

const showThanks = () => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  inputState.hidden = true;
  thanksState.hidden = false;
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
};

openButtons.forEach((button) => button.addEventListener("click", openModal));
closeButtons.forEach((button) => button.addEventListener("click", closeModal));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  inputState.hidden = true;
  thanksState.hidden = false;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal.classList.contains("is-open")) closeModal();
    body.classList.remove("menu-open");
  }
});

const previewParams = new URLSearchParams(window.location.search);

if (previewParams.has("thanks") || window.location.hash === "#thanks-preview") {
  window.addEventListener("load", showThanks);
}

if (previewParams.has("form") || window.location.hash === "#form-preview") {
  window.addEventListener("load", openModal);
}

if (window.location.hash && !window.location.hash.includes("preview")) {
  window.addEventListener("load", () => {
    const id = window.location.hash.replace("#", "");
    if (id) window.setTimeout(() => scrollToSection(id), 120);
  });
}
