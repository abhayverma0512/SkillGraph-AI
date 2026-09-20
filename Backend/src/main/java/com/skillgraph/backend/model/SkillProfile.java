package com.skillgraph.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SkillProfile {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String career;

private int java;
private int python;
private int javascript;

@Column(name = "sql_skill")
private int sql;

private int git;

private int dsa;
private int react;
private int linux;

@Column(name = "machine_learning")
private int machineLearning;

@Column(name = "system_design")
private int systemDesign;

private int statistics;
private int cloud;
private int cybersecurity;
private int networking;
private int testing;

@Column(name = "api_development")
private int apiDevelopment;

@Column(name = "ui_ux")
private int uiUx;

@Column(name = "ai_genai")
private int aiGenai;

private int cicd;
private int containers;
private int security;

private int projects;
private int problems;
private int github;
private int assessment;

public SkillProfile() {
}

public Long getId() {
    return id;
}

public String getCareer() {
    return career;
}

public void setCareer(String career) {
    this.career = career;
}

public int getJava() {
    return java;
}

public void setJava(int java) {
    this.java = java;
}

public int getPython() {
    return python;
}

public void setPython(int python) {
    this.python = python;
}

public int getJavascript() {
    return javascript;
}

public void setJavascript(int javascript) {
    this.javascript = javascript;
}

public int getSql() {
    return sql;
}

public void setSql(int sql) {
    this.sql = sql;
}

public int getGit() {
    return git;
}

public void setGit(int git) {
    this.git = git;
}

public int getDsa() {
    return dsa;
}

public void setDsa(int dsa) {
    this.dsa = dsa;
}

public int getReact() {
    return react;
}

public void setReact(int react) {
    this.react = react;
}

public int getLinux() {
    return linux;
}

public void setLinux(int linux) {
    this.linux = linux;
}

public int getMachineLearning() {
    return machineLearning;
}

public void setMachineLearning(int machineLearning) {
    this.machineLearning = machineLearning;
}

public int getSystemDesign() {
    return systemDesign;
}

public void setSystemDesign(int systemDesign) {
    this.systemDesign = systemDesign;
}

public int getStatistics() {
    return statistics;
}

public void setStatistics(int statistics) {
    this.statistics = statistics;
}

public int getCloud() {
    return cloud;
}

public void setCloud(int cloud) {
    this.cloud = cloud;
}

public int getCybersecurity() {
    return cybersecurity;
}

public void setCybersecurity(int cybersecurity) {
    this.cybersecurity = cybersecurity;
}

public int getNetworking() {
    return networking;
}

public void setNetworking(int networking) {
    this.networking = networking;
}

public int getTesting() {
    return testing;
}

public void setTesting(int testing) {
    this.testing = testing;
}

public int getApiDevelopment() {
    return apiDevelopment;
}

public void setApiDevelopment(int apiDevelopment) {
    this.apiDevelopment = apiDevelopment;
}

public int getUiUx() {
    return uiUx;
}

public void setUiUx(int uiUx) {
    this.uiUx = uiUx;
}

public int getAiGenai() {
    return aiGenai;
}

public void setAiGenai(int aiGenai) {
    this.aiGenai = aiGenai;
}

public int getCicd() {
    return cicd;
}

public void setCicd(int cicd) {
    this.cicd = cicd;
}

public int getContainers() {
    return containers;
}

public void setContainers(int containers) {
    this.containers = containers;
}

public int getSecurity() {
    return security;
}

public void setSecurity(int security) {
    this.security = security;
}

public int getProjects() {
    return projects;
}

public void setProjects(int projects) {
    this.projects = projects;
}

public int getProblems() {
    return problems;
}

public void setProblems(int problems) {
    this.problems = problems;
}

public int getGithub() {
    return github;
}

public void setGithub(int github) {
    this.github = github;
}

public int getAssessment() {
    return assessment;
}

public void setAssessment(int assessment) {
    this.assessment = assessment;
}

}