-- Flyway migration: initial schema for problems, test_cases, submissions

CREATE TABLE IF NOT EXISTS problems (
  id VARCHAR(100) PRIMARY KEY,
  title VARCHAR(255),
  time_limit_ms INT DEFAULT 2000,
  memory_limit_mb INT DEFAULT 256,
  checker_type VARCHAR(50) DEFAULT 'EXACT'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS test_cases (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  problem_id VARCHAR(100) NOT NULL,
  input_path TEXT,
  output_path TEXT,
  points INT DEFAULT 10,
  is_sample BOOLEAN DEFAULT FALSE,
  `ordering` INT DEFAULT 0,
  CONSTRAINT fk_testcase_problem FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS submissions (
  id CHAR(36) PRIMARY KEY,
  user_id BIGINT NULL,
  problem_id VARCHAR(100) NULL,
  language VARCHAR(20),
  code LONGTEXT,
  status VARCHAR(30),
  verdict_detail LONGTEXT,
  time_ms INT,
  memory_kb INT,
  score INT,
  compile_error LONGTEXT,
  submitted_at TIMESTAMP NULL,
  judged_at TIMESTAMP NULL,
  CONSTRAINT fk_submission_problem FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
