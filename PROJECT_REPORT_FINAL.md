# DevHacks Project Report

## Team Details
- **Team Name:** DevHacks (Update if needed)
- **Institute/Event:** ______________________________
- **Project Title:** CodeStorm — AI-Powered Competitive Coding Platform
- **Team Members:**
  1. SHIVSHARN (Full-Stack / Platform Engineering)
  2. ______________________________
  3. ______________________________
  4. ______________________________
- **Submission Date:** 22 February 2026

---

## 1. Introduction

CodeStorm is a full-stack coding platform designed for learning, practicing, and competing in programming challenges. The platform combines traditional problem-solving workflows with real-time competitive mechanics, AI-assisted guidance, and secure sandbox-based code execution.

The core vision of this project is to provide a single environment where a beginner can practice categorized problems, an intermediate learner can join timed contests, and advanced users can participate in high-pressure 1v1 battle modes. Unlike static coding websites, CodeStorm introduces live contest dynamics, instant leaderboard progression, and game-oriented experiences such as Blitz Battles and contest arenas.

From a systems perspective, the platform is engineered around:
- A secure backend judge pipeline
- Docker-based isolated execution environments
- Queue-driven asynchronous processing
- Real-time updates through polling/WebSocket patterns
- Scalable REST APIs with Swagger/OpenAPI support
- A modern UI with Monaco editor integration and AI assistance

The final result is not just a coding judge but a complete competitive learning ecosystem with user identity, profile management, contest orchestration, real-time rankings, and AI-supported problem solving.

---

## 2. Problem Statement

Most existing coding platforms are either:
1. **Practice-only systems** with weak competition features, or
2. **Contest-only systems** with poor user onboarding and guidance.

Also, many implementations suffer from one or more of the following issues:
- Unsafe code execution (running untrusted code directly on host)
- Limited language support
- Non-real-time or delayed leaderboard updates
- No anti-cheat / plagiarism awareness
- Weak user profile and auth workflows
- Poor UX during timed contests

### Our Problem Definition
We aimed to build a **secure, responsive, and competition-ready coding platform** that supports:
- Practice mode with filters (difficulty, status, tags)
- Contest mode with timers and ranking
- Multi-language submissions (C/C++, Java, Python, JavaScript, Go, Rust support at API layer)
- Real-time leaderboard behavior
- Isolated code execution through Docker sandboxing
- User authentication (JWT + OAuth2 pathways), profile handling, and protected APIs

### Why This Matters
In hackathons, colleges, and coding clubs, organizers need robust contest infrastructure while participants need immediate feedback and fair evaluation. Our platform bridges this gap by combining secure backend architecture and user-first interactive workflows.

---

## 3. Working

## 3.1 High-Level System Flow

1. User logs in/registers and receives JWT tokens.
2. User selects Practice / Contest / 1v1 Battle mode.
3. Code is written in Monaco editor and submitted.
4. Backend validates request and queues submission.
5. Judge service compiles/runs code in isolated Docker sandbox.
6. Verdict, time, and memory are computed using test cases + checker strategy.
7. Result is stored in DB and pushed/polled to update UI.
8. If contest submission is AC, participant score/rank data is updated.

---

## 3.2 Secure Code Execution (Docker + Isolation)

Security and fairness are central to the platform.

### Sandbox Architecture
- A dedicated sandbox image contains runtimes and compilers (GCC/G++, Python3, Node.js, OpenJDK 17).
- Untrusted submissions execute in isolated user home directories inside Docker.
- The backend manages persistent/recoverable sandbox containers for reliability.

### Isolation Controls Implemented
- **cgroup v2 controls** in `run_isolated.sh`:
  - Memory cap (`memory.max`)
  - Swap cap (`memory.swap.max`)
  - CPU control (`cpu.max`)
- **ulimit restrictions**:
  - Process count
  - File size
  - Open files
  - Stack size
- **Timeout-based execution**:
  - Hard kill after configured time window
- **seccomp policy**:
  - Default action kill (`SCMP_ACT_KILL`)
  - Explicit syscall allowlist for safe execution profile
- **Per-submission user isolation**:
  - Temporary Linux user creation and cleanup
  - Controlled I/O files (`input.txt`, `output.txt`, `error.txt`)

### Reliability + Cross-Platform Control Fixes
- Container readiness verification with timeout checks before judging.
- Re-linking to healthy running container if available.
- Fallback handling for Windows Docker seccomp behavior.
- Structured cleanup for user/cgroup/temp resources.

This design significantly reduces risk of host-level compromise while ensuring deterministic judging under limits.

---

## 3.3 Multi-Language Judging Pipeline

The submission API supports multiple languages. The judge performs language-specific compile/run steps and returns verdicts such as:
- PENDING / RUNNING
- ACCEPTED (AC)
- WRONG_ANSWER
- TIME_LIMIT_EXCEEDED
- MEMORY_LIMIT_EXCEEDED
- RUNTIME_ERROR
- COMPILE_ERROR

### Checker Strategies
- EXACT (normalized exact comparison)
- TOKEN (token-by-token)
- FLOAT (epsilon-based)
- SPECIAL (custom extension point)

This makes the platform flexible across beginner and advanced problem types.

---

## 3.4 Contest Mode + Real-Time Leaderboard

Contest features include contest creation, registration, arena view, timer tracking, and rankings.

### Contest Flow
- Admin/creator creates contest and maps problem set.
- Users register via contest modal.
- Arena shows timer, problems, solved states, performance panel.
- User submits with `contestId` context.
- On AC, points and penalties update participant standings.

### Real-Time Behavior
- Arena polls leaderboard and personal submissions at 2s interval.
- Solved counts and rank changes appear without full page reload.
- Contest page and arena include defensive error states for smoother UX.

This provides a live-competition experience where users can instantly observe rank movement.

---

## 3.5 1v1 Battle / Game Modes

The platform includes game-first modules beyond standard practice:
- **1v1 Battle mode:** create room, share party code, join duel, random problem allocation, live battle status via topic updates.
- **Blitz/arena-style pages:** fast-paced UI flows for competitive interaction.
- **Mock Interview mode:** AI-generated interview questions with response evaluation.

### 1v1 Battle Working
- Player 1 creates room (`/api/battle/create`).
- Player 2 joins by code (`/api/battle/join`).
- Battle starts with assigned problem and status transitions.
- Verdict events update battle state and winner.
- Topic messaging broadcasts room updates to participants.

This gamifies coding and improves engagement compared to traditional single-user judge systems.

---

## 3.6 AI Features (Hints + Integrity Signals)

AI is integrated as assistant, not replacement.

### AI Hint Assistant
- Users can request context-aware hints from the coding page.
- Backend `GeminiHintService` analyzes code + problem context + error signals.
- Response returns structured hint summary, hint list, and optional corrected snippet.

### Contest Integrity / Plagiarism Signals
- Contest flow includes plagiarism/AI-likelihood analysis endpoint.
- Provides verdict, originality score, indicators, explanation, recommendation.
- Supports manual review workflows for suspicious patterns.

Together, these features improve learning while strengthening competitive fairness.

---

## 3.7 Authentication, Profiles, and API Security

### Auth Stack
- JWT login/signup/refresh endpoints
- Optional OAuth2 login success handling
- Role-based route protection for admin paths
- Protected profile endpoints

### Security Configuration Highlights
- CORS control with configured origins
- Stateless/token-aware filtering
- Explicit public route allowlist
- Swagger/OpenAPI docs routes exposed safely for development/testing

### User/Profile Management
- Registration and login
- User info retrieval
- Profile update support with multipart data (including profile image)

---

## 3.8 API Observability (Swagger/OpenAPI)

The backend includes OpenAPI/Swagger UI integration via SpringDoc.

- Swagger UI path: `/swagger-ui/**`
- OpenAPI JSON: `/v3/api-docs/**`

This enables quick API validation, integration testing, and demo-friendly documentation during reviews/judging.

---

## 4. Features

### Core Platform Features
1. Practice mode with searchable/categorized problems:
   - Difficulty filters (Easy/Medium/Hard)
   - Status filters (Todo/Solved/Attempted)
   - Tag-oriented browsing
2. Contest mode:
   - Timed arena
   - Contest registration
   - Problem set assignment
   - Performance metrics + leaderboard
3. Multi-language submission support:
   - Python, Java, C++, JavaScript (plus extended language support present in API enum handling)
4. Real-time update system:
   - Frequent leaderboard refresh in contest arena
   - Live status progression for submissions
5. Secure execution layer:
   - Docker isolation, cgroups, seccomp, ulimits, timeouts
6. User management:
   - JWT auth + token refresh
   - Profile endpoints and personalization
7. 1v1 battle mode:
   - Party code room creation/joining
   - Winner resolution and battle state sync
8. AI assistant tools:
   - Hint generation
   - Plagiarism/AI-likelihood checks
9. Monaco editor integration:
   - Syntax highlighting, language-aware editing, coding templates
10. REST API coverage + docs:
   - Contest/problem/submission/battle endpoints
   - Swagger/OpenAPI for endpoint exploration

---

## 5. USP (Unique Selling Proposition)

Our platform’s uniqueness comes from the **combination** of security, gamification, and AI-assisted learning in one coherent product.

### Key USP Points
1. **Secure by design judge pipeline**
   - Not just “run code”: actual isolation controls (Docker + cgroup + seccomp + timeout + per-user sandboxing).
2. **Competition-first architecture**
   - Contest arena, rank dynamics, and 1v1 battle mechanics are deeply integrated.
3. **AI as mentor + moderator**
   - Hint assistant supports learning; plagiarism/AI-likelihood helps maintain contest integrity.
4. **Developer-friendly backend exposure**
   - Rich endpoint surface and Swagger docs for fast extension and testing.
5. **Balanced UX for both learning and gaming**
   - Practice, contest, battle, and interview workflows coexist in one platform.

In short: **CodeStorm is not only a coding judge, but a complete competitive coding ecosystem with robust execution security and modern interaction design.**

---

## 6. Photos

> Add screenshots in the final submission document using the list below. Replace placeholders with actual images from your running app.

### Suggested Screenshot Checklist
1. **Landing/Home Dashboard**
   - Show navigation cards for Practice, Contests, Battle, Profile.
2. **Practice Mode with Filters**
   - Difficulty/status/tag filters visible.
3. **Problem Solving Page**
   - Monaco editor + test cases + submit panel.
4. **AI Hint Assistant Panel**
   - Hint response with summary and suggestions.
5. **Contest Arena**
   - Timer, problem list, score panel.
6. **Real-Time Leaderboard**
   - Before/after score change across users.
7. **1v1 Battle Room**
   - Party code creation/join flow and live battle state.
8. **Swagger UI**
   - API endpoint documentation screen.
9. **Docker Sandbox Evidence**
   - Running sandbox container and/or relevant logs.
10. **Submission Verdict Result**
   - AC / WA / CE example with runtime and memory.

### Recommended File Naming
- `photo_01_home.png`
- `photo_02_practice_filters.png`
- `photo_03_editor_submit.png`
- `photo_04_ai_hints.png`
- `photo_05_contest_arena.png`
- `photo_06_realtime_leaderboard.png`
- `photo_07_1v1_battle.png`
- `photo_08_swagger.png`
- `photo_09_docker_sandbox.png`
- `photo_10_verdicts.png`

---

## Core Goals Coverage Matrix

| Core Goal | Implementation Status | Notes |
|---|---|---|
| Full-stack web development | ✅ Achieved | React frontend + Spring Boot backend |
| Real-time systems | ✅ Achieved | Contest leaderboard updates + live contest data refresh |
| API integrations | ✅ Achieved | Gemini integrations, REST APIs, Swagger docs |
| Database design/performance | ✅ Achieved | JPA repositories, contest/submission relational model, async queue workflow |
| Clean responsive UI/UX | ✅ Achieved | Arena, practice filters, modern editor workflow |

---

## Compulsory Requirements Compliance

| Requirement | Status | How It Is Met |
|---|---|---|
| Multi-language code submission | ✅ | Language-aware compile/run judging pipeline |
| Functional contest mode + leaderboard | ✅ | Contest create/register/arena + ranked leaderboard endpoints |
| Secure code execution system | ✅ | Docker isolation, seccomp, cgroup, ulimit, timeout controls |
| Proper database integration | ✅ | Entity/repository/service architecture with persistent submissions and contests |
| Responsive and user-friendly interface | ✅ | Componentized React pages for practice, contest, battle, profile, and editor workflows |

---

## Conclusion

CodeStorm successfully meets the challenge goals by delivering a production-style coding platform with secure execution, multi-mode competition, AI-assisted learning, and real-time contest experiences. The system is modular enough for future scaling (WebSocket push enhancements, anti-cheat expansion, advanced analytics) while already covering all mandatory requirements in the current implementation.

This project demonstrates practical full-stack engineering, secure sandbox design, real-time contest orchestration, and API-driven extensibility suitable for hackathon evaluation and future product growth.
