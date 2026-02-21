package com.pm.schema_test.repository;

import com.pm.schema_test.entity.ContestProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContestProblemRepository extends JpaRepository<ContestProblem, Long> {
    List<ContestProblem> findByContestIdOrderByDisplayOrderAsc(UUID contestId);
}
