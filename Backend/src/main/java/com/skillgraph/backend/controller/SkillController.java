package com.skillgraph.backend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillgraph.backend.model.SkillProfile;
import com.skillgraph.backend.repository.SkillProfileRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SkillController {

    private final SkillProfileRepository repository;

    public SkillController(SkillProfileRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/health")
    public String health() {
        return "SkillGraph AI Backend is running 🚀";
    }

    @GetMapping("/history")
    public List<SkillProfile> getHistory() {
        return repository.findTop10ByOrderByIdDesc();
    }

    @PostMapping("/analyze")
    public SkillResult analyze(@RequestBody SkillRequest request) {

        // Save user skill profile into MySQL
        SkillProfile profile = new SkillProfile();
        profile.setCareer(request.career);

        profile.setJava(request.java);
        profile.setPython(request.python);
        profile.setSql(request.sql);
        profile.setJavascript(request.javascript);
        profile.setGit(request.git);
        profile.setDsa(request.dsa);
profile.setReact(request.react);
profile.setLinux(request.linux);
profile.setMachineLearning(request.machineLearning);
profile.setSystemDesign(request.systemDesign);
profile.setStatistics(request.statistics);
profile.setCloud(request.cloud);
profile.setCybersecurity(request.cybersecurity);
profile.setNetworking(request.networking);
profile.setTesting(request.testing);
profile.setApiDevelopment(request.apiDevelopment);
profile.setUiUx(request.uiUx);
profile.setAiGenai(request.aiGenai);
profile.setCicd(request.cicd);
profile.setContainers(request.containers);
profile.setSecurity(request.security);

        profile.setProjects(request.projects);
        profile.setProblems(request.problems);
        profile.setGithub(request.github);
        profile.setAssessment(request.assessment);

        repository.save(profile);

        // Calculate Job Readiness
        int total = request.java
                + request.python
                + request.sql
                + request.javascript
                + request.git;

        int readiness = Math.round((total / 15.0f) * 100);

        String status;

        if (readiness < 40) {
            status = "Beginner";
        } else if (readiness < 70) {
            status = "Developing";
        } else {
            status = "Job Ready";
        }

        // Find weakest skill
        String nextSkill = findNextSkill(request);

        // Generate skill gaps
        List<String> skillGaps = new ArrayList<>();

        if (request.java <= 1) {
            skillGaps.add("Java");
        }

        if (request.python <= 1) {
            skillGaps.add("Python");
        }

        if (request.sql <= 1) {
            skillGaps.add("SQL");
        }

        if (request.javascript <= 1) {
            skillGaps.add("JavaScript");
        }

        if (request.git <= 1) {
            skillGaps.add("Git & GitHub");
        }

        // Generate recommendation
        String recommendation = generateRecommendation(
                nextSkill,
                readiness
        );

        // Generate personalized roadmap
        List<RoadmapStep> roadmap = generateRoadmap(nextSkill);

        return new SkillResult(
                readiness,
                status,
                nextSkill,
                skillGaps,
                recommendation,
                roadmap,
                request.career,
                request.projects,
                request.problems,
                request.github,
                request.assessment
        );
    }

    // Find the weakest skill
    private String findNextSkill(SkillRequest request) {

        int lowest = request.java;
        String skill = "Java";

        if (request.python < lowest) {
            lowest = request.python;
            skill = "Python";
        }

        if (request.sql < lowest) {
            lowest = request.sql;
            skill = "SQL";
        }

        if (request.javascript < lowest) {
            lowest = request.javascript;
            skill = "JavaScript";
        }

        if (request.git < lowest) {
            skill = "Git & GitHub";
        }

        return skill;
    }

    // Generate personalized recommendation
    private String generateRecommendation(
            String nextSkill,
            int readiness) {

        if (readiness < 40) {
            return "Focus on " + nextSkill
                    + " fundamentals and build small projects.";
        }

        if (readiness < 70) {
            return "Improve your " + nextSkill
                    + " skills through projects and practical coding.";
        }

        return "Strengthen " + nextSkill
                + " with advanced projects and real-world development.";
    }

    // Generate learning roadmap
    private List<RoadmapStep> generateRoadmap(String nextSkill) {

        List<RoadmapStep> roadmap = new ArrayList<>();

        switch (nextSkill) {

            case "Java":

                roadmap.add(new RoadmapStep(
                        1,
                        "Java Fundamentals",
                        "Variables, data types, loops, conditions and methods.",
                        "Solve 20 beginner Java problems."
                ));

                roadmap.add(new RoadmapStep(
                        2,
                        "Object-Oriented Programming",
                        "Classes, objects, inheritance, interfaces and polymorphism.",
                        "Build a simple Library Management System."
                ));

                roadmap.add(new RoadmapStep(
                        3,
                        "Collections & Exceptions",
                        "Lists, Sets, Maps, generics and exception handling.",
                        "Create a Student Management application."
                ));

                roadmap.add(new RoadmapStep(
                        4,
                        "Spring Boot",
                        "Learn controllers, services, dependency injection and REST APIs.",
                        "Build a Student REST API."
                ));

                roadmap.add(new RoadmapStep(
                        5,
                        "MySQL Integration",
                        "Connect Spring Boot with MySQL using JPA.",
                        "Create a database-backed application."
                ));

                roadmap.add(new RoadmapStep(
                        6,
                        "Git & GitHub",
                        "Repositories, commits, branches and pull requests.",
                        "Upload your project to GitHub."
                ));

                break;

            case "Python":

                roadmap.add(new RoadmapStep(
                        1,
                        "Python Fundamentals",
                        "Variables, conditions, loops, functions and modules.",
                        "Solve 20 Python coding problems."
                ));

                roadmap.add(new RoadmapStep(
                        2,
                        "Data Structures",
                        "Lists, dictionaries, sets and tuples.",
                        "Build a Contact Management application."
                ));

                roadmap.add(new RoadmapStep(
                        3,
                        "Object-Oriented Python",
                        "Classes, objects, inheritance and modules.",
                        "Build a small Python application."
                ));

                roadmap.add(new RoadmapStep(
                        4,
                        "APIs & Databases",
                        "Learn REST APIs and database connectivity.",
                        "Build a Python REST API."
                ));

                roadmap.add(new RoadmapStep(
                        5,
                        "Git & GitHub",
                        "Version control and project collaboration.",
                        "Publish your Python project on GitHub."
                ));

                break;

            case "SQL":

                roadmap.add(new RoadmapStep(
                        1,
                        "SQL Fundamentals",
                        "SELECT, INSERT, UPDATE and DELETE.",
                        "Solve 20 basic SQL queries."
                ));

                roadmap.add(new RoadmapStep(
                        2,
                        "Filtering & Aggregation",
                        "WHERE, GROUP BY, HAVING and aggregate functions.",
                        "Analyze a sample sales database."
                ));

                roadmap.add(new RoadmapStep(
                        3,
                        "SQL Joins",
                        "INNER JOIN, LEFT JOIN and relationships.",
                        "Create reports using multiple tables."
                ));

                roadmap.add(new RoadmapStep(
                        4,
                        "Database Design",
                        "Primary keys, foreign keys and normalization.",
                        "Design a small e-commerce database."
                ));

                roadmap.add(new RoadmapStep(
                        5,
                        "MySQL Project",
                        "Apply SQL knowledge in a real application.",
                        "Build a database-backed project."
                ));

                break;

            case "JavaScript":

                roadmap.add(new RoadmapStep(
                        1,
                        "JavaScript Fundamentals",
                        "Variables, functions, arrays and objects.",
                        "Build 3 small JavaScript programs."
                ));

                roadmap.add(new RoadmapStep(
                        2,
                        "DOM Manipulation",
                        "Events, forms and dynamic HTML.",
                        "Build an interactive To-Do application."
                ));

                roadmap.add(new RoadmapStep(
                        3,
                        "Async JavaScript",
                        "Promises, async/await and Fetch API.",
                        "Consume a public REST API."
                ));

                roadmap.add(new RoadmapStep(
                        4,
                        "Frontend Project",
                        "Combine HTML, CSS and JavaScript.",
                        "Build a complete dashboard."
                ));

                roadmap.add(new RoadmapStep(
                        5,
                        "Git & GitHub",
                        "Version control and collaboration.",
                        "Publish your frontend project."
                ));

                break;

            default:

                roadmap.add(new RoadmapStep(
                        1,
                        "Git Fundamentals",
                        "Repositories, commits, branches and remote repositories.",
                        "Create and publish a GitHub repository."
                ));

                roadmap.add(new RoadmapStep(
                        2,
                        "Git Branching",
                        "Branches, merging and conflict resolution.",
                        "Practice a feature branch workflow."
                ));

                roadmap.add(new RoadmapStep(
                        3,
                        "GitHub Collaboration",
                        "Pull requests, issues and project management.",
                        "Contribute to a small project."
                ));

                roadmap.add(new RoadmapStep(
                        4,
                        "Build a Real Project",
                        "Apply your technical skills to a complete project.",
                        "Create and publish a portfolio project."
                ));

                break;
        }

        return roadmap;
    }

    // Request DTO
    public static class SkillRequest {

        public String career;

        public int java;
        public int python;
        public int sql;
        public int javascript;
        public int git;
        public int dsa;
public int react;
public int linux;
public int machineLearning;
public int systemDesign;
public int statistics;
public int cloud;
public int cybersecurity;
public int networking;
public int testing;
public int apiDevelopment;
public int uiUx;
public int aiGenai;
public int cicd;
public int containers;
public int security;

        public int projects;
        public int problems;
        public int github;
        public int assessment;
    }

    // Roadmap DTO
    public record RoadmapStep(
            int step,
            String title,
            String topics,
            String practice
    ) {
    }

    // Response DTO
    public record SkillResult(
            int readiness,
            String status,
            String nextSkill,
            List<String> skillGaps,
            String recommendation,
            List<RoadmapStep> roadmap,
            String career,
            int projects,
            int problems,
            int github,
            int assessment
    ) {
    }
}