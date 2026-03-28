-- ============================================================
-- TalentFlow Recruitment System — Database Schema
-- Run this SQL in your MySQL/MariaDB server
-- ============================================================

CREATE DATABASE IF NOT EXISTS talentflow_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE talentflow_db;

-- ======== JOBS TABLE ========
CREATE TABLE IF NOT EXISTS jobs (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(200)  NOT NULL,
    department  VARCHAR(100)  NOT NULL,
    location    VARCHAR(150)  NOT NULL,
    job_type    ENUM('Full-time','Part-time','Contract','Internship','Remote') NOT NULL,
    salary      VARCHAR(100),
    status      ENUM('open','closed','draft') DEFAULT 'open',
    deadline    DATE,
    description TEXT          NOT NULL,
    requirements TEXT,
    benefits    TEXT,
    icon        VARCHAR(10)   DEFAULT '💼',
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ======== CANDIDATES TABLE ========
CREATE TABLE IF NOT EXISTS candidates (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(200)  NOT NULL,
    email       VARCHAR(200)  NOT NULL UNIQUE,
    phone       VARCHAR(30),
    address     VARCHAR(300),
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ======== APPLICATIONS TABLE ========
CREATE TABLE IF NOT EXISTS applications (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    candidate_id  INT           NOT NULL,
    job_id        INT           NOT NULL,
    stage         ENUM('Applied','Screening','Interview','Offer','Hired','Rejected') DEFAULT 'Applied',
    cv_filename   VARCHAR(300),
    cover_letter  TEXT,
    notes         TEXT,
    score         TINYINT UNSIGNED DEFAULT 0,
    applied_at    DATE          DEFAULT (CURRENT_DATE),
    updated_at    TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    UNIQUE KEY unique_application (candidate_id, job_id)
);

-- ======== SEED DATA ========
INSERT INTO jobs (title, department, location, job_type, salary, status, deadline, description, requirements, benefits, icon) VALUES
('Senior Frontend Developer', 'Engineering', 'Colombo', 'Full-time', 'LKR 200,000–300,000', 'open', '2026-04-15', 'Lead our web product frontend.', '5+ years React, TypeScript.', 'Health insurance, remote option.', '💻'),
('Product Designer',          'Design',       'Remote',   'Full-time', 'LKR 150,000–220,000', 'open', '2026-04-20', 'Shape UI/UX of growing product.', '3+ years Figma, portfolio.',   'Stock options, annual retreat.',  '🎨'),
('Marketing Manager',         'Marketing',    'Colombo',  'Full-time', 'LKR 180,000–250,000', 'open', '2026-04-10', 'Drive brand and growth campaigns.',  '4+ years digital marketing.',  'Performance bonus, learning budget.', '📈'),
('Backend Engineer',          'Engineering',  'Colombo',  'Full-time', 'LKR 200,000–280,000', 'open', '2026-05-01', 'Build scalable APIs and services.',  'Node.js/Python, PostgreSQL.',  'Remote-friendly, tech allowance.', '⚙️');
