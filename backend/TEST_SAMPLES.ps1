# Test samples for Code Submission Agent (Windows PowerShell)

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 1: Create Problem - Sum Two Numbers" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X POST http://localhost:8080/api/problems `
  -H "Content-Type: application/json" `
  -d '{"id":"sum","title":"Add Two Numbers","timeLimitMs":2000,"memoryLimitMb":256,"checkerType":"EXACT"}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 2: Create Problem - Fibonacci" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X POST http://localhost:8080/api/problems `
  -H "Content-Type: application/json" `
  -d '{"id":"fibonacci","title":"Fibonacci Number","timeLimitMs":3000,"memoryLimitMb":512,"checkerType":"TOKEN"}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 3: Get All Problems" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl http://localhost:8080/api/problems
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 4: Submit Python - Sum (Correct)" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$response4 = curl -s -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"sum","language":"python","code":"a, b = map(int, input().split())\nprint(a + b)"}'
Write-Host $response4
$submissionId = ($response4 | ConvertFrom-Json).submissionId
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 5: Submit Python - Wrong Answer" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"sum","language":"python","code":"a, b = map(int, input().split())\nprint(a - b)"}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 6: Submit JavaScript - Sum" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$jsCode = @"
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin});
rl.on('line', (line) => {
  const [a, b] = line.split(' ').map(Number);
  console.log(a + b);
});
"@
$jsBody = @{
    problemId = "sum"
    language = "javascript"
    code = $jsCode
} | ConvertTo-Json
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d $jsBody
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 7: Submit C++ - Sum" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$cppCode = @"
#include <iostream>
using namespace std;
int main() {
  int a, b;
  cin >> a >> b;
  cout << a + b << endl;
  return 0;
}
"@
$cppBody = @{
    problemId = "sum"
    language = "cpp"
    code = $cppCode
} | ConvertTo-Json
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d $cppBody
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 8: Submit Java - Sum" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
$javaCode = @"
import java.util.Scanner;
public class Solution {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int a = sc.nextInt();
    int b = sc.nextInt();
    System.out.println(a + b);
  }
}
"@
$javaBody = @{
    problemId = "sum"
    language = "java"
    code = $javaCode
} | ConvertTo-Json
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d $javaBody
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 9: Validation Error Test" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"","language":"","code":""}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 10: Problem Not Found Test" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X POST http://localhost:8080/api/submissions `
  -H "Content-Type: application/json" `
  -d '{"problemId":"nonexistent","language":"python","code":"print(123)"}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 11: Update Problem" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X PUT http://localhost:8080/api/problems/sum `
  -H "Content-Type: application/json" `
  -d '{"id":"sum","title":"Add Two Numbers (Updated)","timeLimitMs":3000,"memoryLimitMb":512,"checkerType":"TOKEN"}'
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 12: Get Submission Status" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
if ($submissionId) {
    Write-Host "Waiting 3 seconds for submission to be judged..."
    Start-Sleep -Seconds 3
    Write-Host "Checking submission status for: $submissionId"
    curl http://localhost:8080/api/submissions/$submissionId
} else {
    Write-Host "No submission ID captured from SAMPLE 4. Using placeholder UUID."
    curl http://localhost:8080/api/submissions/550e8400-e29b-41d4-a716-446655440000
}
Write-Host "`n"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SAMPLE 13: Delete Problem" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
curl -X DELETE http://localhost:8080/api/problems/fibonacci
Write-Host "`n"
