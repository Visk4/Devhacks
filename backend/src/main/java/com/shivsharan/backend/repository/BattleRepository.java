package com.shivsharan.backend.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.shivsharan.backend.enums.BattleStatus;
import com.shivsharan.backend.model.Battle;

@Repository
public interface BattleRepository extends JpaRepository<Battle, UUID> {
    Optional<Battle> findByPartyCode(String partyCode);
    Optional<Battle> findByPartyCodeAndStatus(String partyCode, BattleStatus status);
}
