// ========== DATA ==========
let jobs = [
  { id: 1, title: "Senior Frontend Developer", dept: "Engineering", location: "Colombo", type: "Full-time", salary: "LKR 200,000–300,000", status: "open", deadline: "2026-04-15", desc: "We're looking for a senior frontend developer to lead our web products.", reqs: "5+ years React, TypeScript, strong UI/UX sense.", benefits: "Health insurance, flexible hours, remote option.", icon: "💻", apps: 0 },
  { id: 2, title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time", salary: "LKR 150,000–220,000", status: "open", deadline: "2026-04-20", desc: "Shape the visual identity and user experience of our growing product.", reqs: "3+ years Figma, portfolio of shipped products.", benefits: "Stock options, annual retreat, MacBook Pro.", icon: "🎨", apps: 0 },
  { id: 3, title: "Marketing Manager", dept: "Marketing", location: "Colombo", type: "Full-time", salary: "LKR 180,000–250,000", status: "open", deadline: "2026-04-10", desc: "Drive brand awareness and growth campaigns across digital channels.", reqs: "4+ years digital marketing, SEO/SEM experience.", benefits: "Performance bonus, learning budget.", icon: "📈", apps: 0 },
  { id: 4, title: "Backend Engineer", dept: "Engineering", location: "Colombo", type: "Full-time", salary: "LKR 200,000–280,000", status: "open", deadline: "2026-05-01", desc: "Build scalable APIs and microservices powering our platform.", reqs: "Node.js / Python, PostgreSQL, Docker, 4+ years.", benefits: "Remote-friendly, tech allowance.", icon: "⚙️", apps: 0 },
  { id: 5, title: "Sales Executive", dept: "Sales", location: "Colombo", type: "Full-time", salary: "LKR 100,000 + commission", status: "closed", deadline: "2026-03-01", desc: "Close enterprise deals and grow our B2B pipeline.", reqs: "2+ years B2B sales, CRM proficiency.", benefits: "Uncapped commission, company car.", icon: "🤝", apps: 0 },
  { id: 6, title: "HR Coordinator", dept: "HR", location: "Colombo", type: "Part-time", salary: "LKR 80,000–110,000", status: "draft", deadline: "2026-05-15", desc: "Support recruitment, onboarding, and employee relations.", reqs: "HR degree, 1+ years experience.", benefits: "Flexible hours, professional development.", icon: "👥", apps: 0 },
];

let applications = [
  { id: 1, name: "Ayesha Perera", email: "ayesha@email.com", phone: "+94 77 123 4567", jobId: 1, date: "2026-03-20", stage: "Interview", notes: "Strong portfolio, cultural fit", score: 88 },
  { id: 2, name: "Dinesh Kumar", email: "dinesh@email.com", phone: "+94 71 987 6543", jobId: 1, date: "2026-03-22", stage: "Screening", notes: "Good React skills, needs assessment", score: 74 },
  { id: 3, name: "Priya Jayawardena", email: "priya@email.com", phone: "+94 76 555 7890", jobId: 2, date: "2026-03-18", stage: "Offer", notes: "Excellent Figma skills, top candidate", score: 94 },
  { id: 4, name: "Kasun Silva", email: "kasun@email.com", phone: "+94 70 333 2211", jobId: 3, date: "2026-03-15", stage: "Hired", notes: "Perfect match, offer accepted", score: 92 },
  { id: 5, name: "Nimal Fernando", email: "nimal@email.com", phone: "+94 72 444 8899", jobId: 4, date: "2026-03-23", stage: "Applied", notes: "", score: 67 },
  { id: 6, name: "Sanduni Weerasinghe", email: "sanduni@email.com", phone: "+94 75 666 1122", jobId: 1, date: "2026-03-24", stage: "Applied", notes: "", score: 71 },
  { id: 7, name: "Ruwan Dissanayake", email: "ruwan@email.com", phone: "+94 77 222 4455", jobId: 2, date: "2026-03-19", stage: "Screening", notes: "Creative portfolio", score: 80 },
  { id: 8, name: "Thilini Rathnayake", email: "thilini@email.com", phone: "+94 71 888 6677", jobId: 3, date: "2026-03-21", stage: "Interview", notes: "Strong digital marketing background", score: 85 },
  { id: 9, name: "Chamara Bandara", email: "chamara@email.com", phone: "+94 76 777 3344", jobId: 4, date: "2026-03-25", stage: "Rejected", notes: "Did not meet backend requirements", score: 50 },
  { id: 10, name: "Malinda Wickramasinghe", email: "malinda@email.com", phone: "+94 72 111 9988", jobId: 1, date: "2026-03-26", stage: "Applied", notes: "", score: 78 },
];

// Link app counts
applications.forEach(app => {
  const job = jobs.find(j => j.id === app.jobId);
  if (job) job.apps++;
});

// CV templates
const cvTemplates = {
  "Ayesha Perera": { summary: "Passionate frontend developer with 6 years of experience building responsive, user-friendly web apps.", experience: [{ title: "Senior React Developer", company: "TechSpark LK", period: "2022 – Present", desc: "Led frontend architecture for SaaS products serving 50k+ users." }, { title: "Frontend Developer", company: "Digital Roots", period: "2019 – 2022", desc: "Built responsive e-commerce platforms using React and Next.js." }], skills: ["React", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL", "Figma"], education: "BSc Computer Science – University of Colombo, 2019" },
  "Dinesh Kumar": { summary: "Full-stack developer transitioning to frontend focus. Strong React background with backend knowledge.", experience: [{ title: "Full Stack Developer", company: "WebCraft Solutions", period: "2021 – Present", desc: "Developed feature-rich web apps with React frontend and Node.js backend." }], skills: ["React", "JavaScript", "Node.js", "MongoDB", "CSS", "Redux"], education: "BSc Information Technology – SLIIT, 2021" },
  "Priya Jayawardena": { summary: "Product designer with a deep passion for human-centered design. 5 years shipping beautiful, functional products.", experience: [{ title: "Lead Product Designer", company: "Pixel Studio", period: "2021 – Present", desc: "Led design for 3 major product launches, 0→1 experience." }, { title: "UX Designer", company: "AppFactory", period: "2019 – 2021", desc: "Redesigned core flows, boosted conversion by 34%." }], skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Sketch"], education: "BA Graphic Design – NIAD, 2019" },
  "Kasun Silva": { summary: "Results-driven digital marketer with expertise in performance campaigns and brand growth.", experience: [{ title: "Marketing Lead", company: "BrandBoost", period: "2020 – Present", desc: "Managed $200k/yr ad budget, achieved 3x ROI." }], skills: ["Google Ads", "Meta Ads", "SEO", "Content Marketing", "Analytics", "HubSpot"], education: "BBA Marketing – University of Kelaniya, 2020" },
  "Nimal Fernando": { summary: "Backend engineer with strong system design skills, experienced in building APIs at scale.", experience: [{ title: "Backend Developer", company: "CloudSys LK", period: "2022 – Present", desc: "Built microservices handling 1M+ daily requests." }], skills: ["Node.js", "Python", "PostgreSQL", "Docker", "AWS", "REST APIs"], education: "BSc Software Engineering – IIT, 2022" },
  default: { summary: "Motivated professional with relevant experience and strong skills for the applied role.", experience: [{ title: "Previous Role", company: "Previous Company", period: "2022 – Present", desc: "Contributed to key projects and achieved measurable results." }], skills: ["Communication", "Problem Solving", "Teamwork", "Adaptability"], education: "Bachelor's Degree – University of Sri Lanka" }
};

let currentTheme = localStorage.getItem('talentflow-theme') || 'dark';

const dashboardVideos = [
  {
    title: 'Hiring Workflow Masterclass',
    tag: 'Featured',
    duration: '02:15',
    channel: 'TalentFlow Academy',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
  },
  {
    title: 'Interview Scoring Framework',
    tag: 'Training',
    duration: '00:12',
    channel: 'Hiring Ops',
    src: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    title: 'Candidate Experience Playbook',
    tag: 'Strategy',
    duration: '00:30',
    channel: 'Recruiting Team',
    src: 'https://www.w3schools.com/html/movie.mp4'
  }
];

let activeDashboardVideo = 0;

// ========== PAGE NAVIGATION ==========
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page-${page}`)?.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`[data-page="${page}"]`)?.classList.add('active');

  const titles = { dashboard: 'Dashboard', jobs: 'Job Listings', applications: 'Applications', candidates: 'Candidates', 'post-job': 'Post a Job' };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  if (page === 'dashboard') renderDashboard();
  if (page === 'jobs') renderJobs();
  if (page === 'applications') renderApplications();
  if (page === 'candidates') renderCandidates();

  // Close sidebar on mobile
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay')?.classList.remove('open');
}

// Nav click
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    showPage(item.dataset.page);
  });
});

// View all links
document.querySelectorAll('.view-all').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
  });
});

// Mobile menu
document.getElementById('menuBtn').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobileOverlay');
  const isOpen = sidebar.classList.toggle('open');
  overlay?.classList.toggle('open', isOpen);
});

document.getElementById('mobileOverlay')?.addEventListener('click', () => {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('mobileOverlay').classList.remove('open');
});

document.getElementById('themeToggle')?.addEventListener('click', () => {
  setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

document.getElementById('cmdBtn')?.addEventListener('click', () => {
  openCommandPalette();
});

document.getElementById('qaMain')?.addEventListener('click', () => {
  document.getElementById('qaMenu')?.classList.toggle('open');
});

document.querySelectorAll('.qa-item[data-page]').forEach(btn => {
  btn.addEventListener('click', () => {
    showPage(btn.dataset.page);
    document.getElementById('qaMenu')?.classList.remove('open');
  });
});

document.getElementById('exportCsvBtn')?.addEventListener('click', () => {
  exportApplicationsCSV();
  document.getElementById('qaMenu')?.classList.remove('open');
});

document.querySelectorAll('.command-item').forEach(item => {
  item.addEventListener('click', () => executeCommand(item.dataset.command));
});

document.getElementById('commandInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const query = e.target.value.trim().toLowerCase();
    const match = query.includes('csv') ? 'export-csv'
      : query.includes('theme') ? 'toggle-theme'
      : query.includes('candidate') ? 'candidates'
      : query.includes('application') ? 'applications'
      : query.includes('job') && query.includes('create') ? 'post-job'
      : query.includes('job') ? 'jobs'
      : 'dashboard';
    executeCommand(match);
  }
});

document.getElementById('globalSearch').addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    openCommandPalette();
  }
  if (e.key === 'Escape') {
    closeModal('commandModal');
    document.getElementById('qaMenu')?.classList.remove('open');
  }
});

// ========== DASHBOARD ==========
function renderDashboard() {
  // Stats
  document.getElementById('statJobs').textContent = jobs.filter(j => j.status === 'open').length;
  document.getElementById('statApps').textContent = applications.length;
  document.getElementById('statShortlist').textContent = applications.filter(a => ['Interview', 'Offer'].includes(a.stage)).length;
  document.getElementById('statHired').textContent = applications.filter(a => a.stage === 'Hired').length;

  // Recent apps
  const recents = [...applications].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  document.getElementById('recentApps').innerHTML = recents.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return `
      <div class="recent-app-item">
        <div class="app-avatar">${initials(app.name)}</div>
        <div class="app-info">
          <div class="app-name">${app.name}</div>
          <div class="app-pos">${job?.title || 'Unknown'}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
          <span class="stage-pill stage-${app.stage}">${app.stage}</span>
          <span class="app-time">${formatDate(app.date)}</span>
        </div>
      </div>`;
  }).join('');

  // Pipeline
  const stages = ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'];
  const colors = ['#93C5FD', '#FDE68A', '#A78BFA', '#6EE7B7', '#5B8DEF'];
  const maxCount = Math.max(...stages.map(s => applications.filter(a => a.stage === s).length), 1);
  document.getElementById('pipelineStages').innerHTML = stages.map((s, i) => {
    const count = applications.filter(a => a.stage === s).length;
    const pct = Math.round((count / maxCount) * 100);
    return `
      <div class="pipeline-stage">
        <span class="stage-name">${s}</span>
        <div class="stage-bar-wrap"><div class="stage-bar" style="width:${pct}%;background:${colors[i]}"></div></div>
        <span class="stage-count">${count}</span>
      </div>`;
  }).join('');

  // Jobs mini
  const activeJobs = jobs.filter(j => j.status === 'open').slice(0, 5);
  document.getElementById('jobsMini').innerHTML = activeJobs.map(job => `
    <div class="job-mini">
      <div class="job-mini-dept">${job.icon}</div>
      <div class="job-mini-info">
        <div class="job-mini-title">${job.title}</div>
        <div class="job-mini-meta">${job.dept} · ${job.location} · ${job.type}</div>
      </div>
      <div class="job-mini-apps">${job.apps} apps</div>
    </div>`).join('');

  renderInsights();
  renderInterviewTimeline();
  renderVideoDashboard();
  drawPipelineChart();
}

function renderVideoDashboard() {
  const player = document.getElementById('dashboardVideoPlayer');
  const list = document.getElementById('dashboardVideoPlaylist');
  const count = document.getElementById('dashboardVideoCount');
  if (!player || !list || !count) return;

  count.textContent = `${dashboardVideos.length} videos`;

  list.innerHTML = dashboardVideos.map((item, index) => `
    <button class="video-item ${index === activeDashboardVideo ? 'active' : ''}" onclick="selectDashboardVideo(${index})" type="button">
      <span class="video-item-tag">${item.tag}</span>
      <div class="video-item-title">${item.title}</div>
      <div class="video-item-meta">${item.channel} · ${item.duration}</div>
    </button>
  `).join('');

  selectDashboardVideo(activeDashboardVideo, false);

  if (!player.dataset.videoBound) {
    player.addEventListener('play', syncVideoControlLabels);
    player.addEventListener('pause', syncVideoControlLabels);
    player.addEventListener('volumechange', syncVideoControlLabels);
    player.dataset.videoBound = 'true';
  }
}

function selectDashboardVideo(index, autoplay = true) {
  if (index < 0 || index >= dashboardVideos.length) return;
  activeDashboardVideo = index;

  const video = dashboardVideos[index];
  const player = document.getElementById('dashboardVideoPlayer');
  if (!player) return;

  const titleEl = document.getElementById('dashboardVideoTitle');
  const tagEl = document.getElementById('dashboardVideoTag');
  const metaEl = document.getElementById('dashboardVideoMeta');

  if (titleEl) titleEl.textContent = video.title;
  if (tagEl) tagEl.textContent = video.tag;
  if (metaEl) metaEl.textContent = `${video.channel} · Duration ${video.duration}`;

  if (player.src !== video.src) {
    player.src = video.src;
    player.load();
  }

  document.querySelectorAll('.video-item').forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });

  if (autoplay) {
    player.play().catch(() => {
      showToast('Tap play to start the selected video');
    });
  }

  syncVideoControlLabels();
}

function toggleDashboardVideo() {
  const player = document.getElementById('dashboardVideoPlayer');
  if (!player) return;

  if (player.paused) {
    player.play().catch(() => {
      showToast('Unable to autoplay this video source', 'error');
    });
  } else {
    player.pause();
  }
  syncVideoControlLabels();
}

function toggleDashboardMute() {
  const player = document.getElementById('dashboardVideoPlayer');
  if (!player) return;
  player.muted = !player.muted;
  syncVideoControlLabels();
}

function seekDashboardVideo(offsetSeconds) {
  const player = document.getElementById('dashboardVideoPlayer');
  if (!player || Number.isNaN(player.duration)) return;
  player.currentTime = Math.min(Math.max(player.currentTime + offsetSeconds, 0), player.duration || 0);
}

function syncVideoControlLabels() {
  const player = document.getElementById('dashboardVideoPlayer');
  const playBtn = document.getElementById('videoPlayToggle');
  const muteBtn = document.getElementById('videoMuteToggle');
  if (!player) return;

  if (playBtn) playBtn.textContent = player.paused ? 'Play' : 'Pause';
  if (muteBtn) muteBtn.textContent = player.muted ? 'Unmute' : 'Mute';
}

function renderInsights() {
  const openJobs = jobs.filter(j => j.status === 'open').length;
  const interviewCount = applications.filter(a => a.stage === 'Interview').length;
  const hiredCount = applications.filter(a => a.stage === 'Hired').length;
  const rejectedCount = applications.filter(a => a.stage === 'Rejected').length;
  const conversion = applications.length ? Math.round((hiredCount / applications.length) * 100) : 0;

  const insights = [
    { icon: '↗', text: `${openJobs} open roles active. Consider prioritizing Engineering where demand is highest.` },
    { icon: '◎', text: `${interviewCount} candidates are in interview stage. Schedule decision meetings within 48 hours.` },
    { icon: '%', text: `Current hire conversion is ${conversion}%. A score threshold of 78+ can improve quality.` },
    { icon: '!', text: `${rejectedCount} rejections recorded. Capture rejection reasons to optimize job descriptions.` },
  ];

  const list = document.getElementById('insightList');
  if (!list) return;
  list.innerHTML = insights.map(item => `
    <li class="insight-item">
      <span class="insight-icon">${item.icon}</span>
      <p class="insight-copy">${item.text}</p>
    </li>`).join('');
}

function renderInterviewTimeline() {
  const list = document.getElementById('interviewTimeline');
  if (!list) return;

  const upcoming = applications
    .filter(a => ['Interview', 'Offer'].includes(a.stage))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  list.innerHTML = upcoming.map((app, idx) => {
    const job = jobs.find(j => j.id === app.jobId);
    const label = idx === 0 ? 'Today 10:00' : idx === 1 ? 'Today 15:30' : idx === 2 ? 'Tomorrow 11:00' : 'Tomorrow 16:00';
    return `
      <div class="timeline-item">
        <div class="timeline-time">${label}</div>
        <div class="timeline-name">${app.name}</div>
        <div class="timeline-meta">${job?.title || 'Role unavailable'} · Score ${app.score}%</div>
      </div>`;
  }).join('');
}

function drawPipelineChart() {
  const canvas = document.getElementById('pipelineChart');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const data = [12, 15, 14, 18, 20, 17, 22];
  const width = canvas.clientWidth;
  const height = canvas.height;
  canvas.width = width;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const padX = 14;
  const padY = 18;
  const stepX = (width - padX * 2) / (data.length - 1);

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent').trim();
  ctx.beginPath();

  data.forEach((value, i) => {
    const normalized = (value - min) / Math.max(max - min, 1);
    const x = padX + i * stepX;
    const y = height - padY - normalized * (height - padY * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, 'rgba(73, 182, 255, 0.36)');
  gradient.addColorStop(1, 'rgba(73, 182, 255, 0.02)');

  ctx.lineTo(width - padX, height - padY);
  ctx.lineTo(padX, height - padY);
  ctx.closePath();
  ctx.fillStyle = gradient;
  ctx.fill();
}

function openCommandPalette() {
  openModal('commandModal');
  setTimeout(() => document.getElementById('commandInput')?.focus(), 10);
}

function executeCommand(command) {
  if (command === 'export-csv') exportApplicationsCSV();
  else if (command === 'toggle-theme') setTheme(currentTheme === 'light' ? 'dark' : 'light');
  else showPage(command);

  closeModal('commandModal');
  const commandInput = document.getElementById('commandInput');
  if (commandInput) commandInput.value = '';
}

function exportApplicationsCSV() {
  const rows = [
    ['Candidate', 'Email', 'Phone', 'Job', 'Stage', 'Score', 'Applied Date'],
    ...applications.map(app => {
      const job = jobs.find(j => j.id === app.jobId);
      return [app.name, app.email, app.phone, job?.title || '', app.stage, app.score, app.date];
    })
  ];

  const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'talentflow-applications.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  showToast('Applications exported as CSV');
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.classList.toggle('theme-light', theme === 'light');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'light' ? 'Dark' : 'Light';
  localStorage.setItem('talentflow-theme', theme);
  drawPipelineChart();
}

// ========== JOBS ==========
function renderJobs(filter = 'all') {
  const filtered = filter === 'all' ? jobs : jobs.filter(j => j.status === filter);
  document.getElementById('jobsGrid').innerHTML = filtered.map(job => `
    <div class="job-card">
      <div class="job-card-top">
        <div class="job-card-icon">${job.icon}</div>
        <span class="job-status-badge badge-${job.status}">${job.status}</span>
      </div>
      <div class="job-card-title">${job.title}</div>
      <div class="job-card-dept">${job.dept}</div>
      <div class="job-card-meta">
        <span class="job-meta-item">📍 ${job.location}</span>
        <span class="job-meta-item">⏱ ${job.type}</span>
        <span class="job-meta-item">💰 ${job.salary}</span>
        <span class="job-meta-item">📅 ${job.deadline}</span>
      </div>
      <div class="job-card-footer">
        <span class="job-apps-count"><strong>${job.apps}</strong> applications</span>
        <button class="btn-sm" onclick="viewJobApps(${job.id})">View Apps</button>
      </div>
    </div>`).join('');

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
    btn.onclick = () => renderJobs(btn.dataset.filter);
  });
}

function viewJobApps(jobId) {
  showPage('applications');
  setTimeout(() => {
    const sel = document.getElementById('stageFilter');
    sel.value = 'all';
    renderApplications(jobId);
  }, 50);
}

// ========== APPLICATIONS ==========
let currentJobFilter = null;

function renderApplications(jobFilter = null) {
  currentJobFilter = jobFilter;
  const stageFilter = document.getElementById('stageFilter').value;
  let filtered = jobFilter ? applications.filter(a => a.jobId === jobFilter) : applications;
  if (stageFilter !== 'all') filtered = filtered.filter(a => a.stage === stageFilter);

  document.getElementById('appsTableBody').innerHTML = filtered.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return `
      <tr>
        <td>
          <div class="td-candidate">
            <div class="td-avatar">${initials(app.name)}</div>
            <div>
              <div class="td-name">${app.name}</div>
              <div class="td-email">${app.email}</div>
            </div>
          </div>
        </td>
        <td>${job?.title || '—'}</td>
        <td>${formatDate(app.date)}</td>
        <td>
          <select class="stage-select" onchange="updateStage(${app.id}, this.value)">
            ${['Applied','Screening','Interview','Offer','Hired','Rejected'].map(s => `<option ${s===app.stage?'selected':''}>${s}</option>`).join('')}
          </select>
        </td>
        <td><span class="cv-link" onclick="viewCV(${app.id})">📄 View CV</span></td>
        <td>
          <div class="action-btns">
            <div class="icon-btn" title="View Details" onclick="viewAppDetail(${app.id})">👁</div>
            <div class="icon-btn" title="Delete" onclick="deleteApp(${app.id})">🗑</div>
          </div>
        </td>
      </tr>`;
  }).join('');
}

function filterApplications() {
  renderApplications(currentJobFilter);
}

function updateStage(appId, newStage) {
  const app = applications.find(a => a.id === appId);
  if (app) { app.stage = newStage; showToast(`${app.name} moved to ${newStage}`); renderDashboard(); }
}

function deleteApp(appId) {
  const app = applications.find(a => a.id === appId);
  if (!app) return;
  if (confirm(`Remove application from ${app.name}?`)) {
    const job = jobs.find(j => j.id === app.jobId);
    if (job) job.apps = Math.max(0, job.apps - 1);
    applications.splice(applications.indexOf(app), 1);
    renderApplications(currentJobFilter);
    renderDashboard();
    showToast(`Application removed`, 'error');
  }
}

// ========== CV VIEWER ==========
function viewCV(appId) {
  const app = applications.find(a => a.id === appId);
  if (!app) return;
  const cv = cvTemplates[app.name] || cvTemplates.default;
  const job = jobs.find(j => j.id === app.jobId);

  document.getElementById('cvContent').innerHTML = `
    <div class="cv-score">⭐ CV Match Score: ${app.score}%</div>
    <div class="cv-header">
      <div class="cv-name">${app.name}</div>
      <div class="cv-contact">
        <span>📧 ${app.email}</span>
        <span>📞 ${app.phone}</span>
        <span>🎯 Applied for: ${job?.title || '—'}</span>
      </div>
    </div>
    <div class="cv-section">
      <h3>Professional Summary</h3>
      <p>${cv.summary}</p>
    </div>
    <div class="cv-section">
      <h3>Work Experience</h3>
      ${cv.experience.map(e => `
        <div class="cv-exp">
          <div class="cv-exp-title">${e.title}</div>
          <div class="cv-exp-meta">${e.company} · ${e.period}</div>
          <p>${e.desc}</p>
        </div>`).join('')}
    </div>
    <div class="cv-section">
      <h3>Skills</h3>
      <div class="cv-skills">${cv.skills.map(s => `<span class="cv-skill">${s}</span>`).join('')}</div>
    </div>
    <div class="cv-section">
      <h3>Education</h3>
      <p>${cv.education}</p>
    </div>
    <div style="margin-top:20px;display:flex;gap:10px">
      <button class="btn-primary" onclick="updateStageFromCV(${app.id},'Interview');closeModal('cvModal')">→ Move to Interview</button>
      <button class="btn-secondary" onclick="updateStageFromCV(${app.id},'Rejected');closeModal('cvModal')">✕ Reject</button>
    </div>`;
  openModal('cvModal');
}

function updateStageFromCV(appId, stage) {
  updateStage(appId, stage);
  renderApplications(currentJobFilter);
}

// ========== APPLICATION DETAIL ==========
function viewAppDetail(appId) {
  const app = applications.find(a => a.id === appId);
  if (!app) return;
  const job = jobs.find(j => j.id === app.jobId);

  document.getElementById('appContent').innerHTML = `
    <div class="app-detail-header">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
        <div class="cand-avatar" style="width:48px;height:48px;font-size:16px">${initials(app.name)}</div>
        <div>
          <div class="app-detail-name">${app.name}</div>
          <div class="app-detail-pos">${job?.title || '—'}</div>
        </div>
      </div>
      <div class="app-detail-row">
        <span class="app-detail-info">📧 ${app.email}</span>
        <span class="app-detail-info">📞 ${app.phone}</span>
        <span class="app-detail-info">📅 ${formatDate(app.date)}</span>
      </div>
      <span class="stage-pill stage-${app.stage}">${app.stage}</span>
    </div>
    <div class="app-stage-selector">
      <label>Update Stage</label>
      <select id="detailStage" onchange="updateStage(${app.id}, this.value)">
        ${['Applied','Screening','Interview','Offer','Hired','Rejected'].map(s => `<option ${s===app.stage?'selected':''}>${s}</option>`).join('')}
      </select>
    </div>
    <div class="app-notes">
      <label style="font-size:12px;font-weight:600;color:var(--text2);text-transform:uppercase;letter-spacing:.4px">Internal Notes</label>
      <textarea rows="4" placeholder="Add notes about this candidate..." onblur="saveNote(${app.id}, this.value)">${app.notes}</textarea>
    </div>
    <div class="app-modal-actions">
      <button class="btn-secondary" onclick="viewCV(${app.id});closeModal('appModal')">View CV</button>
      <button class="btn-primary" onclick="closeModal('appModal')">Save & Close</button>
    </div>`;
  openModal('appModal');
}

function saveNote(appId, note) {
  const app = applications.find(a => a.id === appId);
  if (app) { app.notes = note; showToast('Note saved'); }
}

// ========== CANDIDATES ==========
function renderCandidates() {
  const unique = {};
  applications.forEach(app => {
    if (!unique[app.name]) {
      unique[app.name] = { ...app, allJobs: [app.jobId] };
    } else {
      unique[app.name].allJobs.push(app.jobId);
    }
  });

  document.getElementById('candidatesGrid').innerHTML = Object.values(unique).map(c => {
    const job = jobs.find(j => j.id === c.jobId);
    return `
      <div class="candidate-card">
        <div class="cand-avatar">${initials(c.name)}</div>
        <div class="cand-name">${c.name}</div>
        <div class="cand-pos">${job?.title || '—'}</div>
        <span class="stage-pill stage-${c.stage} cand-stage">${c.stage}</span>
        <div class="cand-actions">
          <button class="btn-sm" onclick="viewCV(${c.id})">View CV</button>
          <button class="btn-sm" onclick="viewAppDetail(${c.id})">Details</button>
        </div>
      </div>`;
  }).join('');
}

// ========== POST JOB ==========
function submitJob(e) {
  e.preventDefault();
  const depts = { Engineering: "💻", Design: "🎨", Marketing: "📈", Sales: "🤝", HR: "👥", Finance: "💰", Operations: "⚙️" };
  const dept = document.getElementById('jobDept').value;
  const newJob = {
    id: Date.now(),
    title: document.getElementById('jobTitle').value,
    dept,
    location: document.getElementById('jobLocation').value,
    type: document.getElementById('jobType').value,
    salary: document.getElementById('jobSalary').value || 'Negotiable',
    status: 'open',
    deadline: document.getElementById('jobDeadline').value || '2026-06-01',
    desc: document.getElementById('jobDesc').value,
    reqs: document.getElementById('jobReqs').value,
    benefits: document.getElementById('jobBenefits').value,
    icon: depts[dept] || '💼',
    apps: 0
  };
  jobs.unshift(newJob);
  document.getElementById('jobForm').reset();
  showToast('Job published successfully! 🎉');
  renderDashboard();
  setTimeout(() => showPage('jobs'), 1200);
}

function saveDraft() {
  showToast('Saved as draft');
}

// ========== HELPERS ==========
function initials(name) {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type === 'error' ? 'error' : ''} show`;
  setTimeout(() => t.classList.remove('show'), 3000);
}

// Close modals on overlay click
document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); });
});

// Global search
document.getElementById('globalSearch').addEventListener('input', function () {
  const q = this.value.toLowerCase();
  if (!q) return;
  const found = applications.filter(a => a.name.toLowerCase().includes(q) || jobs.find(j => j.id === a.jobId)?.title.toLowerCase().includes(q));
  if (found.length) {
    showPage('applications');
    setTimeout(() => {
      document.getElementById('appsTableBody').innerHTML = found.map(app => {
        const job = jobs.find(j => j.id === app.jobId);
        return `<tr>
          <td><div class="td-candidate"><div class="td-avatar">${initials(app.name)}</div><div><div class="td-name">${app.name}</div><div class="td-email">${app.email}</div></div></div></td>
          <td>${job?.title || '—'}</td>
          <td>${formatDate(app.date)}</td>
          <td><span class="stage-pill stage-${app.stage}">${app.stage}</span></td>
          <td><span class="cv-link" onclick="viewCV(${app.id})">📄 View CV</span></td>
          <td><div class="action-btns"><div class="icon-btn" onclick="viewAppDetail(${app.id})">👁</div></div></td>
        </tr>`;
      }).join('');
    }, 50);
  }
});

// ========== INIT ==========
setTheme(currentTheme);
renderDashboard();
