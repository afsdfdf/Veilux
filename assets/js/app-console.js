(() => {
  const $ = (id) => document.getElementById(id);
  const fmt = new Intl.NumberFormat("en-US");

  const state = {
    engineOn: true,
    burst: false,
    chartMode: "mix",
    activeModule: "disclosure",
    tx: [],
    alerts: [],
    logs: [],
    replayUntil: 0,
    tee: 55,
    tpsBase: 128,
    latencyBase: 142,
    successBase: 93.2,
    walletValue: 127930
  };

  const els = {
    sidebar: $("sidebar"),
    mobileBackdrop: $("mobileBackdrop"),
    mobileMenuBtn: $("mobileMenuBtn"),
    mobileRefreshBtn: $("mobileRefreshBtn"),
    engineToggle: $("engineToggle"),
    transferToggle: $("transferToggle"),
    replayBtn: $("replayBtn"),
    boostBtn: $("boostBtn"),
    runState: $("runState"),
    batchWindow: $("batchWindow"),
    batchValue: $("batchValue"),
    revalidationRange: $("revalidationRange"),
    revalidationValue: $("revalidationValue"),
    chartTabs: $("chartTabs"),
    moduleTabs: $("moduleTabs"),
    runtimeChart: $("runtimeChart"),
    kpiSuccess: $("kpiSuccess"),
    kpiTps: $("kpiTps"),
    kpiQueue: $("kpiQueue"),
    kpiLatency: $("kpiLatency"),
    txBody: $("txBody"),
    txSearch: $("txSearch"),
    txFilter: $("txFilter"),
    txCount: $("txCount"),
    txDrawer: $("txDrawer"),
    drawerBody: $("drawerBody"),
    drawerClose: $("drawerClose"),
    networkMap: $("networkMap"),
    nodeTotal: $("nodeTotal"),
    nodeWarn: $("nodeWarn"),
    nodeLatency: $("nodeLatency"),
    topologyState: $("topologyState"),
    teeProgress: $("teeProgress"),
    syncBtn: $("syncBtn"),
    manageBtn: $("manageBtn"),
    withdrawBtn: $("withdrawBtn"),
    quickStakeBtn: $("quickStakeBtn"),
    walletValue: $("walletValue"),
    clearAlertsBtn: $("clearAlertsBtn"),
    alertFeed: $("alertFeed"),
    alertCount: $("alertCount"),
    eventLog: $("eventLog"),
    clearLogBtn: $("clearLogBtn"),
    injectFailBtn: $("injectFailBtn"),
    recoverBtn: $("recoverBtn"),
    randomBurstBtn: $("randomBurstBtn"),
    toast: $("toast"),
    lastAction: $("lastAction"),
    fxCanvas: $("fxCanvas")
  };

  function rand(min, max) { return Math.random() * (max - min) + min; }
  function sample(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function showToast(text) {
    els.toast.textContent = text;
    els.toast.classList.add("is-open");
    setTimeout(() => els.toast.classList.remove("is-open"), 1200);
  }

  function pushLog(text) {
    const item = `[${new Date().toLocaleTimeString()}] ${text}`;
    state.logs.unshift(item);
    state.logs = state.logs.slice(0, 80);
    els.eventLog.innerHTML = state.logs.map((v) => `<li>${v}</li>`).join("");
  }

  function pushAlert(text) {
    const item = `${new Date().toLocaleTimeString()} - ${text}`;
    state.alerts.unshift(item);
    state.alerts = state.alerts.slice(0, 25);
    els.alertCount.textContent = `${state.alerts.length}`;
    els.alertFeed.innerHTML = state.alerts.map((v) => `<li>${v}</li>`).join("");
  }

  function toggleSidebar(force) {
    const open = typeof force === "boolean" ? force : !els.sidebar.classList.contains("is-open");
    els.sidebar.classList.toggle("is-open", open);
    els.mobileBackdrop.classList.toggle("is-open", open);
  }

  function updateToggleButton(btn, onText, offText, onState) {
    btn.classList.toggle("is-on", onState);
    btn.querySelector("span").textContent = onState ? onText : offText;
  }

  function setModule(moduleKey) {
    state.activeModule = moduleKey;
    els.moduleTabs.querySelectorAll("button[data-module]").forEach((b) => {
      b.classList.toggle("is-active", b.dataset.module === moduleKey);
    });
    document.querySelectorAll(".module-card").forEach((card) => {
      card.classList.toggle("is-hidden", card.dataset.section !== moduleKey);
    });
    pushLog(`Switched to module: ${moduleKey}`);
  }

  function updateWallet(delta) {
    state.walletValue = Math.max(1000, state.walletValue + delta);
    els.walletValue.textContent = `$${fmt.format(Math.round(state.walletValue))}`;
  }

  function makeTx() {
    const status = sample(["sealed", "validating", "failed", "sealed", "validating"]);
    const amount = Math.round(rand(120, 12000));
    return {
      id: crypto.randomUUID().slice(0, 8),
      hash: `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`,
      account: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 10)}`,
      amount,
      status,
      gas: rand(0.001, 0.01).toFixed(4),
      time: new Date().toLocaleTimeString()
    };
  }

  function seedTx(count = 30) {
    state.tx = Array.from({ length: count }, () => makeTx());
  }

  function renderTxTable() {
    const q = els.txSearch.value.trim().toLowerCase();
    const f = els.txFilter.value;
    const filtered = state.tx.filter((t) => {
      const passFilter = f === "all" || t.status === f;
      const passSearch = !q || t.hash.toLowerCase().includes(q) || t.account.toLowerCase().includes(q);
      return passFilter && passSearch;
    });

    els.txBody.innerHTML = filtered.map((t) => `
      <tr class="tx-row" data-id="${t.id}">
        <td>${t.hash}</td>
        <td>${t.account}</td>
        <td>$${fmt.format(t.amount)}</td>
        <td><span class="badge ${t.status}">${t.status}</span></td>
      </tr>
    `).join("");

    els.txCount.textContent = `${filtered.length} tx`;
    els.kpiQueue.textContent = `${filtered.length}`;

    els.txBody.querySelectorAll(".tx-row").forEach((row) => {
      row.addEventListener("click", () => {
        const target = state.tx.find((t) => t.id === row.dataset.id);
        if (!target) return;
        els.drawerBody.innerHTML = `
          <p><strong>Hash:</strong> ${target.hash}</p>
          <p><strong>Account:</strong> ${target.account}</p>
          <p><strong>Amount:</strong> $${fmt.format(target.amount)}</p>
          <p><strong>Status:</strong> ${target.status}</p>
          <p><strong>Gas:</strong> ${target.gas} VLX</p>
          <p><strong>Submitted:</strong> ${target.time}</p>
        `;
        els.txDrawer.classList.add("is-open");
      });
    });
  }

  function renderTopology() {
    const total = 48;
    const warn = Math.floor(rand(1, 6));
    const hot = Math.floor(rand(1, 3));
    let html = "";

    for (let i = 1; i <= total; i += 1) {
      const cls = i <= hot ? "node hot" : i <= hot + warn ? "node warn" : "node";
      html += `<div class="${cls} ${Math.random() > 0.8 ? "active" : ""}" data-node="N${i}">N${i}</div>`;
    }

    els.networkMap.innerHTML = html;
    els.nodeTotal.textContent = `${total}`;
    els.nodeWarn.textContent = `${warn + hot}`;
    els.nodeLatency.textContent = `${Math.round(rand(15, 36))} ms`;
    els.topologyState.textContent = hot > 1 ? "Watch" : "Healthy";

    els.networkMap.querySelectorAll(".node").forEach((n) => {
      n.addEventListener("click", () => {
        pushAlert(`Node ${n.dataset.node} inspected`);
        pushLog(`Node inspect action: ${n.dataset.node}`);
        showToast(`Node ${n.dataset.node}`);
      });
    });
  }

  function drawRuntimeChart() {
    const canvas = els.runtimeChart;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "rgba(77, 229, 255, 0.18)");
    gradient.addColorStop(1, "rgba(77, 229, 255, 0.01)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i <= 10; i += 1) {
      ctx.strokeStyle = "rgba(138,235,255,0.08)";
      ctx.beginPath();
      ctx.moveTo(40, (h - 20) * (i / 10) + 10);
      ctx.lineTo(w - 10, (h - 20) * (i / 10) + 10);
      ctx.stroke();
    }

    const points = 34;
    const modeScale = state.chartMode === "latency" ? 1.4 : state.chartMode === "failure" ? 0.7 : 1;

    const drawLine = (color, mul, yShift) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      for (let i = 0; i < points; i += 1) {
        const x = 40 + (i * (w - 70)) / (points - 1);
        const amp = (Math.sin((Date.now() / 700) + i * 0.35 + yShift) * 22 + rand(-6, 6)) * mul * modeScale;
        const y = h - 40 - (i * 2.4) % 26 - amp;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    if (state.chartMode === "failure") {
      drawLine("#ff8484", 0.45, 0.2);
      drawLine("#ffd66a", 0.3, 1.1);
    } else if (state.chartMode === "latency") {
      drawLine("#ffd66a", 0.9, 0.2);
      drawLine("#58e8ff", 0.55, 1.4);
    } else if (state.chartMode === "tps") {
      drawLine("#58e8ff", 1.1, 0.4);
      drawLine("#5dffc2", 0.8, 1.4);
    } else {
      drawLine("#58e8ff", 1, 0.2);
      drawLine("#5dffc2", 0.72, 1.1);
      drawLine("#ffd66a", 0.54, 2.1);
    }
  }

  function drawFx() {
    const c = els.fxCanvas;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 65 }, () => ({
      x: rand(0, c.width), y: rand(0, c.height), r: rand(0.5, 1.8), v: rand(0.2, 0.85)
    }));

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      particles.forEach((p) => {
        p.y -= p.v;
        if (p.y < -10) { p.y = c.height + 10; p.x = rand(0, c.width); }
        ctx.beginPath();
        ctx.fillStyle = "rgba(112, 241, 255, 0.55)";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    };
    loop();
  }

  function updateKPIs() {
    const replaying = Date.now() < state.replayUntil;
    const burstMul = state.burst ? 1.7 : 1;
    const engineMul = state.engineOn ? 1 : 0.35;

    const tps = Math.max(8, Math.round((state.tpsBase + rand(-24, 28)) * burstMul * engineMul));
    const latency = Math.max(20, Math.round((state.latencyBase + rand(-19, 18)) / burstMul + (state.engineOn ? 0 : 50)));
    const success = Math.max(62, Math.min(99.9, state.successBase + rand(-2.5, 1.8) + (state.burst ? -1.4 : 0) + (state.engineOn ? 0 : -9)));

    els.kpiTps.textContent = `${tps}`;
    els.kpiLatency.textContent = `${latency} ms`;
    els.kpiSuccess.textContent = `${success.toFixed(1)}%`;

    state.tee = Math.max(10, Math.min(98, state.tee + rand(-4, 5)));
    els.teeProgress.style.width = `${state.tee}%`;

    updateWallet(rand(-45, 60));

    if (Math.random() > (replaying ? 0.3 : 0.72)) {
      state.tx.unshift(makeTx());
      state.tx = state.tx.slice(0, 50);
      renderTxTable();
    }

    if (success < 90 && Math.random() > 0.6) pushAlert(`Success rate dropped to ${success.toFixed(1)}%`);
    if (latency > 190 && Math.random() > 0.6) pushAlert(`Latency spike detected: ${latency}ms`);

    if (Math.random() > 0.65) renderTopology();
    drawRuntimeChart();
  }

  function actionHandler(label) {
    els.lastAction.textContent = `Last action: ${label} @ ${new Date().toLocaleTimeString()}`;
    pushLog(`${label} submitted`);
    showToast(`${label} submitted`);
  }

  function bindEvents() {
    els.mobileMenuBtn.addEventListener("click", () => toggleSidebar());
    els.mobileBackdrop.addEventListener("click", () => toggleSidebar(false));

    els.mobileRefreshBtn.addEventListener("click", () => {
      state.tx.unshift(makeTx());
      renderTxTable();
      renderTopology();
      drawRuntimeChart();
      pushLog("Manual refresh");
      showToast("Live data refreshed");
    });

    els.engineToggle.addEventListener("click", () => {
      state.engineOn = !state.engineOn;
      updateToggleButton(els.engineToggle, "RUNNING", "PAUSED", state.engineOn);
      els.runState.textContent = state.engineOn ? "RUNNING" : "PAUSED";
      els.runState.style.borderColor = state.engineOn ? "rgba(89,255,199,.45)" : "rgba(255,116,116,.45)";
      els.runState.style.background = state.engineOn ? "rgba(89,255,199,.15)" : "rgba(255,116,116,.16)";
      pushLog(`Engine ${state.engineOn ? "resumed" : "paused"}`);
      showToast(state.engineOn ? "Engine resumed" : "Engine paused");
    });

    els.transferToggle.addEventListener("click", () => {
      const on = !els.transferToggle.classList.contains("is-on");
      updateToggleButton(els.transferToggle, "ENABLED", "DISABLED", on);
      pushLog(`Transfer guard ${on ? "enabled" : "disabled"}`);
      showToast(on ? "Transfer guard enabled" : "Transfer guard disabled");
    });

    els.replayBtn.addEventListener("click", () => {
      state.replayUntil = Date.now() + 5 * 60 * 1000;
      pushLog("Replay mode enabled (5m)");
      showToast("Replay mode: 5 minutes");
    });

    els.boostBtn.addEventListener("click", () => {
      state.burst = !state.burst;
      els.boostBtn.textContent = state.burst ? "Burst x2 ON" : "Burst x2";
      pushLog(`Burst mode ${state.burst ? "enabled" : "disabled"}`);
      showToast(state.burst ? "Burst mode enabled" : "Burst mode disabled");
    });

    els.batchWindow.addEventListener("input", () => { els.batchValue.textContent = `${els.batchWindow.value} min`; });
    els.revalidationRange.addEventListener("input", () => { els.revalidationValue.textContent = `${els.revalidationRange.value}%`; });

    els.moduleTabs.addEventListener("click", (e) => {
      const target = e.target.closest("button[data-module]");
      if (!target) return;
      setModule(target.dataset.module);
      showToast(`Viewing: ${target.textContent}`);
    });

    els.chartTabs.addEventListener("click", (e) => {
      const target = e.target.closest("button[data-mode]");
      if (!target) return;
      state.chartMode = target.dataset.mode;
      els.chartTabs.querySelectorAll("button").forEach((b) => b.classList.remove("is-active"));
      target.classList.add("is-active");
      pushLog(`Chart mode: ${state.chartMode}`);
      drawRuntimeChart();
    });

    [els.txSearch, els.txFilter].forEach((el) => el.addEventListener("input", renderTxTable));
    els.drawerClose.addEventListener("click", () => els.txDrawer.classList.remove("is-open"));

    els.syncBtn.addEventListener("click", () => actionHandler("Sync batch"));
    els.manageBtn.addEventListener("click", () => actionHandler("Governance manage"));
    els.withdrawBtn.addEventListener("click", () => { updateWallet(-rand(400, 2400)); actionHandler("Withdraw request"); });
    els.quickStakeBtn.addEventListener("click", () => { updateWallet(-rand(800, 3100)); actionHandler("Quick stake"); });

    els.clearAlertsBtn.addEventListener("click", () => {
      state.alerts = [];
      els.alertFeed.innerHTML = "";
      els.alertCount.textContent = "0";
      pushLog("Alerts cleared");
    });

    els.clearLogBtn.addEventListener("click", () => {
      state.logs = [];
      els.eventLog.innerHTML = "";
      showToast("Logs cleared");
    });

    els.injectFailBtn.addEventListener("click", () => {
      state.successBase = Math.max(70, state.successBase - 3.8);
      state.latencyBase = Math.min(280, state.latencyBase + 22);
      pushAlert("Failure scenario injected");
      pushLog("Injected failure scenario");
    });

    els.recoverBtn.addEventListener("click", () => {
      state.successBase = Math.min(95.5, state.successBase + 2.6);
      state.latencyBase = Math.max(105, state.latencyBase - 18);
      pushLog("Recovery scenario applied");
      showToast("Recovery applied");
    });

    els.randomBurstBtn.addEventListener("click", () => {
      state.tpsBase = Math.round(rand(110, 190));
      state.queueBase = Math.round(rand(20, 70));
      state.tx.unshift(makeTx(), makeTx(), makeTx());
      state.tx = state.tx.slice(0, 50);
      renderTxTable();
      pushLog("Random traffic burst executed");
      showToast("Burst injected");
    });

    window.addEventListener("keydown", (e) => {
      if (e.target && ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;
      if (e.key === "1") setModule("disclosure");
      if (e.key === "2") setModule("pipeline");
      if (e.key === "3") setModule("zk");
      if (e.key === "4") setModule("governance");
      if (e.key.toLowerCase() === "r") els.mobileRefreshBtn.click();
      if (e.code === "Space") { e.preventDefault(); els.engineToggle.click(); }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) toggleSidebar(false);
      drawRuntimeChart();
    });
  }

  function init() {
    seedTx();
    renderTxTable();
    renderTopology();
    drawRuntimeChart();
    drawFx();
    bindEvents();

    updateToggleButton(els.engineToggle, "RUNNING", "PAUSED", true);
    updateToggleButton(els.transferToggle, "ENABLED", "DISABLED", true);
    setModule("disclosure");

    pushLog("Console boot completed");
    pushAlert("Monitoring pipeline started");

    setInterval(updateKPIs, 1600);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

