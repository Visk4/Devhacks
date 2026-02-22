# Complete Contest Workflow Test Guide

## Overview
This guide demonstrates the complete end-to-end contest functionality: create a contest, register multiple users, and watch the leaderboard update in real-time.

## Prerequisites
- Backend running on `http://localhost:8080/api`
- Frontend running on `http://localhost:5173`
- MySQL database with seeded problems (run V2 migration)
- Two test user accounts created

---

## Step 1: Create Test User Accounts

### User 1 (Admin/Creator)
1. Go to `http://localhost:5173`
2. Click **Register**
3. Fill in:
   - **Name**: `Test Admin`
   - **Email**: `admin@test.com`
   - **Password**: `Password123!`
4. Click **Submit**
5. Login and verify you're logged in (check localStorage for `accessToken`)

### User 2 (Participant)
1. Open a **new Private/Incognito Window** (to avoid session conflicts)
2. Go to `http://localhost:5173`
3. Click **Register**
4. Fill in:
   - **Name**: `Test User 2`
   - **Email**: `user2@test.com`
   - **Password**: `Password123!`
5. Click **Submit**
6. Keep this window open for later

---

## Step 2: Create a Contest (User 1)

### In the Admin/User 1 window:
1. Navigate to **Contests** page (`/contests`)
2. Look for a **"Create Contest"** button (should be visible on the page)
3. Click **Create Contest** → modal should open
4. Fill in the contest details:
   - **Title**: `My First Contest`
   - **Description**: `Test contest with 3 problems`
   - **Start Time**: Set to **current time** (so contest is ONGOING)
   - **End Time**: Set to **2 hours from now**
5. Select problems:
   - In the **Problems** section, click to expand the problem list
   - Select **3 problems** by checking them (e.g., Two Sum, Palindrome Check, Fibonacci)
   - Verify "Max 5 problems" message if you try to add more
6. Click **Create Contest** button
7. You should see a success message with the contest ID
8. The modal should close and the contest should appear in the list

### Verify Contest Creation:
```
Expected in Network tab:
POST /api/contests
{
  "title": "My First Contest",
  "description": "Test contest with 3 problems",
  "startTime": "2025-01-XX...",
  "endTime": "2025-01-XX...",
  "problems": [
    { "problemId": "UUID-1", "displayOrder": 1 },
    { "problemId": "UUID-2", "displayOrder": 2 },
    { "problemId": "UUID-3", "displayOrder": 3 }
  ]
}

Response: { "id": "contest-uuid", "title": "My First Contest", "message": "Contest created successfully" }
```

---

## Step 3: Join Contest from ContestsPage (User 1)

1. On the Contests page, find your created contest card
2. Click the **"Join Contest"** button on the card
3. A **Register Contest Modal** should pop up with:
   - Contest title
   - Warning: "Your rating may be affected"
   - Two buttons: **Cancel** and **Confirm**
4. Click **Confirm**
5. You should see a success message
6. The button should change to **"View Arena"** or similar

### Verify Registration:
```
Expected in Network tab:
POST /api/contests/{contestId}/register
Response: { "message": "Successfully registered for contest" }
```

---

## Step 4: Enter Contest Arena (User 1)

1. Click **"View Arena"** button on the contest card
2. You should be redirected to `/contest-arena?contestId={id}`
3. **Contest Arena should load** with:
   - Contest title and description at top
   - Timer showing countdown (hours:mins:secs)
   - **Problems section** on the left with all 3 problems listed:
     - Problem A: Two Sum (EASY)
     - Problem B: Palindrome Check (MEDIUM)
     - Problem C: Fibonacci (EASY)
   - Each problem shows: Title, Difficulty, Points, Time Limit, Memory Limit
   - Status indicators (circle = not solved, checkmark = solved)
   - **Performance metrics** showing: Solved (0/3), Current Rank, Total Score, Submissions
   - **Leaderboard** on the right with current user listed (rank N/A initially)

### ⚠️ If You See "Invalid Problem ID" Error:
This means the contest endpoint is not returning problems properly. Check:
1. Browser console for error details
2. Network tab → `GET /api/contests/{contestId}` response
3. Verify the response includes `problems` array with `problemId` field

---

## Step 5: Join Same Contest from User 2 Account

### Switch to the User 2 window (private/incognito):
1. Navigate to **Contests** page
2. Find the same contest ("My First Contest")
3. Click **"Join Contest"** button
4. **Register Contest Modal** appears
5. Click **Confirm**
6. You should see success message
7. Click **"View Arena"** to enter

### Expected State:
- You (User 2) are now registered for the contest
- Arena loads with same 3 problems
- You see **0/3 solved** in performance metrics
- Leaderboard shows **2 participants** (yourself and User 1)

---

## Step 6: Verify Leaderboard Updates

### In User 2's Arena:
1. Look at the **Leaderboard** panel on the right
2. You should see entries:
   - User 1 (Test Admin) - Rank 1 or TBD
   - User 2 (Test User 2) - Your current entry, highlighted in blue

### Verify Leaderboard API:
```
GET /api/contests/{contestId}/leaderboard
Response: {
  "contestId": "...",
  "contestTitle": "My First Contest",
  "entries": [
    {
      "rank": 1,
      "userId": "...",
      "username": "Test Admin",
      "totalPoints": 0,
      "totalPenalty": 0,
      "problemStatuses": {}
    },
    {
      "rank": 2,
      "userId": "...",
      "username": "Test User 2",
      "totalPoints": 0,
      "totalPenalty": 0,
      "problemStatuses": {}
    }
  ]
}
```

---

## Step 7: Submit Solutions and Watch Leaderboard Update

### In User 1's Arena:
1. Click on the first problem (Problem A: Two Sum)
2. You should be taken to the **problem solving page** (`/problem/{problemId}?contestId={contestId}`)
3. Write a solution in the code editor
4. Click **Submit** → code runs through judge
5. If AC (Accepted), you see "Accepted!"
6. Problem status changes to ✓ (green checkmark) in arena

### Back in User 1's Arena:
- **Performance metrics** update:
  - Solved: **1/3**
  - Total Score: **+points from that problem**
- **Leaderboard updates**:
  - Your rank improves (1st place now)
  - Your score reflects the solved problem

### In User 2's Arena (parallel/refreshed):
1. **Leaderboard auto-updates** (or refresh page):
   - User 1 now shows points and rank 1
   - User 2 still at 0 points
2. See the live ranking change as User 1 solves more problems

---

## Step 8: Complete the Full Workflow (Optional)

To demonstrate full leaderboard dynamics:

### User 2 solves a problem:
1. Click Problem B: Palindrome Check
2. Write solution code
3. Submit → get AC
4. Back in arena, see your score updated
5. Leaderboard shows you with 1st place (same points as User 1?)
6. Or rank 2 if User 1 solved more

### User 1 solves another problem:
1. From User 1's arena, click Problem C: Fibonacci
2. Submit solution with AC
3. Back in arena, Solved: **2/3**, score increases
4. **Leaderboard updates live** (or refresh in User 2's window)
5. User 1 now has higher score, rank 1

### Final Leaderboard State:
```
Rank  | User        | Score | Penalty
------|-------------|-------|--------
  1   | Test Admin  |  75   |  5m
  2   | Test User 2 |  50   | 12m
```

---

## Debugging Checklist

### If Contest Creation Fails:
- [ ] Verify backend is running (`http://localhost:8080/api/ok`)
- [ ] Check problem bank loads in modal (open DevTools → Network)
- [ ] Verify selected problems have valid UUIDs
- [ ] Check backend logs for validation errors

### If Arena Shows "Invalid Problem ID":
- [ ] Verify contest was actually created in DB: `SELECT * FROM contests WHERE id = '{contestId}';`
- [ ] Check contest_problems: `SELECT * FROM contest_problems WHERE contest_id = '{contestId}';`
- [ ] Verify GET `/api/contests/{contestId}` returns full response with `problems` array
- [ ] Check browser console for error messages

### If Leaderboard is Empty:
- [ ] Verify users have actually registered: `SELECT * FROM contest_participants WHERE contest_id = '{contestId}';`
- [ ] Check if submissions were recorded: `SELECT * FROM submissions WHERE contest_id = '{contestId}';`
- [ ] Verify leaderboard endpoint: `GET /api/contests/{contestId}/leaderboard`

### If You Can't Join Contest:
- [ ] Verify you're logged in (check `localStorage.accessToken`)
- [ ] Check backend logs for auth errors
- [ ] Verify contest exists in DB and is not closed

---

## Expected API Flow Summary

```
1. [Create Contest]
   POST /api/contests
   ↓
   Returns: { id: "contest-uuid", ... }

2. [List Contests]
   GET /api/contests
   ↓
   Returns: Array of contests with status

3. [Register for Contest]
   POST /api/contests/{id}/register
   ↓
   Returns: { message: "Successfully registered..." }

4. [View Contest Arena]
   GET /api/contests/{id}
   ↓
   Returns: { title, description, startTime, endTime, problems: [...] }

5. [Fetch Leaderboard]
   GET /api/contests/{id}/leaderboard
   ↓
   Returns: { entries: [{ rank, username, totalPoints, ... }, ...] }

6. [Fetch My Submissions]
   GET /api/contests/{id}/my-submissions
   ↓
   Returns: [{ problemId, status: "AC"|"WA", ... }, ...]

7. [Submit Solution]
   POST /api/submissions with contestId
   ↓
   Returns: { verdict: "AC"|"WA", ... }

8. [Leaderboard Auto-Updates]
   - Poll or WebSocket listens for submission verdicts
   - Recalculates ranks based on points + penalty
```

---

## Success Criteria

✅ **You have successfully completed the contest workflow when:**
- [ ] Contest is created with 3 problems
- [ ] Two users can register for the same contest
- [ ] Both users see the contest in Contest Arena
- [ ] Problems load without "Invalid Problem ID" error
- [ ] Leaderboard displays both users
- [ ] Submitting a solution updates your score
- [ ] Leaderboard ranks update in real-time (or refresh)
- [ ] Both users see updated leaderboard

---

## Key Files Modified

- `frontend/src/pages/ContestArena.jsx` - **FIXED**: Now properly loads problems by contestId from URL
- `frontend/src/pages/ContestsPage.jsx` - Lists contests, handles join flow
- `frontend/src/pages/CreateContestModal.jsx` - Creates contests with problem selection
- `frontend/src/pages/RegisterContestModal.jsx` - Handles contest registration

---

## Notes

- The timer in the Contest Arena counts down to the contest end time
- Timer is live and updates every second
- Leaderboard may need refresh if not polling (consider WebSocket for real-time)
- Problems are fetched from the `GET /api/contests/{id}` endpoint, not hardcoded
- Problem IDs are properly mapped using `problemId` field from backend DTO

If you encounter any issues, check the **Network tab** in DevTools to see API responses and identify mismatches between expected and actual data formats.
