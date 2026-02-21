# Quick Test Guide

## Single Command Tests (Copy & Paste)

### 1. Create Sum Problem
```powershell
curl -X POST http://localhost:8080/api/problems `
  -H "Content-Type: application/json" `
  -d '{"id":"sum","title":"Add Two Numbers","timeLimitMs":2000,"memoryLimitMb":256,"checkerType":"EXACT"}'
```

### 2. Submit Python (Correct Answer)
```powershell
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"sum","language":"python","code":"a, b = map(int, input().split())`nprint(a + b)"}'
```

### 3. Submit Python (Wrong Answer)
```powershell
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"sum","language":"python","code":"a, b = map(int, input().split())`nprint(a - b)"}'
```

### 4. Get Status (Replace UUID)
```powershell
curl http://localhost:8080/api/submissions/{SUBMISSION_ID}
```

### 5. Test Validation Error
```powershell
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"","language":"","code":""}'
```

### 6. Test 404 (Non-existent Problem)
```powershell
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"xyz","language":"python","code":"print(1)"}'
```

---

## Test Data Files
Located in: `test_data/`

### Sum Problem
- Input: `5 3` → Output: `8`
- Input: `10 20` → Output: `30`
- Input: `-5 7` → Output: `2`

### Fibonacci Problem
- Input: `5` → Output: `0 1 1 2 3`
- Input: `10` → Output: `0 1 1 2 3 5 8 13 21 34`

### Palindrome Problem
- Input: `racecar` → Output: `yes`
- Input: `hello` → Output: `no`

---

## Sample Code Submissions

### Python Sum
```python
a, b = map(int, input().split())
print(a + b)
```

### Python Fibonacci
```python
n = int(input())
a, b = 0, 1
result = []
for _ in range(n):
    result.append(a)
    a, b = b, a + b
print(' '.join(map(str, result)))
```

### Python Palindrome
```python
s = input().strip()
if s == s[::-1]:
    print("yes")
else:
    print("no")
```

### C++ Sum
```cpp
#include <iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}
```

### Java Sum
```java
import java.util.Scanner;
public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println(a + b);
  }
}
```

### JavaScript Sum
```javascript
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});
rl.on('line', (line) => {
  const [a, b] = line.split(' ').map(Number);
  console.log(a + b);
});
```

---

## Expected Responses

### Success (202 Accepted)
```json
{
  "submissionId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING"
}
```

### Accepted (AC)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "AC",
  "timeMs": 45,
  "memoryKb": 8192
}
```

### Wrong Answer (WA)
```json
{
  "id": "...",
  "status": "WA",
  "verdictDetail": "[{...}]"
}
```

### Validation Error (400)
```json
{
  "status": 400,
  "message": "Validation failed",
  "errors": {
    "problemId": "Problem ID is required"
  }
}
```

### Not Found (404)
``` 
Empty body with 404 status
```
