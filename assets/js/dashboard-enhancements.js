(() => {
  const STORAGE_KEY = "veilux.dashboard.enhanced.v1";

  const defaultState = {
    activeSection: "dashboard",
    connectedWallet: false,
    analyticsRange: "7d",
    privacyMode: "shielded",
    swap: {
      amount: "1000",
      fromToken: "Veilux",
      toToken: "Ethereum",
    },
    features: {
      anonymousTransactions: true,
      balancePrivacy: true,
      ipProtection: true,
      identityShield: false,
    },
    settings: {
      transactionAlerts: true,
      daoAlerts: true,
      securityUpdates: true,
      darkMode: true,
    },
    contracts: [
      { id: "ct-01", name: "Treasury Vesting", summary: "Locked treasury release cadence for core reserves.", status: "Active", action: "Claim" },
      { id: "ct-02", name: "Liquidity Shield Vault", summary: "Staged liquidity policy with discretionary release rules.", status: "Review", action: "Approve" },
      { id: "ct-03", name: "Partner Escrow", summary: "Protected milestone escrow for distribution counterparties.", status: "Pending", action: "Sign" },
    ],
    proposals: [
      { id: "gp-11", title: "Increase Privacy Pool Allocation", summary: "Raise privacy pool allocation from 40% to 50% for higher shielded capacity.", support: 67, opposition: 33, voters: 1245, deadline: "Ends in 3 days" },
      { id: "gp-12", title: "Upgrade zkSNARK Protocol", summary: "Adopt the latest proving circuit for lower latency and stronger transaction privacy.", support: 82, opposition: 18, voters: 2103, deadline: "Ends in 5 days" },
    ],
    notifications: [
      { id: "nt-01", tone: "success", icon: "fa-check-circle", title: "Transfer settled", detail: "1,250 Veilux arrived in the protected treasury lane.", time: "2h ago", read: false },
      { id: "nt-02", tone: "info", icon: "fa-vote-yea", title: "Proposal awaiting vote", detail: "Governance item gp-11 is approaching quorum.", time: "5h ago", read: false },
      { id: "nt-03", tone: "warning", icon: "fa-shield-alt", title: "Security review", detail: "Routing profile was updated for higher anonymity.", time: "1d ago", read: false },
    ],
    queue: [
      { id: "q-01", title: "Protected treasury transfer", detail: "Queued for shielded execution with dual approval.", progress: 84, status: "Review" },
      { id: "q-02", title: "zk proof attestation", detail: "Generating disclosure package for institutional onboarding.", progress: 61, status: "Processing" },
      { id: "q-03", title: "Partner escrow release", detail: "Awaiting final signer confirmation before release window.", progress: 42, status: "Pending" },
    ],
    activity: [
      { id: "a-01", title: "Treasury lane refreshed", detail: "Protected routing policy synced with the latest wallet posture.", time: "Just now" },
      { id: "a-02", title: "Liquidity shield reviewed", detail: "Exposure limits were checked against the privacy threshold.", time: "18m ago" },
      { id: "a-03", title: "Analytics export prepared", detail: "Executive snapshot is ready for board review.", time: "1h ago" },
    ],
  };

  const analyticsRanges = {
    "24h": {
      volume: "$2.4M",
      users: "12,458",
      latency: "2.3s",
      privacy: "98.4%",
      insights: [
        "Institutional transfer count increased 14% over the previous 24 hours.",
        "Protected swap routes stayed inside the target fee corridor.",
        "Governance participation held above the weekly average.",
      ],
    },
    "7d": {
      volume: "$14.8M",
      users: "18,720",
      latency: "2.6s",
      privacy: "98.1%",
      insights: [
        "Shielded wallet usage is pacing ahead of the prior week.",
        "DAO engagement remained stable through proposal rollover.",
        "High-value settlements concentrated in the treasury and partner lanes.",
      ],
    },
    "1m": {
      volume: "$62.1M",
      users: "41,386",
      latency: "2.9s",
      privacy: "97.8%",
      insights: [
        "Private swap throughput is now the primary growth driver.",
        "Average confirmation time improved 11% month over month.",
        "Policy-driven storage activity expanded with enterprise usage.",
      ],
    },
    "1y": {
      volume: "$412M",
      users: "186,400",
      latency: "3.1s",
      privacy: "97.5%",
      insights: [
        "Wallet retention climbed as protected settlement features matured.",
        "Governance cycles became more efficient after rights automation.",
        "Veilux app surfaces moved from proof-of-concept to operational tooling.",
      ],
    },
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return deepClone(defaultState);
      return { ...deepClone(defaultState), ...JSON.parse(raw) };
    } catch {
      return deepClone(defaultState);
    }
  }

  const state = loadState();

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[char] || char;
    });
  }

  function session() {
    try {
      return JSON.parse(localStorage.getItem("veilux.site.session") || "null") || {
        label: "Veilux Member",
        wallet: "0x7a3...f4c2",
        initials: "VX",
      };
    } catch {
      return {
        label: "Veilux Member",
        wallet: "0x7a3...f4c2",
        initials: "VX",
      };
    }
  }

  function toast(message, type = "info") {
    if (typeof window.showToast === "function") {
      window.showToast(message, type);
    }
  }

  function sanitizeText(value) {
    return String(value || "").replace(/\s+/g, " ").replace(/[^\x20-\x7E]/g, " ").trim();
  }

  function unreadCount() {
    return state.notifications.filter((item) => !item.read).length;
  }

  function renderNotifications() {
    const list = document.getElementById("notificationList");
    const badge = document.getElementById("notificationBadge");

    if (badge) {
      badge.textContent = String(unreadCount());
      badge.style.display = unreadCount() ? "flex" : "none";
    }

    if (!list) return;

    if (!state.notifications.length) {
      list.innerHTML = '<div class="dashboard-empty">No notifications right now.</div>';
      return;
    }

    list.innerHTML = state.notifications
      .map(
        (item) => `
          <div class="notification-item" style="padding: 15px; background: ${item.read ? "rgba(138, 43, 226, 0.04)" : "rgba(138, 43, 226, 0.1)"}; border-left: 3px solid ${item.tone === "success" ? "#00D98F" : item.tone === "warning" ? "#FFBB00" : "#8A2BE2"}; border-radius: 8px;">
            <div style="display:flex; align-items:start; gap:12px;">
              <i class="fas ${escapeHtml(item.icon)}" style="color:${item.tone === "success" ? "#00D98F" : item.tone === "warning" ? "#FFBB00" : "#8A2BE2"}; font-size:20px; margin-top:2px;"></i>
              <div style="flex:1;">
                <h4 style="color:#fff; font-size:14px; font-weight:600; margin-bottom:5px;">${escapeHtml(item.title)}</h4>
                <p style="color:#B3B3C0; font-size:13px; margin:0;">${escapeHtml(item.detail)}</p>
                <span style="color:#8A2BE2; font-size:11px; margin-top:5px; display:block;">${escapeHtml(item.time)}</span>
              </div>
            </div>
          </div>
        `
      )
      .join("");
  }

  function ensureTransactionDrawer() {
    if (document.getElementById("transactionDrawer")) return;

    const drawer = document.createElement("div");
    drawer.className = "transaction-drawer";
    drawer.id = "transactionDrawer";
    drawer.innerHTML = `
      <div class="transaction-drawer__backdrop" data-drawer-close></div>
      <aside class="transaction-drawer__panel">
        <div class="transaction-drawer__header">
          <div>
            <div class="dashboard-surface__eyebrow"><i class="fas fa-receipt"></i>Transaction Detail</div>
            <h3 style="color:#fff; margin:10px 0 0;">Protected Settlement Record</h3>
          </div>
          <button class="transaction-drawer__close" type="button" data-drawer-close><i class="fas fa-times"></i></button>
        </div>
        <div id="transactionDrawerBody"></div>
      </aside>
    `;
    document.body.appendChild(drawer);
  }

  function closeTransactionDrawer() {
    document.getElementById("transactionDrawer")?.classList.remove("is-open");
  }

  function renderDashboardOverview() {
    const host = document.getElementById("dashboardContent");
    if (!host) return;

    let shell = document.getElementById("dashboardEnhancedOverview");
    if (!shell) {
      shell = document.createElement("div");
      shell.id = "dashboardEnhancedOverview";
      host.insertBefore(shell, host.firstElementChild);
    }

    const currentSession = session();

    shell.innerHTML = `
      <section class="dashboard-command-bar">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-sparkles"></i>Operations Pulse</div>
          <h2 class="dashboard-surface__title">Operate the Veilux stack with one investor-ready console.</h2>
          <p class="dashboard-surface__text">This view pulls together treasury posture, protected execution, governance readiness, and active workflows into a single operating picture.</p>
          <div class="dashboard-chip-row">
            <span class="dashboard-chip"><i class="fas fa-user-shield"></i>${escapeHtml(currentSession.label)}</span>
            <span class="dashboard-chip"><i class="fas fa-wallet"></i>${escapeHtml(currentSession.wallet)}</span>
            <span class="dashboard-chip"><i class="fas fa-shield-check"></i>${state.privacyMode[0].toUpperCase() + state.privacyMode.slice(1)} mode</span>
          </div>
          <div class="dashboard-command-metrics">
            <div class="dashboard-command-metric">
              <strong>84%</strong>
              <span>Execution lane readiness</span>
            </div>
            <div class="dashboard-command-metric">
              <strong>${state.queue.length}</strong>
              <span>Active workflow lanes</span>
            </div>
            <div class="dashboard-command-metric">
              <strong>${unreadCount()}</strong>
              <span>Unread signals</span>
            </div>
          </div>
          <div class="dashboard-inline-actions">
            <button class="btn btn-primary" type="button" data-dash-action="stage-transfer"><i class="fas fa-arrow-up-right-dots"></i>Stage Transfer</button>
            <button class="btn btn-secondary" type="button" data-dash-action="open-governance"><i class="fas fa-vote-yea"></i>Open Governance</button>
            <button class="btn btn-secondary" type="button" data-dash-action="refresh-queue"><i class="fas fa-rotate"></i>Refresh Queue</button>
          </div>
        </article>
        <aside class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-satellite-dish"></i>System Posture</div>
          <div class="dashboard-rail-stat">
            <div class="dashboard-toggle-row">
              <div>
                <strong class="dashboard-kicker">98.4%</strong>
                <div class="dashboard-inline-meta">Protected settlement confidence</div>
              </div>
              <span class="dashboard-status-badge" data-tone="success"><i class="fas fa-circle-check"></i>Stable</span>
            </div>
            <div class="dashboard-toggle-row">
              <div>
                <strong class="dashboard-kicker">2.3s</strong>
                <div class="dashboard-inline-meta">Average confirmation latency</div>
              </div>
              <span class="dashboard-status-badge" data-tone="info"><i class="fas fa-wave-square"></i>Live</span>
            </div>
            <div class="dashboard-toggle-row">
              <div>
                <strong class="dashboard-kicker">3 / 3</strong>
                <div class="dashboard-inline-meta">Security controls online</div>
              </div>
              <span class="dashboard-status-badge" data-tone="warning"><i class="fas fa-shield-halved"></i>Monitored</span>
            </div>
          </div>
        </aside>
      </section>
      <section class="dashboard-ops-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-diagram-project"></i>Workflow Lanes</div>
          <div class="dashboard-lane-list">
            ${state.queue
              .map(
                (item) => `
                  <article class="dashboard-lane-item">
                    <div class="dashboard-lane-top">
                      <div>
                        <strong>${escapeHtml(item.title)}</strong>
                        <div class="dashboard-inline-meta">${escapeHtml(item.detail)}</div>
                      </div>
                      <span class="dashboard-status-badge" data-tone="${item.status === "Review" ? "warning" : item.status === "Processing" ? "info" : "success"}">${escapeHtml(item.status)}</span>
                    </div>
                    <div class="dashboard-progress-track"><span style="width:${item.progress}%"></span></div>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-bolt"></i>Activity Stream</div>
          <div class="dashboard-stream-list">
            ${state.activity
              .map(
                (item) => `
                  <article class="dashboard-stream-item">
                    <div class="dashboard-stream-top">
                      <strong>${escapeHtml(item.title)}</strong>
                      <span class="dashboard-inline-meta">${escapeHtml(item.time)}</span>
                    </div>
                    <p>${escapeHtml(item.detail)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderWalletSection() {
    const host = document.getElementById("walletContent");
    if (!host) return;

    const currentSession = session();

    host.innerHTML = `
      <section class="dashboard-wallet-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-wallet"></i>Wallet Control</div>
          <h2 class="dashboard-surface__title">Treasury and personal custody</h2>
          <p class="dashboard-surface__text">Manage the primary Veilux treasury, investor allocation lanes, and protected settlement accounts from one secure control point.</p>
          <div class="dashboard-data-grid">
            <div class="dashboard-data-card"><strong>12,458.45 Veilux</strong><span>Available balance</span></div>
            <div class="dashboard-data-card"><strong>${state.connectedWallet ? "Connected" : "Offline"}</strong><span>Current wallet state</span></div>
            <div class="dashboard-data-card"><strong>3</strong><span>Protected accounts</span></div>
            <div class="dashboard-data-card"><strong>2 / 3</strong><span>Approvals collected</span></div>
          </div>
          <div class="dashboard-inline-actions" style="margin-top:20px;">
            <button class="btn btn-primary" type="button" data-wallet-action="toggle">${state.connectedWallet ? "Disconnect Wallet" : "Connect Wallet"}</button>
            <button class="btn btn-secondary" type="button" data-wallet-action="copy">Copy Address</button>
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-layer-group"></i>Account Lanes</div>
          <div class="dashboard-wallet-list">
            <article class="dashboard-wallet-item">
              <div class="dashboard-wallet-top"><strong>Main Treasury</strong><span class="dashboard-status-badge" data-tone="success">Primary</span></div>
              <p>${escapeHtml(currentSession.wallet)}</p>
              <div class="dashboard-allocation-bar"><span style="width:72%"></span></div>
            </article>
            <article class="dashboard-wallet-item">
              <div class="dashboard-wallet-top"><strong>Execution Vault</strong><span class="dashboard-status-badge" data-tone="info">Shielded</span></div>
              <p>0xc21...912e</p>
              <div class="dashboard-allocation-bar"><span style="width:54%"></span></div>
            </article>
            <article class="dashboard-wallet-item">
              <div class="dashboard-wallet-top"><strong>Settlement Buffer</strong><span class="dashboard-status-badge" data-tone="warning">Pending</span></div>
              <p>0xe18...7f34</p>
              <div class="dashboard-allocation-bar"><span style="width:38%"></span></div>
            </article>
          </div>
        </article>
      </section>
    `;
  }

  function renderPrivacySection() {
    const host = document.getElementById("privacyContent");
    if (!host) return;

    const toggleCard = (key, title, description) => `
      <article class="dashboard-setting-card">
        <div class="dashboard-toggle-row">
          <div>
            <strong>${escapeHtml(title)}</strong>
            <p>${escapeHtml(description)}</p>
          </div>
          <button class="dashboard-switch ${state.features[key] ? "is-on" : ""}" type="button" data-feature-key="${escapeHtml(key)}" aria-label="${escapeHtml(title)}"></button>
        </div>
      </article>
    `;

    host.innerHTML = `
      <section class="dashboard-privacy-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-user-secret"></i>Shield Profile</div>
          <h2 class="dashboard-surface__title">Privacy Shield</h2>
          <p class="dashboard-surface__text">Fine-tune transaction visibility, routing protection, and identity shielding without leaving the main dashboard.</p>
          <div class="dashboard-segmented" data-privacy-mode>
            <button type="button" class="${state.privacyMode === "balanced" ? "is-active" : ""}" data-privacy-mode-option="balanced">Balanced</button>
            <button type="button" class="${state.privacyMode === "shielded" ? "is-active" : ""}" data-privacy-mode-option="shielded">Shielded</button>
            <button type="button" class="${state.privacyMode === "stealth" ? "is-active" : ""}" data-privacy-mode-option="stealth">Stealth</button>
          </div>
          <div class="dashboard-data-grid" style="margin-top:20px;">
            <div class="dashboard-data-card"><strong>98%</strong><span>Transaction privacy</span></div>
            <div class="dashboard-data-card"><strong>100%</strong><span>Identity shielding</span></div>
            <div class="dashboard-data-card"><strong>95%</strong><span>Network masking</span></div>
            <div class="dashboard-data-card"><strong>Maximum</strong><span>Current policy score</span></div>
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-sliders"></i>Protection Controls</div>
          <div class="dashboard-wallet-list">
            ${toggleCard("anonymousTransactions", "Anonymous Transactions", "Hide wallet lineage across transfers and settlements.")}
            ${toggleCard("balancePrivacy", "Balance Privacy", "Conceal visible holdings from shared surfaces and explorers.")}
            ${toggleCard("ipProtection", "IP Protection", "Route traffic through the Veilux privacy network.")}
            ${toggleCard("identityShield", "Identity Shield", "Use disposable addresses for reduced correlation.")}
          </div>
        </article>
      </section>
    `;
  }

  function computeSwapEstimate() {
    const rates = {
      Veilux: { Ethereum: 0.00042, Bitcoin: 0.000006, USDT: 1.04 },
      Ethereum: { Veilux: 2380, Bitcoin: 0.014, USDT: 2490 },
      Bitcoin: { Veilux: 158000, Ethereum: 68, USDT: 178000 },
      USDT: { Veilux: 0.96, Ethereum: 0.00039, Bitcoin: 0.0000054 },
    };

    const amount = Number(state.swap.amount || 0);
    const rate = rates[state.swap.fromToken]?.[state.swap.toToken] || 0;

    return {
      amount: amount * rate,
      rate,
      fee: Math.max(0.1, amount * 0.0002),
    };
  }

  function renderSwapSection() {
    const host = document.getElementById("swapContent");
    if (!host) return;

    const estimate = computeSwapEstimate();
    const tokenOptions = ["Veilux", "Ethereum", "Bitcoin", "USDT"];

    host.innerHTML = `
      <section class="dashboard-swap-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-exchange-alt"></i>Swap Composer</div>
          <h2 class="dashboard-surface__title">Protected swap route</h2>
          <div class="dashboard-form-grid">
            <div class="dashboard-form-row">
              <div class="dashboard-field" style="flex:1 1 220px;">
                <label for="swap-amount">From amount</label>
                <input id="swap-amount" type="number" min="0" step="0.01" value="${escapeHtml(state.swap.amount)}" data-swap-field="amount">
              </div>
              <div class="dashboard-field" style="flex:1 1 180px;">
                <label for="swap-from-token">From token</label>
                <select id="swap-from-token" data-swap-field="fromToken">
                  ${tokenOptions.map((token) => `<option value="${token}" ${token === state.swap.fromToken ? "selected" : ""}>${token}</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="dashboard-form-row">
              <div class="dashboard-field" style="flex:1 1 220px;">
                <label for="swap-estimate">Estimated receive</label>
                <input id="swap-estimate" type="text" value="${estimate.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })}" readonly>
              </div>
              <div class="dashboard-field" style="flex:1 1 180px;">
                <label for="swap-to-token">To token</label>
                <select id="swap-to-token" data-swap-field="toToken">
                  ${tokenOptions.map((token) => `<option value="${token}" ${token === state.swap.toToken ? "selected" : ""}>${token}</option>`).join("")}
                </select>
              </div>
            </div>
            <div class="dashboard-inline-actions">
              <button class="btn btn-primary" type="button" data-swap-submit><i class="fas fa-lock"></i>Review Protected Route</button>
            </div>
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-route"></i>Route Detail</div>
          <div class="dashboard-route-card">
            <div class="dashboard-route-top">
              <strong>${escapeHtml(state.swap.fromToken)} -> ${escapeHtml(state.swap.toToken)}</strong>
              <span class="dashboard-status-badge" data-tone="success">Shielded</span>
            </div>
            <p>Rate: 1 ${escapeHtml(state.swap.fromToken)} = ${estimate.rate.toLocaleString("en-US", { maximumFractionDigits: 6 })} ${escapeHtml(state.swap.toToken)}</p>
            <p>Fee budget: ${estimate.fee.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${escapeHtml(state.swap.fromToken)}</p>
            <div class="dashboard-progress-track"><span style="width:89%"></span></div>
          </div>
          <div class="dashboard-wallet-list" style="margin-top:16px;">
            <article class="dashboard-wallet-item">
              <div class="dashboard-wallet-top"><strong>Entry lane</strong><span class="dashboard-inline-meta">Protected ingress</span></div>
              <p>Routing through the privacy vault before settlement.</p>
            </article>
            <article class="dashboard-wallet-item">
              <div class="dashboard-wallet-top"><strong>Settlement lane</strong><span class="dashboard-inline-meta">Delayed disclosure</span></div>
              <p>Outputs are masked until the final confirmation threshold is met.</p>
            </article>
          </div>
        </article>
      </section>
    `;
  }

  function renderContractsSection() {
    const host = document.getElementById("contractsContent");
    if (!host) return;

    host.innerHTML = `
      <section class="dashboard-contracts-grid">
        ${state.contracts
          .map(
            (contract) => `
              <article class="dashboard-surface dashboard-contract-item">
                <div class="dashboard-contract-top">
                  <div>
                    <div class="dashboard-surface__eyebrow"><i class="fas fa-file-contract"></i>Contract</div>
                    <strong>${escapeHtml(contract.name)}</strong>
                  </div>
                  <span class="dashboard-status-badge" data-tone="${contract.status === "Active" ? "success" : contract.status === "Review" ? "warning" : "info"}">${escapeHtml(contract.status)}</span>
                </div>
                <p>${escapeHtml(contract.summary)}</p>
                <div class="dashboard-card-footer">
                  <button class="btn btn-secondary" type="button" data-contract-action="open" data-contract-id="${escapeHtml(contract.id)}">Open</button>
                  <button class="btn btn-primary" type="button" data-contract-action="${escapeHtml(contract.action.toLowerCase())}" data-contract-id="${escapeHtml(contract.id)}">${escapeHtml(contract.action)}</button>
                </div>
              </article>
            `
          )
          .join("")}
      </section>
    `;
  }

  function renderDaoSection() {
    const host = document.getElementById("daoContent");
    if (!host) return;

    host.innerHTML = `
      <section class="dashboard-ops-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-vote-yea"></i>Governance Agenda</div>
          <div class="dashboard-proposal-list">
            ${state.proposals
              .map(
                (proposal) => `
                  <article class="dashboard-proposal-item">
                    <div class="dashboard-proposal-top">
                      <div>
                        <strong>${escapeHtml(proposal.title)}</strong>
                        <p>${escapeHtml(proposal.summary)}</p>
                      </div>
                      <span class="dashboard-status-badge" data-tone="info">${escapeHtml(proposal.deadline)}</span>
                    </div>
                    <div class="dashboard-data-row">
                      <span class="dashboard-inline-meta">${proposal.support}% support</span>
                      <span class="dashboard-inline-meta">${proposal.opposition}% opposition</span>
                      <span class="dashboard-inline-meta">${proposal.voters} voters</span>
                    </div>
                    <div class="dashboard-progress-track"><span style="width:${proposal.support}%"></span></div>
                    <div class="dashboard-card-footer" style="margin-top:14px;">
                      <button class="btn btn-primary" type="button" data-proposal-vote="support" data-proposal-id="${escapeHtml(proposal.id)}">Vote For</button>
                      <button class="btn btn-secondary" type="button" data-proposal-vote="oppose" data-proposal-id="${escapeHtml(proposal.id)}">Vote Against</button>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-timeline"></i>Governance Context</div>
          <div class="dashboard-stream-list">
            <article class="dashboard-stream-item">
              <div class="dashboard-stream-top"><strong>Quorum posture</strong><span class="dashboard-status-badge" data-tone="success">Healthy</span></div>
              <p>Voting participation is tracking ahead of the weekly target and support remains above the execution threshold.</p>
            </article>
            <article class="dashboard-stream-item">
              <div class="dashboard-stream-top"><strong>Member visibility</strong><span class="dashboard-status-badge" data-tone="info">Protected</span></div>
              <p>Anonymous voting remains active for all live proposals in the current cycle.</p>
            </article>
          </div>
        </article>
      </section>
    `;
  }

  function renderAnalyticsSection() {
    const host = document.getElementById("analyticsContent");
    if (!host) return;

    const range = analyticsRanges[state.analyticsRange] || analyticsRanges["7d"];

    host.innerHTML = `
      <section class="dashboard-analytics-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-chart-line"></i>Analytics Range</div>
          <div class="dashboard-segmented">
            ${["24h", "7d", "1m", "1y"]
              .map((item) => `<button type="button" class="${item === state.analyticsRange ? "is-active" : ""}" data-analytics-range="${item}">${item.toUpperCase()}</button>`)
              .join("")}
          </div>
          <div class="dashboard-data-grid" style="margin-top:20px;">
            <div class="dashboard-data-card"><strong>${range.volume}</strong><span>Volume</span></div>
            <div class="dashboard-data-card"><strong>${range.users}</strong><span>Active users</span></div>
            <div class="dashboard-data-card"><strong>${range.latency}</strong><span>Average latency</span></div>
            <div class="dashboard-data-card"><strong>${range.privacy}</strong><span>Privacy coverage</span></div>
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-lightbulb"></i>Key Insights</div>
          <div class="dashboard-analytics-list">
            ${range.insights
              .map(
                (item, index) => `
                  <article class="dashboard-analytics-item">
                    <div class="dashboard-route-top">
                      <strong>Insight ${index + 1}</strong>
                      <span class="dashboard-inline-meta">${state.analyticsRange.toUpperCase()}</span>
                    </div>
                    <p>${escapeHtml(item)}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </article>
      </section>
    `;
  }

  function renderSettingsSection() {
    const host = document.getElementById("settingsContent");
    if (!host) return;

    const toggleRow = (key, label) => `
      <div class="dashboard-toggle-row">
        <span>${escapeHtml(label)}</span>
        <button class="dashboard-switch ${state.settings[key] ? "is-on" : ""}" type="button" data-setting-toggle="${escapeHtml(key)}" aria-label="${escapeHtml(label)}"></button>
      </div>
    `;

    host.innerHTML = `
      <section class="dashboard-settings-grid">
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-bell"></i>Alerts</div>
          <div class="dashboard-wallet-list">
            <article class="dashboard-setting-card">${toggleRow("transactionAlerts", "Transaction alerts")}</article>
            <article class="dashboard-setting-card">${toggleRow("daoAlerts", "DAO proposal alerts")}</article>
            <article class="dashboard-setting-card">${toggleRow("securityUpdates", "Security updates")}</article>
          </div>
        </article>
        <article class="dashboard-surface">
          <div class="dashboard-surface__eyebrow"><i class="fas fa-sliders"></i>Workspace Preferences</div>
          <div class="dashboard-wallet-list">
            <article class="dashboard-setting-card">${toggleRow("darkMode", "Dark mode")}</article>
            <article class="dashboard-setting-card">
              <div class="dashboard-toggle-row">
                <div>
                  <strong>Active session</strong>
                  <p>Current profile: ${escapeHtml(session().label)}</p>
                </div>
                <button class="btn btn-secondary" type="button" data-dashboard-save>Save</button>
              </div>
            </article>
          </div>
        </article>
      </section>
    `;
  }

  function openTransactionDrawer(tx) {
    const drawer = document.getElementById("transactionDrawer");
    const body = document.getElementById("transactionDrawerBody");
    if (!drawer || !body) return;

    body.innerHTML = `
      <div class="transaction-detail-list">
        <div class="transaction-detail-row"><span>Transaction ID</span><strong>${escapeHtml(tx.id)}</strong></div>
        <div class="transaction-detail-row"><span>Type</span><strong>${escapeHtml(tx.type)}</strong></div>
        <div class="transaction-detail-row"><span>Amount</span><strong>${escapeHtml(tx.amount)}</strong></div>
        <div class="transaction-detail-row"><span>Status</span><strong>${escapeHtml(tx.status)}</strong></div>
        <div class="transaction-detail-row"><span>Date</span><strong>${escapeHtml(tx.date)}</strong></div>
        <div class="transaction-detail-row"><span>Privacy</span><strong>Fully shielded</strong></div>
        <div class="transaction-detail-row"><span>Execution lane</span><strong>Protected settlement</strong></div>
      </div>
      <div class="dashboard-inline-actions" style="margin-top:20px;">
        <button class="btn btn-secondary" type="button" data-copy-transaction="${escapeHtml(tx.id)}">Copy ID</button>
        <button class="btn btn-primary" type="button" data-replay-transaction="${escapeHtml(tx.id)}">Replay Route</button>
      </div>
    `;

    drawer.classList.add("is-open");
  }

  function transactionFromTable(txId) {
    const rows = Array.from(document.querySelectorAll("#transactionBody tr"));
    for (const row of rows) {
      const cells = row.querySelectorAll("td");
      if (!cells.length) continue;
      const id = sanitizeText(cells[0]?.textContent);
      if (id === sanitizeText(txId)) {
        return {
          id,
          type: sanitizeText(cells[1]?.textContent),
          amount: sanitizeText(cells[2]?.textContent),
          status: sanitizeText(cells[3]?.textContent),
          date: sanitizeText(cells[4]?.textContent),
        };
      }
    }

    return {
      id: sanitizeText(txId),
      type: "Protected transfer",
      amount: "Confidential",
      status: "Confirmed",
      date: "Recently",
    };
  }

  function updateHeaderSummary(section) {
    const header = document.querySelector(".dashboard-header");
    const title = header?.querySelector("h1");
    if (!header || !title) return;

    let summary = header.querySelector(".dashboard-header-summary");
    if (!summary) {
      summary = document.createElement("p");
      summary.className = "dashboard-header-summary";
      summary.style.color = "#B3B3C0";
      summary.style.fontSize = "14px";
      summary.style.margin = "6px 0 0";
      title.insertAdjacentElement("afterend", summary);
    }

    const labels = {
      dashboard: "Operations, portfolio posture, and protected settlement signals.",
      wallet: "Custody, treasury lanes, and protected account controls.",
      privacy: "Shield profile, routing posture, and disclosure controls.",
      swap: "Private routing, settlement review, and shielded exchange.",
      contracts: "Contract lifecycle, approvals, and release controls.",
      dao: "Anonymous voting, proposal context, and governance readiness.",
      analytics: "Volume, usage, latency, and privacy performance.",
      settings: "Alerts, workspace preferences, and session controls.",
    };

    summary.textContent = labels[section] || labels.dashboard;
  }

  function markWalletButtons() {
    document.querySelectorAll('button[onclick="connectWallet()"]').forEach((button) => {
      button.dataset.walletAction = "toggle";
      button.innerHTML = state.connectedWallet
        ? '<i class="fas fa-circle-check"></i> Wallet Connected'
        : '<i class="fas fa-wallet"></i> Connect Wallet';
    });
  }

  function connectWallet() {
    state.connectedWallet = !state.connectedWallet;
    saveState();
    markWalletButtons();
    renderWalletSection();
    toast(state.connectedWallet ? "Wallet connected successfully." : "Wallet disconnected.", state.connectedWallet ? "success" : "warning");
  }

  function toggleNotifications() {
    const panel = document.getElementById("notificationPanel");
    if (!panel) return;
    panel.style.display = panel.style.display === "none" || !panel.style.display ? "block" : "none";
  }

  function clearNotifications() {
    state.notifications = [];
    saveState();
    renderNotifications();
    toast("Notifications cleared.", "success");
  }

  function refreshQueue() {
    state.queue.unshift({
      id: `q-${Date.now()}`,
      title: "Execution lane refreshed",
      detail: "Workflow lanes were resynced against the latest transaction and governance state.",
      progress: 100,
      status: "Stable",
    });
    state.queue = state.queue.slice(0, 4);
    state.activity.unshift({
      id: `a-${Date.now()}`,
      title: "Queue refresh completed",
      detail: "Operational lanes were refreshed from the dashboard command center.",
      time: "Just now",
    });
    state.activity = state.activity.slice(0, 4);
    state.notifications.unshift({
      id: `nt-${Date.now()}`,
      tone: "info",
      icon: "fa-rotate",
      title: "Queue refreshed",
      detail: "The command center refreshed all current workflow lanes.",
      time: "Just now",
      read: false,
    });
    saveState();
    renderDashboardOverview();
    renderNotifications();
    toast("Workflow lanes refreshed.", "success");
  }

  function showSection(section, element) {
    const sections = ["dashboard", "wallet", "privacy", "swap", "contracts", "dao", "analytics", "settings"];

    sections.forEach((key) => {
      const content = document.getElementById(`${key}Content`);
      if (content) {
        content.style.display = key === section ? "block" : "none";
      }
    });

    document.querySelectorAll(".sidebar-menu a").forEach((link) => link.classList.remove("active"));
    if (element) {
      element.classList.add("active");
    } else {
      document.querySelector(`.sidebar-menu a[href="#${section}Content"]`)?.classList.add("active");
    }

    state.activeSection = section;
    saveState();
    updateHeaderSummary(section);

    if (window.innerWidth <= 768) {
      document.getElementById("sidebar")?.classList.remove("mobile-active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderAll() {
    renderNotifications();
    renderDashboardOverview();
    renderWalletSection();
    renderPrivacySection();
    renderSwapSection();
    renderContractsSection();
    renderDaoSection();
    renderAnalyticsSection();
    renderSettingsSection();
    markWalletButtons();
    updateHeaderSummary(state.activeSection);
    showSection(state.activeSection);
  }

  function bindEvents() {
    document.body.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-dash-action]");
      const featureToggle = event.target.closest("[data-feature-key]");
      const privacyModeOption = event.target.closest("[data-privacy-mode-option]");
      const walletAction = event.target.closest("[data-wallet-action]");
      const contractAction = event.target.closest("[data-contract-action]");
      const proposalVote = event.target.closest("[data-proposal-vote]");
      const analyticsRange = event.target.closest("[data-analytics-range]");
      const settingToggle = event.target.closest("[data-setting-toggle]");
      const swapSubmit = event.target.closest("[data-swap-submit]");
      const drawerClose = event.target.closest("[data-drawer-close]");
      const copyTransaction = event.target.closest("[data-copy-transaction]");
      const replayTransaction = event.target.closest("[data-replay-transaction]");
      const saveDashboard = event.target.closest("[data-dashboard-save]");

      if (drawerClose) {
        closeTransactionDrawer();
        return;
      }

      if (copyTransaction) {
        navigator.clipboard?.writeText(copyTransaction.dataset.copyTransaction || "");
        toast("Transaction ID copied.", "success");
        return;
      }

      if (replayTransaction) {
        closeTransactionDrawer();
        showSection("swap");
        toast(`Loaded ${replayTransaction.dataset.replayTransaction} into the swap review context.`, "info");
        return;
      }

      if (trigger) {
        if (trigger.dataset.dashAction === "stage-transfer") {
          showSection("wallet");
          toast("Transfer staging opened in wallet control.", "success");
        } else if (trigger.dataset.dashAction === "open-governance") {
          showSection("dao");
          toast("Governance workspace opened.", "info");
        } else if (trigger.dataset.dashAction === "refresh-queue") {
          refreshQueue();
        }
        return;
      }

      if (featureToggle) {
        const key = featureToggle.dataset.featureKey;
        state.features[key] = !state.features[key];
        saveState();
        renderPrivacySection();
        toast(`${key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)} ${state.features[key] ? "enabled" : "disabled"}.`, state.features[key] ? "success" : "warning");
        return;
      }

      if (privacyModeOption) {
        state.privacyMode = privacyModeOption.dataset.privacyModeOption;
        saveState();
        renderPrivacySection();
        renderDashboardOverview();
        toast(`Privacy mode switched to ${state.privacyMode}.`, "info");
        return;
      }

      if (walletAction) {
        if (walletAction.dataset.walletAction === "toggle") {
          connectWallet();
        } else if (walletAction.dataset.walletAction === "copy") {
          navigator.clipboard?.writeText(session().wallet || "");
          toast("Wallet address copied.", "success");
        }
        return;
      }

      if (contractAction) {
        const target = state.contracts.find((item) => item.id === contractAction.dataset.contractId);
        if (!target) return;
        if (contractAction.dataset.contractAction === "open") {
          toast(`${target.name} opened.`, "info");
        } else {
          target.status = "Active";
          saveState();
          renderContractsSection();
          toast(`${target.name} updated with ${contractAction.dataset.contractAction}.`, "success");
        }
        return;
      }

      if (proposalVote) {
        const target = state.proposals.find((item) => item.id === proposalVote.dataset.proposalId);
        if (!target) return;
        if (proposalVote.dataset.proposalVote === "support") {
          target.support = Math.min(96, target.support + 2);
          target.opposition = Math.max(4, target.opposition - 1);
        } else {
          target.opposition = Math.min(42, target.opposition + 2);
          target.support = Math.max(12, target.support - 1);
        }
        target.voters += 1;
        state.notifications.unshift({
          id: `nt-${Date.now()}`,
          tone: "success",
          icon: "fa-vote-yea",
          title: "Vote recorded",
          detail: `${target.title} received a ${proposalVote.dataset.proposalVote} vote.`,
          time: "Just now",
          read: false,
        });
        saveState();
        renderDaoSection();
        renderNotifications();
        toast("Governance vote recorded.", "success");
        return;
      }

      if (analyticsRange) {
        state.analyticsRange = analyticsRange.dataset.analyticsRange;
        saveState();
        renderAnalyticsSection();
        toast(`Analytics updated to ${state.analyticsRange.toUpperCase()}.`, "info");
        return;
      }

      if (settingToggle) {
        const key = settingToggle.dataset.settingToggle;
        state.settings[key] = !state.settings[key];
        saveState();
        renderSettingsSection();
        toast(`${key.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)} ${state.settings[key] ? "enabled" : "disabled"}.`, state.settings[key] ? "success" : "warning");
        return;
      }

      if (swapSubmit) {
        const estimate = computeSwapEstimate();
        state.notifications.unshift({
          id: `nt-${Date.now()}`,
          tone: "info",
          icon: "fa-route",
          title: "Protected route reviewed",
          detail: `${state.swap.amount} ${state.swap.fromToken} is ready to route into ${estimate.amount.toLocaleString("en-US", { maximumFractionDigits: 4 })} ${state.swap.toToken}.`,
          time: "Just now",
          read: false,
        });
        saveState();
        renderNotifications();
        toast("Protected swap route prepared.", "success");
        return;
      }

      if (saveDashboard) {
        toast("Workspace preferences saved.", "success");
      }
    });

    document.body.addEventListener("input", (event) => {
      const field = event.target.closest("[data-swap-field]");
      if (!field) return;
      state.swap[field.dataset.swapField] = field.value;
      saveState();
      renderSwapSection();
    });

    document.body.addEventListener("change", (event) => {
      const field = event.target.closest("[data-swap-field]");
      if (!field) return;
      state.swap[field.dataset.swapField] = field.value;
      if (state.swap.fromToken === state.swap.toToken) {
        state.swap.toToken = state.swap.fromToken === "Veilux" ? "Ethereum" : "Veilux";
      }
      saveState();
      renderSwapSection();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTransactionDrawer();
      }
    });
  }

  function initLegacyTransactionRows() {
    document.querySelectorAll("#transactionBody tr").forEach((row) => {
      row.querySelectorAll("td").forEach((cell) => {
        cell.textContent = sanitizeText(cell.textContent);
      });
    });
  }

  function init() {
    if (!document.querySelector(".dashboard-wrapper")) return;

    ensureTransactionDrawer();
    initLegacyTransactionRows();

    window.connectWallet = connectWallet;
    window.toggleNotifications = toggleNotifications;
    window.clearNotifications = clearNotifications;
    window.showSection = showSection;
    window.navigateToSection = (section) => showSection(section);
    window.showTransactionDetail = (txId) => openTransactionDrawer(transactionFromTable(txId));

    bindEvents();
    renderAll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
