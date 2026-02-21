package com.shivsharan.backend.controller;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronization;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shivsharan.backend.DTO.SubmissionDTO;
import com.shivsharan.backend.DTO.SubmissionResponse;
import com.shivsharan.backend.enums.Verdict;
import com.shivsharan.backend.model.Problem;
import com.shivsharan.backend.model.Submission;
import com.shivsharan.backend.repository.ProblemRepository;
import com.shivsharan.backend.repository.SubmissionRepository;
import com.shivsharan.backend.service.JobQueueService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class ProblemSubmitController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private JobQueueService jobQueueService;

    /**
     * Submit code for a problem to be judged
     * @param submissionDTO Submission details (problemId, language, code)
     * @return Submission response with ID and status
     */
    @PostMapping("/submissions")
    @Transactional
    public ResponseEntity<SubmissionResponse> submit(@Valid @RequestBody SubmissionDTO submissionDTO) {
        // Validate problem exists
        Optional<Problem> problemOpt = problemRepository.findById(submissionDTO.getProblemId());
        if (problemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        // Create and save submission
        Submission submission = createSubmission(submissionDTO);
        Submission saved = submissionRepository.save(submission);
        // Enqueue job for judging ONLY after successful commit
        if (TransactionSynchronizationManager.isSynchronizationActive()) {
            TransactionSynchronizationManager.registerSynchronization(new TransactionSynchronization() {
                @Override
                public void afterCommit() {
                    jobQueueService.enqueue(saved.getId());
                }
            });
        } else {
            jobQueueService.enqueue(saved.getId());
        }

        return ResponseEntity.accepted()
                .body(new SubmissionResponse(saved.getId(), saved.getStatus()));
    }

    /**
     * Get the status and details of a submission
     * @param submissionId Submission ID
     * @return Submission details
     */
    @GetMapping("/submissions/{submissionId}")
    public ResponseEntity<Submission> getSubmission(@PathVariable UUID submissionId) {
        Optional<Submission> submission = submissionRepository.findById(submissionId);
        return submission.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private Submission createSubmission(SubmissionDTO dto) {
        Problem problem = problemRepository.findById(dto.getProblemId())
                .orElseThrow(() -> new IllegalArgumentException("Problem not found"));
        
        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setLanguage(dto.getLanguage().toUpperCase());
        submission.setCode(dto.getCode());
        submission.setStatus(Verdict.PENDING);
        submission.setSubmittedAt(Instant.now());
        return submission;
    }
}
