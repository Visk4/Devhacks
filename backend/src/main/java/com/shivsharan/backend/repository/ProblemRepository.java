package com.shivsharan.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shivsharan.backend.model.Problem;

public interface ProblemRepository extends JpaRepository<Problem, String> {
}
