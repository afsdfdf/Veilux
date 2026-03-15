(() => {
  const STORAGE_KEY = "veilux.apps.workspace.v1";

  const sections = {
    control: {
      label: "Control Center",
      title: "Veilux Workspace",
      summary:
        "Operate the Veilux application layer as a unified product workspace with fast module switching, layered context, live activity, and workflow control.",
    },
    defi: {
      label: "DeFi Suite",
      title: "Confidential DeFi",
      summary:
        "Focus on private exchange, encrypted lending, and low-exposure capital flows with product-level UX for hidden order flow, protected collateral, and MEV-resistant execution.",
    },
    identity: {
      label: "Identity Hub",
      title: "Zero-Knowledge Identity",
      summary:
        "Bring identity, access control, and governance into one privacy-first interface where users can prove what matters without exposing everything.",
    },
    ai: {
      label: "AI Studio",
      title: "Confidential AI Studio",
      summary:
        "A secure AI workspace for encrypted inference, private models, and protected data zones built for enterprise and research teams.",
    },
    enterprise: {
      label: "Enterprise Vault",
      title: "Enterprise Privacy Operations",
      summary:
        "Design secure analytics, collaboration, and audit-ready workflows where teams share insights instead of raw sensitive data.",
    },
    roadmap: {
      label: "Release View",
      title: "Launch Readiness",
      summary:
        "Connect the whitepaper roadmap to product delivery. Use this view to manage release priorities, rollout stages, and upcoming workstreams.",
    },
  };

  const modules = [
    {
      id: "dex",
      section: "defi",
      name: "Private Exchange",
      suite: "Confidential DeFi",
      state: "live",
      stage: "Workspace Ready",
      privacyScore: 97,
      readiness: 82,
      throughput: "1.2M",
      summary:
        "A flagship product surface for protected trading with hidden order flow, reduced strategy leakage, and clear MEV-resistance messaging.",
      tags: ["Encrypted routing", "MEV protection", "Hidden orders"],
      details: [
        "Present order flow and matching states without exposing sensitive execution patterns.",
        "Reduce visibility before trade, during trade, and after settlement.",
        "Strong candidate for the first production-grade Veilux app surface.",
      ],
      metrics: [
        { label: "Encrypted flows", value: "1.2M" },
        { label: "Liquidity pools", value: "24" },
        { label: "Protection grade", value: "AAA" },
      ],
      activity: [
        { label: "Liquidity vault refreshed", detail: "New protected pool layout prepared for mainnet preview.", type: "Update", time: "2m ago" },
        { label: "Routing validation passed", detail: "Privacy-preserving pathfinding stayed within the target latency budget.", type: "Validation", time: "18m ago" },
      ],
    },
    {
      id: "lend",
      section: "defi",
      name: "Encrypted Lending",
      suite: "Confidential Credit",
      state: "preview",
      stage: "Beta Ready",
      privacyScore: 94,
      readiness: 71,
      throughput: "640K",
      summary:
        "A lending UI for private collateral, protected liquidations, and credit workflows that avoid revealing full portfolio structure.",
      tags: ["Private collateral", "Risk engine", "Liquidation shield"],
      details: [
        "Turn private collateral and protected liquidation into the main product story.",
        "Ready to expand into market views, vault pages, and borrower health surfaces.",
        "Well suited for a follow-up risk profile and collateral composition view.",
      ],
      metrics: [
        { label: "Vault profiles", value: "08" },
        { label: "Risk bands", value: "12" },
        { label: "Stress score", value: "Low" },
      ],
      activity: [
        { label: "Collateral drawer updated", detail: "Portfolio masking rules were refined for the latest lending release.", type: "Design", time: "9m ago" },
        { label: "Health factor states synced", detail: "Risk UI now aligns with encrypted liquidation states.", type: "Sync", time: "35m ago" },
      ],
    },
    {
      id: "id",
      section: "identity",
      name: "Veilux ID",
      suite: "Identity Hub",
      state: "live",
      stage: "Design System Complete",
      privacyScore: 99,
      readiness: 88,
      throughput: "900K",
      summary:
        "A unified identity experience for zero-knowledge credentials, access checks, and selective disclosure across product surfaces.",
      tags: ["ZK credentials", "Selective disclosure", "Access control"],
      details: [
        "Prove identity attributes without exposing complete identity records.",
        "Reusable across DAO member access, organization onboarding, and user verification.",
        "Ideal for future onboarding, profile, and proof request views.",
      ],
      metrics: [
        { label: "Credential packs", value: "18" },
        { label: "Proof templates", value: "32" },
        { label: "Trust tier", value: "High" },
      ],
      activity: [
        { label: "Proof kit expanded", detail: "New templates added for member access and governance entry.", type: "Product", time: "6m ago" },
        { label: "Disclosure rules reviewed", detail: "Field-level masking aligned with compliance display rules.", type: "Review", time: "42m ago" },
      ],
    },
    {
      id: "gov",
      section: "identity",
      name: "Governance Studio",
      suite: "DAO Operations",
      state: "preview",
      stage: "Beta Flow",
      privacyScore: 95,
      readiness: 76,
      throughput: "420K",
      summary:
        "A DAO operations surface for anonymous voting, proposal review, member permissions, and protected governance workflows.",
      tags: ["Anonymous voting", "Proposal ops", "Member rights"],
      details: [
        "Visualize governance processes while reducing unnecessary voter exposure.",
        "Ready for proposal lists, lifecycle states, and results dashboards.",
        "Strong bridge from VeiluxDAO narrative to an actual product surface.",
      ],
      metrics: [
        { label: "Active proposals", value: "05" },
        { label: "Voting sessions", value: "14" },
        { label: "Approval path", value: "ZK" },
      ],
      activity: [
        { label: "Proposal flow staged", detail: "Discussion, voting, and execution states wired for UI preview.", type: "Flow", time: "12m ago" },
        { label: "Voting anonymity check", detail: "Ballot exposure indicators dropped to protected mode.", type: "Security", time: "58m ago" },
      ],
    },
    {
      id: "ai",
      section: "ai",
      name: "Confidential AI Studio",
      suite: "AI Operations",
      state: "preview",
      stage: "Pilot UI",
      privacyScore: 96,
      readiness: 69,
      throughput: "3.6T",
      summary:
        "A secure AI control room for encrypted inference, private model handling, and protected data-zone operations.",
      tags: ["Encrypted inference", "Private training", "Model guardrails"],
      details: [
        "Combine jobs, models, permissions, and data access into one AI studio surface.",
        "Perfect for queue states, run history, and notebook-like interactions later on.",
        "One of the strongest modules for a true product-grade visual identity.",
      ],
      metrics: [
        { label: "Inference runs", value: "284" },
        { label: "Secure models", value: "11" },
        { label: "Data zones", value: "06" },
      ],
      activity: [
        { label: "Inference queue updated", detail: "Protected run states now support cleaner transitions across secure jobs.", type: "Queue", time: "4m ago" },
        { label: "Model vault expanded", detail: "IP protection layer surfaced in the inspector panel.", type: "Model", time: "27m ago" },
      ],
    },
    {
      id: "vault",
      section: "enterprise",
      name: "Analytics Vault",
      suite: "Enterprise Privacy",
      state: "live",
      stage: "Ops Ready",
      privacyScore: 98,
      readiness: 85,
      throughput: "2.4M",
      summary:
        "A clean enterprise workspace for privacy-safe analytics, cross-team collaboration, and compliance-ready reporting.",
      tags: ["Compliance view", "Secure analytics", "Cross-org insights"],
      details: [
        "Bring analytics, permissions, output distribution, and audit trails into one workflow.",
        "Well positioned for later integration with enterprise datasets and policy engines.",
        "Strong foundation for either a SaaS landing page or a full operations console.",
      ],
      metrics: [
        { label: "Protected datasets", value: "42" },
        { label: "Teams onboarded", value: "09" },
        { label: "Audit trails", value: "100%" },
      ],
      activity: [
        { label: "Audit views refreshed", detail: "Compliance surface aligned with privacy-first disclosure rules.", type: "Audit", time: "8m ago" },
        { label: "Team workspace switched", detail: "Cross-org activity now updates permission posture in place.", type: "Ops", time: "51m ago" },
      ],
    },
  ];

  const baseScenarios = [
    { id: "s1", title: "Institutional DEX Launch", section: "defi", moduleId: "dex", phase: "Today", owner: "Product", note: "Refine the trading workspace, pair explorer navigation, and protected execution console for investor demos.", state: "Live" },
    { id: "s2", title: "ZK Member Access", section: "identity", moduleId: "id", phase: "This Week", owner: "Design", note: "Turn Veilux ID into onboarding, credentials, and access management screens.", state: "Review" },
    { id: "s3", title: "Confidential AI Queue", section: "ai", moduleId: "ai", phase: "Next", owner: "Ops", note: "Coordinate model runs, queue health, and secure data-zone switching.", state: "Active" },
    { id: "s4", title: "Enterprise Insight Room", section: "enterprise", moduleId: "vault", phase: "Next", owner: "Growth", note: "Frame a clean analyst workspace with export-safe reporting views.", state: "Queued" },
  ];

  function createWorkspaceState() {
    return {
      dex: {
        pair: "VXL/USDC",
        side: "buy",
        amount: "25000",
        price: "1.018",
        orders: [
          { id: "od-24", pair: "VXL/USDC", side: "Buy", size: "18,000", price: "1.018", status: "Open" },
          { id: "od-18", pair: "ETH/VXL", side: "Sell", size: "420", price: "12.40", status: "Routing" },
        ],
        trades: [
          { id: "tr-31", pair: "VXL/USDC", price: "1.017", size: "4,800", venue: "Dark pool" },
          { id: "tr-29", pair: "ETH/VXL", price: "12.38", size: "210", venue: "Private route" },
        ],
      },
      lend: {
        collateral: "450000",
        borrow: "180000",
        profile: "Institutional Growth",
        positions: [
          { id: "lp-08", vault: "Institutional Growth", collateral: "$450K", borrow: "$180K", health: "1.84", status: "Healthy" },
          { id: "lp-04", vault: "Delta Treasury", collateral: "$120K", borrow: "$44K", health: "2.12", status: "Stable" },
        ],
      },
      id: {
        bundle: "Institutional",
        requestor: "Counterparty desk",
        proofs: ["Accredited Investor", "Jurisdiction", "Entity Verification"],
        requests: [
          { id: "pr-11", bundle: "Institutional", scope: "Counterparty desk", status: "Verified" },
          { id: "pr-07", bundle: "Compliance", scope: "Treasury onboarding", status: "Ready" },
        ],
      },
      gov: {
        selected: "Treasury Diversification",
        proposals: [
          { id: "gp-03", title: "Treasury Diversification", support: 68, opposition: 19, status: "Live Vote" },
          { id: "gp-02", title: "Privacy Pool Expansion", support: 72, opposition: 14, status: "Review" },
        ],
      },
      ai: {
        model: "Veilux Secure 7B",
        zone: "Research Zone",
        prompt: "Summarize encrypted settlement anomalies from the latest secure dataset.",
        jobs: [
          { id: "jb-18", model: "Veilux Secure 7B", zone: "Research Zone", status: "Running" },
          { id: "jb-15", model: "Ledger Watch 4B", zone: "Audit Vault", status: "Completed" },
        ],
      },
      vault: {
        dataset: "Cross-border Settlement",
        query: "List counterparties with unusual settlement compression over the last 7 days.",
        reports: [
          { id: "rp-22", dataset: "Cross-border Settlement", status: "Shared", audience: "Finance" },
          { id: "rp-19", dataset: "Treasury Exposure", status: "Review", audience: "Operations" },
        ],
      },
    };
  }

  const defaultState = {
    section: "control",
    mode: "overview",
    filter: "all",
    query: "",
    selectedModuleId: "dex",
    scenarios: [...baseScenarios],
    dynamicFeed: [],
    workspace: createWorkspaceState(),
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaultState };
      return { ...defaultState, ...JSON.parse(raw) };
    } catch {
      return { ...defaultState };
    }
  }

  const state = loadState();
  const els = {
    sectionTitle: document.querySelector("[data-vv-section-title]"),
    sectionLabel: document.querySelector("[data-vv-section-label]"),
    sectionSummary: document.querySelector("[data-vv-section-summary]"),
    signalGrid: document.querySelector("[data-vv-signals]"),
    kpiGrid: document.querySelector("[data-vv-kpis]"),
    moduleGrid: document.querySelector("[data-vv-modules]"),
    inspector: document.querySelector("[data-vv-inspector]"),
    workspace: document.querySelector("[data-vv-workspace]"),
    queue: document.querySelector("[data-vv-queue]"),
    scenarioGrid: document.querySelector("[data-vv-scenarios]"),
    activityList: document.querySelector("[data-vv-activity]"),
    searchInput: document.querySelector("[data-vv-search]"),
    modal: document.querySelector("[data-vv-modal]"),
    toast: document.querySelector("[data-vv-toast]"),
    form: document.querySelector("[data-vv-form]"),
    moduleSelect: document.querySelector("[data-vv-module-select]"),
  };

  const scenarioStates = ["Queued", "Active", "Live", "Review"];

  if (!els.sectionTitle) {
    return;
  }

  function normalizeWorkspace(source) {
    const defaults = createWorkspaceState();
    const next = source && typeof source === "object" ? source : {};

    return {
      dex: {
        ...defaults.dex,
        ...(next.dex && typeof next.dex === "object" ? next.dex : {}),
        orders: Array.isArray(next.dex?.orders) ? next.dex.orders : defaults.dex.orders,
        trades: Array.isArray(next.dex?.trades) ? next.dex.trades : defaults.dex.trades,
      },
      lend: {
        ...defaults.lend,
        ...(next.lend && typeof next.lend === "object" ? next.lend : {}),
        positions: Array.isArray(next.lend?.positions) ? next.lend.positions : defaults.lend.positions,
      },
      id: {
        ...defaults.id,
        ...(next.id && typeof next.id === "object" ? next.id : {}),
        proofs: Array.isArray(next.id?.proofs) ? next.id.proofs : defaults.id.proofs,
        requests: Array.isArray(next.id?.requests) ? next.id.requests : defaults.id.requests,
      },
      gov: {
        ...defaults.gov,
        ...(next.gov && typeof next.gov === "object" ? next.gov : {}),
        proposals: Array.isArray(next.gov?.proposals) ? next.gov.proposals : defaults.gov.proposals,
      },
      ai: {
        ...defaults.ai,
        ...(next.ai && typeof next.ai === "object" ? next.ai : {}),
        jobs: Array.isArray(next.ai?.jobs) ? next.ai.jobs : defaults.ai.jobs,
      },
      vault: {
        ...defaults.vault,
        ...(next.vault && typeof next.vault === "object" ? next.vault : {}),
        reports: Array.isArray(next.vault?.reports) ? next.vault.reports : defaults.vault.reports,
      },
    };
  }

  state.scenarios = Array.isArray(state.scenarios) && state.scenarios.length ? state.scenarios : [...baseScenarios];
  state.dynamicFeed = Array.isArray(state.dynamicFeed) ? state.dynamicFeed : [];
  state.workspace = normalizeWorkspace(state.workspace);

  function saveState() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        dynamicFeed: state.dynamicFeed.slice(0, 12),
      })
    );
  }

  function moduleVisibleInSection(module) {
    return state.section === "control" || state.section === "roadmap" || module.section === state.section;
  }

  function filteredModules() {
    return modules.filter((module) => {
      if (!moduleVisibleInSection(module)) return false;

      if (state.filter !== "all" && module.state !== state.filter) return false;

      if (!state.query) return true;

      const haystack = [module.name, module.suite, module.summary, ...module.tags].join(" ").toLowerCase();
      return haystack.includes(state.query.toLowerCase());
    });
  }

  function ensureSelectedModule() {
    const visible = filteredModules();
    const current = modules.find((module) => module.id === state.selectedModuleId);

    if (visible.length && !visible.some((module) => module.id === state.selectedModuleId)) {
      state.selectedModuleId = visible[0].id;
      return visible[0];
    }

    if (current) {
      return current;
    }

    state.selectedModuleId = modules[0].id;
    return modules[0];
  }

  function activeModule() {
    return ensureSelectedModule();
  }

  function formatRelative(time) {
    const delta = Math.max(0, Date.now() - Number(time || Date.now()));
    const minutes = Math.floor(delta / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return "Recently";
  }

  function pushFeed(entry) {
    state.dynamicFeed.unshift({
      id: `feed-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      moduleId: entry.moduleId || state.selectedModuleId,
      label: entry.label,
      detail: entry.detail,
      type: entry.type || "Update",
      updatedAt: Date.now(),
    });
    state.dynamicFeed = state.dynamicFeed.slice(0, 12);
    saveState();
  }

  function aggregateMetrics(source) {
    const items = source.length ? source : modules;
    const liveCount = items.filter((module) => module.state === "live").length;
    const previewCount = items.filter((module) => module.state === "preview").length;
    const avgPrivacy = Math.round(items.reduce((sum, module) => sum + module.privacyScore, 0) / items.length);
    const avgReadiness = Math.round(items.reduce((sum, module) => sum + module.readiness, 0) / items.length);

    return {
      liveCount,
      previewCount,
      avgPrivacy,
      avgReadiness,
    };
  }

  function workspaceState(moduleId = state.selectedModuleId) {
    return state.workspace[moduleId] || normalizeWorkspace()[moduleId];
  }

  function queueItems(moduleId = state.selectedModuleId) {
    const workspace = workspaceState(moduleId);

    if (!workspace) return [];

    if (moduleId === "dex") {
      return workspace.orders.map((item) => ({
        title: `${item.pair} ${item.side} order`,
        detail: `${item.size} queued at ${item.price}`,
        status: item.status,
      }));
    }

    if (moduleId === "lend") {
      return workspace.positions.map((item) => ({
        title: item.vault,
        detail: `${item.borrow} borrowed against ${item.collateral}`,
        status: item.status,
      }));
    }

    if (moduleId === "id") {
      return workspace.requests.map((item) => ({
        title: item.scope,
        detail: `${item.bundle} proof bundle`,
        status: item.status,
      }));
    }

    if (moduleId === "gov") {
      return workspace.proposals.map((item) => ({
        title: item.title,
        detail: `${item.support}% support / ${item.opposition}% opposition`,
        status: item.status,
      }));
    }

    if (moduleId === "ai") {
      return workspace.jobs.map((item) => ({
        title: item.model,
        detail: `${item.zone} execution lane`,
        status: item.status,
      }));
    }

    if (moduleId === "vault") {
      return workspace.reports.map((item) => ({
        title: item.dataset,
        detail: `${item.audience} distribution`,
        status: item.status,
      }));
    }

    return [];
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

  function toneForStatus(value) {
    const normalized = String(value || "").toLowerCase();

    if (/(completed|verified|shared|healthy|stable|ready|live|open)/.test(normalized)) {
      return "live";
    }

    if (/(running|queued|routing|review|active|staged|draft|pending)/.test(normalized)) {
      return "preview";
    }

    return "design";
  }

  function focusPanel(element, message) {
    element?.scrollIntoView({ behavior: "smooth", block: "start" });

    if (message) {
      showToast(message);
    }
  }

  function showToast(message) {
    if (!els.toast) return;

    els.toast.innerHTML = `<i class="fas fa-circle-check"></i><span>${message}</span>`;
    els.toast.classList.add("is-visible");

    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      els.toast.classList.remove("is-visible");
    }, 2200);
  }

  function openModal(moduleId = state.selectedModuleId) {
    if (!els.modal) return;

    syncModuleSelect(moduleId);
    els.modal.classList.add("is-open");
  }

  function closeModal() {
    if (!els.modal) return;
    els.modal.classList.remove("is-open");
  }

  function renderHero() {
    const section = sections[state.section] || sections.control;
    const visibleModules = filteredModules();
    const metrics = aggregateMetrics(visibleModules.length ? visibleModules : modules);
    const activeScenarios = state.scenarios.filter((scenario) => {
      return state.section === "control" || state.section === "roadmap" || scenario.section === state.section;
    });
    const modeCopy = {
      overview: "Product overview",
      operations: "Operational view",
      roadmap: "Release mapping",
    };

    els.sectionLabel.textContent = section.label;
    els.sectionTitle.textContent = section.title;
    els.sectionSummary.textContent = `${section.summary} ${modeCopy[state.mode]} is currently active.`;

    const signals = [
      { value: `${visibleModules.length || modules.length}`, label: "Visible modules" },
      { value: `${metrics.avgPrivacy}%`, label: "Avg privacy score" },
      { value: `${metrics.avgReadiness}%`, label: "Avg readiness" },
      { value: `${activeScenarios.length}`, label: "Open workflows" },
    ];

    els.signalGrid.innerHTML = signals
      .map(
        (signal) => `
          <article class="vv-signal-card">
            <strong>${signal.value}</strong>
            <span>${signal.label}</span>
          </article>
        `
      )
      .join("");
  }

  function renderKpis() {
    const visibleModules = filteredModules();
    const metrics = aggregateMetrics(visibleModules.length ? visibleModules : modules);
    const visibleScenarios = state.scenarios.filter((scenario) => {
      return state.section === "control" || state.section === "roadmap" || scenario.section === state.section;
    });
    const cards = [
      { value: metrics.liveCount, label: "Live-ready modules" },
      { value: metrics.previewCount, label: "Preview modules" },
      { value: queueItems().length, label: "Open records" },
      { value: visibleScenarios.length, label: "Workflow items" },
    ];

    els.kpiGrid.innerHTML = cards
      .map(
        (card) => `
          <article class="vv-kpi-card">
            <strong>${card.value}</strong>
            <span>${card.label}</span>
          </article>
        `
      )
      .join("");
  }

  function renderModules() {
    const visibleModules = filteredModules();

    if (!visibleModules.length) {
      els.moduleGrid.innerHTML = `
        <article class="vv-module-card">
          <div class="vv-panel__eyebrow"><i class="fas fa-circle-info"></i>No matching modules</div>
          <h3>Try a broader filter</h3>
          <p>Switch filters, clear the search field, or jump to another section to keep exploring the app workspace.</p>
        </article>
      `;
      return;
    }

    els.moduleGrid.innerHTML = visibleModules
      .map((module) => {
        return `
          <article class="vv-module-card ${module.id === state.selectedModuleId ? "is-active" : ""}" data-vv-module-id="${module.id}">
            <div class="vv-module-card__header">
              <span class="vv-status" data-state="${module.state}">${module.stage}</span>
              <span class="vv-module-card__meta">${module.suite}</span>
            </div>
            <h3>${module.name}</h3>
            <p>${module.summary}</p>
            <div class="vv-module-card__tags">
              ${module.tags.map((tag) => `<span class="vv-label">${tag}</span>`).join("")}
            </div>
            <div class="vv-metric-row">
              <div class="vv-metric-card"><strong>${module.privacyScore}</strong><span>Privacy</span></div>
              <div class="vv-metric-card"><strong>${module.readiness}%</strong><span>Readiness</span></div>
              <div class="vv-metric-card"><strong>${module.throughput}</strong><span>Throughput</span></div>
            </div>
            <div class="vv-module-card__footer">
              <span class="vv-module-card__meta">State: ${module.state}</span>
              <span class="vv-module-card__meta">Open workspace</span>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderInspector() {
    const module = activeModule();
    const queue = queueItems(module.id);
    const recordLabelMap = {
      dex: "Open orders",
      lend: "Credit positions",
      id: "Proof requests",
      gov: "Proposal items",
      ai: "Secure jobs",
      vault: "Published reports",
    };

    els.inspector.innerHTML = `
      <div class="vv-inspector__body">
        <div>
          <div class="vv-panel__eyebrow"><i class="fas fa-circle-dot"></i>${module.suite}</div>
          <h3>${module.name}</h3>
          <p>${module.summary}</p>
        </div>
        <div class="vv-inspector__metric-grid">
          ${module.metrics
            .map(
              (metric) => `
                <div class="vv-metric-card">
                  <strong>${metric.value}</strong>
                  <span>${metric.label}</span>
                </div>
              `
            )
            .join("")}
          <div class="vv-metric-card">
            <strong>${queue.length}</strong>
            <span>${recordLabelMap[module.id] || "Open records"}</span>
          </div>
        </div>
        <ul class="list-unstyled vv-inspector__list">
          ${module.details.map((detail) => `<li><i class="fas fa-check"></i><span>${detail}</span></li>`).join("")}
        </ul>
        <div class="vv-inspector__cta">
          <button class="vv-primary-btn" type="button" data-vv-open-workspace="${module.id}"><i class="fas fa-window-maximize"></i>Open Workspace</button>
          <button class="vv-ghost-btn" type="button" data-vv-open-queue="${module.id}"><i class="fas fa-list-check"></i>Review Queue</button>
          <button class="vv-ghost-btn" type="button" data-vv-create-for="${module.id}"><i class="fas fa-plus"></i>New Workflow</button>
        </div>
      </div>
    `;
  }

  function renderWorkspace() {
    const module = activeModule();
    const workspace = workspaceState(module.id);

    if (!workspace || !els.workspace) return;

    const heroMarkup = (subtitle, stats) => `
      <section class="vv-workspace__hero">
        <div class="vv-workspace__hero-top">
          <div>
            <div class="vv-workspace__label">${escapeHtml(module.suite)}</div>
            <h3>${escapeHtml(module.name)}</h3>
            <p class="vv-workspace__subtitle">${escapeHtml(subtitle)}</p>
          </div>
          <span class="vv-status" data-state="${module.state}">${escapeHtml(module.stage)}</span>
        </div>
        <div class="vv-workspace__stats">
          ${stats
            .map(
              (metric) => `
                <div class="vv-metric-card">
                  <strong>${escapeHtml(metric.value)}</strong>
                  <span>${escapeHtml(metric.label)}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </section>
    `;

    const tableRows = (rows) => {
      if (!rows.length) {
        return `<p class="vv-empty-note">No records in this view yet.</p>`;
      }

      return rows.join("");
    };

    let markup = "";

    if (module.id === "dex") {
      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Protected order entry, private routing control, and discreet settlement review for institutional trading desks.", [
            { value: workspace.pair, label: "Selected pair" },
            { value: workspace.orders.length, label: "Open orders" },
            { value: workspace.trades.length, label: "Recent trades" },
          ])}
          <div class="vv-workspace__split">
            <form class="vv-workspace__form" data-vv-workspace-form="dex-order">
              <div class="vv-panel__eyebrow"><i class="fas fa-sliders"></i>Order Ticket</div>
              <h4>Prepare protected execution</h4>
              <div class="vv-workspace__meta">
                <button class="vv-pill-btn ${workspace.side === "buy" ? "is-active" : ""}" type="button" data-vv-dex-side="buy">Buy</button>
                <button class="vv-pill-btn ${workspace.side === "sell" ? "is-active" : ""}" type="button" data-vv-dex-side="sell">Sell</button>
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="dex-pair">Pair</label>
                  <select id="dex-pair" name="pair" data-vv-field="pair" data-vv-module="dex">
                    <option value="VXL/USDC" ${workspace.pair === "VXL/USDC" ? "selected" : ""}>VXL/USDC</option>
                    <option value="ETH/VXL" ${workspace.pair === "ETH/VXL" ? "selected" : ""}>ETH/VXL</option>
                    <option value="BTC/VXL" ${workspace.pair === "BTC/VXL" ? "selected" : ""}>BTC/VXL</option>
                  </select>
                </div>
                <div class="vv-form-group">
                  <label for="dex-amount">Amount</label>
                  <input id="dex-amount" name="amount" type="number" min="1" value="${escapeHtml(workspace.amount)}" data-vv-field="amount" data-vv-module="dex">
                </div>
                <div class="vv-form-group">
                  <label for="dex-price">Limit price</label>
                  <input id="dex-price" name="price" type="number" min="0" step="0.001" value="${escapeHtml(workspace.price)}" data-vv-field="price" data-vv-module="dex">
                </div>
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-arrow-right-arrow-left"></i>Stage Order</button>
                </div>
              </div>
            </form>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-list-ul"></i>Open Orders</div>
              <h4>Order book view</h4>
              <div class="vv-table-head">
                <span>Pair</span>
                <span>Side</span>
                <span>Size</span>
                <span>Status</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.orders.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.pair)}</span>
                      <span>${escapeHtml(item.side)}</span>
                      <span>${escapeHtml(item.size)}</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-order-action="route" data-vv-order-id="${escapeHtml(item.id)}">Advance</button>
                        <button class="vv-mini-btn" type="button" data-vv-order-action="cancel" data-vv-order-id="${escapeHtml(item.id)}">Cancel</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
          <section class="vv-workspace__table">
            <div class="vv-panel__eyebrow"><i class="fas fa-clock-rotate-left"></i>Recent Trades</div>
            <h4>Settlement history</h4>
            <div class="vv-table-head">
              <span>Pair</span>
              <span>Price</span>
              <span>Size</span>
              <span>Venue</span>
            </div>
            ${tableRows(
              workspace.trades.map(
                (item) => `
                  <div class="vv-table-row">
                    <span>${escapeHtml(item.pair)}</span>
                    <span>${escapeHtml(item.price)}</span>
                    <span>${escapeHtml(item.size)}</span>
                    <span>${escapeHtml(item.venue)}</span>
                  </div>
                `
              )
            )}
          </section>
        </div>
      `;
    } else if (module.id === "lend") {
      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Private collateral management, borrowing posture, and borrower health review in one secure lending surface.", [
            { value: workspace.profile, label: "Active profile" },
            { value: workspace.positions.length, label: "Positions" },
            { value: "$" + workspace.borrow, label: "Borrow target" },
          ])}
          <div class="vv-workspace__split">
            <form class="vv-workspace__form" data-vv-workspace-form="lend-position">
              <div class="vv-panel__eyebrow"><i class="fas fa-landmark"></i>Position Builder</div>
              <h4>Update collateral posture</h4>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="lend-profile">Profile</label>
                  <input id="lend-profile" name="profile" type="text" value="${escapeHtml(workspace.profile)}" data-vv-field="profile" data-vv-module="lend">
                </div>
                <div class="vv-form-group">
                  <label for="lend-collateral">Collateral</label>
                  <input id="lend-collateral" name="collateral" type="number" min="1" value="${escapeHtml(workspace.collateral)}" data-vv-field="collateral" data-vv-module="lend">
                </div>
                <div class="vv-form-group">
                  <label for="lend-borrow">Borrow</label>
                  <input id="lend-borrow" name="borrow" type="number" min="1" value="${escapeHtml(workspace.borrow)}" data-vv-field="borrow" data-vv-module="lend">
                </div>
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-coins"></i>Update Position</button>
                </div>
              </div>
            </form>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-chart-line"></i>Credit Book</div>
              <h4>Borrower positions</h4>
              <div class="vv-table-head">
                <span>Vault</span>
                <span>Collateral</span>
                <span>Borrow</span>
                <span>Health</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.positions.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.vault)}</span>
                      <span>${escapeHtml(item.collateral)}</span>
                      <span>${escapeHtml(item.borrow)}</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.health)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-position-action="load" data-vv-position-id="${escapeHtml(item.id)}">Open</button>
                        <button class="vv-mini-btn" type="button" data-vv-position-action="review" data-vv-position-id="${escapeHtml(item.id)}">Review</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
        </div>
      `;
    } else if (module.id === "id") {
      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Selective disclosure, credential packaging, and access review for partners, members, and institutional workflows.", [
            { value: workspace.bundle, label: "Bundle" },
            { value: workspace.proofs.length, label: "Selected proofs" },
            { value: workspace.requests.length, label: "Requests" },
          ])}
          <div class="vv-workspace__split">
            <form class="vv-workspace__form" data-vv-workspace-form="id-request">
              <div class="vv-panel__eyebrow"><i class="fas fa-fingerprint"></i>Credential Request</div>
              <h4>Create proof bundle</h4>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="id-bundle">Bundle</label>
                  <select id="id-bundle" name="bundle" data-vv-field="bundle" data-vv-module="id">
                    <option value="Institutional" ${workspace.bundle === "Institutional" ? "selected" : ""}>Institutional</option>
                    <option value="Compliance" ${workspace.bundle === "Compliance" ? "selected" : ""}>Compliance</option>
                    <option value="Governance" ${workspace.bundle === "Governance" ? "selected" : ""}>Governance</option>
                  </select>
                </div>
                <div class="vv-form-group">
                  <label for="id-requestor">Requestor</label>
                  <input id="id-requestor" name="requestor" type="text" value="${escapeHtml(workspace.requestor)}" data-vv-field="requestor" data-vv-module="id">
                </div>
              </div>
              <div class="vv-workspace__meta">
                ${["Accredited Investor", "Jurisdiction", "Entity Verification", "DAO Membership", "Treasury Approval"]
                  .map(
                    (proof) => `
                      <button class="vv-pill-btn ${workspace.proofs.includes(proof) ? "is-active" : ""}" type="button" data-vv-proof-option="${escapeHtml(proof)}">${escapeHtml(proof)}</button>
                    `
                  )
                  .join("")}
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-badge-check"></i>Issue Request</button>
                </div>
              </div>
            </form>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-user-shield"></i>Access Requests</div>
              <h4>Proof review queue</h4>
              <div class="vv-table-head">
                <span>Bundle</span>
                <span>Scope</span>
                <span>Status</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.requests.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.bundle)}</span>
                      <span>${escapeHtml(item.scope)}</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-request-action="open" data-vv-request-id="${escapeHtml(item.id)}">Open</button>
                        <button class="vv-mini-btn" type="button" data-vv-request-action="share" data-vv-request-id="${escapeHtml(item.id)}">Share</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
        </div>
      `;
    } else if (module.id === "gov") {
      const selectedProposal = workspace.proposals.find((item) => item.title === workspace.selected) || workspace.proposals[0];

      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Proposal drafting, protected voting, and rights management for DAO operations without exposing member intent.", [
            { value: workspace.proposals.length, label: "Active proposals" },
            { value: selectedProposal ? `${selectedProposal.support}%` : "0%", label: "Current support" },
            { value: selectedProposal ? selectedProposal.status : "Draft", label: "Selected status" },
          ])}
          <div class="vv-workspace__split">
            <div class="vv-workspace__form">
              <div class="vv-panel__eyebrow"><i class="fas fa-scale-balanced"></i>Proposal Review</div>
              <h4>${escapeHtml(selectedProposal ? selectedProposal.title : "No proposal selected")}</h4>
              <p class="vv-empty-note">Keep member visibility protected while still coordinating discussion, support, and next execution steps.</p>
              <div class="vv-workspace__meta">
                <button class="vv-pill-btn" type="button" data-vv-gov-vote="support" data-vv-gov-id="${escapeHtml(selectedProposal ? selectedProposal.id : "")}">Support</button>
                <button class="vv-pill-btn" type="button" data-vv-gov-vote="oppose" data-vv-gov-id="${escapeHtml(selectedProposal ? selectedProposal.id : "")}">Oppose</button>
                <button class="vv-pill-btn" type="button" data-vv-gov-select="${escapeHtml(selectedProposal ? selectedProposal.id : "")}">Set Focus</button>
              </div>
              <form class="vv-form-inline" data-vv-workspace-form="gov-proposal">
                <div class="vv-form-group">
                  <label for="gov-title">Proposal title</label>
                  <input id="gov-title" name="title" type="text" placeholder="Treasury policy update">
                </div>
                <div class="vv-form-group">
                  <label for="gov-note">Summary</label>
                  <input id="gov-note" name="summary" type="text" placeholder="Add a protected treasury allocation motion">
                </div>
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-plus"></i>Draft Proposal</button>
                </div>
              </form>
            </div>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-diagram-project"></i>Proposal Pipeline</div>
              <h4>Governance agenda</h4>
              <div class="vv-table-head">
                <span>Proposal</span>
                <span>Support</span>
                <span>Opposition</span>
                <span>Status</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.proposals.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.title)}</span>
                      <span>${escapeHtml(item.support)}%</span>
                      <span>${escapeHtml(item.opposition)}%</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-gov-select="${escapeHtml(item.id)}">Open</button>
                        <button class="vv-mini-btn" type="button" data-vv-gov-vote="support" data-vv-gov-id="${escapeHtml(item.id)}">Vote</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
        </div>
      `;
    } else if (module.id === "ai") {
      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Secure prompt composition, model-zone control, and governed AI job handling for private inference teams.", [
            { value: workspace.model, label: "Primary model" },
            { value: workspace.zone, label: "Security zone" },
            { value: workspace.jobs.length, label: "Job history" },
          ])}
          <div class="vv-workspace__split">
            <form class="vv-workspace__form" data-vv-workspace-form="ai-job">
              <div class="vv-panel__eyebrow"><i class="fas fa-brain"></i>Job Composer</div>
              <h4>Submit secure analysis</h4>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="ai-model">Model</label>
                  <select id="ai-model" name="model" data-vv-field="model" data-vv-module="ai">
                    <option value="Veilux Secure 7B" ${workspace.model === "Veilux Secure 7B" ? "selected" : ""}>Veilux Secure 7B</option>
                    <option value="Ledger Watch 4B" ${workspace.model === "Ledger Watch 4B" ? "selected" : ""}>Ledger Watch 4B</option>
                    <option value="Policy Guard 2B" ${workspace.model === "Policy Guard 2B" ? "selected" : ""}>Policy Guard 2B</option>
                  </select>
                </div>
                <div class="vv-form-group">
                  <label for="ai-zone">Zone</label>
                  <select id="ai-zone" name="zone" data-vv-field="zone" data-vv-module="ai">
                    <option value="Research Zone" ${workspace.zone === "Research Zone" ? "selected" : ""}>Research Zone</option>
                    <option value="Audit Vault" ${workspace.zone === "Audit Vault" ? "selected" : ""}>Audit Vault</option>
                    <option value="Executive Lab" ${workspace.zone === "Executive Lab" ? "selected" : ""}>Executive Lab</option>
                  </select>
                </div>
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="ai-prompt">Prompt</label>
                  <textarea id="ai-prompt" name="prompt" data-vv-field="prompt" data-vv-module="ai">${escapeHtml(workspace.prompt)}</textarea>
                </div>
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-paper-plane"></i>Create Job</button>
                </div>
              </div>
            </form>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-server"></i>Secure Jobs</div>
              <h4>Inference queue</h4>
              <div class="vv-table-head">
                <span>Model</span>
                <span>Zone</span>
                <span>Status</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.jobs.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.model)}</span>
                      <span>${escapeHtml(item.zone)}</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-job-action="open" data-vv-job-id="${escapeHtml(item.id)}">Open</button>
                        <button class="vv-mini-btn" type="button" data-vv-job-action="complete" data-vv-job-id="${escapeHtml(item.id)}">Complete</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
        </div>
      `;
    } else if (module.id === "vault") {
      markup = `
        <div class="vv-workspace">
          ${heroMarkup("Dataset access, report generation, and privacy-safe distribution designed for operational analytics teams.", [
            { value: workspace.dataset, label: "Active dataset" },
            { value: workspace.reports.length, label: "Reports" },
            { value: workspace.reports.filter((item) => item.status === "Shared").length, label: "Shared" },
          ])}
          <div class="vv-workspace__split">
            <form class="vv-workspace__form" data-vv-workspace-form="vault-report">
              <div class="vv-panel__eyebrow"><i class="fas fa-chart-pie"></i>Query Composer</div>
              <h4>Build a report</h4>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="vault-dataset">Dataset</label>
                  <select id="vault-dataset" name="dataset" data-vv-field="dataset" data-vv-module="vault">
                    <option value="Cross-border Settlement" ${workspace.dataset === "Cross-border Settlement" ? "selected" : ""}>Cross-border Settlement</option>
                    <option value="Treasury Exposure" ${workspace.dataset === "Treasury Exposure" ? "selected" : ""}>Treasury Exposure</option>
                    <option value="Partner Flow" ${workspace.dataset === "Partner Flow" ? "selected" : ""}>Partner Flow</option>
                  </select>
                </div>
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <label for="vault-query">Query brief</label>
                  <textarea id="vault-query" name="query" data-vv-field="query" data-vv-module="vault">${escapeHtml(workspace.query)}</textarea>
                </div>
              </div>
              <div class="vv-form-inline">
                <div class="vv-form-group">
                  <button class="vv-primary-btn" type="submit"><i class="fas fa-file-lines"></i>Create Report</button>
                </div>
              </div>
            </form>
            <section class="vv-workspace__table">
              <div class="vv-panel__eyebrow"><i class="fas fa-folder-open"></i>Report Library</div>
              <h4>Distribution records</h4>
              <div class="vv-table-head">
                <span>Dataset</span>
                <span>Audience</span>
                <span>Status</span>
                <div class="vv-table-actions"><span>Actions</span></div>
              </div>
              ${tableRows(
                workspace.reports.map(
                  (item) => `
                    <div class="vv-table-row">
                      <span>${escapeHtml(item.dataset)}</span>
                      <span>${escapeHtml(item.audience)}</span>
                      <span><span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span></span>
                      <div class="vv-table-actions">
                        <button class="vv-mini-btn" type="button" data-vv-report-action="open" data-vv-report-id="${escapeHtml(item.id)}">Open</button>
                        <button class="vv-mini-btn" type="button" data-vv-report-action="share" data-vv-report-id="${escapeHtml(item.id)}">Share</button>
                      </div>
                    </div>
                  `
                )
              )}
            </section>
          </div>
        </div>
      `;
    }

    els.workspace.innerHTML = markup;
  }

  function renderQueue() {
    const items = queueItems();

    if (!els.queue) return;

    if (!items.length) {
      els.queue.innerHTML = `<p class="vv-empty-note">The active module does not have queued records right now.</p>`;
      return;
    }

    els.queue.innerHTML = items
      .slice(0, 6)
      .map(
        (item, index) => `
          <article class="vv-queue-card">
            <div class="vv-queue-card__top">
              <div>
                <small>Queue item ${index + 1}</small>
                <h4>${escapeHtml(item.title)}</h4>
              </div>
              <span class="vv-status" data-state="${toneForStatus(item.status)}">${escapeHtml(item.status)}</span>
            </div>
            <p>${escapeHtml(item.detail)}</p>
            <div class="vv-table-actions">
              <button class="vv-mini-btn" type="button" data-vv-open-workspace="${escapeHtml(state.selectedModuleId)}">Open in workspace</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  function renderScenarios() {
    const visibleScenarios = state.scenarios.filter((scenario) => {
      return state.section === "control" || state.section === "roadmap" || scenario.section === state.section;
    });

    if (!visibleScenarios.length) {
      els.scenarioGrid.innerHTML = `
        <article class="vv-scenario-card">
          <div class="vv-panel__eyebrow"><i class="fas fa-lightbulb"></i>No workflows in this view</div>
          <p>Create a new workflow to capture ownership, timing, and the next release action for this product area.</p>
        </article>
      `;
      return;
    }

    els.scenarioGrid.innerHTML = visibleScenarios
      .map((scenario) => {
        const module = modules.find((item) => item.id === scenario.moduleId);
        const tone = scenario.state === "Live" ? "live" : scenario.state === "Active" ? "preview" : "design";

        return `
          <article class="vv-scenario-card" data-vv-scenario-id="${scenario.id}">
            <div class="vv-module-card__header">
              <span class="vv-status" data-state="${tone}">${scenario.state}</span>
              <span class="vv-module-card__meta">${escapeHtml(scenario.phase)}</span>
            </div>
            <h4>${escapeHtml(scenario.title)}</h4>
            <p>${escapeHtml(scenario.note)}</p>
            <div class="vv-scenario-card__footer">
              <span class="vv-module-card__meta">${module ? module.name : "Module not found"}</span>
              <span class="vv-module-card__meta">Lead: ${escapeHtml(scenario.owner)}</span>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderActivity() {
    const module = activeModule();
    const dynamicEntries = state.dynamicFeed.map((entry) => ({
      label: escapeHtml(entry.label),
      detail: escapeHtml(entry.detail),
      type: escapeHtml(entry.type),
      time: formatRelative(entry.updatedAt),
    }));

    const baseEntries = module.activity.map((entry) => ({
      label: escapeHtml(entry.label),
      detail: escapeHtml(entry.detail),
      type: escapeHtml(entry.type),
      time: entry.time,
    }));

    const queueEntries = queueItems(module.id).slice(0, 3).map((entry) => ({
      label: escapeHtml(entry.title),
      detail: escapeHtml(entry.detail),
      type: "Queue",
      time: escapeHtml(entry.status),
    }));

    const entries = [...dynamicEntries, ...baseEntries, ...queueEntries].slice(0, 8);

    els.activityList.innerHTML = entries
      .map(
        (entry) => `
          <article class="vv-activity-item">
            <div class="vv-activity-item__top">
              <strong>${entry.label}</strong>
              <time>${entry.time}</time>
            </div>
            <p>${entry.detail}</p>
            <span class="vv-label">${entry.type}</span>
          </article>
        `
      )
      .join("");
  }

  function syncModuleSelect(selectedId = state.selectedModuleId) {
    if (!els.moduleSelect) return;

    els.moduleSelect.innerHTML = modules
      .map((module) => `<option value="${module.id}" ${module.id === selectedId ? "selected" : ""}>${module.name}</option>`)
      .join("");
  }

  function refreshWorkspace() {
    const module = activeModule();
    pushFeed({
      moduleId: module.id,
      label: `${module.name} refreshed`,
      detail: "The workspace has been refreshed with the latest records, queue context, and module detail.",
      type: "Refresh",
    });
    render();
    showToast("Workspace refreshed.");
  }

  function openWorkspace(moduleId) {
    const module = modules.find((item) => item.id === moduleId);
    if (!module) return;

    state.selectedModuleId = moduleId;
    render();
    focusPanel(els.workspace?.closest(".vv-panel"), `${module.name} workspace opened.`);
  }

  function openQueue(moduleId) {
    const module = modules.find((item) => item.id === moduleId);
    if (!module) return;

    state.selectedModuleId = moduleId;
    render();
    focusPanel(els.queue?.closest(".vv-panel"), `${module.name} queue opened.`);
  }

  function updateDexOrder(orderId, action) {
    const workspace = workspaceState("dex");
    const orderIndex = workspace.orders.findIndex((item) => item.id === orderId);

    if (orderIndex < 0) return;

    if (action === "cancel") {
      const [removed] = workspace.orders.splice(orderIndex, 1);
      pushFeed({
        moduleId: "dex",
        label: `${removed.pair} order cancelled`,
        detail: "The protected order was removed from the active book before execution.",
        type: "Trading",
      });
      render();
      showToast("Order removed from book.");
      return;
    }

    const statusSteps = { Open: "Routing", Routing: "Confirmed", Confirmed: "Settled", Staged: "Routing" };
    workspace.orders[orderIndex] = {
      ...workspace.orders[orderIndex],
      status: statusSteps[workspace.orders[orderIndex].status] || "Confirmed",
    };
    pushFeed({
      moduleId: "dex",
      label: `${workspace.orders[orderIndex].pair} order advanced`,
      detail: `The ticket moved to ${workspace.orders[orderIndex].status.toLowerCase()} inside the protected route.`,
      type: "Trading",
    });
    render();
    showToast("Order status updated.");
  }

  function updateLendingPosition(positionId, action) {
    const workspace = workspaceState("lend");
    const position = workspace.positions.find((item) => item.id === positionId);

    if (!position) return;

    if (action === "load") {
      workspace.profile = position.vault;
      workspace.collateral = position.collateral.replace(/[$K,]/g, "") + "000";
      workspace.borrow = position.borrow.replace(/[$K,]/g, "") + "000";
      render();
      showToast("Position loaded into editor.");
      return;
    }

    pushFeed({
      moduleId: "lend",
      label: `${position.vault} reviewed`,
      detail: "The credit profile was reviewed against the latest collateral and borrower health thresholds.",
      type: "Risk",
    });
    render();
    showToast("Position review added.");
  }

  function updateProofRequest(requestId, action) {
    const workspace = workspaceState("id");
    const request = workspace.requests.find((item) => item.id === requestId);

    if (!request) return;

    if (action === "open") {
      workspace.bundle = request.bundle;
      workspace.requestor = request.scope;
      render();
      showToast("Proof request opened.");
      return;
    }

    request.status = "Shared";
    pushFeed({
      moduleId: "id",
      label: `${request.scope} proof shared`,
      detail: "Selective disclosure was packaged and shared with the requesting party.",
      type: "Identity",
    });
    render();
    showToast("Proof package shared.");
  }

  function selectGovernanceProposal(proposalId) {
    const workspace = workspaceState("gov");
    const proposal = workspace.proposals.find((item) => item.id === proposalId);

    if (!proposal) return;

    workspace.selected = proposal.title;
    pushFeed({
      moduleId: "gov",
      label: `${proposal.title} opened`,
      detail: "The proposal view was updated for committee review and vote tracking.",
      type: "Governance",
    });
    render();
  }

  function updateGovernanceVote(proposalId, direction) {
    const workspace = workspaceState("gov");
    const proposal = workspace.proposals.find((item) => item.id === proposalId);

    if (!proposal) return;

    if (direction === "support") {
      proposal.support = Math.min(96, proposal.support + 3);
      proposal.opposition = Math.max(4, proposal.opposition - 1);
    } else {
      proposal.opposition = Math.min(42, proposal.opposition + 3);
      proposal.support = Math.max(12, proposal.support - 1);
    }

    proposal.status = "Live Vote";
    workspace.selected = proposal.title;
    pushFeed({
      moduleId: "gov",
      label: `${proposal.title} updated`,
      detail: `${direction === "support" ? "Support" : "Opposition"} was recorded and the proposal tally was refreshed.`,
      type: "Governance",
    });
    render();
    showToast("Proposal tally updated.");
  }

  function updateAiJob(jobId, action) {
    const workspace = workspaceState("ai");
    const job = workspace.jobs.find((item) => item.id === jobId);

    if (!job) return;

    if (action === "open") {
      workspace.model = job.model;
      workspace.zone = job.zone;
      render();
      showToast("Job opened in composer.");
      return;
    }

    job.status = "Completed";
    pushFeed({
      moduleId: "ai",
      label: `${job.model} result published`,
      detail: "The secure analysis completed and the result is ready for controlled review.",
      type: "AI",
    });
    render();
    showToast("Job marked as completed.");
  }

  function updateReport(reportId, action) {
    const workspace = workspaceState("vault");
    const report = workspace.reports.find((item) => item.id === reportId);

    if (!report) return;

    if (action === "open") {
      workspace.dataset = report.dataset;
      render();
      showToast("Report opened.");
      return;
    }

    report.status = "Shared";
    pushFeed({
      moduleId: "vault",
      label: `${report.dataset} report shared`,
      detail: `The report was distributed to the ${report.audience.toLowerCase()} group with protected access controls.`,
      type: "Analytics",
    });
    render();
    showToast("Report shared.");
  }

  function cycleScenarioState(scenarioId) {
    const index = state.scenarios.findIndex((scenario) => scenario.id === scenarioId);
    if (index < 0) return;

    const current = state.scenarios[index];
    const nextState = scenarioStates[(scenarioStates.indexOf(current.state) + 1) % scenarioStates.length];
    state.scenarios[index] = { ...current, state: nextState };
    saveState();

    pushFeed({
      moduleId: current.moduleId,
      label: `${current.title} moved to ${nextState}`,
      detail: "The workflow board has been updated with the new stage and team alignment for this item.",
      type: "Workflow",
    });
    render();
    showToast(`Workflow updated to ${nextState}.`);
  }

  function render() {
    ensureSelectedModule();

    document.querySelectorAll("[data-vv-section]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.vvSection === state.section);
    });

    document.querySelectorAll("[data-vv-mode]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.vvMode === state.mode);
    });

    document.querySelectorAll("[data-vv-filter]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.vvFilter === state.filter);
    });

    if (els.searchInput) {
      els.searchInput.value = state.query;
    }

    renderHero();
    renderKpis();
    renderModules();
    renderInspector();
    renderWorkspace();
    renderQueue();
    renderScenarios();
    renderActivity();
    syncModuleSelect();
    saveState();
  }

  document.querySelectorAll("[data-vv-section]").forEach((button) => {
    button.addEventListener("click", () => {
      state.section = button.dataset.vvSection;
      render();
    });
  });

  document.querySelectorAll("[data-vv-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.vvMode;
      render();
    });
  });

  document.querySelectorAll("[data-vv-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.filter = button.dataset.vvFilter;
      render();
    });
  });

  els.searchInput?.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
  });

  document.querySelector("[data-vv-sync]")?.addEventListener("click", refreshWorkspace);
  document.querySelector("[data-vv-open-modal]")?.addEventListener("click", () => openModal());

  document.querySelectorAll("[data-vv-close-modal]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  els.modal?.addEventListener("click", (event) => {
    if (event.target === els.modal) {
      closeModal();
    }
  });

  els.moduleGrid?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-vv-module-id]");
    if (!card) return;

    state.selectedModuleId = card.dataset.vvModuleId;
    render();
  });

  els.inspector?.addEventListener("click", (event) => {
    const openWorkspaceButton = event.target.closest("[data-vv-open-workspace]");
    const openQueueButton = event.target.closest("[data-vv-open-queue]");
    const create = event.target.closest("[data-vv-create-for]");

    if (openWorkspaceButton) openWorkspace(openWorkspaceButton.dataset.vvOpenWorkspace);
    if (openQueueButton) openQueue(openQueueButton.dataset.vvOpenQueue);
    if (create) openModal(create.dataset.vvCreateFor);
  });

  els.queue?.addEventListener("click", (event) => {
    const openWorkspaceButton = event.target.closest("[data-vv-open-workspace]");

    if (openWorkspaceButton) {
      openWorkspace(openWorkspaceButton.dataset.vvOpenWorkspace);
    }
  });

  function updateWorkspaceField(target) {
    const field = target.dataset.vvField;
    const moduleId = target.dataset.vvModule || state.selectedModuleId;
    const workspace = workspaceState(moduleId);

    if (!field || !workspace) return;

    workspace[field] = target.value;
    saveState();
  }

  els.workspace?.addEventListener("input", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
      return;
    }

    updateWorkspaceField(target);
  });

  els.workspace?.addEventListener("change", (event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)) {
      return;
    }

    updateWorkspaceField(target);
  });

  els.workspace?.addEventListener("click", (event) => {
    const dexSide = event.target.closest("[data-vv-dex-side]");
    const orderAction = event.target.closest("[data-vv-order-action]");
    const positionAction = event.target.closest("[data-vv-position-action]");
    const proofOption = event.target.closest("[data-vv-proof-option]");
    const requestAction = event.target.closest("[data-vv-request-action]");
    const govSelect = event.target.closest("[data-vv-gov-select]");
    const govVote = event.target.closest("[data-vv-gov-vote]");
    const jobAction = event.target.closest("[data-vv-job-action]");
    const reportAction = event.target.closest("[data-vv-report-action]");

    if (dexSide) {
      const workspace = workspaceState("dex");
      workspace.side = dexSide.dataset.vvDexSide;
      render();
      return;
    }

    if (orderAction) {
      updateDexOrder(orderAction.dataset.vvOrderId, orderAction.dataset.vvOrderAction);
      return;
    }

    if (positionAction) {
      updateLendingPosition(positionAction.dataset.vvPositionId, positionAction.dataset.vvPositionAction);
      return;
    }

    if (proofOption) {
      const workspace = workspaceState("id");
      const proof = proofOption.dataset.vvProofOption;

      workspace.proofs = workspace.proofs.includes(proof)
        ? workspace.proofs.filter((item) => item !== proof)
        : [...workspace.proofs, proof];

      render();
      return;
    }

    if (requestAction) {
      updateProofRequest(requestAction.dataset.vvRequestId, requestAction.dataset.vvRequestAction);
      return;
    }

    if (govSelect) {
      selectGovernanceProposal(govSelect.dataset.vvGovSelect);
      return;
    }

    if (govVote) {
      updateGovernanceVote(govVote.dataset.vvGovId, govVote.dataset.vvGovVote);
      return;
    }

    if (jobAction) {
      updateAiJob(jobAction.dataset.vvJobId, jobAction.dataset.vvJobAction);
      return;
    }

    if (reportAction) {
      updateReport(reportAction.dataset.vvReportId, reportAction.dataset.vvReportAction);
    }
  });

  els.workspace?.addEventListener("submit", (event) => {
    const form = event.target;

    if (!(form instanceof HTMLFormElement)) return;

    event.preventDefault();
    const formData = new FormData(form);
    const formType = form.dataset.vvWorkspaceForm;

    if (formType === "dex-order") {
      const workspace = workspaceState("dex");
      workspace.orders.unshift({
        id: `od-${Date.now()}`,
        pair: String(formData.get("pair") || workspace.pair),
        side: workspace.side === "sell" ? "Sell" : "Buy",
        size: Number(formData.get("amount") || workspace.amount).toLocaleString("en-US"),
        price: String(formData.get("price") || workspace.price),
        status: "Staged",
      });
      pushFeed({
        moduleId: "dex",
        label: `${workspace.pair} order staged`,
        detail: `A ${workspace.side} order was staged for discreet routing at ${workspace.price}.`,
        type: "Trading",
      });
      render();
      showToast("Order staged in protected book.");
      return;
    }

    if (formType === "lend-position") {
      const workspace = workspaceState("lend");
      const collateral = Number(formData.get("collateral") || workspace.collateral);
      const borrow = Number(formData.get("borrow") || workspace.borrow);
      const health = borrow > 0 ? (collateral / borrow).toFixed(2) : "0.00";
      workspace.positions.unshift({
        id: `lp-${Date.now()}`,
        vault: String(formData.get("profile") || workspace.profile).trim() || "New Credit Profile",
        collateral: `$${Math.round(collateral / 1000)}K`,
        borrow: `$${Math.round(borrow / 1000)}K`,
        health,
        status: Number(health) >= 1.5 ? "Healthy" : "Review",
      });
      pushFeed({
        moduleId: "lend",
        label: `${workspace.profile} updated`,
        detail: `Collateral and borrow posture were saved with a ${health} health factor.`,
        type: "Risk",
      });
      render();
      showToast("Position updated.");
      return;
    }

    if (formType === "id-request") {
      const workspace = workspaceState("id");
      workspace.requests.unshift({
        id: `pr-${Date.now()}`,
        bundle: String(formData.get("bundle") || workspace.bundle),
        scope: String(formData.get("requestor") || workspace.requestor),
        status: "Ready",
      });
      pushFeed({
        moduleId: "id",
        label: `${workspace.bundle} request issued`,
        detail: `${workspace.proofs.length} proof selections were packaged for ${workspace.requestor}.`,
        type: "Identity",
      });
      render();
      showToast("Proof request created.");
      return;
    }

    if (formType === "gov-proposal") {
      const workspace = workspaceState("gov");
      const title = String(formData.get("title") || "").trim();
      const summary = String(formData.get("summary") || "").trim();

      if (!title) {
        showToast("Proposal title is required.");
        return;
      }

      workspace.proposals.unshift({
        id: `gp-${Date.now()}`,
        title,
        support: 52,
        opposition: 11,
        status: "Review",
      });
      workspace.selected = title;
      pushFeed({
        moduleId: "gov",
        label: `${title} drafted`,
        detail: summary || "A new governance motion was added to the review queue.",
        type: "Governance",
      });
      render();
      showToast("Proposal drafted.");
      return;
    }

    if (formType === "ai-job") {
      const workspace = workspaceState("ai");
      workspace.jobs.unshift({
        id: `jb-${Date.now()}`,
        model: String(formData.get("model") || workspace.model),
        zone: String(formData.get("zone") || workspace.zone),
        status: "Queued",
      });
      pushFeed({
        moduleId: "ai",
        label: `${workspace.model} task created`,
        detail: "A secure analysis task was placed into the current zone queue.",
        type: "AI",
      });
      render();
      showToast("Secure job created.");
      return;
    }

    if (formType === "vault-report") {
      const workspace = workspaceState("vault");
      workspace.reports.unshift({
        id: `rp-${Date.now()}`,
        dataset: String(formData.get("dataset") || workspace.dataset),
        status: "Review",
        audience: "Executive",
      });
      pushFeed({
        moduleId: "vault",
        label: `${workspace.dataset} report created`,
        detail: "A new protected analytics report was added to the review library.",
        type: "Analytics",
      });
      render();
      showToast("Report created.");
    }
  });

  els.scenarioGrid?.addEventListener("click", (event) => {
    const card = event.target.closest("[data-vv-scenario-id]");
    if (!card) return;
    cycleScenarioState(card.dataset.vvScenarioId);
  });

  els.form?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(els.form);
    const moduleId = formData.get("module");
    const module = modules.find((item) => item.id === moduleId);

    state.scenarios.unshift({
      id: `s-${Date.now()}`,
      title: String(formData.get("title") || "").trim(),
      section: module ? module.section : "control",
      moduleId,
      phase: String(formData.get("phase") || "").trim(),
      owner: String(formData.get("owner") || "").trim(),
      note: String(formData.get("note") || "").trim(),
      state: "Queued",
    });

    state.selectedModuleId = moduleId;
    saveState();
    pushFeed({
      moduleId,
      label: `${formData.get("title")} created`,
      detail: "A new workflow item was added to the board and linked to the selected module.",
      type: "Workflow",
    });
    els.form.reset();
    closeModal();
    render();
    showToast("New workflow created.");
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  render();
})();
