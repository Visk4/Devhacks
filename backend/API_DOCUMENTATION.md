# Code Submission Agent - API Documentation

## Overview
This is a complete code submission and judging system with support for multiple programming languages (Python, JavaScript, C++, Java). The system features:
- Code submission with validation
- Asynchronous job queue processing
- Multi-language support
- Multiple output checking modes
- WebSocket notifications

---

## API Endpoints

### Problem Management

#### 1. Create a Problem
**POST** `/api/problems`

Create a new problem/challenge.

**Request Body:**
```json
{
  "id": "sum",
  "title": "Add Two Numbers",
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

**Fields:**
- `id` (required): Unique problem slug (1-100 chars)
- `title` (required): Problem title (1-255 chars)
- `timeLimitMs`: Time limit in milliseconds (100-60000, default: 2000)
- `memoryLimitMb`: Memory limit in MB (16-2048, default: 256)
- `checkerType`: Output checker type - `EXACT`, `TOKEN`, `FLOAT`, `SPECIAL` (default: `EXACT`)

**Response:** `201 Created`
```json
{
  "id": "sum",
  "title": "Add Two Numbers",
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

**Error:** `409 Conflict` - Problem already exists

---

#### 2. Get All Problems
**GET** `/api/problems`

Retrieve all problems.

**Response:** `200 OK`
```json
[
  {
    "id": "sum",
    "title": "Add Two Numbers",
    "timeLimitMs": 2000,
    "memoryLimitMb": 256,
    "checkerType": "EXACT"
  }
]
```

---

#### 3. Get Problem Details
**GET** `/api/problems/{problemId}`

Get a specific problem by ID.

**Path Parameters:**
- `problemId`: Problem ID (slug)

**Response:** `200 OK`
```json
{
  "id": "sum",
  "title": "Add Two Numbers",
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

**Error:** `404 Not Found` - Problem doesn't exist

---

#### 4. Update a Problem
**PUT** `/api/problems/{problemId}`

Update problem details.

**Path Parameters:**
- `problemId`: Problem ID (slug)

**Request Body:**
```json
{
  "id": "sum",
  "title": "Add Two Numbers",
  "timeLimitMs": 3000,
  "memoryLimitMb": 512,
  "checkerType": "TOKEN"
}
```

**Response:** `200 OK` - Updated problem

**Error:** `404 Not Found` - Problem doesn't exist

---

#### 5. Delete a Problem
**DELETE** `/api/problems/{problemId}`

Delete a problem and all associated test cases.

**Path Parameters:**
- `problemId`: Problem ID (slug)

**Response:** `204 No Content`

**Error:** `404 Not Found` - Problem doesn't exist

---

### Test Case Management

#### 6. Add Test Case to Problem
**POST** `/api/problems/{problemId}/testcases`

Add a test case to a problem.

**Path Parameters:**
- `problemId`: Problem ID

**Request Body:**
```json
{
  "problemId": "sum",
  "inputPath": "/path/to/input1.txt",
  "outputPath": "/path/to/output1.txt",
  "points": 10,
  "isSample": true,
  "ordering": 1
}
```

**Fields:**
- `problemId` (required): Problem ID
- `inputPath` (required): Path to input file
- `outputPath` (required): Path to expected output file
- `points`: Points for this test case (default: 10)
- `isSample`: Is this a sample test case? (default: false)
- `ordering`: Test case order (default: 0)

**Response:** `201 Created`
```json
{
  "id": 1,
  "problemId": "sum",
  "inputPath": "/path/to/input1.txt",
  "outputPath": "/path/to/output1.txt",
  "points": 10,
  "isSample": true,
  "ordering": 1
}
```

**Error:** `404 Not Found` - Problem doesn't exist

---

#### 7. Get All Test Cases for Problem
**GET** `/api/problems/{problemId}/testcases`

Get all test cases for a problem.

**Path Parameters:**
- `problemId`: Problem ID

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "problemId": "sum",
    "inputPath": "/path/to/input1.txt",
    "outputPath": "/path/to/output1.txt",
    "points": 10,
    "isSample": true,
    "ordering": 1
  }
]
```

**Error:** `404 Not Found` - Problem doesn't exist

---

#### 8. Delete Test Case
**DELETE** `/api/problems/{problemId}/testcases/{testCaseId}`

Delete a test case.

**Path Parameters:**
- `problemId`: Problem ID
- `testCaseId`: Test case ID

**Response:** `204 No Content`

**Error:** `404 Not Found` - Problem or test case doesn't exist

---

### Submission Management

#### 9. Submit Code for Judging
**POST** `/api/submissions`

Submit code to be judged.

**Request Body:**
```json
{
  "problemId": "sum",
  "language": "python",
  "code": "a, b = map(int, input().split())\nprint(a + b)"
}
```

**Fields:**
- `problemId` (required): Problem ID (1-100 chars)
- `language` (required): Programming language - `python`, `javascript`, `cpp`, `java` (1-50 chars)
- `code` (required): Source code (1-100,000 chars)

**Response:** `202 Accepted`
```json
{
  "submissionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING"
}
```

**Errors:**
- `400 Bad Request` - Validation failed
- `404 Not Found` - Problem not found

**Validation Errors Example:**
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "problemId": "Problem ID is required",
    "language": "Language is required",
    "code": "Code is required"
  }
}
```

---

#### 10. Get Submission Status
**GET** `/api/submissions/{submissionId}`

Get the status and results of a submission.

**Path Parameters:**
- `submissionId`: UUID of the submission

**Response:** `200 OK`
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
  "verdictDetail": "[{\"id\": 1, \"verdict\": \"AC\", \"timeMs\": 45}]",
  "compileError": null
}
```

**Status Codes:**
- `PENDING`: Waiting in queue
- `RUNNING`: Currently being judged
- `AC`: Accepted (all tests passed)
- `WA`: Wrong Answer
- `TLE`: Time Limit Exceeded
- `RE`: Runtime Error
- `CE`: Compilation Error
- `PENDING_MANUAL`: Unsupported language

**Error:** `404 Not Found` - Submission not found

---

### Debug & Testing

#### 11. Manually Trigger Judging (Debug)
**POST** `/api/debug/judge`

Manually trigger judging for a submission (for testing/debugging).

**Query Parameters:**
- `id` (required): Submission UUID

**Response:** `200 OK`
```json
{
  "message": "Judge invoked for submission: 550e8400-e29b-41d4-a716-446655440000"
}
```

**Error:** `500 Internal Server Error` - Error during judging

---

## Features

### Supported Languages
- **Python**: Direct interpretation
- **JavaScript**: Node.js execution
- **C++**: GCC compilation and execution
- **Java**: Javac compilation and execution

### Checker Types for Problem Validation
1. **EXACT**: Whitespace-normalized exact match
2. **TOKEN**: Token-by-token comparison
3. **FLOAT**: Floating-point comparison with 1e-6 precision
4. **SPECIAL**: Custom comparison logic

### Job Queue
- Asynchronous in-process job queue
- Queue capacity: 1024 submissions
- Automatic fallback to direct execution if queue is full
- Named worker thread: `job-queue-worker`

### WebSocket Notifications
Submission results are pushed to clients via WebSocket:
- **Endpoint**: `/submission-result`
- **User-specific queue**: `/user/{userId}/queue/submission-result`
- **Anonymous queue**: `/user/anonymous/queue/submission-result`

---

## Example Usage

### Complete Workflow

#### Step 1: Create a Problem
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

#### Step 2: Add Test Cases
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

#### Step 3: Submit Code
```bash
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "python",
    "code": "a, b = map(int, input().split())\nprint(a + b)"
  }'
```

Response:
```json
{
  "submissionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING"
}
```

#### Step 4: Check Submission Status
```bash
curl http://localhost:8080/api/submissions/550e8400-e29b-41d4-a716-446655440000
```

---

## Error Handling

All validation errors are returned with detailed field information:

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

Internal server errors:
```json
{
  "status": 500,
  "message": "An error occurred",
  "error": "Error details..."
}
```

---

## Configuration

### Time Limits
- Compilation timeout: 30 seconds
- Execution timeout: Problem's `timeLimitMs` + 2 seconds

### Memory
- Default memory limit: 256 MB
- Configurable per problem: 16-2048 MB

### Queue
- Max submissions in queue: 1024
- Worker thread: Daemon thread (auto-stops on application shutdown)

---

## Architecture

```
Client → POST /api/submissions
         ↓
ValidationController → ProblemSubmitController
         ↓
SubmissionRepository (Save submission with PENDING status)
         ↓
JobQueueService.enqueue() → Queue submission
         ↓
JobQueueWorker (async) → JudgeService.judge()
         ↓
[Compile → Run Test Cases → Compare Output]
         ↓
Update submission status & results
         ↓
NotificationService → WebSocket push to client
```

---

## Notes

- All timestamps are in UTC ISO-8601 format
- Submission IDs are UUIDs
- Problem IDs are string slugs (e.g., "sum", "two-sum")
- Code size limit: 100,000 characters
- Judging is non-blocking (async queue processing)
- WebSocket provides real-time status updates
