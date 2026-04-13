-- ============================================================
-- TalentFlow — config/schema.sql
-- Database tables + seed data
-- ============================================================

CREATE DATABASE IF NOT EXISTS talentflow_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE talentflow_db;

-- ── Jobs ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS jobs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200) NOT NULL,
    department  VARCHAR(100) NOT NULL,
    location    VARCHAR(100) NOT NULL,
    job_type    ENUM('Full-time','Part-time','Contract','Internship') NOT NULL DEFAULT 'Full-time',
    description TEXT,
    status      ENUM('open','closed','draft') NOT NULL DEFAULT 'open',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Candidates ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS candidates (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(200) NOT NULL,
    email      VARCHAR(200) NOT NULL UNIQUE,
    phone      VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Applications ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS applications (
    id           INT AUTO_INCREMENT PRIMARY KEY,
    job_id       INT NOT NULL,
    candidate_id INT NOT NULL,
    stage        ENUM('Applied','Screening','Interview','Offer','Hired','Rejected') NOT NULL DEFAULT 'Applied',
    cv_filename  VARCHAR(300),
    notes        TEXT,
    applied_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id)       REFERENCES jobs(id)       ON DELETE CASCADE,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- Seed Data
-- ============================================================

INSERT IGNORE INTO jobs (title, department, location, job_type, description, status) VALUES
('Senior Full Stack Developer', 'Engineering', 'Colombo',  'Full-time',  'Build scalable web applications using React and Node.js.', 'open'),
('UI/UX Designer',              'Design',      'Remote',   'Full-time',  'Design beautiful user interfaces and experiences.',        'open'),
('Data Analyst',                'Analytics',   'Kandy',    'Full-time',  'Analyse data and produce actionable insights.',            'open'),
('Marketing Manager',           'Marketing',   'Colombo',  'Full-time',  'Lead marketing campaigns and grow brand awareness.',       'closed'),
('Junior React Developer',      'Engineering', 'Remote',   'Contract',   'Develop React components for web apps.',                   'open'),
('HR Coordinator',              'HR',          'Colombo',  'Part-time',  'Coordinate recruitment and employee onboarding.',          'draft'),
('DevOps Engineer',             'Engineering', 'Colombo',  'Full-time',  'Manage CI/CD pipelines and cloud infrastructure.',         'open'),
('Product Manager',             'Product',     'Colombo',  'Full-time',  'Drive product roadmap and collaborate with teams.',        'open');

INSERT IGNORE INTO candidates (name, email, phone) VALUES
('Ayesha Perera',       'ayesha@email.com',    '+94711234567'),
('Kasun Silva',         'kasun@email.com',     '+94722345678'),
('Nimali Fernando',     'nimali@email.com',    '+94733456789'),
('Ravindu Bandara',     'ravindu@email.com',   '+94744567890'),
('Shalini Jayawardena', 'shalini@email.com',   '+94755678901'),
('Tharaka Wijesinghe',  'tharaka@email.com',   '+94766789012'),
('Dilani Rathnayake',   'dilani@email.com',    '+94777890123'),
('Pradeep Kumara',      'pradeep@email.com',   '+94788901234'),
('Malsha Abeywickrama', 'malsha@email.com',    '+94799012345'),
('Janaka Herath',       'janaka@email.com',    '+94710123456');

INSERT IGNORE INTO applications (job_id, candidate_id, stage, notes) VALUES
(1, 1, 'Interview',  'Strong candidate with 5 years exp.'),
(1, 2, 'Screening',  ''),
(2, 3, 'Applied',    'Great portfolio.'),
(3, 4, 'Offer',      'Excellent analytical skills.'),
(1, 5, 'Hired',      'Joined 1 April.'),
(5, 6, 'Screening',  ''),
(2, 7, 'Rejected',   'Not enough experience.'),
(7, 8, 'Applied',    ''),
(8, 9, 'Screening',  ''),
(3, 10,'Interview',  'Second interview scheduled.');
