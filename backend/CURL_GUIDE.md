# Devhacks Testing Guide (CURL & PowerShell)

This guide provides commands to test the system. Since you are on Windows, **PowerShell commands** are recommended.

---

## 🚀 PowerShell Commands (Recommended for Windows)

### 1. Create a Problem
```powershell
$problem = @{ id = "sum"; title = "A+B"; timeLimitMs = 2000; memoryLimitMb = 256; checkerType = "EXACT" }
Invoke-RestMethod -Uri "http://localhost:8080/api/problems" -Method Post -Body ($problem | ConvertTo-Json) -ContentType "application/json"
```

### 2. Add Test Cases
```powershell
$tc = @{ problemId="sum"; inputPath="10 20"; outputPath="30"; points=10; isSample=$true; ordering=1 }
Invoke-RestMethod -Uri "http://localhost:8080/api/problems/sum/testcases" -Method Post -Body ($tc | ConvertTo-Json) -ContentType "application/json"
```

### 3. Java - Correct (AC)
```powershell
$javaSub = @{
    problemId = "sum"
    language = "JAVA"
    code = "import java.util.Scanner;`npublic class Solution {`n    public static void main(String[] args) {`n        Scanner sc = new Scanner(System.in);`n        if (sc.hasNextInt()) {`n            int a = sc.nextInt();`n            int b = sc.nextInt();`n            System.out.println(a + b);`n        }`n    }`n}"
}
Invoke-RestMethod -Uri "http://localhost:8080/api/submissions" -Method Post -Body ($javaSub | ConvertTo-Json) -ContentType "application/json"
```

### 4. Java - Infinite Loop (TLE)
```powershell
$javaTle = @{
    problemId = "sum"
    language = "JAVA"
    code = "public class Solution { public static void main(String[] args) { while(true); } }"
}
Invoke-RestMethod -Uri "http://localhost:8080/api/submissions" -Method Post -Body ($javaTle | ConvertTo-Json) -ContentType "application/json"
```

### 5. Python - Infinite Loop (TLE)
```powershell
$pyTle = @{
    problemId = "sum"
    language = "PYTHON"
    code = "import time`nwhile True: pass"
}
Invoke-RestMethod -Uri "http://localhost:8080/api/submissions" -Method Post -Body ($pyTle | ConvertTo-Json) -ContentType "application/json"
```

---

## 🐧 Standard CURL (CMD/Git Bash)

### 1. Java - Correct (AC)
```bash
curl -X POST http://localhost:8080/api/submissions ^
     -H "Content-Type: application/json" ^
     -d "{\"problemId\": \"sum\", \"language\": \"JAVA\", \"code\": \"import java.util.Scanner;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (sc.hasNextInt()) {\n            int a = sc.nextInt();\n            int b = sc.nextInt();\n            System.out.println(a + b);\n        }\n    }\n}\"}"
```

### 2. Java - Infinite Loop (TLE)
```bash
curl -X POST http://localhost:8080/api/submissions ^
     -H "Content-Type: application/json" ^
     -d "{\"problemId\": \"sum\", \"language\": \"JAVA\", \"code\": \"public class Solution { public static void main(String[] args) { while(true); } }\"}"
```

---

## 🔍 Checking Results
```powershell
Invoke-RestMethod -Uri "http://localhost:8080/api/submissions/{id}"
```
