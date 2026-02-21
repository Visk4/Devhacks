package com.shivsharan.backend.dev;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import com.shivsharan.backend.model.Problem;
import com.shivsharan.backend.model.TestCase;
import com.shivsharan.backend.repository.ProblemRepository;
import com.shivsharan.backend.repository.TestCaseRepository;

@Component
public class StartupSeeder implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(StartupSeeder.class);

    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;

    public StartupSeeder(ProblemRepository problemRepository, TestCaseRepository testCaseRepository) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        seedSampleProblems();
    }

    private void seedSampleProblems() throws IOException {
        seedSumProblem();
    }

    private void seedSumProblem() throws IOException {
        String pid = "sum";
        try {
            if (problemRepository.existsById(pid)) {
                logger.info("Problem 'sum' already exists, skipping seed");
                return;
            }
        } catch (DataAccessException ex) {
            logger.error("StartupSeeder: database not ready, skipping seed: {}", ex.getMessage());
            return;
        }

        try {
            Problem p = new Problem();
            p.setId(pid);
            p.setTitle("Sum Two Numbers");
            p.setTimeLimitMs(2000);
            p.setMemoryLimitMb(256);
            p.setCheckerType("EXACT");
            problemRepository.save(p);

            // Create test cases using existing test data files
            String baseDir = System.getProperty("user.dir");
            String testDataDir = baseDir + "/test_data/";

            // Test case 1
            TestCase tc1 = new TestCase();
            tc1.setProblemId(pid);
            tc1.setInputPath(testDataDir + "sum_input1.txt");
            tc1.setOutputPath(testDataDir + "sum_output1.txt");
            tc1.setIsSample(true);
            tc1.setOrdering(1);
            testCaseRepository.save(tc1);
            logger.info("Created test case 1 for 'sum'");

            // Test case 2
            TestCase tc2 = new TestCase();
            tc2.setProblemId(pid);
            tc2.setInputPath(testDataDir + "sum_input2.txt");
            tc2.setOutputPath(testDataDir + "sum_output2.txt");
            tc2.setIsSample(false);
            tc2.setOrdering(2);
            testCaseRepository.save(tc2);
            logger.info("Created test case 2 for 'sum'");

            // Test case 3
            TestCase tc3 = new TestCase();
            tc3.setProblemId(pid);
            tc3.setInputPath(testDataDir + "sum_input3.txt");
            tc3.setOutputPath(testDataDir + "sum_output3.txt");
            tc3.setIsSample(false);
            tc3.setOrdering(3);
            testCaseRepository.save(tc3);
            logger.info("Created test case 3 for 'sum'");

            logger.info("StartupSeeder: Successfully created problem 'sum' with 3 test cases");
        } catch (Exception e) {
            logger.error("Error seeding 'sum' problem: {}", e.getMessage(), e);
        }
    }
}
