package com.pm.schema_test.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pm.schema_test.enums.Difficulty;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "problems")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString(exclude = {"testCases", "topics", "companyTags"})
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String body;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Difficulty difficulty;

    @Column(nullable = false)
    private Integer points;

    // Execution constraints for judge
    @Column(nullable = false)
    @Builder.Default
    private Integer timeLimitMs = 1000;

    @Column(nullable = false)
    @Builder.Default
    private Integer memoryLimitKb = 262144;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by_admin")
    private Admin createdByAdmin;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<TestCase> testCases;

    @ManyToMany
    @JoinTable(
            name = "problem_topic_map",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "topic_id")
    )
    private Set<Topic> topics;

    @ManyToMany
    @JoinTable(
            name = "problem_company_map",
            joinColumns = @JoinColumn(name = "problem_id"),
            inverseJoinColumns = @JoinColumn(name = "company_id")
    )
    private Set<CompanyTag> companyTags;
}
