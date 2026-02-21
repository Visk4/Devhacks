#!/bin/bash
# Test samples for Code Submission Agent

echo "============================================"
echo "SAMPLE 1: Create Problem - Sum Two Numbers"
echo "============================================"
curl -X POST http://localhost:8080/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "id": "sum",
    "title": "Add Two Numbers",
    "timeLimitMs": 2000,
    "memoryLimitMb": 256,
    "checkerType": "EXACT"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 2: Create Problem - Fibonacci"
echo "============================================"
curl -X POST http://localhost:8080/api/problems \
  -H "Content-Type: application/json" \
  -d '{
    "id": "fibonacci",
    "title": "Fibonacci Number",
    "timeLimitMs": 3000,
    "memoryLimitMb": 512,
    "checkerType": "TOKEN"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 3: Get All Problems"
echo "============================================"
curl http://localhost:8080/api/problems
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 4: Submit Python - Sum (Correct)"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "python",
    "code": "a, b = map(int, input().split())\nprint(a + b)"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 5: Submit JavaScript - Sum"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "javascript",
    "code": "const readline = require('"'"'readline'"'"');\nconst rl = readline.createInterface({input: process.stdin});\nrl.on('"'"'line'"'"', (line) => {\n  const [a, b] = line.split('"'"' '"'"').map(Number);\n  console.log(a + b);\n});"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 6: Submit C++ - Sum"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "cpp",
    "code": "#include <iostream>\nusing namespace std;\nint main() {\n  int a, b;\n  cin >> a >> b;\n  cout << a + b << endl;\n  return 0;\n}"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 7: Submit Java - Sum"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "sum",
    "language": "java",
    "code": "import java.util.Scanner;\npublic class Solution {\n  public static void main(String[] args) {\n    Scanner sc = new Scanner(System.in);\n    int a = sc.nextInt();\n    int b = sc.nextInt();\n    System.out.println(a + b);\n  }\n}"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 8: Validation Error Test"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "",
    "language": "",
    "code": ""
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 9: Problem Not Found Test"
echo "============================================"
curl -X POST http://localhost:8080/api/submissions \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "nonexistent",
    "language": "python",
    "code": "print(123)"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 10: Update Problem"
echo "============================================"
curl -X PUT http://localhost:8080/api/problems/sum \
  -H "Content-Type: application/json" \
  -d '{
    "id": "sum",
    "title": "Add Two Numbers (Updated)",
    "timeLimitMs": 3000,
    "memoryLimitMb": 512,
    "checkerType": "TOKEN"
  }'
echo -e "\n\n"

echo "============================================"
echo "SAMPLE 11: Delete Problem"
echo "============================================"
curl -X DELETE http://localhost:8080/api/problems/fibonacci
echo -e "\n\n"
