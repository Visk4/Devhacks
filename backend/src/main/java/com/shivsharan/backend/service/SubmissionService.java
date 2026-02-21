package com.shivsharan.backend.service;

import java.time.Instant;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shivsharan.backend.model.Submission;
import com.shivsharan.backend.repository.SubmissionRepository;

import jakarta.validation.constraints.NotBlank;

@Service
public class SubmissionService {

    private static final Logger logger = LoggerFactory.getLogger(SubmissionService.class);

    @Autowired
    private SubmissionRepository submissionRepository;

    /**
     * Create and save a new submission
     * @param problemId Problem ID
     * @param language Programming language
     * @param code Source code
     * @param userId User ID (optional)
     * @return Created submission
     */
    public Submission createAndSave(@NotBlank String problemId,
                                    @NotBlank String language,
                                    @NotBlank String code,
                                    Long userId) {
        String id = java.util.UUID.randomUUID().toString();
        Submission s = new Submission();
        s.setId(id);
        s.setProblemId(problemId);
        s.setLanguage(language.toUpperCase());
        s.setCode(code);
        s.setUserId(userId);
        s.setStatus("PENDING");
        s.setSubmittedAt(Instant.now());
        
        Submission saved = submissionRepository.save(s);
        logger.info("Created submission {} for problem {}", id, problemId);
        return saved;
    }

    /**
     * Find a submission by ID
     * @param id Submission ID
     * @return Submission if found
     */
    public Optional<Submission> findById(String id) {
        return submissionRepository.findById(id);
    }

    /**
     * Get submission by ID
     * @param id Submission ID
     * @return Submission details
     * @throws Exception if submission not found
     */
    public Submission getById(String id) throws Exception {
        return submissionRepository.findById(id)
                .orElseThrow(() -> new Exception("Submission not found: " + id));
    }
}
