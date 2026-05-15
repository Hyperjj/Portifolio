/* ─────────────────────────────────────
         1. CURSOR GLOW (desktop only)
      ───────────────────────────────────── */
const glow = document.getElementById("cursor-glow");
if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

const point = document.querySelector(".point");

setInterval(() => {
  point.classList.toggle("blink");
}, 300);

/* ─────────────────────────────────────
         3. ACTIVE NAV LINK (Intersection Observer)
      ───────────────────────────────────── */
const sections = document.querySelectorAll("header[id], section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id,
          );
        });
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((s) => navObserver.observe(s));

/* ─────────────────────────────────────
         4. SCROLL REVEAL (Intersection Observer)
      ───────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

/* ─────────────────────────────────────
         5. NAV BACKGROUND on scroll
      ───────────────────────────────────── */
const navEl = document.querySelector("nav");
window.addEventListener(
  "scroll",
  () => {
    navEl.style.background =
      window.scrollY > 20 ? "rgba(5,5,7,.92)" : "rgba(5,5,7,.75)";
  },
  { passive: true },
);

/* ─────────────────────────────────────
         6. TECH CARD — hover tilt effect
      ───────────────────────────────────── */
document.querySelectorAll(".tech-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `perspective(600px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* ─────────────────────────────────────
         7. TYPING EFFECT (hero tagline)
      ───────────────────────────────────── */
const taglines = [
  "Estudante de Engenharia de Software.",
  "Construindo experiências front-end e back-end.",
  "Apaixonado por programação.",
];
const taglineEl = document.querySelector("#inicio p");
let tIdx = 0,
  cIdx = 0,
  deleting = false;

function typeEffect() {
  const current = taglines[tIdx];
  if (!deleting) {
    taglineEl.textContent = current.slice(0, ++cIdx);
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeEffect, 2400);
      return;
    }
  } else {
    taglineEl.textContent = current.slice(0, --cIdx);
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % taglines.length;
    }
  }
  setTimeout(typeEffect, deleting ? 28 : 48);
}

// Start after hero animation completes
setTimeout(typeEffect, 1800);

/* ─────────────────────────────────────
         8. HIDE scroll indicator on scroll
      ───────────────────────────────────── */
const scrollIndicator = document.querySelector(".scroll-indicator");
window.addEventListener(
  "scroll",
  () => {
    if (window.scrollY > 80) {
      scrollIndicator.style.opacity = "0";
      scrollIndicator.style.pointerEvents = "none";
    } else {
      scrollIndicator.style.opacity = "";
      scrollIndicator.style.pointerEvents = "";
    }
  },
  { passive: true },
);

/* ─────────────────────────────────────
         9. PROJECT CARD — subtle parallax thumb
      ───────────────────────────────────── */
document.querySelectorAll(".project-card").forEach((card) => {
  const thumb = card.querySelector(".project-thumb");
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - rect.left) / rect.width - 0.5;
    const dy = (e.clientY - rect.top) / rect.height - 0.5;
    thumb.style.transform = `translateX(${dx * 6}px) translateY(${dy * 4}px)`;
  });
  card.addEventListener("mouseleave", () => {
    thumb.style.transform = "";
  });
});
