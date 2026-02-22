# ⚡ CodeStorm — Competitive Programming Arena

### *"Where Code Meets Competition"*

**Team:** DevHacks | **Stack:** Spring Boot 4 + React 19 + Docker + Gemini AI

---

## 🧭 SLIDE 1 — What is CodeStorm?

CodeStorm is a **full-stack competitive programming platform** that combines:

- 🏋️ **Practice Arena** — Solve problems with real-time judging
- ⚔️ **1v1 Blitz Battles** — Real-time head-to-head coding duels via WebSocket
- 🏆 **Contest System** — Create & join timed competitive contests with leaderboards
- 🤖 **AI-Powered Features** — Gemini 2.5 Flash for hints, plagiarism detection & mock interviews
- 🎮 **Gamified Learning** — Coins, XP, streaks, and debug-the-code game modes
- 👥 **Community** — Discussion forum with posts, tags, and engagement

> Think of it as **LeetCode + Codeforces + ChatGPT** — built from scratch in a hackathon.

---

## 🏗️ SLIDE 2 — System Architecture Overview

```
┌────────────────────────────────────────────────────────────────────────┐
│                         CLIENT (React 19 + Vite 7)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐  │
│  │ Practice  │ │  Battle  │ │ Contest  │ │Interview │ │ Community  │  │
│  │  Page     │ │  Arena   │ │  Arena   │ │   Page   │ │   Forum    │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────────┘  │
│       │             │            │             │                       │
│       ▼             ▼            ▼             ▼                       │
│  ┌──────────────────────────────────────────────────┐                 │
│  │    Axios HTTP Client  +  STOMP/WebSocket Client   │                │
│  └──────────────────────┬───────────────────────────┘                 │
└─────────────────────────┼─────────────────────────────────────────────┘
                          │  REST API (JWT Bearer) + WebSocket (STOMP)
                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    SPRING BOOT 4.0.3 BACKEND                          │
│                                                                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐ │
│  │   Auth &    │  │  Problem &  │  │   Battle    │  │   Contest    │ │
│  │  Security   │  │  Judging    │  │   Service   │  │   Service    │ │
│  │  (JWT+OAuth)│  │  Engine     │  │  (WebSocket)│  │ (Leaderboard)│ │
│  └─────────────┘  └──────┬──────┘  └─────────────┘  └──────────────┘ │
│                          │                                             │
│  ┌─────────────┐  ┌──────▼──────┐  ┌─────────────┐  ┌──────────────┐ │
│  │  Gemini AI  │  │  Docker     │  │ Notification │  │    Job       │ │
│  │  Service    │  │  Sandbox    │  │  Service     │  │   Queue      │ │
│  │ (Hints/Plag │  │  (Isolated  │  │ (WebSocket   │  │ (Async       │ │
│  │  /Interview)│  │   Judge)    │  │  Push)       │  │  Workers)    │ │
│  └─────────────┘  └──────┬──────┘  └─────────────┘  └──────────────┘ │
│                          │                                             │
│  ┌───────────────────────▼────────────────────────────────────────┐   │
│  │                    MySQL + Flyway Migrations                    │   │
│  │  Users · Problems · Submissions · Contests · Battles · OTPs   │   │
│  └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────────────────┐
│              🐳 DOCKER SANDBOX (Isolated Execution Engine)             │
│                                                                        │
│  Ubuntu 22.04 | GCC/G++ | Python 3 | JDK 17 | Node.js                │
│  cgroups v2 · seccomp · per-user isolation · ulimits                  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 SLIDE 3 — Authentication & Security Layer

### Dual Authentication System

| Feature | Details |
|---------|---------|
| **JWT Auth** | HS512-signed tokens, 1-hour access + 7-day refresh tokens |
| **OAuth 2.0** | GitHub & Google social login with automatic account linking |
| **OTP Verification** | Email-based OTP for signup verification via SMTP (Gmail) |
| **CORS Policy** | Whitelisted origins only — `localhost:5173` in dev, configurable for prod |
| **Role-Based Access** | Admin endpoints protected, user-scoped data access |

### Security Flow:
```
User → Login (username/password) → Spring Security AuthManager
     → Custom AuthProvider validates against BCrypt-hashed DB password
     → JWT token pair generated (access + refresh)
     → All subsequent requests: Authorization: Bearer <token>
     → JwtAuthenticationFilter validates on every request
     → SecurityContext populated → Controller access granted
```

**OAuth2 Flow:** GitHub/Google → Redirect → OAuth2LoginSuccessHandler → Auto-create user → Issue JWT → Redirect to frontend with token

---

## 🐳 SLIDE 4 — Docker Sandbox: Secure Code Execution (CORE INNOVATION)

### The Problem:
Executing **untrusted user code** on a server is extremely dangerous. Users could:
- Run `rm -rf /`, access the filesystem
- Fork-bomb the server (`:(){ :|:& };:`)
- Open network connections, mine crypto
- Consume infinite memory/CPU

### Our Solution: **5-Layer Isolation Architecture**

```
┌──────────────────────────────────────────────────────────┐
│  LAYER 1: Docker Container Isolation                     │
│  • Separate filesystem namespace                         │
│  • No host network access                                │
│  • Read-only root filesystem (--read-only)               │
│  • No privileged escalation (--no-new-privileges)        │
├──────────────────────────────────────────────────────────┤
│  LAYER 2: Seccomp System Call Filter                     │
│  • Default policy: SCMP_ACT_KILL (deny all)              │
│  • Whitelist of ~50 safe syscalls only                   │
│  • Blocks: socket, connect, bind (no network)            │
│  • Blocks: mount, chroot, ptrace (no escalation)         │
│  • kill/tkill only allowed for self-signal (arg0 == 0)   │
├──────────────────────────────────────────────────────────┤
│  LAYER 3: cgroups v2 Resource Limits                     │
│  • memory.max → Hard memory cap (e.g., 256MB)            │
│  • memory.swap.max → 0 (no swap, instant OOM)            │
│  • cpu.max → 100ms/100ms (100% of one core max)          │
│  • Per-submission cgroup created & destroyed              │
├──────────────────────────────────────────────────────────┤
│  LAYER 4: Per-User OS-Level Isolation                    │
│  • Each submission runs as a unique Linux user            │
│  • ulimit -u 256 (max 256 processes — no fork bombs)     │
│  • ulimit -f 10240 (max 10MB file output)                │
│  • ulimit -n 64 (max 64 open file descriptors)           │
│  • ulimit -s 65536 (64MB stack size)                     │
│  • User created → code executed → user deleted           │
├──────────────────────────────────────────────────────────┤
│  LAYER 5: Time-Bounded Execution                         │
│  • timeout --kill-after=1s <time_limit>                  │
│  • Wall-clock timer via nanosecond timestamps            │
│  • /usr/bin/time -v for precise resource measurement     │
│  • Automatic cleanup: cgroup.kill → userdel → rm workdir │
└──────────────────────────────────────────────────────────┘
```

### Seccomp Profile Deep-Dive:
```json
{
  "defaultAction": "SCMP_ACT_KILL",    ← KILL process on ANY disallowed syscall
  "architectures": ["SCMP_ARCH_X86_64"],
  "syscalls": [
    { "names": ["read","write","open","mmap","brk","execve","exit",...],
      "action": "SCMP_ACT_ALLOW" },     ← Only ~50 safe operations permitted
    { "names": ["kill","tkill"],
      "action": "SCMP_ACT_ALLOW",
      "args": [{"index":0,"value":0,"op":"SCMP_CMP_EQ"}] } ← Can ONLY signal itself
  ]
}
```

> **Key Talking Point:** "We use a defense-in-depth approach — even if one layer is bypassed, the others still protect the host system. The seccomp profile uses a default-KILL policy with an explicit whitelist of ~50 syscalls,making it impossible to open network sockets, mount filesystems, or perform privilege escalation."

---

## ⚖️ SLIDE 5 — Online Judge Engine

### Judging Pipeline:

```
Submit Code → Job Queue (Async) → Plagiarism Check (Gemini AI)
                                        │
                                        ▼
                                  Penalty Applied?
                                  (AI-Generated/Plagiarised → flag)
                                        │
                                        ▼
                              Docker Sandbox Execution
                                        │
                        ┌───────────────┼───────────────┐
                        ▼               ▼               ▼
                   Compile          Run Tests       Collect Stats
                   (gcc/javac/      (per test       (time via
                    python)          case with       /usr/bin/time,
                                     diff check)     memory via
                                                      cgroup.peak)
                        │               │               │
                        ▼               ▼               ▼
                   CE → stop      Compare output    Record max
                                  (exact / float     time & mem
                                   tolerance)
                                        │
                                        ▼
                                  Save Verdict
                                  (AC/WA/TLE/MLE/RE/CE)
                                        │
                                ┌───────┴───────┐
                                ▼               ▼
                        WebSocket Push    Battle Check
                        (Real-time        (if 1v1 → update
                         result to         battle state)
                         client)
```

### Supported Languages:
| Language | Compiler/Runtime | Compile Command | Run Command |
|----------|------------------|-----------------|-------------|
| **C++** | GCC/G++ | `g++ -O2 -std=c++17 -o solution solution.cpp` | `./solution` |
| **Java** | OpenJDK 17 | `javac Solution.java` | `java -Xmx{mem}m Solution` |
| **Python** | Python 3 | *(interpreted)* | `python3 solution.py` |

### Checker Types:
- **EXACT** — Byte-for-byte output match (trimmed)
- **FLOAT_TOLERANCE** — Floating point comparison with epsilon

### Verdict Types:
`AC` (Accepted) · `WA` (Wrong Answer) · `TLE` (Time Limit Exceeded) · `MLE` (Memory Limit Exceeded) · `RE` (Runtime Error) · `CE` (Compilation Error)

---

## 🤖 SLIDE 6 — Gemini AI Integration (3 Services)

We use **Google Gemini 2.5 Flash** for three distinct AI-powered features:

### 1. Smart Hints System (`GeminiHintService`)
```
User stuck on problem → Requests hint(level 1-3)
  Level 1: Gentle conceptual nudge
  Level 2: Algorithm/approach suggestion
  Level 3: Pseudocode walkthrough

Gemini receives: problem statement + user's current code + hint level
Returns: Contextual, progressive hint (never gives full solution)
```

### 2. Auto Plagiarism Detection (`PlagiarismService`)
```
EVERY submission → Before Docker execution:
  Gemini analyzes code for:
    ✓ AI-generation patterns (ChatGPT/Copilot signatures)
    ✓ Copy-paste from tutorials (style inconsistencies)
    ✓ Originality indicators (human coding quirks)

Returns: Verdict + Originality Score (0-100) + AI Likelihood (0-100)

Verdicts: LIKELY_ORIGINAL | SUSPICIOUS | LIKELY_AI_GENERATED | LIKELY_PLAGIARISED

If LIKELY_AI_GENERATED or LIKELY_PLAGIARISED → Automatic penalty applied
```

> **Key Detail:** Plagiarism check runs **before** Docker execution — this means we catch cheating before wasting compute resources on sandbox execution.

### 3. Mock Interview Evaluator (`GeminiInterviewService`)
```
User writes solution → Submits for interview evaluation
Gemini acts as senior FAANG interviewer:
  • Code quality assessment (1-10)
  • Time/space complexity analysis
  • Communication clarity score
  • Edge case handling review
  • Specific improvement suggestions
  • Overall hire/no-hire recommendation

Also: Generate interview-style questions from any problem
```

---

## ⚔️ SLIDE 7 — 1v1 Blitz Battle System

### Real-Time Architecture:

```
     Player 1                    Server                    Player 2
        │                          │                          │
        │── Create Battle ────────▶│                          │
        │◀── Party Code ──────────│                          │
        │                          │◀── Join (Party Code) ───│
        │                          │                          │
        │◀── WebSocket: BATTLE_STARTED ─────────────────────▶│
        │        (Problem assigned, timer starts)             │
        │                          │                          │
        │── Submit Code ──────────▶│                          │
        │                   [Plagiarism Check]                │
        │                   [Docker Judging]                  │
        │◀── Result (AC/WA) ──────│                          │
        │                          │──▶ WebSocket: opponent   │
        │                          │    verdict broadcast ───▶│
        │                          │                          │
        │                          │◀── Submit Code ─────────│
        │                          │   [Plagiarism + Judge]   │
        │◀── WebSocket: BATTLE_COMPLETED ───────────────────▶│
        │        (Winner declared, stats shown)               │
```

### Battle States: `WAITING` → `IN_PROGRESS` → `COMPLETED`

### Key Features:
- **WebSocket (STOMP over SockJS)** for real-time state sync
- **Polling fallback** — if WebSocket drops, client polls every 3 seconds
- **Race condition safe** — synchronized verdict handling, first AC wins
- **Random problem assignment** based on selected difficulty
- **Party code system** — share 6-char code to invite opponent

---

## 🏆 SLIDE 8 — Contest System

### Full Competitive Programming Contest Platform:

| Feature | Description |
|---------|-------------|
| **Create Contests** | Set name, description, start/end time, add multiple problems |
| **Registration** | Users register before start, tracked via ContestParticipant |
| **Live Arena** | Dedicated contest page with problem list + submission panel |
| **Real-Time Leaderboard** | Auto-calculated scores, sorted by problems solved + time |
| **Multiple Problems** | Add/remove problems with individual point values |
| **Score Tracking** | Per-problem AC tracking, total score aggregation |
| **Contest Submissions** | Separate from practice — scoped to contest + time window |

### Data Model:
```
Contest ──┬── ContestProblem (many) ──── Problem
          └── ContestParticipant (many) ── User
                   │
                   ├── score (total points)
                   ├── solvedProblemIds (JSON set)
                   └── lastAcceptedAt (tiebreaker)
```

---

## 🎮 SLIDE 9 — Gamification & Game Modes

### Game Modes:
1. **⚔️ 1v1 Blitz Battle** — Real-time head-to-head (see Slide 7)
2. **🔧 Ctrl+Fix It** — Debug-the-code challenges (find & fix bugs)
3. **🏆 Contest Arena** — Competitive timed contests
4. **💼 Mock Interviews** — AI-powered FAANG-style evaluation

### Gamification Elements:
- **🪙 Coins** — Earned by solving problems, winning battles
- **⭐ XP System** — Level progression based on activity
- **🔥 Streaks** — Daily solve streaks tracked on profile
- **📊 Dashboard** — Activity graph, solve history, skill radar
- **🏅 Profile Stats** — Total solved, acceptance rate, ranking

---

## 🖥️ SLIDE 10 — Frontend Architecture

### Tech Stack:
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework with hooks & concurrent features |
| **Vite 7.3** | Lightning-fast HMR dev server & optimized builds |
| **TailwindCSS 4** | Utility-first styling with custom design tokens |
| **Monaco Editor** | VS Code's editor engine — syntax highlighting, IntelliSense |
| **Framer Motion** | Smooth animations and page transitions |
| **Lucide React** | 575+ consistent icons |
| **STOMP.js + SockJS** | WebSocket client for real-time features |
| **Axios** | HTTP client with JWT interceptors |

### Pages (14 total):
| Page | Function |
|------|----------|
| `LandingPage` | Hero, features grid, leaderboard, CTA |
| `LoginPage` / `RegisterPage` | JWT + OAuth2 auth flows |
| `Homepage` | Dashboard with activity, stats, action cards |
| `PracticePage` | Problem browser with difficulty/topic filters |
| `ProblemSolvingPage` | Split-pane: description + Monaco editor + output panel |
| `GamePage` | Game mode selector hub |
| `BlitzBattlePage` | Full 1v1 battle arena with live opponent tracking |
| `ContestsPage` | Browse, create, register for contests |
| `ContestArena` | Live contest environment with problem tabs |
| `MockInterviewPage` | AI interview session with evaluation |
| `ProfilePage` | User stats, solve history, achievements |
| `CommunityPage` | Discussion forum with posts and interaction |

### Key UI Feature: **Monaco Editor Integration**
- Full VS Code editing experience in-browser
- Language-specific syntax highlighting (Python/C++/Java)
- Auto-indentation, bracket matching, minimap
- Custom dark theme matching the platform aesthetic

---

## 🗄️ SLIDE 11 — Database Schema

### Entity Relationship Overview:

```
Users ─────────┬──── Submissions ────── Problems
               │          │                 │
               │          │            TestCases
               │          │
               ├──── Battles (1v1)
               │     (player1, player2, verdicts, winner)
               │
               ├──── ContestParticipant ──── Contest
               │     (score, solved set)        │
               │                          ContestProblem
               │
               ├──── CoinTransactions
               │
               └──── OTPs (email verification)

Problems ─────┬──── Topics (many-to-many)
              ├──── CompanyTags (many-to-many)
              ├──── TestCases (ordered set)
              └──── ProblemSolutions
```

### Key Entities (18 total):
| Entity | Purpose | Key Fields |
|--------|---------|-----------|
| `User` | Platform users | username, email, bcrypt password, coins, xp, streak, avatar, role |
| `Problem` | Coding challenges | title, body, difficulty, timeLimit, memoryLimit, checkerType |
| `Submission` | Code submissions | code, language, verdict, timeMs, memoryKb, plagiarism fields |
| `TestCase` | I/O test pairs | input, expectedOutput, ordering, isSample |
| `Battle` | 1v1 matches | partyCode, player1/2, verdicts, status, winnerId |
| `Contest` | Competitions | name, startTime, endTime, createdBy |
| `ContestParticipant` | Contest entries | score, solvedProblemIds, lastAcceptedAt |
| `CoinTransaction` | Currency ledger | amount, type, description, timestamp |

### Database Features:
- **Flyway Migrations** — Version-controlled schema changes
- **JPA/Hibernate** with `ddl-auto=update` for rapid development
- **UUID primary keys** — Globally unique, non-sequential IDs
- **Optimistic locking** — Race-safe concurrent submissions

---

## 📡 SLIDE 12 — API Architecture

### REST Endpoints (40+ endpoints):

**Auth & Users:**
- `POST /api/signUp` — Register with OTP verification
- `POST /api/login` — JWT token pair generation
- `POST /api/refresh-token` — Token refresh
- `GET /api/profile` — User profile with stats
- OAuth2: GitHub + Google login flows

**Problems & Judging:**
- `GET /api/problems` — Browse problems (filtered by difficulty/topic)
- `GET /api/problems/{id}/detail` — Full problem detail with test cases
- `POST /api/submissions` — Submit code → async judging pipeline
- `GET /api/submissions/{id}` — Poll submission result

**Battles:**
- `POST /api/battle/create` — Create 1v1 room
- `POST /api/battle/join` — Join via party code
- `GET /api/battle/code/{code}` — Poll battle state
- WebSocket `/topic/battle/{id}` — Real-time updates

**Contests:**
- Full CRUD: `GET/POST/PUT/DELETE /api/contests`
- `POST /api/contests/{id}/register` — Join contest
- `POST /api/contests/{id}/submit` — Contest submission
- `GET /api/contests/{id}/leaderboard` — Live rankings

**AI Services:**
- `POST /api/hints` — Get progressive AI hints
- `POST /api/plagiarism-check` — Manual plagiarism analysis
- `POST /api/interview/evaluate` — Mock interview evaluation
- `POST /api/interview/questions` — Generate interview questions

**WebSocket Channels:**
- `/user/queue/submission-result` — Personal judging results
- `/topic/battle/{battleId}` — Battle state broadcasts

---

## 📊 SLIDE 13 — How Plagiarism Detection Works

### Automatic Pipeline (every submission):

```
Code Submitted
      │
      ▼
┌─────────────────────────────┐
│  Gemini 2.5 Flash Analysis  │
│                             │
│  Checks for:                │
│  • AI-generated patterns    │
│    - Perfect comments       │
│    - Textbook structure     │
│    - Generic naming         │
│    - LLM boilerplate        │
│                             │
│  • Plagiarism indicators    │
│    - Tutorial copy-paste    │
│    - Style inconsistencies  │
│    - Context mismatches     │
│                             │
│  • Human code signals       │
│    - Natural imperfections  │
│    - Personal style         │
│    - Incremental approach   │
└──────────────┬──────────────┘
               │
               ▼
┌──────────────────────────────┐
│  Returns:                    │
│  • Verdict (4 categories)    │
│  • Originality Score (0-100) │
│  • AI Likelihood (0-100)     │
│  • Detailed indicators       │
│  • Explanation               │
└──────────────┬───────────────┘
               │
        ┌──────┴──────┐
        │             │
   ORIGINAL      AI/PLAGIARISED
   (continue)     (penalty flag)
        │             │
        ▼             ▼
  Docker Judge    Docker Judge
  (normal)        (runs but flagged)
```

> **Result shown to user:** Originality score, AI likelihood bar, verdict badge, and "PENALTY APPLIED" tag if flagged.

---

## ⚡ SLIDE 14 — Performance & Scalability

| Aspect | Implementation |
|--------|---------------|
| **Async Judging** | Submissions queued via `JobQueueService` — non-blocking API response |
| **Connection Pooling** | HikariCP: 20 max connections, 5 minimum idle |
| **Persistent Sandbox** | Single long-running Docker container — no cold-start per submission |
| **Per-Submission Isolation** | Unique Linux user + cgroup per run — cleaned up after execution |
| **WebSocket Scaling** | STOMP message broker with topic/queue separation |
| **Database Indexing** | UUID PKs, indexed foreign keys, JPQL optimized queries |
| **Frontend Optimization** | Vite 7 tree-shaking, lazy loading, code splitting |
| **Resource Management** | cgroup memory.peak tracking, /usr/bin/time for CPU profiling |

---

## 🛡️ SLIDE 15 — Tech Stack Summary

### Backend:
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Spring Boot | 4.0.3 |
| Language | Java | 17 |
| Database | MySQL | 8.0 |
| Migrations | Flyway | Latest |
| Auth | JWT (jjwt) + Spring Security + OAuth2 | 0.12.3 |
| WebSocket | Spring WebSocket + STOMP | 4.0.3 |
| AI | Google GenAI SDK (Gemini 2.5 Flash) | 1.1.0 |
| Sandbox | Docker + Ubuntu 22.04 | Latest |
| Email | Spring Mail (Gmail SMTP) | 4.0.3 |
| Build | Maven | 3.x |

### Frontend:
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 19.2 |
| Build Tool | Vite | 7.3 |
| Styling | TailwindCSS | 4.2 |
| Editor | Monaco Editor | 4.7 |
| Animations | Framer Motion | 12.34 |
| Icons | Lucide React | 575 icons |
| WebSocket | STOMP.js + SockJS | 7.3 |
| HTTP | Axios | 1.13 |
| Routing | React Router | 7.13 |

---

## 🎤 TALKING POINTS FOR Q&A

### "How do you provide isolation in Docker?"
> "We use a **defense-in-depth approach with 5 layers**. First, the Docker container itself provides filesystem and network namespace isolation. Second, we apply a custom **seccomp profile** with a default-KILL policy that only whitelists ~50 safe system calls — this blocks network access, filesystem mounting, and privilege escalation at the kernel level. Third, we use **cgroups v2** for hard memory/CPU limits per submission — if a process exceeds memory, it's instantly OOM-killed with no swap allowed. Fourth, each submission runs under a **unique ephemeral Linux user** with strict ulimits — max 256 processes (prevents fork bombs), 10MB file output limit, 64 file descriptors. Fifth, everything is **time-bounded** with a kill-after timeout. After execution, the cgroup is destroyed, the user is deleted, and the working directory is cleaned up."

### "How does the plagiarism detection work?"
> "Every submission goes through our **Gemini 2.5 Flash AI analysis pipeline before Docker execution**. The AI evaluates the code against multiple heuristic categories — AI-generated patterns like overly perfect comments, textbook-perfect structure, and generic naming conventions; plagiarism indicators like tutorial copy-paste and style inconsistencies; and human code signals like natural imperfections and personal style. It returns an originality score (0-100) and AI likelihood score (0-100). If the code is flagged as LIKELY_AI_GENERATED or LIKELY_PLAGIARISED, an automatic penalty is applied to the submission. This runs before sandbox execution so we're not wasting compute on cheated submissions."

### "How does the 1v1 battle work in real-time?"
> "We use **STOMP over SockJS WebSocket** for real-time bidirectional communication. When a battle is created, a party code is generated. When the opponent joins, the server broadcasts a BATTLE_STARTED event over the WebSocket topic `/topic/battle/{id}`. Both players see the same problem and can code simultaneously. When either player submits, the judge processes it and the verdict is both sent directly to the submitter and broadcast to the opponent via WebSocket. We also have a **polling fallback** — if WebSocket disconnects, the client polls the battle state every 3 seconds. The battle service has **race-condition guards** for concurrent AC submissions — the first to get Accepted wins."

### "What's your database design strategy?"
> "We use **MySQL with JPA/Hibernate** and **Flyway for version-controlled migrations**. All entities use **UUID primary keys** for global uniqueness. The schema has about 18 entities covering users, problems, test cases, submissions, contests, battles, and gamification. We use **composite keys** for contest participants (userId + contestId), **JSON columns** for flexible data like solved problem sets, and **Lob annotations** for large text like submitted code and compile errors. Foreign keys maintain referential integrity across the model."

### "Why Spring Boot 4?"
> "Spring Boot 4 gives us the latest Spring Framework 7 features, including Jakarta EE 11 namespace, improved AOT compilation support, and enhanced observability. It also has better WebSocket integration and improved startup time. Combined with Java 17's records, sealed classes, and pattern matching, it gives us a modern, type-safe backend."

---

## 📈 SLIDE 16 — Future Roadmap (Bonus)

- **AI Code Reviews** — Gemini-powered line-by-line code review feedback
- **Team Battles** — 2v2 and 3v3 team competitive modes
- **Live Spectating** — Watch ongoing battles in real-time
- **Problem Creation Studio** — AI-assisted problem statement & test case generation
- **Mobile App** — React Native companion app
- **Analytics Dashboard** — ML-powered skill gap analysis & personalized practice

---

*Built with ❤️ for DevHacks 2026*
