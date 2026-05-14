const body = document.body;
const modal = document.querySelector("[data-modal]");
const openButtons = document.querySelectorAll("[data-open-form]");
const closeButtons = document.querySelectorAll("[data-close-form]");
const form = document.querySelector("[data-contact-form]");
const inputState = document.querySelector("[data-input-state]");
const thanksState = document.querySelector("[data-thanks-state]");

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
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

const previewParams = new URLSearchParams(window.location.search);

if (previewParams.has("thanks") || window.location.hash === "#thanks-preview") {
  window.addEventListener("load", showThanks);
}

if (previewParams.has("form") || window.location.hash === "#form-preview") {
  window.addEventListener("load", openModal);
}
