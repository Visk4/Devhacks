package com.shivsharan.backend.dev;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import com.shivsharan.backend.enums.Difficulty;
import com.shivsharan.backend.model.Contest;
import com.shivsharan.backend.model.ContestProblem;
import com.shivsharan.backend.model.Problem;
import com.shivsharan.backend.model.TestCase;
import com.shivsharan.backend.repository.ContestProblemRepository;
import com.shivsharan.backend.repository.ContestRepository;
import com.shivsharan.backend.repository.ProblemRepository;
import com.shivsharan.backend.repository.TestCaseRepository;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class StartupSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(StartupSeeder.class);

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;
    private final ContestRepository contestRepository;
    private final ContestProblemRepository contestProblemRepository;

    public StartupSeeder(
            ProblemRepository problemRepository,
            TestCaseRepository testCaseRepository,
            ContestRepository contestRepository,
            ContestProblemRepository contestProblemRepository
    ) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
        this.contestRepository = contestRepository;
        this.contestProblemRepository = contestProblemRepository;
    }

    @Override
    public void run(String... args) {
        seedSampleProblems();
        seedDummyContests();
    }

    private void seedSampleProblems() {
        seedSumProblem();
        seedFibonacciProblem();
        seedPalindromeProblem();
    }

    private void seedDummyContests() {
        try {
            seedContest(
                    "Weekly Contest 101",
                    "Dummy ongoing contest for testing contest APIs",
                    LocalDateTime.now().minusHours(1),
                    LocalDateTime.now().plusHours(2),
                    List.of("Sum Two Numbers", "Fibonacci Number")
            );

            seedContest(
                    "Biweekly Contest 54",
                    "Dummy upcoming contest for testing upcoming flow",
                    LocalDateTime.now().plusDays(1),
                    LocalDateTime.now().plusDays(1).plusHours(2),
                    List.of("Palindrome Check", "Sum Two Numbers")
            );

            seedContest(
                    "Starter Contest 7",
                    "Dummy completed contest for testing past leaderboard flow",
                    LocalDateTime.now().minusDays(2),
                    LocalDateTime.now().minusDays(2).plusHours(2),
                    List.of("Sum Two Numbers", "Palindrome Check")
            );
        } catch (DataAccessException ex) {
            logger.error("StartupSeeder: failed to seed dummy contests: {}", ex.getMessage());
        }
    }

    private void seedContest(
            String title,
            String description,
            LocalDateTime startTime,
            LocalDateTime endTime,
            List<String> problemTitles
    ) {
        if (contestRepository.existsByTitle(title)) {
            logger.info("Contest '{}' already exists, skipping seed", title);
            return;
        }

        Contest contest = Contest.builder()
                .title(title)
                .description(description)
                .startTime(startTime)
                .endTime(endTime)
                .isVirtualEnabled(false)
                .build();
        Contest savedContest = contestRepository.save(contest);

        int order = 1;
        for (String problemTitle : problemTitles) {
            Problem problem = problemRepository.findByTitle(problemTitle).orElse(null);
            if (problem == null) {
                logger.warn("Problem '{}' not found while seeding contest '{}', skipping", problemTitle, title);
                continue;
            }
            ContestProblem contestProblem = ContestProblem.builder()
                    .contest(savedContest)
                    .problem(problem)
                    .displayOrder(order++)
                    .build();
            contestProblemRepository.save(contestProblem);
        }

        logger.info("Created dummy contest '{}'", title);
    }

    private void seedSumProblem() {
        String title = "Sum Two Numbers";
        try {
            if (problemRepository.existsByTitle(title)) {
                logger.info("Problem '{}' already exists, skipping seed", title);
                return;
            }
        } catch (DataAccessException ex) {
            logger.error("StartupSeeder: database not ready, skipping seed: {}", ex.getMessage());
            return;
        }

        try {
            Problem p = new Problem();
            p.setTitle(title);
            p.setBody("""
                ## Problem Description
                
                Given two integers **a** and **b**, compute their sum.
                
                ### Input Format
                A single line containing two space-separated integers a and b.
                
                ### Output Format
                Print the sum of a and b.
                
                ### Constraints
                - -10^9 ≤ a, b ≤ 10^9
                
                ### Example
                **Input:**
                ```
                1 2
                ```
                **Output:**
                ```
                3
                ```
                """);
            p.setDifficulty(Difficulty.EASY);
            p.setPoints(10);
            p.setTimeLimitMs(1000);
            p.setMemoryLimitMb(128);
            p.setCheckerType("EXACT");
            Problem saved = problemRepository.save(p);

            String testDataDir = System.getProperty("user.dir") + "/test_data/";
            createTestCase(saved, testDataDir + "sum_input1.txt", testDataDir + "sum_output1.txt", true, 1);
            createTestCase(saved, testDataDir + "sum_input2.txt", testDataDir + "sum_output2.txt", false, 2);
            createTestCase(saved, testDataDir + "sum_input3.txt", testDataDir + "sum_output3.txt", false, 3);

            logger.info("Created problem '{}' with test cases", title);
        } catch (Exception e) {
            logger.error("Error seeding '{}' problem: {}", title, e.getMessage());
        }
    }

    private void seedFibonacciProblem() {
        String title = "Fibonacci Number";
        try {
            if (problemRepository.existsByTitle(title)) {
                logger.info("Problem '{}' already exists, skipping seed", title);
                return;
            }
        } catch (DataAccessException ex) {
            return;
        }

        try {
            Problem p = new Problem();
            p.setTitle(title);
            p.setBody("""
                ## Problem Description
                
                The Fibonacci sequence is defined as:
                - F(0) = 0
                - F(1) = 1
                - F(n) = F(n-1) + F(n-2) for n > 1
                
                Given a positive integer **n**, print the first n Fibonacci numbers.
                
                ### Input Format
                A single integer n.
                
                ### Output Format
                Print the first n Fibonacci numbers (F(0) to F(n-1)), separated by spaces.
                
                ### Constraints
                - 1 ≤ n ≤ 45
                
                ### Example
                **Input:**
                ```
                5
                ```
                **Output:**
                ```
                0 1 1 2 3
                ```
                """);
            p.setDifficulty(Difficulty.EASY);
            p.setPoints(20);
            p.setTimeLimitMs(1000);
            p.setMemoryLimitMb(128);
            p.setCheckerType("EXACT");
            Problem saved = problemRepository.save(p);

            String testDataDir = System.getProperty("user.dir") + "/test_data/";
            createTestCase(saved, testDataDir + "fibonacci_input1.txt", testDataDir + "fibonacci_output1.txt", true, 1);
            createTestCase(saved, testDataDir + "fibonacci_input2.txt", testDataDir + "fibonacci_output2.txt", false, 2);

            logger.info("Created problem '{}' with test cases", title);
        } catch (Exception e) {
            logger.error("Error seeding '{}' problem: {}", title, e.getMessage());
        }
    }

    private void seedPalindromeProblem() {
        String title = "Palindrome Check";
        try {
            if (problemRepository.existsByTitle(title)) {
                logger.info("Problem '{}' already exists, skipping seed", title);
                return;
            }
        } catch (DataAccessException ex) {
            return;
        }

        try {
            Problem p = new Problem();
            p.setTitle(title);
            p.setBody("""
                ## Problem Description
                
                A palindrome is a string that reads the same forward and backward.
                
                Given a string **s**, determine if it is a palindrome.
                
                ### Input Format
                A single line containing the string s (lowercase letters only).
                
                ### Output Format
                Print "yes" if the string is a palindrome, "no" otherwise.
                
                ### Constraints
                - 1 ≤ |s| ≤ 10^5
                - s consists of lowercase English letters only
                
                ### Example
                **Input:**
                ```
                racecar
                ```
                **Output:**
                ```
                yes
                ```
                """);
            p.setDifficulty(Difficulty.MEDIUM);
            p.setPoints(30);
            p.setTimeLimitMs(1000);
            p.setMemoryLimitMb(128);
            p.setCheckerType("EXACT");
            Problem saved = problemRepository.save(p);

            String testDataDir = System.getProperty("user.dir") + "/test_data/";
            createTestCase(saved, testDataDir + "palindrome_input1.txt", testDataDir + "palindrome_output1.txt", true, 1);
            createTestCase(saved, testDataDir + "palindrome_input2.txt", testDataDir + "palindrome_output2.txt", false, 2);

            logger.info("Created problem '{}' with test cases", title);
        } catch (Exception e) {
            logger.error("Error seeding '{}' problem: {}", title, e.getMessage());
        }
    }

    private void createTestCase(Problem problem, String inputPath, String outputPath, boolean isSample, int ordering) {
        TestCase tc = new TestCase();
        tc.setProblem(problem);
        tc.setInputPath(inputPath);
        tc.setOutputPath(outputPath);
        tc.setIsSample(isSample);
        tc.setOrdering(ordering);
        testCaseRepository.save(tc);
    }
}
