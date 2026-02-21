package com.shivsharan.backend.DTO;

import java.io.Serializable;

public class SubmissionResponse implements Serializable {
    private String submissionId;
    private String status;

    public SubmissionResponse() {
    }

    public SubmissionResponse(String submissionId, String status) {
        this.submissionId = submissionId;
        this.status = status;
    }

    public String getSubmissionId() {
        return submissionId;
    }

    public void setSubmissionId(String submissionId) {
        this.submissionId = submissionId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
