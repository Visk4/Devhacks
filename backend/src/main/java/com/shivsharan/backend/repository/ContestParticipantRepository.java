package com.shivsharan.backend.repository;

import com.shivsharan.backend.model.ContestParticipant;
import com.shivsharan.backend.model.ContestParticipantId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ContestParticipantRepository extends JpaRepository<ContestParticipant, ContestParticipantId> {

    @Query("SELECT cp FROM ContestParticipant cp WHERE cp.contest.id = :contestId ORDER BY cp.totalPoints DESC, cp.totalPenalty ASC")
    List<ContestParticipant> findLeaderboard(@Param("contestId") UUID contestId);
}
