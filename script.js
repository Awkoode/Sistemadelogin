const API = "http://localhost:3000";


function switchTab(tab) {
  const loginForm    = document.getElementById("form-login");
  const registerForm = document.getElementById("form-register");
  const tabLogin     = document.getElementById("tab-login");
  const tabRegister  = document.getElementById("tab-register");
  const indicator    = document.querySelector(".tab-indicator");

  if (tab === "login") {
    tabLogin.classList.add("active");
    tabRegister.classList.remove("active");
    indicator.classList.remove("right");
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    loginForm.style.animation = "none";
    void loginForm.offsetWidth;
    loginForm.style.animation = "";
  } else {
    tabRegister.classList.add("active");
    tabLogin.classList.remove("active");
    indicator.classList.add("right");
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    registerForm.style.animation = "none";
    void registerForm.offsetWidth;
    registerForm.style.animation = "";
  }

  hideToast();
}


function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  const isHidden = input.type === "password";
  input.type = isHidden ? "text" : "password";

  btn.innerHTML = isHidden
    ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
        <line x1="1" y1="1" x2="23" y2="23"/>
       </svg>`
    : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
       </svg>`;
}


function checkStrength(pw) {
  const fill  = document.getElementById("strength-fill");
  const label = document.getElementById("strength-label");

  if (!pw) {
    fill.style.width = "0%";
    fill.style.background = "transparent";
    label.textContent = "";
    return;
  }

  let score = 0;
  if (pw.length >= 8)           score++;
  if (/[A-Z]/.test(pw))        score++;
  if (/[0-9]/.test(pw))        score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const levels = [
    { pct: "20%",  color: "#ff5566", text: "fraca"  },
    { pct: "45%",  color: "#ffb340", text: "media"  },
    { pct: "70%",  color: "#3df5ff", text: "boa"    },
    { pct: "100%", color: "#3dffa0", text: "forte"  },
  ];
  const l = levels[Math.min(score - 1, 3)];
  if (l) {
    fill.style.width      = l.pct;
    fill.style.background = l.color;
    label.textContent     = l.text;
    label.style.color     = l.color;
  }
}


let toastTimer;
function showToast(message, type = "error") {
  const toast = document.getElementById("toast");
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.className = `toast ${type}`;
  void toast.offsetWidth;
  toast.classList.add("show");
  toastTimer = setTimeout(hideToast, 3500);
}
function hideToast() {
  document.getElementById("toast").classList.remove("show");
}


function setLoading(btn, loading) {
  const text   = btn.querySelector(".btn-text");
  const loader = btn.querySelector(".btn-loader");
  const arrow  = btn.querySelector(".btn-arrow");
  btn.disabled        = loading;
  text.style.opacity  = loading ? "0.5" : "1";
  loader.hidden       = !loading;
  arrow.style.opacity = loading ? "0" : "1";
}


function markError(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.classList.add("input-error");
    input.addEventListener("input", () => input.classList.remove("input-error"), { once: true });
  }
}



let _redirectTimer = null;
let _progressTimer = null;

function openModal({ type = "success", title, desc, redirectTo, redirectDelay, btnLabel = "Fechar" }) {
  const overlay      = document.getElementById("modal-overlay");
  const iconWrap     = document.getElementById("modal-icon-wrap");
  const titleEl      = document.getElementById("modal-title");
  const descEl       = document.getElementById("modal-desc");
  const progressWrap = document.getElementById("modal-progress-wrap");
  const progressFill = document.getElementById("modal-progress-fill");
  const btnEl        = document.getElementById("modal-btn");

  clearTimeout(_redirectTimer);
  clearTimeout(_progressTimer);

  
  iconWrap.className = `modal-icon-wrap ${type}`;
  iconWrap.innerHTML = type === "success"
    ? `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path class="modal-check-path" d="M8 12l3 3 5-5"/>
       </svg>`
    : `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
        <polyline points="10 17 15 12 10 7"/>
        <line x1="15" y1="12" x2="3" y2="12"/>
       </svg>`;

  titleEl.textContent = title;
  descEl.textContent  = desc;
  btnEl.textContent   = btnLabel;

  if (redirectDelay && redirectTo) {
    progressWrap.hidden = false;
    progressFill.style.transition = "none";
    progressFill.style.transform  = "scaleX(1)";

    _progressTimer = setTimeout(() => {
      progressFill.style.transition = `transform ${redirectDelay}ms linear`;
      progressFill.style.transform  = "scaleX(0)";
    }, 60);

    _redirectTimer = setTimeout(() => {
      closeModal(false);
      switchTab(redirectTo);
    }, redirectDelay);
  } else {
    progressWrap.hidden = true;
  }

  overlay.dataset.redirectTo = redirectTo || "";
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(doRedirect = true) {
  const overlay    = document.getElementById("modal-overlay");
  const redirectTo = overlay.dataset.redirectTo;

  clearTimeout(_redirectTimer);
  clearTimeout(_progressTimer);

  overlay.classList.remove("open");
  document.body.style.overflow = "";

  if (doRedirect && redirectTo) {
    setTimeout(() => switchTab(redirectTo), 200);
    overlay.dataset.redirectTo = "";
  }
}


async function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const btn      = document.getElementById("btn-login");

  if (!email || !password) {
    if (!email)    markError("login-email");
    if (!password) markError("login-password");
    showToast("Preencha todos os campos", "error");
    return;
  }

  setLoading(btn, true);
  try {
    const res  = await fetch(`${API}/login`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });
    const text = await res.text();

    if (res.ok && text.includes("Login OK")) {
      openModal({
        type:     "login",
        title:    "Login realizado!",
        desc:     `Bem-vindo de volta! Sua sessao foi iniciada com sucesso.`,
        btnLabel: "Continuar",
      });
    } else {
      markError("login-email");
      markError("login-password");
      showToast(text || "Erro ao entrar", "error"); 
    }
  } catch {
    showToast("Erro de conexao com o servidor", "error");
  } finally {
    setLoading(btn, false);
  }
}


async function handleRegister(e) {
  e.preventDefault();
  const email    = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const confirm  = document.getElementById("reg-confirm").value;
  const btn      = document.getElementById("btn-register");

  if (!email || !password || !confirm) {
    if (!email)    markError("reg-email");
    if (!password) markError("reg-password");
    if (!confirm)  markError("reg-confirm");
    showToast("Preencha todos os campos", "error");
    return;
  }
  if (password.length < 6) {
    markError("reg-password");
    showToast("A senha deve ter no minimo 6 caracteres", "error");
    return;
  }
  if (password !== confirm) {
    markError("reg-password");
    markError("reg-confirm");
    showToast("As senhas nao coincidem", "error");
    return;
  }

  setLoading(btn, true);
  try {
    const res  = await fetch(`${API}/register`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ email, password }),
    });
    const text = await res.text();

    if (res.ok || text.toLowerCase().includes("criado")) {
      openModal({
        type:          "success",
        title:         "Conta criada!",
        desc:          `Tudo certo, ${email}. Sua conta foi criada com sucesso. Redirecionando para o login automaticamente...`,
        redirectTo:    "login",
        redirectDelay: 3500,
        btnLabel:      "Ir para o login agora",
      });
    } else {
      showToast(text || "Erro ao criar conta", "error");
    }
  } catch {
    showToast("Erro de conexao com o servidor", "error");
  } finally {
    setLoading(btn, false);
  }
}


function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1400;
  const start    = performance.now();

  (function tick(now) {
    const p     = Math.min((now - start) / duration, 1);
    const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}


document.addEventListener("DOMContentLoaded", () => {
  
  document.querySelectorAll(".stat-num").forEach((el, i) => {
    setTimeout(() => animateCounter(el), 600 + i * 150);
  });

  
  document.querySelectorAll(".code-fragment").forEach((el, i) => {
    el.style.animationDelay = `${i * 3}s`;
  });

  
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
