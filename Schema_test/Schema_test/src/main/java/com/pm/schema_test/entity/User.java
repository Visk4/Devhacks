package com.pm.schema_test.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pm.schema_test.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @EqualsAndHashCode.Include
    private UUID id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String passwordHash;

    @Column(length = 2048)
    private String profilePic;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Builder.Default
    private Integer rating = 1200;

    @Builder.Default
    private Integer coins = 0;

    @Builder.Default
    private Integer streak = 0;

    private LocalDate lastSubmissionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "college_id")
    private College college;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Submission> submissions;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Post> posts;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
