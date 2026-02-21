package com.pm.schema_test.repository;

import com.pm.schema_test.entity.Problem;
import com.pm.schema_test.enums.Difficulty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProblemRepository extends JpaRepository<Problem, UUID> {
    List<Problem> findByDifficulty(Difficulty difficulty);
}
