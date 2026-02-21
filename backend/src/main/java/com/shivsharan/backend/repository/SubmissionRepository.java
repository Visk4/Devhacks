package com.shivsharan.backend.repository;


import com.shivsharan.backend.enums.Verdict;
import com.shivsharan.backend.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    List<Submission> findByUserIdAndProblemId(UUID userId, UUID problemId);

    List<Submission> findByContestId(UUID contestId);

    @Query("SELECT DISTINCT s.problem.id FROM Submission s WHERE s.user.id = :userId AND s.status = :verdict")
    List<UUID> findSolvedProblemIds(@Param("userId") UUID userId, @Param("verdict") Verdict verdict);

    @Query("SELECT DISTINCT s.problem.id FROM Submission s WHERE s.user.id = :userId")
    List<UUID> findAttemptedProblemIds(@Param("userId") UUID userId);
}
