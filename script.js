// Minecraft-style Portfolio Interactivity
// No frameworks, only vanilla JS.

document.addEventListener("DOMContentLoaded", () => {
  const enterWorldBtn = document.getElementById("enterWorldBtn");
  const dayNightToggle = document.getElementById("dayNightToggle");
  const soundToggle = document.getElementById("soundToggle");
  const xpFill = document.getElementById("xpFill");
  const uiClickSound = document.getElementById("uiClickSound");
  const navLinks = document.querySelectorAll(".nav-link");

  let soundOn = false;

  // Basic helper to play UI sound (guarded by toggle)
  function playClick() {
    if (!soundOn || !uiClickSound) return;
    // Reset so it can replay quickly
    uiClickSound.currentTime = 0;
    uiClickSound.play().catch(() => {
      // Ignore autoplay errors
    });
  }

  // ENTER WORLD scrolls to About section
  if (enterWorldBtn) {
    enterWorldBtn.addEventListener("click", () => {
      const about = document.getElementById("about");
      if (about) {
        about.scrollIntoView({ behavior: "smooth" });
      }
      playClick();
    });
  }

  // Navbar navigation
  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      playClick();
    });
  });

  // Day / Night toggle
  if (dayNightToggle) {
    dayNightToggle.addEventListener("click", () => {
      document.body.classList.toggle("night");
      const isNight = document.body.classList.contains("night");
      dayNightToggle.textContent = isNight ? "🌙" : "🌞";
      dayNightToggle.classList.toggle("active", isNight);
      playClick();
    });
  }

  // Sound toggle (off by default)
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundOn = !soundOn;
      soundToggle.textContent = soundOn ? "🔊" : "🔇";
      soundToggle.classList.toggle("active", soundOn);
      playClick();
    });
  }

  // Book open animation
  const bookWrapper = document.querySelector(".book-wrapper");
  const bookOpenBtn = document.querySelector(".book-open-btn");
  if (bookWrapper && bookOpenBtn) {
    bookOpenBtn.addEventListener("click", () => {
      bookWrapper.classList.add("open");
      playClick();
    });
  }

  // Chest open animation (hover & click)
  const chests = document.querySelectorAll(".chest-card");
  chests.forEach((chest) => {
    chest.addEventListener("click", () => {
      chest.classList.toggle("open");
      playClick();
    });
  });

  // Achievements popup when card enters viewport
  const achievementCards = document.querySelectorAll(".achievement-card");
  const popup = document.getElementById("achievementPopup");
  const popupText = popup?.querySelector(".popup-text");
  let popupTimeout;

  function showPopup(text) {
    if (!popup || !popupText) return;
    popupText.textContent = text;
    popup.classList.add("show");
    clearTimeout(popupTimeout);
    popupTimeout = setTimeout(() => {
      popup.classList.remove("show");
    }, 2800);
  }

  if ("IntersectionObserver" in window && achievementCards.length > 0) {
    const achObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = entry.target.getAttribute("data-title") || "";
            showPopup(title);
          }
        });
      },
      { threshold: 0.8 }
    );

    achievementCards.forEach((card) => achObserver.observe(card));
  } else {
    // Fallback: show popup on click
    achievementCards.forEach((card) => {
      card.addEventListener("click", () => {
        const title = card.getAttribute("data-title") || "";
        showPopup(title);
        playClick();
      });
    });
  }

  // Scroll-based "unlock" animations for sections
  const lockableSections = document.querySelectorAll(
    ".section.locked, .section-spawn"
  );

  function updateSectionUnlocks() {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    lockableSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visibleAmount = Math.min(
        viewportHeight,
        Math.max(0, viewportHeight - Math.max(0, rect.top))
      );
      const ratio = visibleAmount / viewportHeight;

      if (!section.classList.contains("unlocked") && ratio > 0.35) {
        section.classList.add("unlocked", "animate-in");
        // Remove animate-in after animation completes
        setTimeout(() => section.classList.remove("animate-in"), 400);
      }
    });
  }

  // XP bar shows overall scroll progress
  function updateXpBar() {
    if (!xpFill) return;
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;
    xpFill.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
  }

  // Combined scroll handler
  function onScroll() {
    updateSectionUnlocks();
    updateXpBar();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    updateSectionUnlocks();
    updateXpBar();
  });

  // Initial state
  updateSectionUnlocks();
  updateXpBar();
});


