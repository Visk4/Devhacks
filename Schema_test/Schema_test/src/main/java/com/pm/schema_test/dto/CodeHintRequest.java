package com.pm.schema_test.dto;

import lombok.Data;

@Data
public class CodeHintRequest {
    private String code;
    private String language;   // e.g. "java", "python", "cpp"
    private String errors;     // compiler/runtime errors
}
