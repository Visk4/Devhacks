package com.pm.schema_test.entity;

import com.pm.schema_test.enums.Verdict;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "submissions", indexes = {
        @Index(name = "idx_sub_user_problem", columnList = "user_id, problem_id"),
        @Index(name = "idx_sub_contest", columnList = "contest_id")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    private Problem problem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contest_id")
    private Contest contest;

    @Column(nullable = false)
    private String language;

    @Lob
    @Column(columnDefinition = "TEXT", nullable = false)
    private String codeBody;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Verdict status = Verdict.PENDING;

    private Double executionTime;

    private Integer memoryUsed;

    private LocalDateTime submittedAt;

    @PrePersist
    protected void onSubmit() {
        submittedAt = LocalDateTime.now();
    }
}
