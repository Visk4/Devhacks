# Real-Time Contest Leaderboard Updates Guide

## Overview
The contest system now supports **real-time leaderboard updates** when multiple users solve problems:
- ✅ Leaderboard auto-refreshes every 2 seconds with live rankings
- ✅ Problems solved count updates in real-time
- ✅ Multiple users see each other's progress instantly
- ✅ Automatic redirect to arena after solving a problem in contest

---

## How It Works

### Architecture

```
User 1: Solves Problem A
    ↓
[POST /api/submissions with contestId]
    ↓
Problem gets AC verdict
    ↓
[Success Message: "Problem Solved!"]
    ↓
[Redirect to /contest-arena?contestId={id}]
    ↓
Arena NOW POLLS every 2 seconds:
  - GET /api/contests/{contestId}/leaderboard
  - GET /api/contests/{contestId}/my-submissions
    ↓
[User 2 sees:
  - Leaderboard updated with User 1's score
  - User 1's rank changed
  - Live ranking updates every 2 seconds]
```

---

## Step-by-Step Testing

### Prerequisites
- 2+ test user accounts created
- Contest created with 3-5 problems
- Both users registered for the same contest

### Test Scenario

#### Open Two Parallel Windows

**Window 1 (User 1 - Problem Solver):**
1. Login as User 1 (Test Admin)
2. Navigate to Contests
3. Click "Join Contest" → "View Arena"
4. See leaderboard with both users at 0 points

**Window 2 (User 2 - Observer):**
1. In a new Private/Incognito window, login as User 2
2. Navigate to Contests
3. Click "Join Contest" → "View Arena"
4. See leaderboard with both users at 0 points

---

#### Solve Problem in Window 1

1. In User 1's arena, click on **Problem A** (e.g., Two Sum)
2. Code editor opens with problem solving page
3. **Write any correct solution** (or copy a known solution)
4. Click **Submit** button
5. Wait for judging (~ 3-5 seconds)
6. See verdict: **"✓ Accepted"** (AC)
7. See success message:
   ```
   🎉 Problem Solved!
   Updating leaderboard for all participants...
   Redirecting to arena in 3 seconds
   ```
8. Automatically redirected back to contest arena

---

#### Observe Real-Time Update in Window 2

**While User 1 is solving (before redirect):**
- Watch Window 2's leaderboard
- **Within 2 seconds**, you should see:
  - User 1's score increased (from 0 to problem points, e.g., 50)
  - User 1's rank updated
  - Total participants count updated
  - Leaderboard **highlights User 1** with blue border (current user highlight)

**Visual Confirmation in Window 2:**
```
Rank | User      | Score | Penalty
-----|-----------|-------|--------
  1  | Test Admin|   50  |   5m
  2  | Test User2|    0  |   0m
```

---

### Real-Time Features Verification

#### ✅ Leaderboard Polling (2-second refresh)
- Leaderboard updates automatically without page refresh
- No manual "Refresh" button needed
- Changes appear within ~2 seconds of submission AC

#### ✅ Problems Solved Count
- In your performance metrics: **Solved: 1/3** (updated live)
- Problem icon changes to ✓ (green checkmark)
- Reflected in arena without page reload

#### ✅ Multiple Users See Updates
- User 1 solves problem → User 2 sees score update
- User 2 solves problem → User 1 sees score update
- Both see final leaderboard in real-time

#### ✅ Status Displays
- Problem status: "SOLVED" (checkmark) vs "UNATTEMPTED" (circle)
- User list shows accurate ranks based on current submissions
- Performance panel shows accurate "Solved" count

---

## Technical Details

### Frontend Changes

#### ProblemSolvingPage.jsx
```javascript
// Now captures contestId from URL
const [searchParams] = useSearchParams();
const contestId = searchParams.get('contestId');

// Passes contestId when submitting
const submissionPayload = {
  problemId: problemId,
  language: language,
  code: code,
  contestId: contestId  // ← NEW: Includes contest context
};

// After AC verdict, redirects back to arena
if (finalResult?.status === 'AC' && contestId) {
  navigate(`/contest-arena?contestId=${contestId}`);
}
```

#### ContestArena.jsx
```javascript
// Leaderboard auto-polling (every 2 seconds)
useEffect(() => {
  const leaderboardInterval = setInterval(async () => {
    const res = await axios.get(`${baseURL}/contests/${contestId}/leaderboard`);
    setLeaderboardData(res.data?.entries || []);
  }, 2000);
  return () => clearInterval(leaderboardInterval);
}, [contestId]);

// My submissions auto-polling (every 2 seconds)
useEffect(() => {
  const submissionsInterval = setInterval(async () => {
    const res = await axios.get(`${baseURL}/contests/${contestId}/my-submissions`);
    setMySubmissions(Array.isArray(res.data) ? res.data : []);
  }, 2000);
  return () => clearInterval(submissionsInterval);
}, [contestId]);
```

### API Flow

**When solving a problem in contest:**

1. **Submit with contestId:**
   ```
   POST /api/submissions
   {
     problemId: "uuid",
     language: "python",
     code: "...",
     contestId: "contest-uuid"
   }
   ```

2. **Poll for status:**
   ```
   GET /api/submissions/{submissionId}
   → Status: PENDING → RUNNING → AC (final)
   ```

3. **Redirect to arena:**
   ```
   GET /api/contests/{contestId}
   GET /api/contests/{contestId}/leaderboard  (poll every 2s)
   GET /api/contests/{contestId}/my-submissions (poll every 2s)
   ```

---

## Expected Behavior

### Timing
- **Submission judging**: 3-5 seconds
- **Leaderboard update**: < 2 seconds (polling interval)
- **Redirect to arena**: 3 seconds after AC
- **Total time from submit to seeing updated leaderboard**: ~5-10 seconds

### What Changes
| Metric | Before Solving | After Solving (AC) |
|--------|---|---|
| **Problems Solved** | 0/3 | 1/3 |
| **Your Score** | 0 | +50 (example) |
| **Your Rank** | N/A or last | 1 or better |
| **Problem Status** | ○ (circle) | ✓ (checkmark) |
| **Leaderboard** | Both at 0 | User 1 ahead |

### What Other Users See
- When you solve a problem, **other users' leaderboards update automatically**
- They see your name, new score, and updated rank
- **No page refresh needed** for them to see changes
- Multiple concurrent solutions update independently

---

## Debugging Checklist

### If Leaderboard Doesn't Update:
- [ ] Check browser console for polling errors
- [ ] Verify contestId is in URL: `/contest-arena?contestId={uuid}`
- [ ] Confirm submission returned AC verdict
- [ ] Check Network tab → leaderboard endpoint returning new data
- [ ] Verify browser has **not been paused/throttled**

### If Problems Solved Count Doesn't Update:
- [ ] Check `/my-submissions` endpoint in Network tab
- [ ] Verify submission response includes correct problemId
- [ ] Ensure problemStatus calculation matches submission problemId

### If Other Users Don't See Updates:
- [ ] Verify both users are accessing same contestId
- [ ] Check if both users have proper JWT authentication
- [ ] Confirm polling intervals are running (2000ms)
- [ ] Check backend leaderboard endpoint for accuracy

### Polling Performance:
- 2 concurrent API calls every 2 seconds per user is lightweight
- Network bandwidth: ~2-5 KB per poll
- CPU impact: negligible (async intervals with proper cleanup)
- Consider reducing interval if server load is high (e.g., 4-5 seconds)

---

## Advanced: Manual Testing with DevTools

### Monitor Polling in Network Tab:

1. Open DevTools → **Network** tab
2. Filter by type: **XHR** (XMLHttpRequest)
3. Solve a problem in one window
4. Watch in the Arena window:
   ```
   GET /api/contests/{id}/leaderboard   (every 2s)
   GET /api/contests/{id}/my-submissions (every 2s)
   ```
5. Verify response includes updated data

### Monitor State Changes in React DevTools:

1. Install React Developer Tools browser extension
2. In Arena window, open React DevTools tab
3. Select ContestArena component
4. Watch state updates:
   - `leaderboardData` array changes
   - `mySubmissions` array updates
5. Confirm updates happen every ~2 seconds

---

## Customization

### Adjust Polling Interval

To change polling frequency from 2 seconds to 5 seconds:

**In ContestArena.jsx:**
```javascript
// Line ~75: Change from 2000 to 5000
const leaderboardInterval = setInterval(async () => {
  // ...
}, 5000);  // ← Change here

// Line ~95: Change from 2000 to 5000
const submissionsInterval = setInterval(async () => {
  // ...
}, 5000);  // ← Change here
```

### Disable Polling for Testing

Set intervals to very long or comment out the setInterval:
```javascript
// For testing: increase to 60000 (1 minute)
const leaderboardInterval = setInterval(async () => {
  // ...
}, 60000);
```

---

## Success Criteria

✅ **You've successfully verified real-time updates when:**
1. [ ] User 1 solves problem → User 2's leaderboard updates within 2 seconds
2. [ ] Problems solved count increases in real-time (no page refresh)
3. [ ] Ranks change based on new scores
4. [ ] Multiple users can solve problems concurrently
5. [ ] Submission redirects to arena automatically after AC
6. [ ] No errors in browser console during polling
7. [ ] Both users see identical leaderboard rankings

---

## Performance Notes

### Network Load
- Leaderboard request: ~1-2 KB (JSON array)
- Submissions request: ~500 B - 1 KB (JSON array)
- **Total per user per 2 seconds**: ~2-3 KB
- **For 100 users**: ~150-300 KB per 2 seconds = ~75 KB/s aggregate

### Optimization Options (Future)
1. **WebSocket instead of polling**: Real-time updates without repeated requests
2. **Server-Sent Events (SSE)**: One-way server push (lighter than WebSocket)
3. **Longer polling intervals**: Reduce to 5-10s if server load is high
4. **Differential updates**: Only send changed data instead of full leaderboard

---

## Files Modified

- ✅ `frontend/src/pages/ProblemSolvingPage.jsx` - Captures contestId, passes to submissions, shows AC success message
- ✅ `frontend/src/pages/ContestArena.jsx` - Added leaderboard & submissions polling
- ✅ Build passes without errors (2265 modules transformed)

---

## Example Live Session

**T=0s: Both users in contest arena**
```
Leaderboard:
Rank | User       | Score
-----|------------|-------
  1  | Test Admin |   0
  2  | Test User2 |   0
```

**T=3s: User 1 clicks "Submit" on Two Sum (50 pts)**
- Judging...

**T=6s: User 1 gets AC verdict**
- Success message appears
- Redirect initiated

**T=8s: User 2's leaderboard auto-polls**
```
Leaderboard:
Rank | User       | Score    ← UPDATED!
-----|------------|--------
  1  | Test Admin |   50   ← NEW!
  2  | Test User2 |    0
```

**T=10s: User 1 back in arena**
- Performance shows: Solved 1/3
- Leaderboard shows User 1 with 50 pts
- Problem A shows ✓ checkmark

**T=15s: User 2 solves Fibonacci (50 pts)**
- Similar flow
- User 1 sees User 2's score update

**Final Leaderboard:**
```
Rank | User       | Score  | Penalty
-----|------------|--------|--------
  1  | Test Admin |   50   |   5m
  1  | Test User2 |   50   |  10m
```

_(Tied on score, User 1 ranked first due to lower penalty time)_

---

This real-time system ensures all contest participants see accurate, up-to-date standings throughout the contest.
