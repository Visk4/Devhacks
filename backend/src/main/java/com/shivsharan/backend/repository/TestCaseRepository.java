package com.shivsharan.backend.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.shivsharan.backend.model.TestCase;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    List<TestCase> findByProblemId(UUID problemId);
    List<TestCase> findByProblemIdAndIsSampleTrue(UUID problemId);
    List<TestCase> findByProblemIdOrderByOrderingAsc(UUID id);
    
    @Transactional
    void deleteByProblemId(UUID problemId);
}
