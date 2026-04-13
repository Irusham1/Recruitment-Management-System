/* =============================================================
   TalentFlow — app.js
   Frontend SPA logic with simulated data
   ============================================================= */

'use strict';

// ── Simulated Data ─────────────────────────────────────────────
const JOBS = [
  { id: 1, title: 'Senior Full Stack Developer',   department: 'Engineering',   location: 'Colombo',   job_type: 'Full-time',  status: 'open',   description: 'Build scalable web applications using React and Node.js.',    created_at: '2025-03-10' },
  { id: 2, title: 'UI/UX Designer',                department: 'Design',        location: 'Remote',    job_type: 'Full-time',  status: 'open',   description: 'Design beautiful user interfaces and experiences.',           created_at: '2025-03-12' },
  { id: 3, title: 'Data Analyst',                  department: 'Analytics',     location: 'Kandy',     job_type: 'Full-time',  status: 'open',   description: 'Analyse data and produce actionable insights.',               created_at: '2025-03-14' },
  { id: 4, title: 'Marketing Manager',             department: 'Marketing',     location: 'Colombo',   job_type: 'Full-time',  status: 'closed', description: 'Lead marketing campaigns and grow brand awareness.',          created_at: '2025-02-20' },
  { id: 5, title: 'Junior React Developer',        department: 'Engineering',   location: 'Remote',    job_type: 'Contract',   status: 'open',   description: 'Develop React components for web apps.',                      created_at: '2025-03-18' },
  { id: 6, title: 'HR Coordinator',                department: 'HR',            location: 'Colombo',   job_type: 'Part-time',  status: 'draft',  description: 'Coordinate recruitment processes and employee onboarding.',    created_at: '2025-03-20' },
  { id: 7, title: 'DevOps Engineer',               department: 'Engineering',   location: 'Colombo',   job_type: 'Full-time',  status: 'open',   description: 'Manage CI/CD pipelines and cloud infrastructure.',            created_at: '2025-03-22' },
  { id: 8, title: 'Product Manager',               department: 'Product',       location: 'Colombo',   job_type: 'Full-time',  status: 'open',   description: 'Drive product roadmap and collaborate with cross-functional teams.', created_at: '2025-03-25' },
];

const APPLICATIONS = [
  { id: 1,  candidate_name: 'Ayesha Perera',    candidate_email: 'ayesha@email.com',    job_id: 1, stage: 'Interview',  applied_at: '2025-03-11', notes: 'Strong candidate with 5 years exp.',  cv_url: null },
  { id: 2,  candidate_name: 'Kasun Silva',      candidate_email: 'kasun@email.com',      job_id: 1, stage: 'Screening', applied_at: '2025-03-12', notes: '',                                    cv_url: null },
  { id: 3,  candidate_name: 'Nimali Fernando',  candidate_email: 'nimali@email.com',     job_id: 2, stage: 'Applied',   applied_at: '2025-03-13', notes: 'Great portfolio.',                     cv_url: null },
  { id: 4,  candidate_name: 'Ravindu Bandara',  candidate_email: 'ravindu@email.com',    job_id: 3, stage: 'Offer',     applied_at: '2025-03-14', notes: 'Excellent analytical skills.',         cv_url: null },
  { id: 5,  candidate_name: 'Shalini Jayawardena', candidate_email: 'shalini@email.com', job_id: 1, stage: 'Hired',     applied_at: '2025-03-08', notes: 'Joined 1 April.',                      cv_url: null },
  { id: 6,  candidate_name: 'Tharaka Wijesinghe', candidate_email: 'tharaka@email.com',  job_id: 5, stage: 'Screening', applied_at: '2025-03-19', notes: '',                                    cv_url: null },
  { id: 7,  candidate_name: 'Dilani Rathnayake', candidate_email: 'dilani@email.com',    job_id: 2, stage: 'Rejected',  applied_at: '2025-03-15', notes: 'Not enough experience.',               cv_url: null },
  { id: 8,  candidate_name: 'Pradeep Kumara',   candidate_email: 'pradeep@email.com',    job_id: 7, stage: 'Applied',   applied_at: '2025-03-23', notes: '',                                    cv_url: null },
  { id: 9,  candidate_name: 'Malsha Abeywickrama', candidate_email: 'malsha@email.com',  job_id: 8, stage: 'Screening', applied_at: '2025-03-26', notes: '',                                    cv_url: null },
  { id: 10, candidate_name: 'Janaka Herath',    candidate_email: 'janaka@email.com',     job_id: 3, stage: 'Interview', applied_at: '2025-03-16', notes: 'Second interview scheduled.',          cv_url: null },
];

const STAGES = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired', 'Rejected'];

const DEPT_ICONS = {
  Engineering: '💻', Design: '🎨', Analytics: '📊', Marketing: '📣',
  HR: '👥', Product: '🧩', Finance: '💰', Operations: '⚙️',
};

const AVATAR_COLORS = [
  'linear-gradient(135deg,#0057ff,#00d2ff)',
  'linear-gradient(135deg,#7c3aed,#a855f7)',
  'linear-gradient(135deg,#059669,#22d3a6)',
  'linear-gradient(135deg,#d97706,#f97316)',
  'linear-gradient(135deg,#db2777,#f43f5e)',
];

// ── State ──────────────────────────────────────────────────────
let jobs         = [...JOBS];
let applications = [...APPLICATIONS];
let currentAppId = null;

// ── DOM Helpers ────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html) e.innerHTML = html; return e; };

// ── Navigation ─────────────────────────────────────────────────
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      navigateTo(item.dataset.view);
      // Close mobile sidebar
      document.getElementById('sidebar').classList.remove('open');
    });
  });

  // View-nav buttons inside views
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-view-nav]');
    if (btn) navigateTo(btn.dataset.viewNav);
  });

  // Mobile menu toggle
  $('menuToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Click outside sidebar on mobile
  document.addEventListener('click', e => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !$('menuToggle').contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

function navigateTo(view) {
  // Update nav items
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.view === view);
  });
  // Show/hide views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.toggle('active', v.id === `view-${view}`);
  });
  // Load view data
  switch (view) {
    case 'dashboard':   loadDashboard();     break;
    case 'jobs':        loadJobs();          break;
    case 'applications':loadApplications();  break;
    case 'candidates':  loadCandidates();    break;
    case 'post-job':    /* form only */      break;
  }
}

// ── Dashboard ──────────────────────────────────────────────────
function loadDashboard() {
  const activeJobs   = jobs.filter(j => j.status === 'open').length;
  const totalApps    = applications.length;
  const shortlisted  = applications.filter(a => ['Interview','Offer','Hired'].includes(a.stage)).length;
  const hired        = applications.filter(a => a.stage === 'Hired').length;

  animateCount($('statActiveJobs'),  activeJobs);
  animateCount($('statApplications'), totalApps);
  animateCount($('statShortlisted'), shortlisted);
  animateCount($('statHired'),       hired);

  renderPipelineChart();
  renderRecentJobs();
  renderRecentApps();
}

function animateCount(el, target) {
  if (!el) return;
  let start = 0;
  const duration = 800;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.round(progress * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function renderPipelineChart() {
  const chart = $('pipelineChart');
  if (!chart) return;
  chart.innerHTML = '';

  const counts = {};
  STAGES.forEach(s => counts[s] = 0);
  applications.forEach(a => { if (counts[a.stage] !== undefined) counts[a.stage]++; });

  const max = Math.max(...Object.values(counts), 1);

  STAGES.forEach((stage, i) => {
    const count = counts[stage];
    const pct   = (count / max) * 100;
    const barClass = `bar-${stage.toLowerCase()}`;

    const group = el('div', 'pipeline-bar-group');
    const wrap  = el('div', 'pipeline-bar-wrap');
    const bar   = el('div', `pipeline-bar ${barClass}`);
    bar.style.height = `${Math.max(pct, 4)}%`;
    bar.style.animationDelay = `${0.6 + i * 0.1}s`;

    const valEl = el('span', 'bar-value', count);
    bar.appendChild(valEl);
    wrap.appendChild(bar);

    const labelEl = el('div', 'bar-label', stage);
    group.appendChild(wrap);
    group.appendChild(labelEl);
    chart.appendChild(group);
  });
}

function renderRecentJobs() {
  const list = $('recentJobsList');
  if (!list) return;
  list.innerHTML = '';

  jobs.slice(0, 4).forEach(job => {
    const icon = DEPT_ICONS[job.department] || '💼';
    const item = el('li', 'recent-item');
    item.innerHTML = `
      <div class="recent-item-icon">${icon}</div>
      <div class="recent-item-body">
        <div class="recent-item-title">${esc(job.title)}</div>
        <div class="recent-item-sub">${esc(job.department)} · ${esc(job.location)}</div>
      </div>
      <span class="status-badge status-${job.status}">${job.status}</span>
    `;
    list.appendChild(item);
  });
}

function renderRecentApps() {
  const list = $('recentAppsList');
  if (!list) return;
  list.innerHTML = '';

  applications.slice(0, 4).forEach(app => {
    const job  = jobs.find(j => j.id === app.job_id);
    const item = el('li', 'recent-item');
    item.innerHTML = `
      <div class="recent-item-icon">👤</div>
      <div class="recent-item-body">
        <div class="recent-item-title">${esc(app.candidate_name)}</div>
        <div class="recent-item-sub">${job ? esc(job.title) : 'Unknown job'}</div>
      </div>
      <span class="stage-badge stage-${app.stage}">${app.stage}</span>
    `;
    list.appendChild(item);
  });
}

// ── Jobs ───────────────────────────────────────────────────────
function loadJobs() {
  const filter = $('jobStatusFilter').value;
  const filtered = filter ? jobs.filter(j => j.status === filter) : jobs;
  renderJobsGrid(filtered);
}

function renderJobsGrid(list) {
  const grid = $('jobsGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!list.length) {
    grid.appendChild(emptyState('💼', 'No jobs found.'));
    return;
  }

  list.forEach((job, i) => {
    const icon = DEPT_ICONS[job.department] || '💼';
    const appCount = applications.filter(a => a.job_id === job.id).length;
    const card = el('div', 'job-card');
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="job-card-header">
        <div>
          <div class="job-title">${esc(job.title)}</div>
          <div class="job-meta">${esc(job.department)} · ${esc(job.location)}</div>
        </div>
        <div class="job-dept-icon">${icon}</div>
      </div>
      <div class="job-tags">
        <span class="tag">${esc(job.job_type)}</span>
        <span class="tag">📋 ${appCount} applicants</span>
      </div>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.5">${esc(job.description)}</p>
      <div class="job-card-footer">
        <span class="status-badge status-${job.status}">${job.status}</span>
        <button class="btn btn-sm btn-outline" data-job-id="${job.id}" data-action="view-apps">View Apps</button>
        ${job.status !== 'closed' ? `<button class="btn btn-sm btn-danger" data-job-id="${job.id}" data-action="close-job">Close</button>` : ''}
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Applications ───────────────────────────────────────────────
function loadApplications() {
  renderApplicationsTable();
}

function renderApplicationsTable() {
  const stageFilter = $('appStageFilter').value;
  const search      = $('appSearch').value.toLowerCase();

  let filtered = applications;
  if (stageFilter) filtered = filtered.filter(a => a.stage === stageFilter);
  if (search)      filtered = filtered.filter(a =>
    a.candidate_name.toLowerCase().includes(search) ||
    a.candidate_email.toLowerCase().includes(search)
  );

  const tbody = $('applicationsBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!filtered.length) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="6" style="text-align:center;padding:40px;color:var(--text-muted)">No applications found.</td>`;
    tbody.appendChild(row);
    return;
  }

  filtered.forEach(app => {
    const job = jobs.find(j => j.id === app.job_id);
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="app-candidate">${esc(app.candidate_name)}</div>
        <div class="app-email">${esc(app.candidate_email)}</div>
      </td>
      <td>${job ? esc(job.title) : '—'}</td>
      <td><span class="stage-badge stage-${app.stage}">${app.stage}</span></td>
      <td style="color:var(--text-secondary);font-size:13px">${formatDate(app.applied_at)}</td>
      <td>
        <button class="btn btn-sm btn-outline" data-app-id="${app.id}" data-action="view-cv">📄 CV</button>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn btn-sm btn-outline" data-app-id="${app.id}" data-action="quick-stage">Update Stage</button>
          <button class="btn btn-sm btn-danger"  data-app-id="${app.id}" data-action="del-app">Delete</button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ── Candidates ─────────────────────────────────────────────────
function loadCandidates() {
  renderCandidatesGrid();
}

function renderCandidatesGrid() {
  const search = $('candidateSearch').value.toLowerCase();

  // Build unique candidates from applications
  const map = new Map();
  applications.forEach(app => {
    if (!map.has(app.candidate_email)) {
      map.set(app.candidate_email, {
        name: app.candidate_name,
        email: app.candidate_email,
        apps: [app],
      });
    } else {
      map.get(app.candidate_email).apps.push(app);
    }
  });

  let candidates = [...map.values()];
  if (search) candidates = candidates.filter(c =>
    c.name.toLowerCase().includes(search) ||
    c.email.toLowerCase().includes(search)
  );

  const grid = $('candidatesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  if (!candidates.length) {
    grid.appendChild(emptyState('👥', 'No candidates found.'));
    return;
  }

  candidates.forEach((c, i) => {
    const initials = c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const color    = AVATAR_COLORS[i % AVATAR_COLORS.length];
    const latestStage = c.apps[c.apps.length - 1].stage;

    const card = el('div', 'candidate-card');
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="candidate-avatar" style="background:${color}">${initials}</div>
      <div class="candidate-name">${esc(c.name)}</div>
      <div class="candidate-email">${esc(c.email)}</div>
      <span class="stage-badge stage-${latestStage}">${latestStage}</span>
      <div class="candidate-apps">${c.apps.length} application${c.apps.length !== 1 ? 's' : ''}</div>
    `;
    grid.appendChild(card);
  });
}

// ── Post Job Form ───────────────────────────────────────────────
function initPostJobForm() {
  const form = $('postJobForm');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = form.querySelector('[type=submit]');
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-icon').textContent = '⏳';

    setTimeout(() => {
      const newJob = {
        id:          jobs.length + 1,
        title:       $('jobTitle').value.trim(),
        department:  $('jobDept').value.trim(),
        location:    $('jobLocation').value.trim(),
        job_type:    $('jobType').value,
        status:      'open',
        description: $('jobDesc').value.trim(),
        created_at:  new Date().toISOString().slice(0, 10),
      };
      jobs.unshift(newJob);
      form.reset();
      submitBtn.classList.remove('loading');
      submitBtn.querySelector('.btn-icon').textContent = '🚀';
      showToast('✅ Job posted successfully!', 'success');
      navigateTo('jobs');
    }, 900);
  });

  $('btnSaveDraft') && $('btnSaveDraft').addEventListener('click', () => {
    const title = $('jobTitle').value.trim();
    if (!title) { showToast('⚠️ Please enter a job title.', 'error'); return; }
    const draft = {
      id:          jobs.length + 1,
      title,
      department:  $('jobDept').value.trim() || 'TBD',
      location:    $('jobLocation').value.trim() || 'TBD',
      job_type:    $('jobType').value || 'Full-time',
      status:      'draft',
      description: $('jobDesc').value.trim(),
      created_at:  new Date().toISOString().slice(0, 10),
    };
    jobs.unshift(draft);
    showToast('💾 Draft saved.', 'success');
  });
}

// ── Event Delegation (buttons in dynamic content) ──────────────
function initDelegatedActions() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === 'view-cv') {
      const appId = parseInt(btn.dataset.appId);
      openCvModal(appId);
    }

    if (action === 'quick-stage') {
      const appId = parseInt(btn.dataset.appId);
      openCvModal(appId);
    }

    if (action === 'del-app') {
      const appId = parseInt(btn.dataset.appId);
      if (confirm(`Delete this application?`)) {
        applications = applications.filter(a => a.id !== appId);
        renderApplicationsTable();
        showToast('🗑️ Application deleted.', 'success');
      }
    }

    if (action === 'view-apps') {
      const jobId = parseInt(btn.dataset.jobId);
      const job   = jobs.find(j => j.id === jobId);
      navigateTo('applications');
      setTimeout(() => {
        if (job) showToast(`Showing applications for: ${job.title}`, 'success');
      }, 100);
    }

    if (action === 'close-job') {
      const jobId = parseInt(btn.dataset.jobId);
      const job   = jobs.find(j => j.id === jobId);
      if (job && confirm(`Close job: ${job.title}?`)) {
        job.status = 'closed';
        loadJobs();
        showToast('Job closed.', 'success');
      }
    }
  });

  // Filter / search listeners
  $('jobStatusFilter') && $('jobStatusFilter').addEventListener('change', loadJobs);
  $('appStageFilter')  && $('appStageFilter').addEventListener('change', renderApplicationsTable);
  $('appSearch')       && $('appSearch').addEventListener('input', renderApplicationsTable);
  $('candidateSearch') && $('candidateSearch').addEventListener('input', renderCandidatesGrid);

  // Refresh button
  $('btnRefresh') && $('btnRefresh').addEventListener('click', () => {
    const btn = $('btnRefresh');
    btn.classList.add('loading');
    btn.querySelector('.btn-icon').textContent = '⏳';
    setTimeout(() => {
      loadDashboard();
      btn.classList.remove('loading');
      btn.querySelector('.btn-icon').textContent = '🔄';
      showToast('Dashboard refreshed.', 'success');
    }, 700);
  });
}

// ── CV Modal ───────────────────────────────────────────────────
function initCvModal() {
  $('cvModalClose').addEventListener('click', closeCvModal);
  $('cvModal').addEventListener('click', e => { if (e.target === $('cvModal')) closeCvModal(); });

  $('btnUpdateStage').addEventListener('click', () => {
    if (currentAppId === null) return;
    const newStage = $('stageSelect').value;
    const app = applications.find(a => a.id === currentAppId);
    if (app) {
      app.stage = newStage;
      showToast(`Stage updated to ${newStage}.`, 'success');
      closeCvModal();
      // Refresh whichever view is active
      if ($('view-applications').classList.contains('active')) renderApplicationsTable();
      if ($('view-dashboard').classList.contains('active'))    loadDashboard();
    }
  });
}

function openCvModal(appId) {
  const app = applications.find(a => a.id === appId);
  if (!app) return;
  currentAppId = appId;

  $('cvModalTitle').textContent = `${app.candidate_name} — CV`;
  $('stageSelect').value = app.stage;

  const body = $('cvModalBody');
  body.innerHTML = `
    <div class="cv-placeholder">
      <div class="cv-icon">📄</div>
      <strong>${esc(app.candidate_name)}</strong>
      <p>${esc(app.candidate_email)}</p>
      ${app.notes ? `<p style="color:var(--text-secondary);font-size:13px;margin-top:8px;text-align:center">${esc(app.notes)}</p>` : ''}
      <p style="margin-top:12px;color:var(--text-muted);font-size:12px">CV file upload is handled via the public application form.</p>
    </div>
  `;

  $('cvModal').classList.add('open');
}

function closeCvModal() {
  $('cvModal').classList.remove('open');
  currentAppId = null;
}

// ── Toast ──────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, type = '') {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  // Force reflow
  void toast.offsetHeight;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Utilities ──────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function emptyState(icon, msg) {
  const div = el('div', 'empty-state');
  div.innerHTML = `<div class="empty-icon">${icon}</div><p>${msg}</p>`;
  return div;
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initPostJobForm();
  initDelegatedActions();
  initCvModal();
  loadDashboard();
});
