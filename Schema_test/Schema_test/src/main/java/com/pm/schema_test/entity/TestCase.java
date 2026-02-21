package com.pm.schema_test.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "test_cases")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id", nullable = false)
    @JsonIgnore
    private Problem problem;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String inputData;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    @Builder.Default
    private Boolean isSample = false;
}
