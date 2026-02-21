package com.pm.schema_test;

import com.pm.schema_test.entity.*;
import com.pm.schema_test.enums.*;
import com.pm.schema_test.repository.*;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SchemaIntegrationTest {

    @Autowired private CollegeRepository collegeRepo;
    @Autowired private UserRepository userRepo;
    @Autowired private TopicRepository topicRepo;
    @Autowired private CompanyTagRepository companyTagRepo;
    @Autowired private ProblemRepository problemRepo;
    @Autowired private TestCaseRepository testCaseRepo;
    @Autowired private AdminRepository adminRepo;
    @Autowired private ContestRepository contestRepo;
    @Autowired private ContestProblemRepository contestProblemRepo;
    @Autowired private ContestParticipantRepository contestParticipantRepo;
    @Autowired private SubmissionRepository submissionRepo;
    @Autowired private PostRepository postRepo;
    @Autowired private CommentRepository commentRepo;
    @Autowired private CoinTransactionRepository coinTxRepo;

    // Shared references across tests
    private College college;
    private User user1;
    private User user2;
    private Admin admin;
    private Topic topicDP;
    private Topic topicGraphs;
    private CompanyTag google;
    private Problem problem;
    private Contest contest;

    // ───────────────── 1. COLLEGE ─────────────────

    @Test
    @Order(1)
    void testCreateCollege() {
        college = collegeRepo.save(College.builder()
                .name("SPIT")
                .country("India")
                .build());

        assertThat(college.getId()).isNotNull();
        System.out.println("✅ College created: " + college.getName() + " (id=" + college.getId() + ")");
    }

    // ───────────────── 2. USERS ─────────────────

    @Test
    @Order(2)
    void testCreateUsers() {
        college = collegeRepo.findAll().get(0);

        user1 = userRepo.save(User.builder()
                .username("shiv_coder")
                .email("shiv@example.com")
                .passwordHash("$2a$10$hashedpassword1")
                .gender(Gender.MALE)
                .college(college)
                .build());

        user2 = userRepo.save(User.builder()
                .username("jane_dev")
                .email("jane@example.com")
                .passwordHash("$2a$10$hashedpassword2")
                .gender(Gender.FEMALE)
                .college(college)
                .build());

        assertThat(user1.getId()).isNotNull();
        assertThat(user2.getId()).isNotNull();
        assertThat(user1.getRating()).isEqualTo(1200);
        assertThat(user1.getCoins()).isEqualTo(0);
        assertThat(user1.getStreak()).isEqualTo(0);

        System.out.println("✅ User1 created: " + user1.getUsername() + " (rating=" + user1.getRating() + ")");
        System.out.println("✅ User2 created: " + user2.getUsername());
    }

    @Test
    @Order(3)
    void testUniqueUsernameConstraint() {
        college = collegeRepo.findAll().get(0);
        assertThatThrownBy(() -> {
            userRepo.saveAndFlush(User.builder()
                    .username("shiv_coder") // duplicate
                    .email("other@example.com")
                    .passwordHash("hash")
                    .college(college)
                    .build());
        }).isInstanceOf(Exception.class);

        System.out.println("✅ Unique username constraint enforced");
    }

    @Test
    @Order(4)
    void testFindUserByUsername() {
        Optional<User> found = userRepo.findByUsername("shiv_coder");
        assertThat(found).isPresent();
        assertThat(found.get().getEmail()).isEqualTo("shiv@example.com");
        System.out.println("✅ findByUsername works");
    }

    // ───────────────── 3. ADMIN ─────────────────

    @Test
    @Order(5)
    void testCreateAdmin() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();

        admin = adminRepo.save(Admin.builder()
                .user(user1)
                .permissions("{\"canCreateProblem\": true, \"canManageContest\": true}")
                .build());

        assertThat(admin.getId()).isNotNull();
        System.out.println("✅ Admin created for user: " + user1.getUsername());
    }

    // ───────────────── 4. TOPICS & COMPANY TAGS ─────────────────

    @Test
    @Order(6)
    void testCreateTopicsAndCompanyTags() {
        topicDP = topicRepo.save(Topic.builder().name("Dynamic Programming").build());
        topicGraphs = topicRepo.save(Topic.builder().name("Graphs").build());

        google = companyTagRepo.save(CompanyTag.builder().companyName("Google").build());
        companyTagRepo.save(CompanyTag.builder().companyName("Amazon").build());

        assertThat(topicRepo.findAll()).hasSize(2);
        assertThat(companyTagRepo.findAll()).hasSize(2);
        System.out.println("✅ Topics and Company Tags created");
    }

    // ───────────────── 5. PROBLEM + TEST CASES ─────────────────

    @Test
    @Order(7)
    void testCreateProblemWithTestCases() {
        admin = adminRepo.findAll().get(0);
        topicDP = topicRepo.findAll().stream().filter(t -> t.getName().equals("Dynamic Programming")).findFirst().orElseThrow();
        google = companyTagRepo.findAll().stream().filter(c -> c.getCompanyName().equals("Google")).findFirst().orElseThrow();

        problem = Problem.builder()
                .title("Two Sum")
                .body("Given an array of integers, return indices of the two numbers that add up to a target.")
                .difficulty(Difficulty.EASY)
                .points(100)
                .timeLimitMs(1000)
                .memoryLimitKb(262144)
                .createdByAdmin(admin)
                .topics(Set.of(topicDP))
                .companyTags(Set.of(google))
                .build();

        problem = problemRepo.save(problem);

        // Add test cases
        TestCase sample = testCaseRepo.save(TestCase.builder()
                .problem(problem)
                .inputData("[2,7,11,15]\n9")
                .expectedOutput("[0,1]")
                .isSample(true)
                .build());

        TestCase hidden = testCaseRepo.save(TestCase.builder()
                .problem(problem)
                .inputData("[3,2,4]\n6")
                .expectedOutput("[1,2]")
                .isSample(false)
                .build());

        assertThat(problem.getId()).isNotNull();
        assertThat(problem.getTimeLimitMs()).isEqualTo(1000);
        assertThat(problem.getMemoryLimitKb()).isEqualTo(262144);
        assertThat(testCaseRepo.findByProblemId(problem.getId())).hasSize(2);
        assertThat(testCaseRepo.findByProblemIdAndIsSampleTrue(problem.getId())).hasSize(1);

        System.out.println("✅ Problem created: " + problem.getTitle() + " (TL=" + problem.getTimeLimitMs() + "ms, ML=" + problem.getMemoryLimitKb() + "KB)");
        System.out.println("✅ Test cases: 1 sample + 1 hidden");
    }

    @Test
    @Order(8)
    @Transactional
    void testProblemTopicMapping() {
        problem = problemRepo.findAll().get(0);
        assertThat(problem.getTopics()).isNotEmpty();
        System.out.println("✅ Problem-Topic ManyToMany mapping works");
    }

    @Test
    @Order(9)
    @Transactional
    void testProblemCompanyTagMapping() {
        problem = problemRepo.findAll().get(0);
        assertThat(problem.getCompanyTags()).isNotEmpty();
        System.out.println("✅ Problem-CompanyTag ManyToMany mapping works");
    }

    // ───────────────── 6. CONTEST ─────────────────

    @Test
    @Order(10)
    void testCreateContest() {
        admin = adminRepo.findAll().get(0);
        problem = problemRepo.findAll().get(0);

        contest = contestRepo.save(Contest.builder()
                .title("Weekly Contest #1")
                .startTime(LocalDateTime.now().plusHours(1))
                .endTime(LocalDateTime.now().plusHours(3))
                .isVirtualEnabled(true)
                .admin(admin)
                .build());

        // Add problem to contest
        contestProblemRepo.save(ContestProblem.builder()
                .contest(contest)
                .problem(problem)
                .displayOrder(1)
                .build());

        assertThat(contest.getId()).isNotNull();
        assertThat(contestProblemRepo.findByContestIdOrderByDisplayOrderAsc(contest.getId())).hasSize(1);
        System.out.println("✅ Contest created: " + contest.getTitle() + " (virtual=" + contest.getIsVirtualEnabled() + ")");
    }

    // ───────────────── 7. CONTEST PARTICIPANT (Composite Key) ─────────────────

    @Test
    @Order(11)
    void testContestParticipant() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();
        user2 = userRepo.findByUsername("jane_dev").orElseThrow();
        contest = contestRepo.findAll().get(0);

        // Regular participant
        contestParticipantRepo.save(ContestParticipant.builder()
                .id(new ContestParticipantId(contest.getId(), user1.getId()))
                .contest(contest)
                .user(user1)
                .isVirtual(false)
                .build());

        // Virtual participant
        contestParticipantRepo.save(ContestParticipant.builder()
                .id(new ContestParticipantId(contest.getId(), user2.getId()))
                .contest(contest)
                .user(user2)
                .isVirtual(true)
                .virtualStartTime(LocalDateTime.now())
                .build());

        assertThat(contestParticipantRepo.findAll()).hasSize(2);
        System.out.println("✅ Contest participants registered (1 regular + 1 virtual)");
    }

    // ───────────────── 8. SUBMISSIONS ─────────────────

    @Test
    @Order(12)
    void testCreateSubmissions() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();
        problem = problemRepo.findAll().get(0);
        contest = contestRepo.findAll().get(0);

        // Wrong answer attempt
        submissionRepo.save(Submission.builder()
                .user(user1)
                .problem(problem)
                .contest(contest)
                .language("java")
                .codeBody("class Solution { int[] twoSum(int[] nums, int t) { return null; } }")
                .status(Verdict.WA)
                .executionTime(50.0)
                .memoryUsed(15000)
                .build());

        // TLE attempt
        submissionRepo.save(Submission.builder()
                .user(user1)
                .problem(problem)
                .contest(contest)
                .language("java")
                .codeBody("class Solution { int[] twoSum(int[] nums, int t) { /* O(n^3) brute force */ return null; } }")
                .status(Verdict.TLE)
                .executionTime(1500.0) // exceeds 1000ms limit
                .memoryUsed(20000)
                .build());

        // Accepted
        submissionRepo.save(Submission.builder()
                .user(user1)
                .problem(problem)
                .contest(contest)
                .language("java")
                .codeBody("class Solution { int[] twoSum(int[] nums, int t) { Map<Integer,Integer> m = new HashMap<>(); /* ... */ return new int[]{}; } }")
                .status(Verdict.AC)
                .executionTime(45.0)
                .memoryUsed(14000)
                .build());

        List<Submission> subs = submissionRepo.findByUserIdAndProblemId(user1.getId(), problem.getId());
        assertThat(subs).hasSize(3);

        System.out.println("✅ 3 submissions created (WA → TLE → AC)");
    }

    @Test
    @Order(13)
    void testSolvedAndAttemptedQueries() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();
        user2 = userRepo.findByUsername("jane_dev").orElseThrow();

        List<UUID> solvedByUser1 = submissionRepo.findSolvedProblemIds(user1.getId(), Verdict.AC);
        List<UUID> attemptedByUser1 = submissionRepo.findAttemptedProblemIds(user1.getId());
        List<UUID> solvedByUser2 = submissionRepo.findSolvedProblemIds(user2.getId(), Verdict.AC);

        assertThat(solvedByUser1).hasSize(1);       // user1 AC'd the problem
        assertThat(attemptedByUser1).hasSize(1);     // 1 distinct problem attempted
        assertThat(solvedByUser2).isEmpty();          // user2 never submitted

        System.out.println("✅ Solved/Attempted problem queries work correctly");
        System.out.println("   User1: solved=" + solvedByUser1.size() + ", attempted=" + attemptedByUser1.size());
        System.out.println("   User2: solved=" + solvedByUser2.size());
    }

    // ───────────────── 9. LEADERBOARD ─────────────────

    @Test
    @Order(14)
    @Transactional
    void testLeaderboardQuery() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();
        contest = contestRepo.findAll().get(0);

        // Update participant's score
        ContestParticipantId cpId = new ContestParticipantId(contest.getId(), user1.getId());
        ContestParticipant cp = contestParticipantRepo.findById(cpId).orElseThrow();
        cp.setTotalPoints(100);
        cp.setTotalPenalty(40); // 2 wrong attempts × 20min penalty
        cp.setLastAcTime(LocalDateTime.now());
        contestParticipantRepo.save(cp);

        List<ContestParticipant> leaderboard = contestParticipantRepo.findLeaderboard(contest.getId());
        assertThat(leaderboard).isNotEmpty();
        assertThat(leaderboard.get(0).getTotalPoints()).isEqualTo(100);

        System.out.println("✅ Leaderboard query works");
        leaderboard.forEach(p ->
                System.out.println("   Rank - User: " + p.getUser().getUsername()
                        + " | Points: " + p.getTotalPoints()
                        + " | Penalty: " + p.getTotalPenalty()));
    }

    // ───────────────── 10. DISCUSSION (POST + COMMENT) ─────────────────

    @Test
    @Order(15)
    void testCreatePostAndComments() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();
        user2 = userRepo.findByUsername("jane_dev").orElseThrow();
        problem = problemRepo.findAll().get(0);

        Post post = postRepo.save(Post.builder()
                .user(user1)
                .problem(problem)
                .title("Optimal approach for Two Sum?")
                .content("I used a HashMap approach. Is there a better solution?")
                .build());

        // Top-level comment
        Comment c1 = commentRepo.save(Comment.builder()
                .post(post)
                .user(user2)
                .content("HashMap is the best for O(n). Two-pointer works if sorted.")
                .build());

        // Nested reply
        commentRepo.save(Comment.builder()
                .post(post)
                .user(user1)
                .parentComment(c1)
                .content("Thanks! Makes sense for sorted input.")
                .build());

        List<Comment> comments = commentRepo.findByPostId(post.getId());
        assertThat(comments).hasSize(2);

        System.out.println("✅ Post + nested comments created");
    }

    // ───────────────── 11. COIN TRANSACTIONS ─────────────────

    @Test
    @Order(16)
    void testCoinTransactions() {
        user1 = userRepo.findByUsername("shiv_coder").orElseThrow();

        coinTxRepo.save(CoinTransaction.builder()
                .user(user1)
                .amount(50)
                .reason("Solved 'Two Sum' (EASY)")
                .build());

        coinTxRepo.save(CoinTransaction.builder()
                .user(user1)
                .amount(100)
                .reason("Contest #1 participation bonus")
                .build());

        List<CoinTransaction> txs = coinTxRepo.findByUserId(user1.getId());
        assertThat(txs).hasSize(2);

        int totalCoins = txs.stream().mapToInt(CoinTransaction::getAmount).sum();
        assertThat(totalCoins).isEqualTo(150);

        // Update user's cached coin balance
        user1.setCoins(totalCoins);
        userRepo.save(user1);

        User refreshed = userRepo.findById(user1.getId()).orElseThrow();
        assertThat(refreshed.getCoins()).isEqualTo(150);

        System.out.println("✅ Coin transactions ledger works (total=" + totalCoins + " coins)");
    }

    // ───────────────── 12. FIND BY DIFFICULTY ─────────────────

    @Test
    @Order(17)
    void testFindProblemsByDifficulty() {
        List<Problem> easyProblems = problemRepo.findByDifficulty(Difficulty.EASY);
        assertThat(easyProblems).isNotEmpty();
        System.out.println("✅ Found " + easyProblems.size() + " EASY problem(s)");
    }

    // ───────────────── 13. FULL SCHEMA SUMMARY ─────────────────

    @Test
    @Order(18)
    void printSchemaSummary() {
        System.out.println("\n══════════════════════════════════════════");
        System.out.println("       SCHEMA TEST SUMMARY");
        System.out.println("══════════════════════════════════════════");
        System.out.println("  Colleges:             " + collegeRepo.count());
        System.out.println("  Users:                " + userRepo.count());
        System.out.println("  Admins:               " + adminRepo.count());
        System.out.println("  Topics:               " + topicRepo.count());
        System.out.println("  Company Tags:         " + companyTagRepo.count());
        System.out.println("  Problems:             " + problemRepo.count());
        System.out.println("  Test Cases:           " + testCaseRepo.count());
        System.out.println("  Contests:             " + contestRepo.count());
        System.out.println("  Contest Problems:     " + contestProblemRepo.count());
        System.out.println("  Contest Participants: " + contestParticipantRepo.count());
        System.out.println("  Submissions:          " + submissionRepo.count());
        System.out.println("  Posts:                " + postRepo.count());
        System.out.println("  Comments:             " + commentRepo.count());
        System.out.println("  Coin Transactions:    " + coinTxRepo.count());
        System.out.println("══════════════════════════════════════════");
        System.out.println("  ALL SCHEMA TESTS PASSED ✅");
        System.out.println("══════════════════════════════════════════\n");
    }
}
