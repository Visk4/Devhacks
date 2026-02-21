package com.shivsharan.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.shivsharan.backend.model.TestCase;

public interface TestCaseRepository extends JpaRepository<TestCase, Long> {
    List<TestCase> findByProblemIdOrderByOrderingAsc(String problemId);

    @Modifying
    @Transactional
    @Query("DELETE FROM TestCase t WHERE t.problemId = :problemId")
    void deleteByProblemId(@Param("problemId") String problemId);
}
