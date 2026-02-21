# CodeStorm API Endpoints

Base URL: `http://localhost:8080`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. User Management

### Sign Up
**POST** `/api/signUp`

Create a new user account and receive JWT tokens.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securePassword123",
  "email": "john@example.com",
  "description": "Competitive programmer",
  "college": "IIT_BOMBAY",
  "gender": "MALE"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "expiresIn": 3600000,
  "username": "johndoe"
}
```

---

### Login
**POST** `/api/login`

Authenticate and receive JWT tokens.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "expiresIn": 3600000,
  "username": "johndoe"
}
```

---

### Refresh Token
**POST** `/api/refresh-token`

Get new access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9..."
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "refreshToken": "eyJhbGciOiJIUzUxMiJ9...",
  "expiresIn": 3600000,
  "username": "johndoe"
}
```

---

### Get User Info (Protected)
**GET** `/api/user-info`

Get current authenticated user's information.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "username": "johndoe",
  "authorities": ["ROLE_USER"],
  "description": "Competitive programmer",
  "college": "IIT_BOMBAY",
  "gender": "MALE",
  "profileImageUrl": "http://localhost:8080/uploads/profile_123.jpg"
}
```

---

### Update Profile (Protected)
**POST** `/api/profile`

Update user profile (multipart form data).

**Headers:**
```
Authorization: Bearer <access_token>
Content-Type: multipart/form-data
```

**Form Fields:**
- `description` (optional): User description
- `college` (optional): College name (e.g., "IIT_BOMBAY")
- `gender` (optional): Gender ("MALE" / "FEMALE" / "OTHER")
- `image` (optional): Profile image file

---

## 2. Problem Management

### Create Problem
**POST** `/api/problems`

Create a new coding problem.

**Request Body:**
```json
{
  "title": "Two Sum",
  "body": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\n**Example:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\n\n**Constraints:**\n- 2 <= nums.length <= 10^4\n- -10^9 <= nums[i] <= 10^9",
  "difficulty": "EASY",
  "points": 100,
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

**Difficulty Values:** `EASY`, `MEDIUM`, `HARD`

**Checker Types:** `EXACT`, `FLOAT`, `TOKEN`, `SPECIAL`

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Two Sum",
  "body": "Given an array of integers...",
  "difficulty": "EASY",
  "points": 100,
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT",
  "testCases": null,
  "topics": null,
  "companyTags": null
}
```

---

### Get All Problems
**GET** `/api/problems`

Get list of all problems.

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "Two Sum",
    "body": "Given an array...",
    "difficulty": "EASY",
    "points": 100,
    "timeLimitMs": 2000,
    "memoryLimitMb": 256,
    "checkerType": "EXACT"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Sum Two Numbers",
    "body": null,
    "difficulty": "EASY",
    "points": 10,
    "timeLimitMs": 2000,
    "memoryLimitMb": 256,
    "checkerType": "EXACT"
  }
]
```

---

### Get Problem by ID
**GET** `/api/problems/{problemId}`

**Example:** `GET /api/problems/550e8400-e29b-41d4-a716-446655440000`

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "title": "Two Sum",
  "body": "Given an array of integers...",
  "difficulty": "EASY",
  "points": 100,
  "timeLimitMs": 2000,
  "memoryLimitMb": 256,
  "checkerType": "EXACT"
}
```

---

### Update Problem
**PUT** `/api/problems/{problemId}`

**Example:** `PUT /api/problems/550e8400-e29b-41d4-a716-446655440000`

**Request Body:**
```json
{
  "title": "Two Sum (Updated)",
  "body": "Updated problem description...",
  "difficulty": "MEDIUM",
  "points": 150,
  "timeLimitMs": 3000,
  "memoryLimitMb": 512,
  "checkerType": "EXACT"
}
```

---

### Delete Problem
**DELETE** `/api/problems/{problemId}`

Deletes the problem and all associated test cases.

**Response:** `204 No Content`

---

## 3. Test Case Management

### Add Test Case
**POST** `/api/problems/{problemId}/testcases`

Add a test case to a problem.

**Example:** `POST /api/problems/550e8400-e29b-41d4-a716-446655440000/testcases`

**Request Body:**
```json
{
  "inputPath": "/path/to/test_data/twosum_input1.txt",
  "outputPath": "/path/to/test_data/twosum_output1.txt",
  "points": 25,
  "isSample": true,
  "ordering": 1
}
```

**Response (201 Created):**
```json
{
  "id": 1,
  "inputPath": "/path/to/test_data/twosum_input1.txt",
  "outputPath": "/path/to/test_data/twosum_output1.txt",
  "points": 25,
  "isSample": true,
  "ordering": 1
}
```

---

### Get Test Cases for Problem
**GET** `/api/problems/{problemId}/testcases`

**Example:** `GET /api/problems/550e8400-e29b-41d4-a716-446655440000/testcases`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "inputPath": "/path/to/test_data/twosum_input1.txt",
    "outputPath": "/path/to/test_data/twosum_output1.txt",
    "points": 25,
    "isSample": true,
    "ordering": 1
  },
  {
    "id": 2,
    "inputPath": "/path/to/test_data/twosum_input2.txt",
    "outputPath": "/path/to/test_data/twosum_output2.txt",
    "points": 25,
    "isSample": false,
    "ordering": 2
  }
]
```

---

### Delete Test Case
**DELETE** `/api/problems/{problemId}/testcases/{testCaseId}`

**Example:** `DELETE /api/problems/550e8400-e29b-41d4-a716-446655440000/testcases/1`

**Response:** `204 No Content`

---

## 4. Code Submission & Judging

### Submit Code
**POST** `/api/submissions`

Submit code for judging.

**Request Body:**
```json
{
  "problemId": "550e8400-e29b-41d4-a716-446655440000",
  "language": "python",
  "code": "def solution(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []"
}
```

**Supported Languages:** `PYTHON`, `JAVA`, `CPP`, `C`, `JAVASCRIPT`, `GO`, `RUST`

**Response (202 Accepted):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING"
}
```

---

### Get Submission Status
**GET** `/api/submissions/{submissionId}`

**Example:** `GET /api/submissions/660e8400-e29b-41d4-a716-446655440000`

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440000",
  "language": "PYTHON",
  "code": "def solution(nums, target):\n    ...",
  "submittedAt": "2026-02-21T18:30:00Z",
  "status": "ACCEPTED",
  "timeMs": 45,
  "memoryKb": 12800,
  "compileError": null,
  "judgedAt": "2026-02-21T18:30:05Z"
}
```

**Verdict Status Values:**
- `PENDING` - Waiting to be judged
- `RUNNING` - Currently being judged
- `ACCEPTED` - All test cases passed
- `WRONG_ANSWER` - Output doesn't match expected
- `TIME_LIMIT_EXCEEDED` - Execution took too long
- `MEMORY_LIMIT_EXCEEDED` - Used too much memory
- `RUNTIME_ERROR` - Program crashed during execution
- `COMPILE_ERROR` - Code failed to compile

---

## 5. Sample cURL Commands

### Sign Up
```bash
curl -X POST http://localhost:8080/api/signUp \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "email": "test@example.com"
  }'
```

### Login
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }'
```

### Get All Problems
```bash
curl http://localhost:8080/api/problems
```

### Create Problem
```bash
curl -X POST http://localhost:8080/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Add Two Numbers",
    "body": "Given two integers a and b, return their sum.\n\nInput: Two space-separated integers\nOutput: Their sum",
    "difficulty": "EASY",
    "points": 50,
    "timeLimitMs": 1000,
    "memoryLimitMb": 128,
    "checkerType": "EXACT"
  }'
```

### Add Test Case
```bash
# Replace {PROBLEM_ID} with actual UUID
curl -X POST http://localhost:8080/api/problems/{PROBLEM_ID}/testcases \
  -H "Content-Type: application/json" \
  -d '{
    "inputPath": "C:/Users/SHIVSHARN/Documents/Devhacks/backend/test_data/sum_input1.txt",
    "outputPath": "C:/Users/SHIVSHARN/Documents/Devhacks/backend/test_data/sum_output1.txt",
    "points": 10,
    "isSample": true,
    "ordering": 1
  }'
```

### Submit Solution
```bash
# Replace {PROBLEM_ID} with actual UUID
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "{PROBLEM_ID}",
    "language": "python",
    "code": "a, b = map(int, input().split())\nprint(a + b)"
  }'
```

### Check Submission Status
```bash
# Replace {SUBMISSION_ID} with actual UUID
curl http://localhost:8080/api/submissions/{SUBMISSION_ID}
```

### Get User Info (Authenticated)
```bash
# Replace {TOKEN} with your JWT access token
curl http://localhost:8080/api/user-info \
  -H "Authorization: Bearer {TOKEN}"
```

---

## 6. Error Responses

### 400 Bad Request
```json
{
  "error": "Validation failed",
  "message": "Title is required"
}
```

### 401 Unauthorized
```json
{
  "error": "Login failed"
}
```

### 404 Not Found
```json
{
  "timestamp": "2026-02-21T18:30:00.000+00:00",
  "status": 404,
  "error": "Not Found",
  "path": "/api/problems/invalid-uuid"
}
```

---

## 7. Sample Test Data Files

The application includes sample test data files in `test_data/` directory:

| File | Content |
|------|---------|
| `sum_input1.txt` | `1 2` |
| `sum_output1.txt` | `3` |
| `sum_input2.txt` | `10 20` |
| `sum_output2.txt` | `30` |
| `sum_input3.txt` | `-5 5` |
| `sum_output3.txt` | `0` |

A sample "Sum Two Numbers" problem is automatically seeded on startup.
