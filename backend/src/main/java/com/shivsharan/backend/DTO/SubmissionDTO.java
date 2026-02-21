package com.shivsharan.backend.DTO;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class SubmissionDTO implements Serializable {
    @NotBlank(message = "Problem ID is required")
    @Size(min = 1, max = 100, message = "Problem ID must be between 1 and 100 characters")
    private String problemId;

    @NotBlank(message = "Language is required")
    @Size(min = 1, max = 50, message = "Language must be between 1 and 50 characters")
    private String language;

    @NotBlank(message = "Code is required")
    @Size(min = 1, max = 100000, message = "Code must not exceed 100,000 characters")
    private String code;

    public SubmissionDTO() {
    }

    public SubmissionDTO(String problemId, String language, String code) {
        this.problemId = problemId;
        this.language = language;
        this.code = code;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
