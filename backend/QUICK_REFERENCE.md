# Quick Reference - Common Operations

## Creating a Problem

```bash
curl -X POST http://localhost:8080/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "id": "sum",
    "title": "Add Two Numbers",
    "timeLimitMs": 2000,
    "memoryLimitMb": 256,
    "checkerType": "EXACT"
  }'
```

**Response (201 Created):**
```json
{
  "id": "sum",
  "title": "Add Two Numbers",
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

---

## Adding Test Cases

```bash
curl -X POST http://localhost:8080/api/problems/sum/testcases \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "inputPath": "/test/input1.txt",
    "outputPath": "/test/output1.txt",
    "points": 10,
    "isSample": true,
    "ordering": 1
  }'
```

---

## Submitting Code

### Python
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "python",
    "code": "a, b = map(int, input().split())\nprint(a + b)"
  }'
```

### JavaScript
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "javascript",
    "code": "const readline = require('\''readline'\'');\nconst rl = readline.createInterface({input: process.stdin});\nrl.on('\''line'\'', (line) => {\n  const [a, b] = line.split('\'  '\'').map(Number);\n  console.log(a + b);\n});"
  }'
```

### C++
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "cpp",
    "code": "#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}"
  }'
```

### Java
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "java",
    "code": "import java.util.Scanner;\npublic class Solution {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}"
  }'
```

---

## Checking Submission Status

```bash
curl http://localhost:8080/api/submissions/{submissionId}
```

**Response Example:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "problemId": "sum",
  "language": "PYTHON",
  "code": "a, b = map(int, input().split())\nprint(a + b)",
  "status": "AC",
  "timeMs": 45,
  "memoryKb": 8192,
  "submittedAt": "2024-01-15T10:30:00Z",
  "judgedAt": "2024-01-15T10:30:01Z",
  "verdictDetail": "[...]",
  "compileError": null
}
```

---

## Listing All Problems

```bash
curl http://localhost:8080/api/problems
```

---

## Getting Test Cases for a Problem

```bash
curl http://localhost:8080/api/problems/sum/testcases
```

---

## Deleting a Problem (with all test cases)

```bash
curl -X DELETE http://localhost:8080/api/problems/sum
```

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| AC | Accepted - All tests passed ✓ |
| WA | Wrong Answer - Output doesn't match ✗ |
| TLE | Time Limit Exceeded - Too slow ⏱ |
| RE | Runtime Error - Program crashed 💥 |
| CE | Compilation Error - Code won't compile ⚠ |
| PENDING | Waiting in queue ⏳ |
| RUNNING | Currently being judged ⚙ |

---

## Validation Error Example

**Invalid Request:**
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "",
    "code": "a = 1"
  }'
```

**Response (400 Bad Request):**
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "language": "Language is required",
    "code": "Code must not exceed 100,000 characters"
  }
}
```

---

## Checker Types

### EXACT (Default)
Whitespace-normalized comparison. Best for exact output matching.
```
"1   2   3" == "1 2 3" ✓
"1 2 3" == "1 2 4" ✗
```

### TOKEN
Token-by-token comparison. Use for flexible formatting.
```
"1 2 3" == "1  2  3" ✓
"[1,2,3]" == "[1, 2, 3]" ✗
```

### FLOAT
Floating-point comparison with epsilon (1e-6).
```
3.14159 ≈ 3.14158 ✓ (difference < 1e-6)
3.1 ≈ 3.2 ✗
```

### SPECIAL
Reserved for custom logic.

---

## Common Issues & Solutions

### Issue: Problem not found (404)
**Solution:** Verify the problem ID exists
```bash
curl http://localhost:8080/api/problems
```

### Issue: Code too large error
**Solution:** Code limit is 100,000 characters. Reduce code size or split into functions.

### Issue: Compilation Error (CE)
**Solution:** Check your code for syntax errors. The compiler error message is provided in response.

### Issue: Time Limit Exceeded (TLE)
**Solution:** Code is too slow. Optimize algorithm or increase `timeLimitMs` in problem settings.

### Issue: Queue full fallback
**Log message:** "Job queue full, falling back to direct execution"
**Solution:** System is handling it automatically. Queue will process pending items.

---

## Performance Tips

1. **Use EXACT checker** - Fastest for exact matches
2. **TOKEN checker** - Moderate speed, flexible matching
3. **FLOAT checker** - Slower, use only for numeric comparisons
4. **Optimize test cases** - Fewer, smarter test cases
5. **Reasonable time limits** - 1000-5000ms for most problems

---

## Monitoring Queue Health

Check if you need these endpoints added:
```
GET /api/queue/status       # Queue size and capacity
GET /api/submissions/recent # Recent submissions
```

These can be added to a monitoring controller if needed.

---

## WebSocket Notifications (Client-side)

```javascript
const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    // Subscribe to your submission results
    stompClient.subscribe('/user/anonymous/queue/submission-result', function(message) {
        const submission = JSON.parse(message.body);
        console.log('Submission status:', submission.status);
    });
});
```

---

## Database Queries

To check submissions from database (if using SQL):

```sql
-- Recent submissions
SELECT id, problem_id, language, status, time_ms, judged_at 
FROM submissions 
ORDER BY submitted_at DESC 
LIMIT 10;

-- Submissions by problem
SELECT * FROM submissions 
WHERE problem_id = 'sum' 
ORDER BY submitted_at DESC;

-- Accepted submissions
SELECT COUNT(*) FROM submissions 
WHERE status = 'AC';
```

---

## Environment Setup

### Required
- Java 17+
- Maven 3.6+
- MySQL/PostgreSQL

### Optional
- Node.js (for JavaScript code)
- Python 3.8+ (for Python code)
- GCC (for C++ code)

### In pom.xml
- spring-boot-starter-web
- spring-boot-starter-data-jpa
- spring-boot-starter-validation
- spring-boot-starter-websocket
- jakarta.validation-api

