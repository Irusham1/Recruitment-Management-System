# TalentFlow — Recruitment Management System

A full-stack job recruitment system with CV management, built with HTML, CSS, JavaScript, and PHP.

## 📁 File Structure

```
recruitment_system/
├── index.html          # Main HR dashboard (SPA)
├── style.css           # All styles
├── app.js              # Frontend logic (simulated data)
├── apply.html          # Public-facing application form
├── config/
│   ├── database.php    # MySQL connection & helpers
│   └── schema.sql      # Database tables + seed data
├── api/
│   ├── jobs.php        # GET/POST/PUT/DELETE job listings
│   ├── applications.php # Applications + CV file upload
│   └── candidates.php  # Candidate search & listing
└── uploads/
    └── cvs/            # Uploaded CV files (auto-created)
```

## 🚀 Features

### HR Dashboard
- **Dashboard** — Stats overview (active jobs, applications, shortlisted, hired)
- **Pipeline chart** — Visualise candidates at each recruitment stage
- **Job Listings** — Card view with filter by status (open/closed/draft)
- **Applications** — Table view with stage management, CV viewer, notes
- **Candidates** — Card grid of all applicants
- **Post a Job** — Full form to create new listings

### CV Management
- Upload CV/Resume (PDF or Word, max 5MB) via public apply form
- View CVs inline with match score display
- One-click stage updates from CV viewer

### Application Pipeline Stages
`Applied → Screening → Interview → Offer → Hired / Rejected`

## ⚙️ Setup (PHP + MySQL)

### 1. Requirements
- PHP 7.4+ with `mysqli` extension
- MySQL 5.7+ or MariaDB 10.3+
- Apache/Nginx web server (or `php -S localhost:8000`)

### 2. Database
```sql
-- Run in MySQL:
source config/schema.sql
```

### 3. Config
Edit `config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_USER', 'your_db_user');
define('DB_PASS', 'your_db_password');
define('DB_NAME', 'talentflow_db');
```

### 4. Run
```bash
cd recruitment_system
php -S localhost:8000
# Open http://localhost:8000
```

## 🔌 REST API Endpoints

### Jobs
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/jobs.php` | List all jobs |
| GET | `/api/jobs.php?id=1` | Get single job |
| GET | `/api/jobs.php?status=open` | Filter by status |
| POST | `/api/jobs.php` | Create new job |
| PUT | `/api/jobs.php?id=1` | Update job |
| DELETE | `/api/jobs.php?id=1` | Delete job |

### Applications
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/applications.php` | List all applications |
| GET | `/api/applications.php?stage=Interview` | Filter by stage |
| GET | `/api/applications.php?job_id=1` | Filter by job |
| POST | `/api/applications.php` | Submit application (multipart with CV) |
| PUT | `/api/applications.php?id=5` | Update stage/notes |
| DELETE | `/api/applications.php?id=5` | Delete application |

### Candidates
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/candidates.php` | List all candidates |
| GET | `/api/candidates.php?q=name` | Search candidates |
| GET | `/api/candidates.php?id=1` | Get candidate details |

## 📋 Example API Usage (JavaScript)

```javascript
// Create a job
await fetch('/api/jobs.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Colombo',
    job_type: 'Full-time',
    description: 'Build amazing products...'
  })
});

// Submit application with CV
const form = new FormData();
form.append('job_id', 1);
form.append('candidate_name', 'Ayesha Perera');
form.append('candidate_email', 'ayesha@email.com');
form.append('cv', cvFile);  // File object
await fetch('/api/applications.php', { method: 'POST', body: form });

// Update stage
await fetch('/api/applications.php?id=5', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ stage: 'Interview', notes: 'Strong candidate' })
});
```

## 🎨 Customisation

- **Colors**: Edit CSS variables in `:root` in `style.css`
- **Departments**: Update the `$icons` array in `api/jobs.php`
- **Stages**: Modify the ENUM in `schema.sql` and stage arrays in `app.js`
- **Company name**: Replace "TalentFlow" in HTML files

---
Built with ❤️ for Sri Lankan HR teams.
