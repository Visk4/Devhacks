package com.pm.schema_test.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CodeHintResponse {
    private List<String> hints;
    private String summary;
    private String correctedSnippet;
}
