package com.shivsharan.backend.repository;


import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shivsharan.backend.enums.Verdict;
import com.shivsharan.backend.model.Submission;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    List<Submission> findByUser_IdOrderBySubmittedAtDesc(UUID userId);
    
    List<Submission> findByProblem_IdOrderBySubmittedAtDesc(UUID problemId);
    
    List<Submission> findByUser_IdAndProblem_Id(UUID userId, UUID problemId);

    List<Submission> findByContest_Id(UUID contestId);

    @Query("SELECT DISTINCT s.problem.id FROM Submission s WHERE s.user.id = :userId AND s.status = :verdict")
    List<UUID> findSolvedProblemIds(@Param("userId") UUID userId, @Param("verdict") Verdict verdict);

    @Query("SELECT DISTINCT s.problem.id FROM Submission s WHERE s.user.id = :userId")
    List<UUID> findAttemptedProblemIds(@Param("userId") UUID userId);
}
