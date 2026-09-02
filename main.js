const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const themeToggle = document.getElementById("theme-toggle");
const year = document.getElementById("year");
const typed = document.getElementById("typed-role");
const form = document.getElementById("contact-form");
const copyBtn = document.getElementById("copy-email");
const spotlight = document.getElementById("spotlight");
const EMAIL = "viveksingh956038@gmail.com";

year.textContent = new Date().getFullYear();

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  const open = navMenu.classList.contains("show");
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  navToggle.innerHTML = open ? '<i class="bx bx-x"></i>' : '<i class="bx bx-menu"></i>';
});

function closeMenu() {
  navMenu.classList.remove("show");
  navToggle.setAttribute("aria-label", "Open menu");
  navToggle.innerHTML = '<i class="bx bx-menu"></i>';
}

document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  document.documentElement.setAttribute("data-theme", "light");
  themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
}

themeToggle.addEventListener("click", () => {
  const light = document.documentElement.getAttribute("data-theme") === "light";
  if (light) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.setItem("theme", "dark");
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
  }
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav__link");

window.addEventListener("scroll", () => {
  const y = window.scrollY + 120;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav__link[href="#${id}"]`);
    if (!link) return;
    if (y >= top && y < top + height) {
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    }
  });
});

const roles = [
  "backend engineer",
  "java + spring boot",
  "full-stack builder",
  "production debugger",
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typed.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) {
    charIndex += 1;
    setTimeout(typeLoop, 70);
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(typeLoop, 1400);
  } else if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(typeLoop, 36);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 220);
  }
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  typeLoop();
} else {
  typed.textContent = roles[0];
}

window.addEventListener("pointermove", (event) => {
  spotlight.style.setProperty("--x", `${event.clientX}px`);
  spotlight.style.setProperty("--y", `${event.clientY}px`);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const from = data.get("email");
  const message = data.get("message");
  const subject = encodeURIComponent(`Portfolio note from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`);
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    copyBtn.textContent = "Copied";
    setTimeout(() => {
      copyBtn.textContent = "Copy email";
    }, 1600);
  } catch {
    copyBtn.textContent = EMAIL;
  }
});

document.getElementById("logo").addEventListener("click", (event) => {
  if (event.metaKey || event.ctrlKey) return;
  document.body.animate(
    [
      { filter: "hue-rotate(0deg)" },
      { filter: "hue-rotate(25deg)" },
      { filter: "hue-rotate(0deg)" },
    ],
    { duration: 700 }
  );
});
