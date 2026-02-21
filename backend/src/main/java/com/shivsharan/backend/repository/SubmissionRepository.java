package com.shivsharan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivsharan.backend.model.Submission;

public interface SubmissionRepository extends JpaRepository<Submission, String> {
}
