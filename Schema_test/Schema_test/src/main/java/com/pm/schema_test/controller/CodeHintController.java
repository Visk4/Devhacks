package com.pm.schema_test.controller;

import com.pm.schema_test.dto.CodeHintRequest;
import com.pm.schema_test.dto.CodeHintResponse;
import com.pm.schema_test.service.GeminiHintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/hints")
public class CodeHintController {

    private final GeminiHintService geminiHintService;

    public CodeHintController(GeminiHintService geminiHintService) {
        this.geminiHintService = geminiHintService;
    }

    /**
     * POST /api/hints
     * Body: { "code": "...", "language": "java", "errors": "..." }
     * Returns: { "hints": [...], "summary": "...", "correctedSnippet": "..." }
     */
    @PostMapping
    public ResponseEntity<CodeHintResponse> getCodeHints(@RequestBody CodeHintRequest request) {
        CodeHintResponse response = geminiHintService.getHints(request);
        return ResponseEntity.ok(response);
    }
}
