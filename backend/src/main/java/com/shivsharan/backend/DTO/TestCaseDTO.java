package com.shivsharan.backend.DTO;

import java.io.Serializable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class TestCaseDTO implements Serializable {
    @NotBlank(message = "Problem ID is required")
    @Size(min = 1, max = 100, message = "Problem ID must be between 1 and 100 characters")
    private String problemId;

    @NotBlank(message = "Input path is required")
    @Size(min = 1, max = 500, message = "Input path must be between 1 and 500 characters")
    private String inputPath;

    @NotBlank(message = "Output path is required")
    @Size(min = 1, max = 500, message = "Output path must be between 1 and 500 characters")
    private String outputPath;

    private Integer points = 10;
    private Boolean isSample = false;
    private Integer ordering = 0;

    public TestCaseDTO() {
    }

    public TestCaseDTO(String problemId, String inputPath, String outputPath, Integer points,
                       Boolean isSample, Integer ordering) {
        this.problemId = problemId;
        this.inputPath = inputPath;
        this.outputPath = outputPath;
        this.points = points;
        this.isSample = isSample;
        this.ordering = ordering;
    }

    public String getProblemId() {
        return problemId;
    }

    public void setProblemId(String problemId) {
        this.problemId = problemId;
    }

    public String getInputPath() {
        return inputPath;
    }

    public void setInputPath(String inputPath) {
        this.inputPath = inputPath;
    }

    public String getOutputPath() {
        return outputPath;
    }

    public void setOutputPath(String outputPath) {
        this.outputPath = outputPath;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Boolean getIsSample() {
        return isSample;
    }

    public void setIsSample(Boolean isSample) {
        this.isSample = isSample;
    }

    public Integer getOrdering() {
        return ordering;
    }

    public void setOrdering(Integer ordering) {
        this.ordering = ordering;
    }
}
