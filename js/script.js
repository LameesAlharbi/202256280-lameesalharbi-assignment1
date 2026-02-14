"use strict";

/*
  Lamees note:
  Keeping JS small + clear for Assignment 1.
  Later assignments can expand interactivity without rewriting everything.
*/

const THEME_KEY = "lamees-theme";

function setYear() {
  const yearEl = document.getElementById("year");
  if (!yearEl) return;

  const now = new Date();
  yearEl.textContent = String(now.getFullYear());
}
function setGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  const now = new Date();
  const hour = now.getHours();

  let message = "Hello!";
  if (hour >= 5 && hour < 12) message = "Good morning ☀️";
  else if (hour >= 12 && hour < 17) message = "Good afternoon 🌤️";
  else if (hour >= 17 && hour < 21) message = "Good evening 🌙";
  else message = "Good night ✨";

  greetingEl.textContent = `Hi there! ${message} `;
}

setGreeting();

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark", isDark);

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    toggleBtn.setAttribute("aria-pressed", String(isDark));
    toggleBtn.textContent = isDark ? "Light" : "Dark";
    toggleBtn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
  }
}

function initThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
  }

  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const currentlyDark = document.body.classList.contains("dark");
    const nextTheme = currentlyDark ? "light" : "dark";

    applyTheme(nextTheme);
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");

  if (!form || !statusEl) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.namedItem("name")?.value?.trim();
    const email = form.elements.namedItem("email")?.value?.trim();
    const message = form.elements.namedItem("message")?.value?.trim();

    if (!name || !email || !message) {
      statusEl.textContent = "Please fill in all fields before sending.";
      return;
    }

    statusEl.textContent = `Thanks, ${name}! Your message is ready to send (front-end only).`;
    form.reset();
  });
}

function init() {
  setYear();
  initThemeToggle();
  initContactForm();
}

document.addEventListener("DOMContentLoaded", init);