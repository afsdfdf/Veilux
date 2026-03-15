(() => {
  const SESSION_KEY = "veilux.site.session";
  const FLASH_KEY = "veilux.site.flash";

  function setStatus(element, kind, message) {
    if (!element) return;
    element.className = `site-form-status is-${kind}`;
    element.textContent = message;
  }

  function ensureStatusEl(form) {
    let status = form.parentElement?.querySelector("[data-site-status]");
    if (!status) {
      status = document.createElement("div");
      status.setAttribute("data-site-status", "");
      status.className = "site-form-status";
      form.insertAdjacentElement("afterend", status);
    }
    return status;
  }

  function openMailDraft(subject, body) {
    const mailto = `mailto:hello@veilux.network?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  function bindNewsletterForms() {
    document.querySelectorAll('[data-site-form="newsletter"]').forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = ensureStatusEl(form);
        const emailInput = form.querySelector('input[type="email"], input[name="email"], input[type="text"]');
        const email = (emailInput?.value || "").trim();
        const context = form.dataset.siteContext || "website";

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          setStatus(status, "error", "Enter a valid email address to continue.");
          return;
        }

        localStorage.setItem(`${SESSION_KEY}.newsletter`, JSON.stringify({ email, context, at: Date.now() }));
        openMailDraft(
          `Newsletter subscription request (${context})`,
          `Please subscribe this email to Veilux updates:\n\nEmail: ${email}\nSource: ${context}\nSubmitted: ${new Date().toISOString()}`
        );
        form.reset();
        setStatus(status, "success", "Your email draft has been prepared so you can confirm the subscription request.");
      });
    });
  }

  function bindContactForms() {
    document.querySelectorAll('[data-site-form="contact"]').forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const status = ensureStatusEl(form);
        const name = (form.querySelector('[name="name"], #name')?.value || "").trim();
        const email = (form.querySelector('[name="email"], input[type="email"]')?.value || "").trim();
        const message = (form.querySelector('[name="message"], textarea')?.value || "").trim();

        if (!name || !email || !message) {
          setStatus(status, "error", "Complete your name, email, and message before sending.");
          return;
        }

        localStorage.setItem(`${SESSION_KEY}.contact`, JSON.stringify({ name, email, message, at: Date.now() }));
        openMailDraft(
          `New Veilux contact request from ${name}`,
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSubmitted: ${new Date().toISOString()}`
        );
        form.reset();
        setStatus(status, "success", "Your message draft has been prepared for hello@veilux.network.");
      });
    });
  }

  function createSession(identity) {
    const session = {
      label: identity.includes("@") ? identity : "Veilux Member",
      wallet: identity.includes("@") ? "0x7a3...f4c2" : identity,
      initials: (identity.replace(/[^A-Za-z0-9]/g, "").slice(0, 2) || "VX").toUpperCase(),
      createdAt: Date.now(),
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(FLASH_KEY, JSON.stringify({ type: "success", message: "Welcome back to Veilux." }));
    return session;
  }

  function readSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  function bindLoginForm() {
    const form = document.getElementById("loginForm");
    if (!form) return;

    const status = document.querySelector("[data-login-status]") || ensureStatusEl(form);
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const identity = (form.querySelector("#email")?.value || "").trim();
      const password = (form.querySelector("#password")?.value || "").trim();

      if (!identity && !password) {
        setStatus(status, "error", "Enter any account label and password to continue.");
        return;
      }

      const original = submitButton?.textContent || "Continue";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Signing in...";
      }

      createSession(identity || password || "Veilux Member");
      setStatus(status, "success", "Signed in successfully. Opening your workspace...");

      window.setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);

      window.setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = original;
        }
      }, 900);
    });
  }

  function hydrateDashboardSession() {
    const session = readSession() || createSession("Veilux Member");

    document.querySelectorAll("[data-session-name]").forEach((el) => {
      el.textContent = session.label;
    });

    document.querySelectorAll("[data-session-wallet]").forEach((el) => {
      el.textContent = session.wallet;
    });

    document.querySelectorAll("[data-session-initials]").forEach((el) => {
      el.textContent = session.initials;
    });

    document.querySelectorAll("[data-auth-logout]").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        clearSession();
        window.location.href = "login.html";
      });
    });

    try {
      const flash = JSON.parse(localStorage.getItem(FLASH_KEY) || "null");
      if (flash && typeof window.showToast === "function") {
        window.showToast(flash.message, flash.type || "success");
        localStorage.removeItem(FLASH_KEY);
      }
    } catch {
      localStorage.removeItem(FLASH_KEY);
    }
  }

  function init() {
    bindNewsletterForms();
    bindContactForms();
    bindLoginForm();
    hydrateDashboardSession();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
