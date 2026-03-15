(() => {
  const $ = (id) => document.getElementById(id);
  const fmt = new Intl.NumberFormat("en-US");

  const state = {
    price: 4.094,
    mode: "swap",
    hiddenAmount: true,
    anonLiq: true,
    mev: true,
    points: Array.from({ length: 42 }, (_, i) => 80 + Math.sin(i / 4) * 14)
  };

  const els = {
    mVolume: $("mVolume"),
    mTrades: $("mTrades"),
    mMev: $("mMev"),
    menuToggle: $("menuToggle"),
    mainNav: $("mainNav"),
    navBackdrop: $("navBackdrop"),
    orderTabs: $("orderTabs"),
    pairSelect: $("pairSelect"),
    fromAmount: $("fromAmount"),
    toAmount: $("toAmount"),
    quickAmounts: $("quickAmounts"),
    limitPriceRow: $("limitPriceRow"),
    limitPrice: $("limitPrice"),
    slippage: $("slippage"),
    slippageLabel: $("slippageLabel"),
    hiddenAmountToggle: $("hiddenAmountToggle"),
    anonLiqToggle: $("anonLiqToggle"),
    mevToggle: $("mevToggle"),
    launchBtn: $("launchBtn"),
    simulateBtn: $("simulateBtn"),
    mobileLaunchBtn: $("mobileLaunchBtn"),
    mobileSimulateBtn: $("mobileSimulateBtn"),
    mobileActions: $("mobileActions"),
    tradeSummary: $("tradeSummary"),
    priceCanvas: $("priceCanvas"),
    depthBars: $("depthBars"),
    tickList: $("tickList"),
    marketState: $("marketState"),
    toast: $("toast")
  };

  const pairRate = {
    "Veilux Token / USDC": 4.094,
    "Veilux Token / ETH": 0.00142,
    "Veilux Token / BTC": 0.000061
  };

  function showToast(text) {
    els.toast.textContent = text;
    els.toast.classList.add("is-open");
    setTimeout(() => els.toast.classList.remove("is-open"), 1300);
  }

  function toggleNav(force) {
    const open = typeof force === "boolean" ? force : !els.mainNav.classList.contains("is-open");
    els.mainNav.classList.toggle("is-open", open);
    els.navBackdrop.classList.toggle("is-open", open);
    els.menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open && window.innerWidth <= 860);
  }

  function resizeCanvas(canvas) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { ctx, w: rect.width, h: rect.height };
  }

  function updateTradeSummary() {
    const from = Number(els.fromAmount.value || 0);
    const to = els.toAmount.value;
    const modeText = state.mode === "limit" ? `Limit @ ${els.limitPrice.value}` : "Market";
    const privacyFlags = [
      state.hiddenAmount ? "Hidden Amount" : "Public Amount",
      state.anonLiq ? "Anonymous LP" : "LP Public",
      state.mev ? "MEV Shield ON" : "MEV Shield OFF"
    ].join(" | ");
    els.tradeSummary.textContent = `${modeText} ${els.pairSelect.value} | From ${fmt.format(from)} | To ${to} | Slippage ${Number(els.slippage.value).toFixed(2)}% | ${privacyFlags}`;
  }

  function updateEstimate() {
    const from = Number(els.fromAmount.value || 0);
    const pair = els.pairSelect.value;
    const base = state.mode === "limit" ? Number(els.limitPrice.value || 0) : (pairRate[pair] || 1);
    const slip = Number(els.slippage.value) / 100;
    const result = Math.max(0, from * base * (1 - slip));
    els.toAmount.value = fmt.format(Number(result.toFixed(4)));
    updateTradeSummary();
  }

  function drawChart() {
    const payload = resizeCanvas(els.priceCanvas);
    if (!payload) return;

    const { ctx, w, h } = payload;
    ctx.clearRect(0, 0, w, h);

    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, "rgba(89,233,255,.16)");
    bg.addColorStop(1, "rgba(89,233,255,.01)");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i <= 8; i += 1) {
      const y = 12 + i * ((h - 24) / 8);
      ctx.strokeStyle = "rgba(131,232,255,.07)";
      ctx.beginPath();
      ctx.moveTo(12, y);
      ctx.lineTo(w - 10, y);
      ctx.stroke();
    }

    ctx.strokeStyle = "#5ce9ff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    state.points.forEach((p, i) => {
      const x = 16 + i * ((w - 30) / (state.points.length - 1));
      const y = h - p;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    const lastY = h - state.points[state.points.length - 1];
    ctx.fillStyle = "#ffd86c";
    ctx.beginPath();
    ctx.arc(w - 16, lastY, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  function renderDepth() {
    const rows = Array.from({ length: 6 }, (_, i) => {
      const price = (state.price + (i - 3) * 0.005).toFixed(4);
      const size = Math.round(120 + Math.random() * 780);
      const width = Math.min(100, Math.round((size / 900) * 100));
      return `<div class="depth-row"><span>${price}</span><div class="depth-bar"><div class="depth-fill" style="width:${width}%"></div></div><strong>${size}</strong></div>`;
    }).join("");
    els.depthBars.innerHTML = rows;
  }

  function pushTick() {
    const side = Math.random() > 0.5 ? "BUY" : "SELL";
    const color = side === "BUY" ? "#72ffd2" : "#ffd28d";
    const amount = (Math.random() * 400 + 20).toFixed(2);
    const line = `<li><span style="color:${color};font-weight:700;">${side}</span> <img src="assets/img/logo/logo.png" alt="Veilux Token" class="tick-token"> ${amount} Veilux Token @ ${state.price.toFixed(4)} (${new Date().toLocaleTimeString()})</li>`;
    els.tickList.insertAdjacentHTML("afterbegin", line);
    const all = els.tickList.querySelectorAll("li");
    if (all.length > 10) all[all.length - 1].remove();
  }

  function animateMarket() {
    state.price = Math.max(0.2, state.price + (Math.random() - 0.5) * 0.012);
    const next = 80 + Math.sin(Date.now() / 700) * 12 + (Math.random() - 0.5) * 11;
    state.points.push(next);
    state.points.shift();

    const vol = (118 + Math.random() * 24).toFixed(1);
    const trades = Math.round(97000 + Math.random() * 2200);
    const mev = Math.round(7600 + Math.random() * 600);

    els.mVolume.textContent = `$${vol}M`;
    els.mTrades.textContent = fmt.format(trades);
    els.mMev.textContent = fmt.format(mev);

    renderDepth();
    pushTick();
    drawChart();
    updateEstimate();
  }

  function bindToggle(btn, key, label) {
    btn.addEventListener("click", () => {
      state[key] = !state[key];
      btn.classList.toggle("is-on", state[key]);
      btn.textContent = `${label}: ${state[key] ? "ON" : "OFF"}`;
      updateTradeSummary();
      showToast(`${label} ${state[key] ? "enabled" : "disabled"}`);
    });
  }

  function bindEvents() {
    els.menuToggle.addEventListener("click", () => toggleNav());
    els.navBackdrop.addEventListener("click", () => toggleNav(false));
    els.mainNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleNav(false)));

    els.orderTabs.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-mode]");
      if (!b) return;
      state.mode = b.dataset.mode;
      els.orderTabs.querySelectorAll("button").forEach((n) => n.classList.remove("is-active"));
      b.classList.add("is-active");
      els.limitPriceRow.classList.toggle("is-hidden", state.mode !== "limit");
      updateEstimate();
      showToast(`Mode switched to ${state.mode}`);
    });

    [els.pairSelect, els.fromAmount, els.slippage, els.limitPrice].forEach((el) => {
      el.addEventListener("input", () => {
        els.slippageLabel.textContent = `${Number(els.slippage.value).toFixed(2)}%`;
        updateEstimate();
      });
    });

    els.quickAmounts.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-amount]");
      if (!b) return;
      els.fromAmount.value = b.dataset.amount;
      updateEstimate();
      showToast(`Amount preset: ${b.dataset.amount}`);
    });

    bindToggle(els.hiddenAmountToggle, "hiddenAmount", "Hidden Amount");
    bindToggle(els.anonLiqToggle, "anonLiq", "Anonymous LP");
    bindToggle(els.mevToggle, "mev", "MEV Shield");

    els.simulateBtn.addEventListener("click", () => {
      animateMarket();
      showToast("Trade simulation completed");
    });

    els.mobileSimulateBtn.addEventListener("click", () => els.simulateBtn.click());

    els.launchBtn.addEventListener("click", () => {
      els.marketState.textContent = "PROTECTED";
      showToast("Private DEX session launched");
    });

    els.mobileLaunchBtn.addEventListener("click", () => els.launchBtn.click());

    window.addEventListener("focusin", (e) => {
      if (!els.mobileActions) return;
      if (window.innerWidth <= 700 && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) {
        els.mobileActions.classList.add("is-hidden");
      }
    });

    window.addEventListener("focusout", () => {
      if (!els.mobileActions) return;
      els.mobileActions.classList.remove("is-hidden");
    });

    window.addEventListener("resize", () => {
      drawChart();
      if (window.innerWidth > 860) toggleNav(false);
    });
  }

  function init() {
    els.slippageLabel.textContent = `${Number(els.slippage.value).toFixed(2)}%`;
    els.limitPriceRow.classList.add("is-hidden");
    updateEstimate();
    renderDepth();
    drawChart();
    pushTick();
    bindEvents();
    setInterval(animateMarket, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

