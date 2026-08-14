/* ==========================================================================
   NAYAN JADAV - PORTFOLIO INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. ABOUT ME TAB SWITCHING LOGIC
  // --------------------------------------------------------------------------
  window.opentab = function (evt, tabname) {
    const tablinks = document.querySelectorAll(".tab-links");
    const tabcontents = document.querySelectorAll(".tab-contents");

    tablinks.forEach((tablink) => tablink.classList.remove("active-link"));
    tabcontents.forEach((tabcontent) => tabcontent.classList.remove("active-tab"));

    if (evt && evt.currentTarget) {
      evt.currentTarget.classList.add("active-link");
    }

    const selectedTab = document.getElementById(tabname);
    if (selectedTab) {
      selectedTab.classList.add("active-tab");
    }
  };

  // --------------------------------------------------------------------------
  // 2. MOBILE MENU TOGGLE LOGIC
  // --------------------------------------------------------------------------
  const sidemenu = document.getElementById("sidemenu");

  window.openmenu = function () {
    if (sidemenu) {
      sidemenu.classList.add("menu-active");
    }
  };

  window.closemenu = function () {
    if (sidemenu) {
      sidemenu.classList.remove("menu-active");
    }
  };

  // Close menu when clicking outside of it
  document.addEventListener("click", (e) => {
    if (
      sidemenu &&
      sidemenu.classList.contains("menu-active") &&
      !sidemenu.contains(e.target) &&
      !e.target.matches(".open-btn")
    ) {
      closemenu();
    }
  });

  // --------------------------------------------------------------------------
  // 3. DARK / LIGHT THEME TOGGLE WITH LOCALSTORAGE
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const htmlElement = document.documentElement;

  // Load saved theme preference or system default
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    if (themeIcon) {
      if (theme === "light") {
        themeIcon.className = "fa-solid fa-sun";
      } else {
        themeIcon.className = "fa-solid fa-moon";
      }
    }
  }

  // --------------------------------------------------------------------------
  // 4. BACK TO TOP BUTTON LOGIC
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      if (backToTopBtn) backToTopBtn.classList.add("show");
    } else {
      if (backToTopBtn) backToTopBtn.classList.remove("show");
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // --------------------------------------------------------------------------
  // 5. CONTACT FORM GOOGLE SHEETS SUBMISSION
  // --------------------------------------------------------------------------
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbxOMoVgWIUZeMjIhtvlJh31UJuzLElGuizLD1aqs7WpB_4q3_UUuVPnSTmwx52x1GA1xg/exec";
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.getElementById("msg");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : "Submit";

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      }

      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          if (msg) {
            msg.innerHTML = "✅ Message sent successfully! I will contact you soon.";
            msg.style.color = "#10b981";
            setTimeout(() => {
              msg.innerHTML = "";
            }, 6000);
          }
          form.reset();
        })
        .catch((error) => {
          console.error("Submission Error!", error.message);
          if (msg) {
            msg.innerHTML = "❌ Failed to send message. Please try emailing directly.";
            msg.style.color = "#ef4444";
          }
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
          }
        });
    });
  }
});
