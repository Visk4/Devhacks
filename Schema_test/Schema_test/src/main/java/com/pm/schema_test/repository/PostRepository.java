package com.pm.schema_test.repository;

import com.pm.schema_test.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByProblemId(UUID problemId);
    List<Post> findByContestId(UUID contestId);
}
