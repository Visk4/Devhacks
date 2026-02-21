package com.shivsharan.backend.DTO;

import java.io.Serializable;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SubmissionDTO implements Serializable {
    @NotBlank(message = "Problem ID is required")
    @Size(min = 1, max = 100, message = "Problem ID must be between 1 and 100 characters")
    private UUID problemId;

    @NotBlank(message = "Language is required")
    @Size(min = 1, max = 50, message = "Language must be between 1 and 50 characters")
    private String language;

    @NotBlank(message = "Code is required")
    @Size(min = 1, max = 100000, message = "Code must not exceed 100,000 characters")
    private String code;
}
