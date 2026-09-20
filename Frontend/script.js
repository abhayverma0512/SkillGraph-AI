const API_BASE_URL = "http://localhost:8080/api";

/* =========================================================
BASIC HELPERS
========================================================= */

function getValue(id) {
const element = document.getElementById(id);

if (!element) {
return 0;
}

const value = Number(element.value);

return Number.isFinite(value) ? value : 0;
}

function setLoading(button, loadingText) {
if (!button) {
return;
}

if (!button.dataset.originalText) {
button.dataset.originalText = button.innerText;
}

button.disabled = true;
button.innerText = loadingText;
}

function resetButton(button) {
if (!button) {
return;
}

button.disabled = false;

if (button.dataset.originalText) {
button.innerText = button.dataset.originalText;
}
}

function showLoading(container, message = "Analyzing your profile...") {
if (!container) {
return;
}

container.innerHTML = `<div class="loading-state"> <h3>AI Career Analysis</h3> <p>${message}</p> </div>`;
}

function showError(container, message) {
if (!container) {
return;
}

container.innerHTML = `<div class="error-state"> <h3>Something went wrong</h3> <p>${message}</p> <p>Please make sure the Spring Boot backend is running on port 8080.</p> </div>`;
}

function escapeHtml(value) {
return String(value ?? "")
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
.replace(/>/g, "&gt;")
.replace(/"/g, "&quot;")
.replace(/'/g, "&#39;");
}

function clamp(value, min, max) {
return Math.max(min, Math.min(max, value));
}

/* =========================================================
ASSESSMENT
========================================================= */

function startAssessment() {
const section = document.getElementById("skill-assessment");

if (section) {
section.scrollIntoView({
behavior: "smooth",
block: "start"
});
}
}

/* =========================================================
CAREER INFORMATION
========================================================= */

const CAREER_PROFILES = {

"software-engineer": {
name: "Software Engineer",
category: "Software & Development",
requiredSkills: {
java: 25,
python: 15,
javascript: 15,
sql: 15,
git: 20,
dsa: 10
},
prioritySkills: ["java", "git", "javascript", "sql"],
fallbackSkill: "java"
},

"software-developer": {
name: "Software Developer",
category: "Software & Development",
requiredSkills: {
java: 25,
python: 15,
javascript: 15,
sql: 15,
git: 20,
dsa: 10
},
prioritySkills: ["java", "git", "javascript", "sql"],
fallbackSkill: "java"
},

"application-developer": {
name: "Application Developer",
category: "Software & Development",
requiredSkills: {
java: 25,
python: 15,
javascript: 15,
sql: 15,
git: 20,
dsa: 10
},
prioritySkills: ["java", "javascript", "sql", "git"],
fallbackSkill: "java"
},

"backend": {
name: "Backend Developer",
category: "Software & Development",
requiredSkills: {
java: 30,
python: 15,
sql: 20,
git: 20,
javascript: 5,
dsa: 10
},
prioritySkills: ["java", "sql", "git", "python"],
fallbackSkill: "java"
},

"frontend": {
name: "Frontend Developer",
category: "Software & Development",
requiredSkills: {
javascript: 40,
git: 20,
sql: 5,
java: 5,
python: 10,
react: 20
},
prioritySkills: ["javascript", "git", "react"],
fallbackSkill: "javascript"
},

"fullstack": {
name: "Full Stack Developer",
category: "Software & Development",
requiredSkills: {
javascript: 25,
java: 20,
python: 10,
sql: 20,
git: 20,
react: 5
},
prioritySkills: ["javascript", "java", "sql", "git"],
fallbackSkill: "javascript"
},

"api-developer": {
name: "API Developer",
category: "Software & Development",
requiredSkills: {
java: 25,
python: 20,
sql: 20,
git: 20,
javascript: 5,
dsa: 10
},
prioritySkills: ["java", "python", "sql", "git"],
fallbackSkill: "java"
},

"web-developer": {
name: "Web Developer",
category: "Software & Development",
requiredSkills: {
javascript: 35,
git: 20,
java: 10,
python: 10,
sql: 15,
react: 10
},
prioritySkills: ["javascript", "git", "sql"],
fallbackSkill: "javascript"
},

"mobile-app-developer": {
name: "Mobile App Developer",
category: "Software & Development",
requiredSkills: {
java: 25,
javascript: 20,
python: 5,
sql: 15,
git: 20,
reactnative: 15
},
prioritySkills: ["java", "javascript", "git", "sql"],
fallbackSkill: "java"
},

"android-developer": {
name: "Android Developer",
category: "Mobile Development",
requiredSkills: {
java: 40,
kotlin: 20,
sql: 10,
git: 20,
python: 5,
javascript: 5
},
prioritySkills: ["java", "git", "sql"],
fallbackSkill: "java"
},

"ios-developer": {
name: "iOS Developer",
category: "Mobile Development",
requiredSkills: {
swift: 35,
javascript: 20,
sql: 10,
git: 20,
python: 10,
java: 5
},
prioritySkills: ["javascript", "git", "sql"],
fallbackSkill: "javascript"
},

"game-developer": {
name: "Game Developer",
category: "Software & Development",
requiredSkills: {
java: 20,
python: 15,
javascript: 20,
git: 20,
dsa: 25
},
prioritySkills: ["dsa", "java", "javascript", "git"],
fallbackSkill: "java"
},

"devops-engineer": {
name: "DevOps Engineer",
category: "Cloud & DevOps",
requiredSkills: {
python: 20,
java: 15,
sql: 10,
javascript: 5,
git: 30,
linux: 20
},
prioritySkills: ["git", "python", "java"],
fallbackSkill: "git"
},

"cloud-engineer": {
name: "Cloud Engineer",
category: "Cloud & DevOps",
requiredSkills: {
python: 20,
java: 10,
sql: 10,
git: 30,
javascript: 5,
linux: 25
},
prioritySkills: ["git", "python", "linux"],
fallbackSkill: "git"
},

"cloud-architect": {
name: "Cloud Architect",
category: "Cloud & DevOps",
requiredSkills: {
java: 15,
python: 15,
sql: 10,
git: 20,
systemdesign: 40
},
prioritySkills: ["systemdesign", "git", "python"],
fallbackSkill: "systemdesign"
},

"site-reliability-engineer": {
name: "Site Reliability Engineer",
category: "Cloud & DevOps",
requiredSkills: {
python: 20,
java: 15,
sql: 10,
git: 25,
linux: 30
},
prioritySkills: ["linux", "git", "python"],
fallbackSkill: "git"
},

"platform-engineer": {
name: "Platform Engineer",
category: "Cloud & DevOps",
requiredSkills: {
python: 20,
java: 15,
sql: 10,
git: 25,
linux: 30
},
prioritySkills: ["git", "python", "linux"],
fallbackSkill: "git"
},

"infrastructure-engineer": {
name: "Infrastructure Engineer",
category: "Networking & Infrastructure",
requiredSkills: {
python: 15,
java: 10,
sql: 10,
git: 20,
linux: 45
},
prioritySkills: ["linux", "git", "python"],
fallbackSkill: "git"
},

"kubernetes-engineer": {
name: "Kubernetes Engineer",
category: "Cloud & DevOps",
requiredSkills: {
python: 15,
java: 10,
sql: 5,
git: 25,
linux: 45
},
prioritySkills: ["linux", "git", "python"],
fallbackSkill: "git"
},

"cloud-security-engineer": {
name: "Cloud Security Engineer",
category: "Cybersecurity",
requiredSkills: {
python: 20,
java: 10,
sql: 10,
git: 20,
linux: 40
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"machine-learning-engineer": {
name: "Machine Learning Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 40,
sql: 15,
java: 5,
javascript: 5,
git: 20,
machineLearning: 15
},
prioritySkills: ["python", "machineLearning", "sql", "git"],
fallbackSkill: "python"
},

"ai-engineer": {
name: "AI Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 40,
sql: 10,
java: 5,
javascript: 10,
git: 20,
machineLearning: 15
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"ai-developer": {
name: "AI Developer",
category: "AI & Machine Learning",
requiredSkills: {
python: 35,
javascript: 15,
sql: 10,
java: 5,
git: 20,
machineLearning: 15
},
prioritySkills: ["python", "machineLearning", "javascript"],
fallbackSkill: "python"
},

"deep-learning-engineer": {
name: "Deep Learning Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 45,
sql: 10,
git: 20,
machineLearning: 25
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"nlp-engineer": {
name: "NLP Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 45,
sql: 10,
git: 20,
machineLearning: 25
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"computer-vision-engineer": {
name: "Computer Vision Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 45,
sql: 5,
git: 20,
machineLearning: 30
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"generative-ai-engineer": {
name: "Generative AI Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 40,
javascript: 10,
sql: 10,
git: 20,
machineLearning: 20
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"mlops-engineer": {
name: "MLOps Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 30,
sql: 10,
git: 25,
linux: 20,
L: 15
},
prioritySkills: ["python", "git", "machineLearning"],
fallbackSkill: "python"
},

"ai-research-engineer": {
name: "AI Research Engineer",
category: "AI & Machine Learning",
requiredSkills: {
python: 45,
sql: 5,
git: 15,
L: 35
},
prioritySkills: ["python", "machineLearning", "git"],
fallbackSkill: "python"
},

"data-analyst": {
name: "Data Analyst",
category: "Data & Analytics",
requiredSkills: {
python: 25,
sql: 35,
javascript: 5,
java: 5,
git: 15,
statistics: 15
},
prioritySkills: ["sql", "python", "statistics"],
fallbackSkill: "sql"
},

"data-scientist": {
name: "Data Scientist",
category: "Data & Analytics",
requiredSkills: {
python: 35,
sql: 20,
git: 15,
L: 20,
statistics: 10
},
prioritySkills: ["python", "machineLearning", "sql"],
fallbackSkill: "python"
},

"data-engineer": {
name: "Data Engineer",
category: "Data & Analytics",
requiredSkills: {
python: 25,
sql: 30,
java: 15,
git: 20,
linux: 10
},
prioritySkills: ["sql", "python", "git"],
fallbackSkill: "sql"
},

"bi-developer": {
name: "BI Developer",
category: "Data & Analytics",
requiredSkills: {
sql: 40,
python: 15,
git: 15,
javascript: 10,
statistics: 20
},
prioritySkills: ["sql", "statistics", "python"],
fallbackSkill: "sql"
},

"bi-analyst": {
name: "BI Analyst",
category: "Data & Analytics",
requiredSkills: {
sql: 40,
python: 15,
git: 10,
javascript: 10,
statistics: 25
},
prioritySkills: ["sql", "statistics", "python"],
fallbackSkill: "sql"
},

"analytics-engineer": {
name: "Analytics Engineer",
category: "Data & Analytics",
requiredSkills: {
sql: 40,
python: 20,
git: 20,
statistics: 20
},
prioritySkills: ["sql", "python", "git"],
fallbackSkill: "sql"
},

"database-developer": {
name: "Database Developer",
category: "Data & Analytics",
requiredSkills: {
sql: 50,
java: 15,
python: 15,
git: 20
},
prioritySkills: ["sql", "java", "python"],
fallbackSkill: "sql"
},

"database-administrator": {
name: "Database Administrator",
category: "Data & Analytics",
requiredSkills: {
sql: 50,
python: 15,
java: 10,
git: 15,
linux: 10
},
prioritySkills: ["sql", "python", "linux"],
fallbackSkill: "sql"
},

"cybersecurity-analyst": {
name: "Cybersecurity Analyst",
category: "Cybersecurity",
requiredSkills: {
python: 25,
sql: 15,
java: 5,
javascript: 5,
git: 15,
linux: 35
},
prioritySkills: ["linux", "python", "sql"],
fallbackSkill: "python"
},

"security-engineer": {
name: "Security Engineer",
category: "Cybersecurity",
requiredSkills: {
python: 25,
java: 15,
sql: 10,
git: 20,
linux: 30
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"security-analyst": {
name: "Security Analyst",
category: "Cybersecurity",
requiredSkills: {
python: 25,
sql: 15,
git: 15,
linux: 45
},
prioritySkills: ["linux", "python", "sql"],
fallbackSkill: "linux"
},

"application-security-engineer": {
name: "Application Security Engineer",
category: "Cybersecurity",
requiredSkills: {
java: 20,
python: 20,
javascript: 15,
sql: 15,
git: 15,
linux: 15
},
prioritySkills: ["java", "python", "javascript", "sql"],
fallbackSkill: "java"
},

"soc-analyst": {
name: "SOC Analyst",
category: "Cybersecurity",
requiredSkills: {
python: 20,
sql: 10,
git: 15,
linux: 55
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"penetration-tester": {
name: "Penetration Tester",
category: "Cybersecurity",
requiredSkills: {
python: 30,
javascript: 15,
sql: 15,
git: 15,
linux: 25
},
prioritySkills: ["python", "linux", "javascript", "sql"],
fallbackSkill: "python"
},

"ethical-hacker": {
name: "Ethical Hacker",
category: "Cybersecurity",
requiredSkills: {
python: 30,
javascript: 15,
sql: 15,
git: 10,
linux: 30
},
prioritySkills: ["python", "linux", "sql"],
fallbackSkill: "python"
},

"security-architect": {
name: "Security Architect",
category: "Cybersecurity",
requiredSkills: {
java: 15,
python: 15,
sql: 10,
git: 15,
linux: 20,
systemdesign: 25
},
prioritySkills: ["systemdesign", "linux", "python"],
fallbackSkill: "systemdesign"
},

"digital-forensics-analyst": {
name: "Digital Forensics Analyst",
category: "Cybersecurity",
requiredSkills: {
python: 25,
sql: 10,
git: 10,
linux: 55
},
prioritySkills: ["linux", "python", "sql"],
fallbackSkill: "linux"
},

"qa-engineer": {
name: "QA Engineer",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 25,
python: 20,
javascript: 20,
sql: 15,
git: 20
},
prioritySkills: ["java", "python", "javascript", "git"],
fallbackSkill: "java"
},

"qa-analyst": {
name: "QA Analyst",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 15,
python: 20,
javascript: 20,
sql: 20,
git: 25
},
prioritySkills: ["python", "javascript", "sql"],
fallbackSkill: "python"
},

"test-engineer": {
name: "Test Engineer",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 25,
python: 20,
javascript: 20,
sql: 15,
git: 20
},
prioritySkills: ["java", "python", "javascript"],
fallbackSkill: "java"
},

"automation-test-engineer": {
name: "Automation Test Engineer",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 30,
python: 25,
javascript: 20,
sql: 10,
git: 15
},
prioritySkills: ["java", "python", "javascript"],
fallbackSkill: "java"
},

"sdet": {
name: "SDET",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 30,
python: 25,
javascript: 20,
sql: 10,
git: 15
},
prioritySkills: ["java", "python", "javascript", "git"],
fallbackSkill: "java"
},

"performance-test-engineer": {
name: "Performance Test Engineer",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 25,
python: 25,
sql: 15,
javascript: 10,
git: 25
},
prioritySkills: ["java", "python", "git"],
fallbackSkill: "java"
},

"security-test-engineer": {
name: "Security Test Engineer",
category: "Testing & Quality Assurance",
requiredSkills: {
java: 20,
python: 30,
javascript: 15,
sql: 15,
git: 20
},
prioritySkills: ["python", "java", "sql"],
fallbackSkill: "python"
},

"software-architect": {
name: "Software Architect",
category: "Architecture & System Design",
requiredSkills: {
java: 20,
python: 10,
javascript: 10,
sql: 15,
git: 15,
systemdesign: 30
},
prioritySkills: ["systemdesign", "java", "sql"],
fallbackSkill: "systemdesign"
},

"solution-architect": {
name: "Solution Architect",
category: "Architecture & System Design",
requiredSkills: {
java: 15,
python: 15,
sql: 15,
git: 15,
systemdesign: 40
},
prioritySkills: ["systemdesign", "java", "python"],
fallbackSkill: "systemdesign"
},

"system-architect": {
name: "System Architect",
category: "Architecture & System Design",
requiredSkills: {
java: 15,
python: 15,
sql: 15,
git: 15,
systemdesign: 40
},
prioritySkills: ["systemdesign", "java", "sql"],
fallbackSkill: "systemdesign"
},

"enterprise-architect": {
name: "Enterprise Architect",
category: "Architecture & System Design",
requiredSkills: {
java: 15,
python: 10,
sql: 15,
git: 10,
systemdesign: 50
},
prioritySkills: ["systemdesign", "java", "sql"],
fallbackSkill: "systemdesign"
},

"technical-architect": {
name: "Technical Architect",
category: "Architecture & System Design",
requiredSkills: {
java: 20,
python: 10,
javascript: 10,
sql: 15,
git: 15,
systemdesign: 30
},
prioritySkills: ["systemdesign", "java", "git"],
fallbackSkill: "systemdesign"
},

"system-design-engineer": {
name: "System Design Engineer",
category: "Architecture & System Design",
requiredSkills: {
java: 20,
python: 15,
sql: 15,
git: 15,
systemdesign: 35
},
prioritySkills: ["systemdesign", "java", "sql"],
fallbackSkill: "systemdesign"
},

"network-engineer": {
name: "Network Engineer",
category: "Networking & Infrastructure",
requiredSkills: {
python: 20,
java: 5,
sql: 5,
javascript: 5,
git: 15,
linux: 50
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"network-administrator": {
name: "Network Administrator",
category: "Networking & Infrastructure",
requiredSkills: {
python: 15,
java: 5,
sql: 5,
git: 15,
linux: 60
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"systems-administrator": {
name: "Systems Administrator",
category: "Networking & Infrastructure",
requiredSkills: {
python: 20,
java: 5,
sql: 10,
git: 15,
linux: 50
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"systems-engineer": {
name: "Systems Engineer",
category: "Networking & Infrastructure",
requiredSkills: {
python: 20,
java: 15,
sql: 10,
git: 20,
linux: 35
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"network-security-engineer": {
name: "Network Security Engineer",
category: "Networking & Infrastructure",
requiredSkills: {
python: 25,
sql: 10,
git: 15,
linux: 50
},
prioritySkills: ["linux", "python", "git"],
fallbackSkill: "linux"
},

"embedded-systems-developer": {
name: "Embedded Systems Developer",
category: "Specialized Technology",
requiredSkills: {
java: 15,
python: 25,
javascript: 5,
sql: 5,
git: 20,
dsa: 30
},
prioritySkills: ["python", "dsa", "git"],
fallbackSkill: "python"
},

"firmware-engineer": {
name: "Firmware Engineer",
category: "Specialized Technology",
requiredSkills: {
java: 15,
python: 25,
javascript: 5,
sql: 5,
git: 20,
dsa: 30
},
prioritySkills: ["python", "dsa", "git"],
fallbackSkill: "python"
},

"iot-developer": {
name: "IoT Developer",
category: "Specialized Technology",
requiredSkills: {
java: 25,
python: 25,
javascript: 10,
sql: 10,
git: 20,
dsa: 10
},
prioritySkills: ["python", "java", "git"],
fallbackSkill: "python"
},

"robotics-engineer": {
name: "Robotics Engineer",
category: "Specialized Technology",
requiredSkills: {
java: 20,
python: 30,
javascript: 5,
sql: 5,
git: 15,
dsa: 25
},
prioritySkills: ["python", "dsa", "git"],
fallbackSkill: "python"
},

"blockchain-developer": {
name: "Blockchain Developer",
category: "Specialized Technology",
requiredSkills: {
java: 20,
python: 20,
javascript: 25,
sql: 10,
git: 20,
dsa: 5
},
prioritySkills: ["javascript", "python", "git"],
fallbackSkill: "javascript"
},

"web3-developer": {
name: "Web3 Developer",
category: "Specialized Technology",
requiredSkills: {
javascript: 35,
python: 20,
java: 5,
sql: 10,
git: 25,
dsa: 5
},
prioritySkills: ["javascript", "git", "python"],
fallbackSkill: "javascript"
},

"ui-developer": {
name: "UI Developer",
category: "UI/UX",
requiredSkills: {
javascript: 35,
java: 5,
python: 5,
sql: 5,
git: 20,
react: 30
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"ux-engineer": {
name: "UX Engineer",
category: "UI/UX",
requiredSkills: {
javascript: 30,
java: 5,
python: 5,
sql: 5,
git: 20,
react: 35
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"ux-ui-developer": {
name: "UX/UI Developer",
category: "UI/UX",
requiredSkills: {
javascript: 35,
java: 5,
python: 5,
sql: 5,
git: 20,
react: 30
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"design-technologist": {
name: "Design Technologist",
category: "UI/UX",
requiredSkills: {
javascript: 30,
python: 10,
sql: 5,
git: 20,
react: 35
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"technical-ui-engineer": {
name: "Technical UI Engineer",
category: "UI/UX",
requiredSkills: {
javascript: 35,
java: 5,
python: 5,
sql: 5,
git: 20,
react: 30
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"flutter-developer": {
name: "Flutter Developer",
category: "Mobile Development",
requiredSkills: {
javascript: 25,
java: 15,
python: 10,
sql: 10,
git: 20,
react: 20
},
prioritySkills: ["javascript", "git", "react"],
fallbackSkill: "javascript"
},

"react-native-developer": {
name: "React Native Developer",
category: "Mobile Development",
requiredSkills: {
javascript: 35,
java: 10,
python: 5,
sql: 10,
git: 20,
react: 20
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"cross-platform-mobile-developer": {
name: "Cross Platform Mobile Developer",
category: "Mobile Development",
requiredSkills: {
javascript: 30,
java: 10,
python: 10,
sql: 10,
git: 20,
react: 20
},
prioritySkills: ["javascript", "react", "git"],
fallbackSkill: "javascript"
},

"technical-product-manager": {
name: "Technical Product Manager",
category: "Technical Business & Product",
requiredSkills: {
java: 10,
python: 10,
javascript: 15,
sql: 20,
git: 15,
systemdesign: 30
},
prioritySkills: ["systemdesign", "sql", "javascript"],
fallbackSkill: "systemdesign"
},

"technical-program-manager": {
name: "Technical Program Manager",
category: "Technical Business & Product",
requiredSkills: {
java: 15,
python: 10,
javascript: 10,
sql: 15,
git: 20,
systemdesign: 30
},
prioritySkills: ["systemdesign", "git", "java"],
fallbackSkill: "systemdesign"
},

"solutions-engineer": {
name: "Solutions Engineer",
category: "Technical Business & Product",
requiredSkills: {
java: 20,
python: 15,
javascript: 10,
sql: 15,
git: 20,
systemdesign: 20
},
prioritySkills: ["java", "systemdesign", "git"],
fallbackSkill: "java"
},

"sales-engineer": {
name: "Sales Engineer",
category: "Technical Business & Product",
requiredSkills: {
java: 15,
python: 15,
javascript: 10,
sql: 10,
git: 15,
systemdesign: 35
},
prioritySkills: ["systemdesign", "java", "python"],
fallbackSkill: "systemdesign"
},

"technical-consultant": {
name: "Technical Consultant",
category: "Technical Business & Product",
requiredSkills: {
java: 20,
python: 15,
javascript: 10,
sql: 15,
git: 20,
systemdesign: 20
},
prioritySkills: ["java", "systemdesign", "sql"],
fallbackSkill: "java"
},

"developer-advocate": {
name: "Developer Advocate",
category: "Technical Business & Product",
requiredSkills: {
java: 20,
python: 15,
javascript: 20,
sql: 5,
git: 25,
dsa: 15
},
prioritySkills: ["git", "javascript", "java"],
fallbackSkill: "javascript"
},

"technical-support-engineer": {
name: "Technical Support Engineer",
category: "Technical Business & Product",
requiredSkills: {
java: 20,
python: 20,
javascript: 10,
sql: 15,
git: 20,
linux: 15
},
prioritySkills: ["python", "java", "sql"],
fallbackSkill: "python"
}

};

/* =========================================================
CORE SKILLS
========================================================= */

const CORE_SKILL_KEYS = [
"java",
"python",
"sql",
"javascript",
"git"
];

const BACKEND_SKILL_KEYS = [
"dsa",
"react",
"linux",
"machineLearning",
"systemDesign",
"statistics",
"cloud",
"cybersecurity",
"networking",
"testing",
"apiDevelopment",
"uiUx",
"aiGenai",
"cicd",
"containers",
"security"
];

const SKILL_META = {
dsa: {
label: "Data Structures & Algorithms",
description: "Problem solving, algorithms and coding interview fundamentals."
},

react: {
label: "React",
description: "Component-based frontend development using React."
},

linux: {
label: "Linux",
description: "Linux commands, administration and system fundamentals."
},

machineLearning: {
label: "Machine Learning",
description: "ML algorithms, model training and evaluation."
},

systemDesign: {
label: "System Design",
description: "Designing scalable and reliable software systems."
},

statistics: {
label: "Statistics",
description: "Probability, statistics and analytical reasoning."
},

cloud: {
label: "Cloud Computing",
description: "Cloud infrastructure, deployment and services."
},

cybersecurity: {
label: "Cybersecurity",
description: "Security fundamentals, threats and defensive practices."
},

networking: {
label: "Networking",
description: "Networking protocols, infrastructure and troubleshooting."
},

testing: {
label: "Software Testing",
description: "Manual and automated testing fundamentals."
},

apiDevelopment: {
label: "API Development",
description: "REST APIs, endpoints, integration and backend communication."
},

uiUx: {
label: "UI/UX",
description: "User interface and user experience fundamentals."
},

aiGenai: {
label: "AI / Generative AI",
description: "Modern AI and Generative AI concepts and applications."
},

cicd: {
label: "CI/CD",
description: "Continuous integration and continuous deployment."
},

containers: {
label: "Containers",
description: "Containerization using modern container technologies."
},

security: {
label: "Security",
description: "Application and infrastructure security fundamentals."
},

reactnative: {
label: "React Native",
description: "Cross-platform mobile application development."
},

kotlin: {
label: "Kotlin",
description: "Modern JVM and Android application development."
},

swift: {
label: "Swift",
description: "Native iOS application development."
}
};

function getSkillInputId(skillKey) {
return `career-skill-${skillKey}`;
}

function getSkillInputValue(skillKey) {
const element = document.getElementById(
getSkillInputId(skillKey)
);

if (!element) {
return 0;
}

return clamp(Number(element.value) || 0, 0, 3);
}

function getCareerProfile(career) {
return CAREER_PROFILES[career] ||
CAREER_PROFILES["software-engineer"];
}

function getSkillDisplayName(skill) {
const names = {
java: "Java",
python: "Python",
sql: "SQL",
javascript: "JavaScript",
git: "Git & GitHub",
dsa: "Data Structures & Algorithms",
react: "React",
linux: "Linux",
machineLearning: "Machine Learning",
systemDesign: "System Design",
statistics: "Statistics",
cloud: "Cloud Computing",
cybersecurity: "Cybersecurity",
networking: "Networking",
testing: "Software Testing",
apiDevelopment: "API Development",
uiUx: "UI/UX",
aiGenai: "AI / Generative AI",
cicd: "CI/CD",
containers: "Containers",
security: "Security",
reactnative: "React Native",
kotlin: "Kotlin",
swift: "Swift"
};

return names[skill] || skill;

}

const ROLE_ASSESSMENT_SKILLS = {
"software-engineer":["dsa","testing","apiDevelopment","systemDesign"],
"software-developer":["dsa","testing","apiDevelopment"],
"application-developer":["dsa","testing","apiDevelopment"],
"backend":["dsa","apiDevelopment","testing","systemDesign"],
"frontend":["react","uiUx","testing"],
"fullstack":["react","apiDevelopment","systemDesign","testing"],
"api-developer":["dsa","apiDevelopment","testing"],
"web-developer":["react","uiUx","apiDevelopment","testing"],
"mobile-app-developer":["reactnative","testing"],
"android-developer":["kotlin","testing"],
"ios-developer":["swift","testing"],
"game-developer":["dsa","testing"],
"devops-engineer":["linux","cloud","cicd","containers"],
"cloud-engineer":["linux","cloud","cicd","containers"],
"cloud-architect":["cloud","systemDesign","security"],
"site-reliability-engineer":["linux","cloud","cicd","containers"],
"platform-engineer":["linux","cloud","cicd","containers"],
"infrastructure-engineer":["linux","cloud","networking"],
"kubernetes-engineer":["linux","cloud","containers","cicd"],
"cloud-security-engineer":["cloud","linux","cybersecurity","security"],
"machine-learning-engineer":["machineLearning","statistics","cloud"],
"ai-engineer":["machineLearning","aiGenai","statistics"],
"ai-developer":["machineLearning","aiGenai","apiDevelopment"],
"deep-learning-engineer":["machineLearning","statistics","aiGenai"],
"nlp-engineer":["machineLearning","statistics","aiGenai"],
"computer-vision-engineer":["machineLearning","statistics","aiGenai"],
"generative-ai-engineer":["machineLearning","aiGenai","apiDevelopment"],
"mlops-engineer":["machineLearning","cloud","cicd","containers"],
"ai-research-engineer":["machineLearning","statistics","aiGenai"],
"data-analyst":["statistics","machineLearning"],
"data-scientist":["machineLearning","statistics","cloud"],
"data-engineer":["cloud","linux","apiDevelopment"],
"bi-developer":["statistics","uiUx"],
"bi-analyst":["statistics","uiUx"],
"analytics-engineer":["statistics","cloud"],
"database-developer":["apiDevelopment","testing"],
"database-administrator":["linux","cloud","security"],
"cybersecurity-analyst":["cybersecurity","linux","networking","security"],
"security-engineer":["cybersecurity","linux","networking","security"],
"security-analyst":["cybersecurity","linux","networking","security"],
"application-security-engineer":["cybersecurity","security","testing"],
"soc-analyst":["cybersecurity","linux","networking","security"],
"penetration-tester":["cybersecurity","linux","networking","security"],
"ethical-hacker":["cybersecurity","linux","networking","security"],
"security-architect":["cybersecurity","systemDesign","networking","security"],
"digital-forensics-analyst":["cybersecurity","linux","networking","security"],
"qa-engineer":["testing","dsa"],
"qa-analyst":["testing","apiDevelopment"],
"test-engineer":["testing","apiDevelopment"],
"automation-test-engineer":["testing","apiDevelopment","dsa"],
"sdet":["testing","apiDevelopment","dsa"],
"performance-test-engineer":["testing","systemDesign"],
"security-test-engineer":["testing","cybersecurity","security"],
"software-architect":["systemDesign","apiDevelopment","security"],
"solution-architect":["systemDesign","cloud","security"],
"system-architect":["systemDesign","cloud","security"],
"enterprise-architect":["systemDesign","cloud","security"],
"technical-architect":["systemDesign","apiDevelopment","cloud"],
"system-design-engineer":["systemDesign","apiDevelopment","cloud"],
"network-engineer":["networking","linux","security"],
"network-administrator":["networking","linux","security"],
"systems-administrator":["linux","networking","security"],
"systems-engineer":["linux","networking","cloud"],
"network-security-engineer":["networking","cybersecurity","security","linux"],
"embedded-systems-developer":["testing","security"],
"firmware-engineer":["testing","security"],
"iot-developer":["networking","security","apiDevelopment"],
"robotics-engineer":["dsa","testing"],
"blockchain-developer":["security","apiDevelopment","testing"],
"web3-developer":["security","apiDevelopment","testing"],
"ui-developer":["uiUx","react","testing"],
"ux-engineer":["uiUx","react"],
"ux-ui-developer":["uiUx","react"],
"design-technologist":["uiUx","react"],
"technical-ui-engineer":["uiUx","react","testing"],
"flutter-developer":["testing","uiUx"],
"react-native-developer":["reactnative","uiUx","testing"],
"cross-platform-mobile-developer":["reactnative","uiUx","testing"],
"technical-product-manager":["systemDesign","apiDevelopment","uiUx"],
"technical-program-manager":["systemDesign","testing","cloud"],
"solutions-engineer":["apiDevelopment","cloud","systemDesign"],
"sales-engineer":["apiDevelopment","cloud"],
"technical-consultant":["apiDevelopment","systemDesign","cloud"],
"developer-advocate":["apiDevelopment","uiUx","testing"],
"technical-support-engineer":["linux","networking","testing"]
};

const ROLE_EXTRA_WEIGHT = 20;

function getCareerWeights(career) {

const profile = getCareerProfile(career);

if (!profile || !profile.requiredSkills) {
return {};
}

const baseSkills = profile.requiredSkills;
const extras = ROLE_ASSESSMENT_SKILLS[career] || [];

const weights = {};

const baseTotal = Object.values(baseSkills)
.reduce((sum, value) => sum + value, 0);

if (extras.length === 0) {

Object.entries(baseSkills).forEach(
([skill, weight]) => {
weights[skill] = weight;
}
);

return weights;
}

const baseScale = 80 / baseTotal;

Object.entries(baseSkills).forEach(
([skill, weight]) => {
weights[skill] = weight * baseScale;
}
);

const extraWeight =
ROLE_EXTRA_WEIGHT / extras.length;

extras.forEach(skill => {

if (!Object.prototype.hasOwnProperty.call(weights, skill)) {
weights[skill] = extraWeight;
}

});

return weights;
}

function getCareerSkillKeys(career) {

const profile = getCareerProfile(career);

if (!profile || !profile.requiredSkills) {
return [];
}

const baseSkills = Object.keys(profile.requiredSkills);
const extraSkills = ROLE_ASSESSMENT_SKILLS[career] || [];

return [...new Set([
...baseSkills,
...extraSkills
])];
}
function renderCareerSpecificSkills() {

const container = document.getElementById(
"career-specific-skills"
);

if (!container) {
return;
}

const careerSelect = document.getElementById("career");

if (!careerSelect) {
return;
}

const career = careerSelect.value;

const profile = getCareerProfile(career);

if (!profile) {
container.innerHTML = "";
return;
}

const skillKeys = getCareerSkillKeys(career);

const extraSkills = skillKeys.filter(
skill => !CORE_SKILL_KEYS.includes(skill)
);

if (extraSkills.length === 0) {
container.innerHTML = "";
return;
}

let html = `
<div class="assessment-section career-specific-assessment">
<div class="section-heading">
<h3>Career-Specific Skills</h3>
<p>
These skills are especially important for
${escapeHtml(profile.name)}.
Rate yourself from 0 to 3.
</p>
</div>

    <div class="skills-grid">

`;

extraSkills.forEach(skill => {

const meta = SKILL_META[skill] || {
    label: getSkillDisplayName(skill),
    description: `Assess your current ${getSkillDisplayName(skill)} skill level.`
};

html += `
    <div class="skill-card">
        <label for="${getSkillInputId(skill)}">
            ${escapeHtml(meta.label)}
        </label>

        <p>${escapeHtml(meta.description)}</p>

        <select
            id="${getSkillInputId(skill)}"
            class="career-skill-input"
            data-skill="${escapeHtml(skill)}"
        >
            <option value="0">0 - Beginner</option>
            <option value="1">1 - Basic</option>
            <option value="2">2 - Intermediate</option>
            <option value="3">3 - Advanced</option>
        </select>
    </div>
`;

});

html += `</div> </div>`;

container.innerHTML = html;
}

function getCoreSkills() {

const skills = {};

CORE_SKILL_KEYS.forEach(skill => {
skills[skill] = getValue(skill);
});

return skills;
}

function getCareerSpecificSkillValues(career) {

const values = {};

const skillKeys = getCareerSkillKeys(career);

skillKeys.forEach(skill => {

if (CORE_SKILL_KEYS.includes(skill)) {
    return;
}

values[skill] = getSkillInputValue(skill);

});

return values;
}

function getAllAssessedSkills(career) {

const skills = {
...getCoreSkills(),
...getCareerSpecificSkillValues(career)
};

return skills;
}

function getDerivedSkillValue(skill, skills) {

if (
Object.prototype.hasOwnProperty.call(
skills,
skill
)
) {
return skills[skill];
}

switch (skill) {

case "dsa":
    return skills.java || skills.python || 0;

case "react":
    return skills.javascript || 0;

case "reactnative":
    return skills.react || skills.javascript || 0;

case "kotlin":
    return skills.java || 0;

case "swift":
    return skills.javascript || 0;

case "linux":
    return 0;

case "machineLearning":
    return skills.python || 0;

case "systemdesign":
    return skills.java || skills.python || 0;

case "statistics":
    return skills.python || 0;

case "cloud":
    return 0;

case "cybersecurity":
    return 0;

case "networking":
    return 0;

case "testing":
    return skills.java ||
        skills.python ||
        skills.javascript ||
        0;

case "apidevelopment":
    return skills.java ||
        skills.python ||
        skills.javascript ||
        0;

case "uiux":
    return skills.javascript || 0;

case "aigenai":
    return skills.python || 0;

case "cicd":
    return skills.git || 0;

case "containers":
    return 0;

case "security":
    return 0;

default:
    return 0;

}
}

function getBackendSkillPayload(career, skills) {

const payload = {};

const mappings = {
    dsa: "dsa",
    react: "react",
    linux: "linux",
    machineLearning: "machineLearning",
    systemDesign: "systemDesign",
    statistics: "statistics",
    cloud: "cloud",
    cybersecurity: "cybersecurity",
    networking: "networking",
    testing: "testing",
    apiDevelopment: "apiDevelopment",
    uiUx: "uiUx",
    aiGenai: "aiGenai",
    cicd: "cicd",
    containers: "containers",
    security: "security"
};

Object.entries(mappings).forEach(
    ([frontendKey, backendKey]) => {

        const value =
            Object.prototype.hasOwnProperty.call(
                skills,
                frontendKey
            )
                ? skills[frontendKey]
                : 0;

        payload[backendKey] = clamp(
            Number(value) || 0,
            0,
            3
        );
    }
);

if (
    Object.prototype.hasOwnProperty.call(
        skills,
        "reactnative"
    )
) {
    payload.react = Math.max(
        payload.react || 0,
        clamp(skills.reactnative, 0, 3)
    );
}

if (
    Object.prototype.hasOwnProperty.call(
        skills,
        "kotlin"
    )
) {
    payload.java = Math.max(
        payload.java || 0,
        clamp(skills.kotlin, 0, 3)
    );
}

if (
    Object.prototype.hasOwnProperty.call(
        skills,
        "swift"
    )
) {
    payload.javascript = Math.max(
        payload.javascript || 0,
        clamp(skills.swift, 0, 3)
    );
}

return payload;

}

/* =========================================================
LOCAL CAREER ANALYSIS
========================================================= */

function calculateCareerReadiness(
career,
skills
) {

const weights = getCareerWeights(career);

if (Object.keys(weights).length === 0) {
return 0;
}

let totalWeight = 0;
let achievedWeight = 0;

Object.entries(weights).forEach(
([skill, weight]) => {

const value = clamp(
Number(
Object.prototype.hasOwnProperty.call(
skills,
skill
)
? skills[skill]
: 0
) || 0,
0,
3
);

totalWeight += weight;

achievedWeight +=
(value / 3) * weight;

}
);

if (totalWeight === 0) {
return 0;
}

return Math.round(
(achievedWeight / totalWeight) * 100
);
}
function getReadinessStatus(readiness) {

if (readiness >= 80) {
return "Job Ready";
}

if (readiness >= 60) {
return "Developing";
}

if (readiness >= 40) {
return "Needs Improvement";
}

return "Beginner";
}

function findCareerSkillGaps(
career,
skills
) {

const weights = getCareerWeights(career);

if (Object.keys(weights).length === 0) {
return [];
}

const gaps = [];

Object.entries(weights).forEach(
([skill, weight]) => {

const value = clamp(
Number(
Object.prototype.hasOwnProperty.call(
skills,
skill
)
? skills[skill]
: getDerivedSkillValue(
skill,
skills
)
) || 0,
0,
3
);

if (value < 2) {

gaps.push({
skill,
value,
weight,
gap: (3 - value) * weight
});

}

}
);

gaps.sort(
(a, b) => b.gap - a.gap
);

return gaps;
}
function findNextCareerSkill(
career,
skills
) {

const profile = getCareerProfile(career);

if (!profile) {
return "Java";
}

const gaps = findCareerSkillGaps(
career,
skills
);

if (gaps.length > 0) {
return getSkillDisplayName(
gaps[0].skill
);
}

if (
profile.prioritySkills &&
profile.prioritySkills.length > 0
) {
return getSkillDisplayName(
profile.prioritySkills[0]
);
}

return getSkillDisplayName(
profile.fallbackSkill || "java"
);
}


function buildCareerAnalysis(
career,
skills,
evidence
) {

const profile =
    getCareerProfile(career);

const readiness =
    calculateCareerReadiness(
        career,
        skills
    );

const status =
    getReadinessStatus(readiness);

const gaps =
    findCareerSkillGaps(
        career,
        skills
    );

const nextSkill =
    findNextCareerSkill(
        career,
        skills
    );

let recommendation;

if (readiness < 40) {

    recommendation =
        "For " +
        profile.name +
        ", first strengthen " +
        nextSkill +
        " fundamentals and build small practical projects.";

} else if (readiness < 60) {

    recommendation =
        "You are building toward " +
        profile.name +
        ". Improve " +
        nextSkill +
        " through structured practice and hands-on projects.";

} else if (readiness < 80) {

    recommendation =
        "You are progressing well toward " +
        profile.name +
        ". Focus on " +
        nextSkill +
        " and strengthen your portfolio with real-world projects.";

} else {

    recommendation =
        "You are close to or at job-ready level for " +
        profile.name +
        ". Strengthen " +
        nextSkill +
        " with advanced projects and interview preparation.";

}

const careerGroups = {

    "software-engineer": [
        "backend",
        "frontend",
        "fullstack",
        "software-architect"
    ],

    "backend": [
        "software-engineer",
        "fullstack",
        "api-developer",
        "data-engineer"
    ],

    "frontend": [
        "fullstack",
        "ui-developer",
        "ux-engineer",
        "react-native-developer"
    ],

    "fullstack": [
        "backend",
        "frontend",
        "software-engineer",
        "api-developer"
    ],

    "data-engineer": [
        "data-analyst",
        "data-scientist",
        "backend",
        "cloud-engineer"
    ],

    "data-analyst": [
        "data-scientist",
        "data-engineer",
        "software-engineer"
    ],

    "data-scientist": [
        "machine-learning-engineer",
        "data-analyst",
        "data-engineer",
        "ai-engineer"
    ],

    "machine-learning-engineer": [
        "data-scientist",
        "ai-engineer",
        "data-engineer",
        "software-engineer"
    ],

    "ai-engineer": [
        "machine-learning-engineer",
        "data-scientist",
        "backend",
        "software-engineer"
    ],

    "devops-engineer": [
        "cloud-engineer",
        "site-reliability-engineer",
        "platform-engineer",
        "infrastructure-engineer"
    ],

    "cloud-engineer": [
        "devops-engineer",
        "cloud-architect",
        "site-reliability-engineer",
        "platform-engineer"
    ],

    "cybersecurity-analyst": [
        "security-engineer",
        "security-analyst",
        "network-security-engineer",
        "cloud-security-engineer"
    ],

    "security-engineer": [
        "cybersecurity-analyst",
        "security-analyst",
        "cloud-security-engineer",
        "security-architect"
    ],

    "qa-engineer": [
        "automation-test-engineer",
        "test-engineer",
        "sdet",
        "performance-test-engineer"
    ],

    "software-architect": [
        "system-design-engineer",
        "solution-architect",
        "technical-architect",
        "enterprise-architect"
    ],

    "network-engineer": [
        "network-administrator",
        "network-security-engineer",
        "systems-engineer",
        "infrastructure-engineer"
    ]

};

const comparisonIds =
    careerGroups[career] || [
        "software-engineer",
        "backend",
        "frontend",
        "data-engineer"
    ];

const careerComparisons = [];

comparisonIds.forEach(function(comparisonCareer) {

if (comparisonCareer === career) {
    return;
}

const comparisonProfile =
    getCareerProfile(
        comparisonCareer
    );

if (!comparisonProfile) {
    return;
}

const comparisonReadiness =
    calculateCareerReadiness(
        comparisonCareer,
        skills
    );

const selectedRequiredSkills =
    profile &&
    profile.requiredSkills
        ? Object.keys(
            profile.requiredSkills
        )
        : [];

const comparisonRequiredSkills =
    comparisonProfile.requiredSkills
        ? Object.keys(
            comparisonProfile.requiredSkills
        )
        : [];

const sharedSkills = [];

comparisonRequiredSkills.forEach(
    function(skill) {

        if (
            selectedRequiredSkills.includes(
                skill
            )
        ) {

            sharedSkills.push(
                getSkillDisplayName(
                    skill
                )
            );

        }

    }
);

const missingSkills = [];

comparisonRequiredSkills.forEach(
    function(skill) {

        const skillValue =
            Number(
                skills[skill]
            ) || 0;

        if (
            skillValue <= 1 &&
            !missingSkills.includes(
                getSkillDisplayName(
                    skill
                )
            )
        ) {

            missingSkills.push(
                getSkillDisplayName(
                    skill
                )
            );

        }

    }
);

const totalComparisonSkills =
    comparisonRequiredSkills.length;

const sharedSkillCount =
    sharedSkills.length;

const missingSkillCount =
    missingSkills.length;

let skillOverlapScore = 0;

if (totalComparisonSkills > 0) {

    skillOverlapScore =
        Math.round(
            (
                sharedSkillCount /
                totalComparisonSkills
            ) *
            100
        );

}

let skillReadinessScore =
    comparisonReadiness;

let missingSkillPenalty =
    missingSkillCount * 3;

let careerFitScore =
    Math.round(
        (
            skillReadinessScore * 0.65
        ) +
        (
            skillOverlapScore * 0.35
        ) -
        missingSkillPenalty
    );

careerFitScore =
    clamp(
        careerFitScore,
        0,
        100
    );

let matchReason;

if (
    careerFitScore >= 80
) {

    matchReason =
        "Excellent career fit based on your current skills and readiness.";

} else if (
    careerFitScore >= 65
) {

    matchReason =
        "Strong career fit with several relevant skills already developed.";

} else if (
    careerFitScore >= 50
) {

    matchReason =
        "Moderate career fit. Building the missing skills can make this role a stronger match.";

} else if (
    sharedSkillCount >= 3
) {

    matchReason =
        "You have transferable skills for this career, but several important skills still need improvement.";

} else {

    matchReason =
        "This career requires additional skill development before it becomes a strong match.";

}

let fitLabel;

if (careerFitScore >= 80) {
    fitLabel = "Strong Match";
} else if (careerFitScore >= 65) {
    fitLabel = "Good Match";
} else if (careerFitScore >= 50) {
    fitLabel = "Possible Match";
} else {
    fitLabel = "Low Match";
}

careerComparisons.push({

    career:
        comparisonCareer,

    name:
        comparisonProfile.name,

    readiness:
        comparisonReadiness,

    careerFitScore:
        careerFitScore,

    careerFitLabel:
        fitLabel,

    skillOverlapScore:
        skillOverlapScore,

    sharedSkills:
        sharedSkills.slice(0, 5),

    missingSkills:
        missingSkills.slice(0, 5),

    matchReason:
        matchReason

});

});

careerComparisons.sort(
    function(a, b) {

        return (
            b.careerFitScore -
            a.careerFitScore
        );

    }
);

const topCareerMatches =
    careerComparisons.slice(
        0,
        3
    );

let alternativeRecommendation =
    "";

if (
    topCareerMatches.length > 0
) {

    const bestMatch =
        topCareerMatches[0];

    if (
        bestMatch.readiness >
        readiness
    ) {

        alternativeRecommendation =
            bestMatch.name +
            " may currently be a stronger match for your skill profile, with " +
            bestMatch.readiness +
            "% readiness.";

    } else {

        alternativeRecommendation =
            "Your selected career remains one of your strongest matches. " +
            "Keep improving " +
            nextSkill +
            " to increase your readiness.";

    }

}

return {

    readiness,

    status,

    nextSkill,

    skillGaps:
        gaps.map(
            function(gap) {

                return getSkillDisplayName(
                    gap.skill
                );

            }
        ),

    recommendation,

    roadmap:
        generateCareerRoadmap(
            profile,
            nextSkill,
            gaps
        ),

    evidence:
        evidence || {},

    career,

    careerName:
        profile.name,

    careerComparisons:
        topCareerMatches,

    alternativeRecommendation

};

}



function generateCareerRoadmap(
    profile,
    nextSkill,
    gaps
) {

    const roadmap = [];

    const roleName =
        profile && profile.name
            ? profile.name
            : "your target role";

    const validGaps =
        Array.isArray(gaps)
            ? gaps.slice(0, 3)
            : [];

    if (validGaps.length > 0) {

        validGaps.forEach(
            function(gap, index) {

                const skillName =
                    getSkillDisplayName(
                        gap.skill
                    );

                let priorityText =
                    "Needs improvement";

                if (gap.value === 0) {
                    priorityText =
                        "Critical gap";
                } else if (gap.value === 1) {
                    priorityText =
                        "High priority";
                }

                roadmap.push({

                    step:
                        index + 1,

                    title:
                        "Strengthen " +
                        skillName,

                    topics:
                        priorityText +
                        " in " +
                        skillName +
                        ". Focus on fundamentals and practical usage.",

                    practice:
                        "Complete focused exercises and build one small practical feature using " +
                        skillName +
                        "."

                });

            }
        );

    } else {

        roadmap.push({

            step: 1,

            title:
                "Strengthen " +
                nextSkill,

            topics:
                "Build strong fundamentals in " +
                nextSkill +
                " and understand common real-world use cases.",

            practice:
                "Practice 10 to 20 focused exercises in " +
                nextSkill +
                "."

        });

    }

    const project =
        getCareerProject(
            profile
        );

    roadmap.push({

        step:
            roadmap.length + 1,

        title:
            roleName +
            " Practical Project",

        topics:
            "Combine the major skills required for " +
            roleName +
            " in one portfolio project.",

        practice:
            project

    });

    

    roadmap.push({

        step:
            roadmap.length + 1,

        title:
            "Interview Preparation",

        topics:
            roleName +
            " interview questions, problem solving and project explanation.",

        practice:
            "Practice mock interviews and explain your project decisions clearly."

    });

    return roadmap.slice(0, 5);

}


function getCareerProject(profile) {

const projectMap = {

"Software Engineer":
    "Build a complete software application with backend, database and API.",

"Software Developer":
    "Build a complete software application with frontend, backend and database.",

"Application Developer":
    "Build a production-style application with authentication, database and APIs.",

"Backend Developer":
    "Build a REST API connected to MySQL with authentication and CRUD operations.",

"Frontend Developer":
    "Build a responsive dashboard using JavaScript or React and a REST API.",

"Full Stack Developer":
    "Build a full-stack web application with frontend, REST API and database.",

"API Developer":
    "Build a secure REST API with authentication, validation and database integration.",

"Web Developer":
    "Build a responsive web application consuming data from a backend API.",

"Mobile App Developer":
    "Build a mobile application with API integration and persistent data.",

"Android Developer":
    "Build an Android application with API integration and local data storage.",

"iOS Developer":
    "Build an iOS application with API integration and persistent data.",

"Game Developer":
    "Build a small playable game demonstrating core programming and game logic.",

"DevOps Engineer":
    "Build a CI/CD pipeline that containerizes and deploys an application.",

"Cloud Engineer":
    "Deploy a containerized application to a cloud environment.",

"Cloud Architect":
    "Design a scalable, secure cloud architecture for a production application.",

"Site Reliability Engineer":
    "Build an application monitoring and deployment setup with reliability checks.",

"Platform Engineer":
    "Create an internal developer platform workflow for application deployment.",

"Infrastructure Engineer":
    "Design and document infrastructure for a production application.",

"Kubernetes Engineer":
    "Deploy a containerized application to Kubernetes with services and configuration.",

"Cloud Security Engineer":
    "Design secure cloud infrastructure with access controls and monitoring.",

"Machine Learning Engineer":
    "Build and deploy a machine-learning model with data processing and evaluation.",

"AI Engineer":
    "Build an AI application using an ML or GenAI model exposed through an API.",

"AI Developer":
    "Build an AI-powered application with a usable frontend and backend API.",

"Deep Learning Engineer":
    "Train and evaluate a deep-learning model using a real dataset.",

"NLP Engineer":
    "Build an NLP application for text classification or language analysis.",

"Computer Vision Engineer":
    "Build a computer-vision application that processes and classifies images.",

"Generative AI Engineer":
    "Build a Generative AI application using an AI model and backend API.",

"MLOps Engineer":
    "Build an ML deployment pipeline with model versioning and monitoring.",

"AI Research Engineer":
    "Implement and evaluate an AI experiment using a documented research workflow.",

"Data Analyst":
    "Build a business analytics project using SQL, Python and statistical analysis.",

"Data Scientist":
    "Create an end-to-end data science project with analysis, modeling and visualization.",

"Data Engineer":
    "Build a data pipeline that ingests, transforms and stores data.",

"BI Developer":
    "Build a business intelligence dashboard backed by structured SQL data.",

"BI Analyst":
    "Create a business analytics dashboard with insights and statistical analysis.",

"Analytics Engineer":
    "Build a clean analytics data model and reporting pipeline.",

"Database Developer":
    "Design a relational database and build applications that use it.",

"Database Administrator":
    "Design and document a database administration and backup strategy.",

"Cybersecurity Analyst":
    "Create a security monitoring project and document identified vulnerabilities.",

"Security Engineer":
    "Build a secure application infrastructure with monitoring and access controls.",

"Security Analyst":
    "Create a security analysis workflow and document potential threats.",

"Application Security Engineer":
    "Perform security analysis on an application and document remediation steps.",

"SOC Analyst":
    "Create a basic security monitoring workflow with incident documentation.",

"Penetration Tester":
    "Create a controlled security-testing project and document findings.",

"Ethical Hacker":
    "Build a legal security-testing lab and document the testing methodology.",

"Security Architect":
    "Design a secure architecture with identity, access controls and monitoring.",

"Digital Forensics Analyst":
    "Create a controlled digital-forensics analysis workflow and report.",

"QA Engineer":
    "Build an automated test suite for a web application and API.",

"QA Analyst":
    "Create a structured QA plan with test cases and defect reports.",

"Test Engineer":
    "Build an automated testing workflow for a software application.",

"Automation Test Engineer":
    "Create an automated UI and API testing framework.",

"SDET":
    "Build a complete automated testing framework integrated with CI.",

"Performance Test Engineer":
    "Create a performance testing project and analyze application bottlenecks.",

"Security Test Engineer":
    "Create a security-focused automated testing workflow.",

"Software Architect":
    "Design a production-ready architecture for a scalable software system.",

"Solution Architect":
    "Design an end-to-end technical solution for a realistic business problem.",

"System Architect":
    "Design a scalable distributed system and explain its major components.",

"Enterprise Architect":
    "Design a high-level enterprise architecture connecting multiple systems.",

"Technical Architect":
    "Design a production-ready technical architecture with APIs and databases.",

"System Design Engineer":
    "Design a scalable distributed system and explain its major components.",

"Network Engineer":
    "Design and document a secure enterprise network.",

"Network Administrator":
    "Create and document a network administration and troubleshooting plan.",

"Systems Administrator":
    "Build and document a Linux server administration environment.",

"Systems Engineer":
    "Design and configure a reliable systems infrastructure.",

"Network Security Engineer":
    "Design a secure network architecture with monitoring and access controls.",

"Embedded Systems Developer":
    "Build a small embedded application demonstrating hardware and software integration.",

"Firmware Engineer":
    "Build a firmware prototype demonstrating low-level device control.",

"IoT Developer":
    "Build an IoT application that collects sensor data and sends it to an API.",

"Robotics Engineer":
    "Build a robotics simulation or control project demonstrating automation logic.",

"Blockchain Developer":
    "Build a blockchain-based application with a simple transaction workflow.",

"Web3 Developer":
    "Build a decentralized application interface connected to a blockchain workflow.",

"UI Developer":
    "Build a polished responsive user interface consuming a REST API.",

"UX Engineer":
    "Build a user-focused interface demonstrating usability and frontend engineering.",

"UX/UI Developer":
    "Build a responsive interface with thoughtful UX and frontend implementation.",

"Design Technologist":
    "Build an interactive design prototype using modern web technologies.",

"Technical UI Engineer":
    "Build a polished technical dashboard with reusable UI components.",

"Flutter Developer":
    "Build a cross-platform mobile application with API integration.",

"React Native Developer":
    "Build a React Native mobile application consuming a REST API.",

"Cross Platform Mobile Developer":
    "Build a cross-platform mobile application with persistent data.",

"Technical Product Manager":
    "Create a technical product specification and working prototype.",

"Technical Program Manager":
    "Create a technical delivery plan and prototype demonstrating the proposed solution.",

"Solutions Engineer":
    "Design and demonstrate a technical solution for a realistic customer problem.",

"Sales Engineer":
    "Build a technical proof-of-concept demonstrating a product solution.",

"Technical Consultant":
    "Create a technical solution proposal backed by a working prototype.",

"Developer Advocate":
    "Build a developer-focused project with documentation and a public demo.",

"Technical Support Engineer":
    "Build a troubleshooting knowledge base and diagnostic utility."

};

return projectMap[profile.name] ||
`Build a practical project demonstrating the core skills required for ${profile.name}.`;
}

async function analyzeSkills() {

const resultContainer =
    document.getElementById("result");

const analyzeButton =
    document.querySelector(
        'button[onclick="analyzeSkills()"]'
    );

const careerElement =
    document.getElementById("career");

const career =
    careerElement
        ? careerElement.value
        : "software-engineer";

const skills =
    getAllAssessedSkills(career);

const evidence = {
    projects: clamp(
        getValue("projectsInput"),
        0,
        100
    ),

    problems: clamp(
        getValue("problemsInput"),
        0,
        100
    ),

    github: clamp(
        getValue("githubInput"),
        0,
        100
    ),

    assessment: clamp(
        getValue("assessmentInput"),
        0,
        100
    )
};

if (!resultContainer) {
    return;
}

setLoading(
    analyzeButton,
    "Analyzing..."
);

showLoading(
    resultContainer,
    "Analyzing your skills for the selected career..."
);

try {

    const backendSkills =
        getBackendSkillPayload(
            career,
            skills
        );

    const requestBody = {
        career,

        java: clamp(
            Number(skills.java) || 0,
            0,
            3
        ),

        python: clamp(
            Number(skills.python) || 0,
            0,
            3
        ),

        sql: clamp(
            Number(skills.sql) || 0,
            0,
            3
        ),

        javascript: clamp(
            Number(skills.javascript) || 0,
            0,
            3
        ),

        git: clamp(
            Number(skills.git) || 0,
            0,
            3
        ),

        ...backendSkills,

        projects: evidence.projects,
        problems: evidence.problems,
        github: evidence.github,
        assessment: evidence.assessment
    };

    const response =
        await fetch(
            API_BASE_URL + "/analyze",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify(
                        requestBody
                    )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Backend returned " +
            response.status
        );

    }

    const backendResult =
        await response.json();

    const analysisSkills = {
        ...skills,

        dsa: Number(requestBody.dsa) || 0,
        react: Number(requestBody.react) || 0,
        linux: Number(requestBody.linux) || 0,

        machineLearning:
            Number(requestBody.machineLearning) || 0,

        systemdesign:
            Number(requestBody.systemDesign) || 0,

        statistics:
            Number(requestBody.statistics) || 0,

        cloud:
            Number(requestBody.cloud) || 0,

        cybersecurity:
            Number(requestBody.cybersecurity) || 0,

        networking:
            Number(requestBody.networking) || 0,

        testing:
            Number(requestBody.testing) || 0,

        apidevelopment:
            Number(requestBody.apiDevelopment) || 0,

        uiux:
            Number(requestBody.uiUx) || 0,

        aigenai:
            Number(requestBody.aiGenai) || 0,

        cicd:
            Number(requestBody.cicd) || 0,

        containers:
            Number(requestBody.containers) || 0,

        security:
            Number(requestBody.security) || 0
    };

const localAnalysis =
buildCareerAnalysis(
career,
analysisSkills,
evidence
);

    const finalResult = {
        ...backendResult,

        readiness:
            localAnalysis.readiness,

        status:
            localAnalysis.status,

        nextSkill:
            localAnalysis.nextSkill,

        skillGaps:
            localAnalysis.skillGaps,

        recommendation:
            localAnalysis.recommendation,

        roadmap:
            localAnalysis.roadmap,

        evidence:
            localAnalysis.evidence,

        careerName:
            localAnalysis.careerName,

        careerComparisons:
            localAnalysis.careerComparisons,

        alternativeRecommendation:
            localAnalysis.alternativeRecommendation,

        projects:
            evidence.projects,

        problems:
            evidence.problems,

        github:
            evidence.github,

        assessment:
            evidence.assessment,

        career
    };

    renderAnalysisResult(
        finalResult
    );

} catch (error) {

    console.error(
        "Analysis error:",
        error
    );

    try {

        const localAnalysis =
            buildCareerAnalysis(
                career,
                skills,
                evidence
            );

        renderAnalysisResult({

            ...localAnalysis,

            career,

            projects:
                evidence.projects,

            problems:
                evidence.problems,

            github:
                evidence.github,

            assessment:
                evidence.assessment

        });

    } catch (localError) {

        console.error(
            "Local analysis error:",
            localError
        );

        showError(
            resultContainer,
            "Unable to analyze the profile. Please check the selected career and skill inputs."
        );

    }

} finally {

    resetButton(
        analyzeButton
    );

}

}




/* =========================================================
RESULT RENDERING
========================================================= */
function renderAnalysisResult(result) {

const container =
    document.getElementById("result");

if (!container) {
    return;
}

const readiness =
    clamp(
        Number(result.readiness) || 0,
        0,
        100
    );

const status =
    result.status ||
    getReadinessStatus(readiness);

const career =
    result.career ||
    "software-engineer";

const profile =
    getCareerProfile(career);

const careerName =
    profile
        ? profile.name
        : career;

const nextSkill =
    result.nextSkill ||
    "Git & GitHub";

const gaps =
    Array.isArray(result.skillGaps)
        ? result.skillGaps
        : [];

const recommendation =
    result.recommendation ||
    "Focus on " +
    nextSkill +
    " to improve your readiness for " +
    careerName +
    ".";

const roadmap =
    Array.isArray(result.roadmap)
        ? result.roadmap
        : [];

const comparisons =
    Array.isArray(result.careerComparisons)
        ? result.careerComparisons
        : [];

const alternativeRecommendation =
    result.alternativeRecommendation ||
    "";

let skillGapsHtml =
    "<p>No major skill gaps detected.</p>";

if (gaps.length > 0) {

    skillGapsHtml =
        '<ul class="skill-gap-list">' +

        gaps.map(function(gap) {

            return (
                "<li>" +
                escapeHtml(gap) +
                "</li>"
            );

        }).join("") +

        "</ul>";
}

let roadmapHtml =
    "<p>Roadmap will appear after analysis.</p>";

if (roadmap.length > 0) {

    roadmapHtml =
        roadmap.map(function(step) {

            return (

                '<div class="roadmap-step">' +

                    '<div class="roadmap-number">' +
                        escapeHtml(step.step) +
                    "</div>" +

                    '<div class="roadmap-content">' +

                        "<h4>" +
                            escapeHtml(step.title) +
                        "</h4>" +

                        "<p>" +
                            escapeHtml(step.topics) +
                        "</p>" +

                        "<span>" +
                            "Practice: " +
                            escapeHtml(step.practice) +
                        "</span>" +

                    "</div>" +

                "</div>"

            );

        }).join("");
}

let comparisonHtml =
    '<p class="comparison-empty">' +
    "No related career comparison available." +
    "</p>";

if (comparisons.length > 0) {

    comparisonHtml =
        '<div class="career-comparison-grid">' +

        comparisons.map(function(item) {

            const comparisonReadiness =
                clamp(
                    Number(item.readiness) || 0,
                    0,
                    100
                );
            const careerFitScore =
            clamp(
                Number(item.careerFitScore) || 0,
                0,
                100
            );

            const careerFitLabel =
                item.careerFitLabel ||
                (
                    careerFitScore >= 80
                        ? "Strong Match"
                        : careerFitScore >= 65
                            ? "Good Match"
                            : careerFitScore >= 50
                                ? "Possible Match"
                                : "Low Match"
                );

            const sharedSkills =
                Array.isArray(item.sharedSkills)
                    ? item.sharedSkills
                    : [];

            const missingSkills =
                Array.isArray(item.missingSkills)
                    ? item.missingSkills
                    : [];

            let sharedSkillsHtml =
                "<span>None identified</span>";

            if (sharedSkills.length > 0) {

                sharedSkillsHtml =
                    sharedSkills.map(
                        function(skill) {

                            return (
                                '<span class="career-skill-tag">' +
                                escapeHtml(skill) +
                                "</span>"
                            );

                        }
                    ).join("");

            }

            let missingSkillsHtml =
                "<span>None identified</span>";

            if (missingSkills.length > 0) {

                missingSkillsHtml =
                    missingSkills.map(
                        function(skill) {

                            return (
                                '<span class="career-skill-tag">' +
                                escapeHtml(skill) +
                                "</span>"
                            );

                        }
                    ).join("");

            }

            const matchReason =
                item.matchReason ||
                "This is a related career based on your current skill profile.";

            return (

                '<div class="career-comparison-card">' +

                    '<div class="career-comparison-header">' +

                        "<h4>" +
                            escapeHtml(item.name) +
                        "</h4>" +

'<div class="career-comparison-score">' +

    '<strong>' +
"Career Fit: " +
careerFitScore +
"%" +
"</strong>" +

'<span class="career-fit-label">' +
escapeHtml(careerFitLabel) +
"</span>" +

'<span class="career-readiness-label">' +
"Readiness: " +
comparisonReadiness +
"%" +
"</span>" +

"</div>" +

                    "</div>" +

                    '<div class="career-comparison-progress">' +

                        '<div class="progress-track">' +

                            '<div class="progress-fill" style="width: ' +
                                comparisonReadiness +
                                '%">' +
                            "</div>" +

                        "</div>" +

                    "</div>" +

                    '<p class="career-match-reason">' +
                        escapeHtml(matchReason) +
                    "</p>" +

                    '<div class="career-comparison-skills">' +

                        "<div>" +

                            "<strong>" +
                                "Shared Skills" +
                            "</strong>" +

                            '<div class="career-skill-tags">' +
                                sharedSkillsHtml +
                            "</div>" +

                        "</div>" +

                        "<div>" +

                            "<strong>" +
                                "Skills to Improve" +
                            "</strong>" +

                            '<div class="career-skill-tags">' +
                                missingSkillsHtml +
                            "</div>" +

                        "</div>" +

                    "</div>" +

                "</div>"

            );

        }).join("") +

        "</div>";
}

let alternativeHtml = "";

if (alternativeRecommendation) {

    alternativeHtml =
        '<div class="alternative-career-recommendation">' +

            "<strong>" +
                "Career Recommendation" +
            "</strong>" +

            "<p>" +
                escapeHtml(
                    alternativeRecommendation
                ) +
            "</p>" +

        "</div>";
}

container.innerHTML =

    '<div class="result-header">' +

        "<div>" +

            '<span class="result-label">' +
                "Career Analysis" +
            "</span>" +

            "<h2>" +
                escapeHtml(careerName) +
            "</h2>" +

            "<p>" +
                "Your current readiness for this role" +
            "</p>" +

        "</div>" +

        '<div class="readiness-score">' +
            readiness +
            "%" +
        "</div>" +

    "</div>" +


    '<div class="score-progress">' +

        '<div class="progress-track">' +

            '<div class="progress-fill" style="width: ' +
                readiness +
                '%">' +
            "</div>" +

        "</div>" +

        '<div class="progress-labels">' +
            "<span>0%</span>" +
            "<span>50%</span>" +
            "<span>100%</span>" +
        "</div>" +

    "</div>" +


    '<div class="score-cards">' +

        '<div class="score-card">' +

            '<span class="score-card-label">' +
                "Readiness" +
            "</span>" +

            "<strong>" +
                readiness +
                "%" +
            "</strong>" +

        "</div>" +

        '<div class="score-card">' +

            '<span class="score-card-label">' +
                "Status" +
            "</span>" +

            "<strong>" +
                escapeHtml(status) +
            "</strong>" +

        "</div>" +

        '<div class="score-card">' +

            '<span class="score-card-label">' +
                "Next Skill" +
            "</span>" +

            "<strong>" +
                escapeHtml(nextSkill) +
            "</strong>" +

        "</div>" +

    "</div>" +


    '<div class="result-grid">' +

        '<div class="result-card">' +

            "<h3>" +
                "Career Recommendation" +
            "</h3>" +

            "<p>" +
                escapeHtml(recommendation) +
            "</p>" +

        "</div>" +

        '<div class="result-card">' +

            "<h3>" +
                "Skill Gaps" +
            "</h3>" +

            skillGapsHtml +

        "</div>" +

    "</div>" +


    '<div class="result-card career-comparison-section">' +

        "<h3>" +
            "Related Career Matches" +
        "</h3>" +

        "<p>" +
            "Based on your current skill profile, these related careers are worth considering." +
        "</p>" +

        comparisonHtml +

        alternativeHtml +

    "</div>" +


    '<div class="roadmap-section">' +

        '<div class="roadmap-header">' +

            "<h3>" +
                "Personalized Roadmap" +
            "</h3>" +

            "<p>" +
                "Follow these steps to improve your " +
                escapeHtml(careerName) +
                " readiness." +
            "</p>" +

        "</div>" +

        '<div class="roadmap">' +

            roadmapHtml +

        "</div>" +

    "</div>" +


    '<div class="evidence-result">' +

        "<h3>" +
            "Profile Evidence" +
        "</h3>" +

        '<div class="evidence-grid">' +

            "<div>" +
                "<span>Projects</span>" +
                "<strong>" +
                    (Number(result.projects) || 0) +
                "</strong>" +
            "</div>" +

            "<div>" +
                "<span>Problems Solved</span>" +
                "<strong>" +
                    (Number(result.problems) || 0) +
                "</strong>" +
            "</div>" +

            "<div>" +
                "<span>GitHub</span>" +
                "<strong>" +
                    (Number(result.github) || 0) +
                "</strong>" +
            "</div>" +

            "<div>" +
                "<span>Assessment</span>" +
                "<strong>" +
                    (Number(result.assessment) || 0) +
                "</strong>" +
            "</div>" +

        "</div>" +

    "</div>";

}

/* =========================================================
CAREER CHANGE
========================================================= */

function handleCareerChange() {

const careerElement =
document.getElementById("career");

if (!careerElement) {
return;
}

renderCareerSpecificSkills();

const resultContainer =
document.getElementById("result");

if (resultContainer) {

const profile =
    getCareerProfile(
        careerElement.value
    );

if (profile) {

    resultContainer.innerHTML = `
        <div class="empty-state">

            <h3>
                ${escapeHtml(profile.name)}
            </h3>

            <p>
                Your assessment has been updated
                for this career. Complete the
                career-specific skills and click
                Analyze Skills.
            </p>

        </div>
    `;
}

}
}

/* =========================================================
HISTORY
========================================================= */

async function loadHistory() {

const historyContainer =
    document.getElementById("history");

if (!historyContainer) {
    return;
}

historyContainer.innerHTML =
    '<div class="loading-state"><p>Loading history...</p></div>';

try {

    const response =
        await fetch(API_BASE_URL + "/history");

    if (!response.ok) {
        throw new Error(
            "History request failed: " + response.status
        );
    }

    const history =
        await response.json();

    if (
        !Array.isArray(history) ||
        history.length === 0
    ) {

        historyContainer.innerHTML =
            '<div class="empty-state">' +
            '<p>No analysis history available yet.</p>' +
            '</div>';

        return;
    }

    const latest =
        history[0];

    const previous =
        history.length > 1
            ? history[1]
            : null;

    const coreSkills = [
        "java",
        "python",
        "sql",
        "javascript",
        "git"
    ];

    let latestTotal = 0;
    let previousTotal = 0;

    coreSkills.forEach(function(skill) {

        latestTotal +=
            Number(latest[skill]) || 0;

        if (previous) {

            previousTotal +=
                Number(previous[skill]) || 0;

        }

    });

const latestCareer =
latest.career ||
"software-engineer";

const latestCoreReadiness =
calculateCareerReadiness(
latestCareer,
latest
);

const previousCareer =
previous
? previous.career || "software-engineer"
: latestCareer;

const previousCoreReadiness =
previous
? calculateCareerReadiness(
previousCareer,
previous
)
: latestCoreReadiness;

    const improvement =
        latestCoreReadiness -
        previousCoreReadiness;

    let improvementText =
        "No previous assessment available.";

    if (previous) {

        if (improvement > 0) {

            improvementText =
                "Readiness improved by +" +
                improvement +
                "% since the previous assessment.";

        } else if (improvement < 0) {

            improvementText =
                "Readiness decreased by " +
                Math.abs(improvement) +
                "% since the previous assessment.";

        } else {

            improvementText =
                "Readiness is unchanged from the previous assessment.";

        }

    }

    const skillLabels = {
        java: "Java",
        python: "Python",
        sql: "SQL",
        javascript: "JavaScript",
        git: "Git & GitHub"
    };

    let skillProgressHTML = "";

    coreSkills.forEach(function(skill) {

        const latestValue =
            Number(latest[skill]) || 0;

        const previousValue =
            previous
                ? Number(previous[skill]) || 0
                : latestValue;

        const change =
            latestValue -
            previousValue;

        let changeText = "No change";

        if (change > 0) {
            changeText = "+" + change;
        } else if (change < 0) {
            changeText = String(change);
        }

        const percentage =
            Math.round(
                (latestValue / 3) * 100
            );

        skillProgressHTML +=
            '<div class="analytics-skill-row">' +

                '<span>' +
                    (skillLabels[skill] || skill) +
                '</span>' +

                '<div class="progress-track">' +
                    '<div class="progress-fill" style="width:' +
                        percentage +
                        '%"></div>' +
                '</div>' +

                '<strong>' +
                    latestValue +
                    '/3 (' +
                    changeText +
                    ')' +
                '</strong>' +

            '</div>';

    });

    let historyRowsHTML = "";
    let historyCardsHTML = "";

    history.forEach(function(item) {

const itemCareer =
item.career ||
"software-engineer";

const itemWeights =
getCareerWeights(itemCareer);

let itemWeightedScore = 0;
let itemTotalWeight = 0;

Object.keys(itemWeights).forEach(function(skill) {

const itemValue =
Number(item[skill]) || 0;

const itemWeight =
Number(itemWeights[skill]) || 0;

itemWeightedScore +=
itemValue * itemWeight;

itemTotalWeight +=
itemWeight;

});

const itemReadiness =
calculateCareerReadiness(
itemCareer,
item
);

        const careerKey =
        item.career ||
        "software-engineer";

const careerProfile =
getCareerProfile(careerKey);

const career =
careerProfile
? careerProfile.name
: "Software Engineer";

        historyRowsHTML +=

            '<tr>' +

    '<td>' +
        escapeHtml(item.id) +
    '</td>' +

    '<td>' +
        escapeHtml(career) +
    '</td>' +

    '<td>' +
        itemReadiness +
        '%' +
    '</td>' +

    '<td>' +
        escapeHtml(item.java) +
    '</td>' +

    '<td>' +
        escapeHtml(item.python) +
    '</td>' +

    '<td>' +
        escapeHtml(item.sql) +
    '</td>' +

    '<td>' +
        escapeHtml(item.javascript) +
    '</td>' +

    '<td>' +
        escapeHtml(item.git) +
    '</td>' +

    '<td>' +
        escapeHtml(item.projects) +
    '</td>' +

    '<td>' +
        escapeHtml(item.problems) +
    '</td>' +

'</tr>';

historyCardsHTML +=

'<div class="history-card">' +

    '<div class="history-card-header">' +
        '<strong>Assessment #' +
            escapeHtml(item.id) +
        '</strong>' +
        '<span>' +
            itemReadiness +
            '% Readiness' +
        '</span>' +
    '</div>' +

    '<div class="history-card-career">' +
        escapeHtml(career) +
    '</div>' +

    '<div class="history-card-grid">' +

        '<div>' +
            '<span>Java</span>' +
            '<strong>' +
                escapeHtml(item.java) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>Python</span>' +
            '<strong>' +
                escapeHtml(item.python) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>SQL</span>' +
            '<strong>' +
                escapeHtml(item.sql) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>JavaScript</span>' +
            '<strong>' +
                escapeHtml(item.javascript) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>Git & GitHub</span>' +
            '<strong>' +
                escapeHtml(item.git) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>Projects</span>' +
            '<strong>' +
                escapeHtml(item.projects) +
            '</strong>' +
        '</div>' +

        '<div>' +
            '<span>Problems</span>' +
            '<strong>' +
                escapeHtml(item.problems) +
            '</strong>' +
        '</div>' +

    '</div>' +

'</div>';

    });

    console.log("HISTORY ROWS:",historyRowsHTML);
    

    historyContainer.innerHTML =

        '<div class="analytics-dashboard">' +

            '<div class="analytics-card">' +
                '<span>Latest Readiness</span>' +
                '<strong>' +
                    latestCoreReadiness +
                    '%' +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Previous Readiness</span>' +
                '<strong>' +
                    (
                        previous
                            ? previousCoreReadiness + "%"
                            : "N/A"
                    ) +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Improvement</span>' +
                '<strong>' +
                    (
                        previous
                            ? (
                                improvement > 0
                                    ? "+" + improvement
                                    : improvement
                            ) + "%"
                            : "N/A"
                    ) +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Total Assessments</span>' +
                '<strong>' +
                    history.length +
                '</strong>' +
            '</div>' +

        '</div>' +

        '<div class="analytics-insight">' +

            '<h3>Progress Summary</h3>' +

            '<p>' +
                improvementText +
            '</p>' +

        '</div>' +

        '<div class="readiness-trend">' +

            '<h3>Latest Core Skill Progress</h3>' +

            skillProgressHTML +

        '</div>' +

        '<div class="history-table-wrapper">' +

'<table class="history-table">' +

    '<thead>' +

        '<tr>' +
            '<th>ID</th>' +
            '<th>Career</th>' +
            '<th>Readiness</th>' +
            '<th>Java</th>' +
            '<th>Python</th>' +
            '<th>SQL</th>' +
            '<th>JavaScript</th>' +
            '<th>Git</th>' +
            '<th>Projects</th>' +
            '<th>Problems</th>' +
        '</tr>' +

    '</thead>' +

    '<tbody>' +
        historyRowsHTML +
    '</tbody>' +

'</table>' +

'</div>' +

'<div class="history-cards">' +

historyCardsHTML +

'</div>';

} catch (error) {

    console.error(
        "History error:",
        error
    );

    historyContainer.innerHTML =
        '<div class="error-state">' +

            '<h3>Unable to load history</h3>' +

            '<p>' +
                'Make sure the backend is running.' +
            '</p>' +

        '</div>';

}

}

/* =========================================================
ANALYTICS
========================================================= */

async function loadAnalytics() {

const analyticsContainer =
    document.getElementById("analytics");

if (!analyticsContainer) {
    return;
}

analyticsContainer.innerHTML =
    '<div class="loading-state"><p>Loading analytics...</p></div>';

try {

    const response =
        await fetch(API_BASE_URL + "/history");

    if (!response.ok) {
        throw new Error(
            "Analytics request failed: " + response.status
        );
    }

    const history =
        await response.json();

    if (
        !Array.isArray(history) ||
        history.length === 0
    ) {

        analyticsContainer.innerHTML =
            '<div class="empty-state">' +
            '<p>Complete at least one analysis to see analytics.</p>' +
            '</div>';

        return;
    }

    const latest =
        history[0];

    const career =
        latest.career ||
        document.getElementById("career")?.value ||
        "software-engineer";

    const careerProfile =
        getCareerProfile(career);

    const careerSkills =
        getCareerSkillKeys(career);

    const skillLabels = {
        java: "Java",
        python: "Python",
        sql: "SQL",
        javascript: "JavaScript",
        git: "Git & GitHub",
        dsa: "DSA",
        react: "React",
        linux: "Linux",
        machineLearning: "Machine Learning",
        systemDesign: "System Design",
        statistics: "Statistics",
        cloud: "Cloud",
        cybersecurity: "Cybersecurity",
        networking: "Networking",
        testing: "Software Testing",
        apiDevelopment: "API Development",
        uiUx: "UI/UX",
        aiGenai: "AI / GenAI",
        cicd: "CI/CD",
        containers: "Containers",
        security: "Security"
    };

    const skillValues = {
        java: Number(latest.java) || 0,
        python: Number(latest.python) || 0,
        sql: Number(latest.sql) || 0,
        javascript: Number(latest.javascript) || 0,
        git: Number(latest.git) || 0,
        dsa: Number(latest.dsa) || 0,
        react: Number(latest.react) || 0,
        linux: Number(latest.linux) || 0,
        machineLearning: Number(latest.machineLearning) || 0,
        systemDesign: Number(latest.systemDesign) || 0,
        statistics: Number(latest.statistics) || 0,
        cloud: Number(latest.cloud) || 0,
        cybersecurity: Number(latest.cybersecurity) || 0,
        networking: Number(latest.networking) || 0,
        testing: Number(latest.testing) || 0,
        apiDevelopment: Number(latest.apiDevelopment) || 0,
        uiUx: Number(latest.uiUx) || 0,
        aiGenai: Number(latest.aiGenai) || 0,
        cicd: Number(latest.cicd) || 0,
        containers: Number(latest.containers) || 0,
        security: Number(latest.security) || 0
    };
let readiness =
calculateCareerReadiness(
career,
skillValues
);
   
    if (readiness < 0) {
        readiness = 0;
    }

    if (readiness > 100) {
        readiness = 100;
    }

    const status =
    getReadinessStatus(readiness);

const relevantSkills =
careerSkills.filter(function(skill) {
return Object.prototype.hasOwnProperty.call(
skillValues,
skill
);
});

const sortedSkills =
relevantSkills.slice().sort(function(a, b) {
return skillValues[b] - skillValues[a];
});

const strongestSkills =
sortedSkills.slice(0, 3);

const weakestSkills =
sortedSkills.slice().sort(function(a, b) {
return skillValues[a] - skillValues[b];
}).slice(0, 3);

    const careerSkillNames =
        careerSkills
            .filter(function(skill) {
                return Object.prototype.hasOwnProperty.call(
                    skillValues,
                    skill
                );
            })
            .map(function(skill) {
                return skillLabels[skill] || skill;
            });

        let careerProgress =
        readiness;

    const coreSkills = [
        "java",
        "python",
        "sql",
        "javascript",
        "git"
    ];

    let coreTotal = 0;

    coreSkills.forEach(function(skill) {
        coreTotal += skillValues[skill] || 0;
    });

    const coreProgress =
        Math.round(
            (coreTotal / (coreSkills.length * 3)) * 100
        );

    let strongestHTML = "";

    strongestSkills.forEach(function(skill) {

        strongestHTML +=
            '<div class="analytics-skill-row">' +
            '<span>' +
            (skillLabels[skill] || skill) +
            '</span>' +
            '<strong>' +
            skillValues[skill] +
            '/3' +
            '</strong>' +
            '</div>';

    });

    let weakestHTML = "";

    weakestSkills.forEach(function(skill) {

        weakestHTML +=
            '<div class="analytics-skill-row">' +
            '<span>' +
            (skillLabels[skill] || skill) +
            '</span>' +
            '<strong>' +
            skillValues[skill] +
            '/3' +
            '</strong>' +
            '</div>';

    });

    let careerSkillHTML = "";

    careerSkills.forEach(function(skill) {

        if (
            !Object.prototype.hasOwnProperty.call(
                skillValues,
                skill
            )
        ) {
            return;
        }

        const value =
            skillValues[skill];

        const percentage =
            Math.round(
                (value / 3) * 100
            );

        careerSkillHTML +=
            '<div class="analytics-skill-row">' +
            '<span>' +
            (skillLabels[skill] || skill) +
            '</span>' +
            '<div class="progress-track">' +
            '<div class="progress-fill" style="width:' +
            percentage +
            '%"></div>' +
            '</div>' +
            '<strong>' +
            value +
            '/3' +
            '</strong>' +
            '</div>';

    });

    const careerName =
        careerProfile && careerProfile.name
            ? careerProfile.name
            : career
                .replace(/-/g, " ")
                .replace(/\b\w/g, function(letter) {
                    return letter.toUpperCase();
                });

    analyticsContainer.innerHTML =

        '<div class="analytics-dashboard">' +

            '<div class="analytics-card">' +
                '<span>Overall Readiness</span>' +
                '<strong>' +
                    readiness +
                    '%' +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Selected Career</span>' +
                '<strong>' +
                    careerName +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Career Readiness</span>' +
                '<strong>' +
                    careerProgress +
                    '%' +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Core Skills Progress</span>' +
                '<strong>' +
                    coreProgress +
                    '%' +
                '</strong>' +
            '</div>' +

            '<div class="analytics-card">' +
                '<span>Status</span>' +
                '<strong>' +
                    status +
                '</strong>' +
            '</div>' +

        '</div>' +

        '<div class="readiness-trend">' +

            '<h3>Career Readiness</h3>' +

            '<div class="progress-track">' +

                '<div class="progress-fill" style="width:' +
                    readiness +
                    '%">' +
                '</div>' +

            '</div>' +

            '<p>' +
                'Your latest readiness for ' +
                careerName +
                ' is ' +
                readiness +
                '%.' +
            '</p>' +

        '</div>' +

        '<div class="analytics-dashboard">' +

            '<div class="analytics-card">' +

                '<span>Strongest Skills</span>' +

                '<div>' +
                    strongestHTML +
                '</div>' +

            '</div>' +

            '<div class="analytics-card">' +

                '<span>Weakest Skills</span>' +

                '<div>' +
                    weakestHTML +
                '</div>' +

            '</div>' +

        '</div>' +

        '<div class="analytics-insight">' +

            '<h3>Career-Specific Skills</h3>' +

            '<p>' +
                careerSkillNames.join(", ") +
            '</p>' +

            careerSkillHTML +

        '</div>' +

        '<div class="analytics-insight">' +

            '<h3>Insight</h3>' +

            '<p>' +

                (
                    weakestSkills.length > 0
                        ? 'Your biggest improvement opportunity is ' +
                          (skillLabels[weakestSkills[0]] ||
                           weakestSkills[0]) +
                          '. Focus on this skill first.'
                        : 'Continue strengthening your career-specific skills and projects.'
                ) +

            '</p>' +

        '</div>';

} catch (error) {

    console.error(
        "Analytics error:",
        error
    );

    analyticsContainer.innerHTML =
        '<div class="error-state">' +
        '<h3>Unable to load analytics</h3>' +
        '<p>Make sure the backend is running.</p>' +
        '</div>';

}

}

/* =========================================================
NAVIGATION
========================================================= */

function scrollToSection(id) {

const section =
document.getElementById(id);

if (!section) {
return;
}

section.scrollIntoView({
behavior: "smooth",
block: "start"
});
}

/* =========================================================
INITIALIZATION
========================================================= */

document.addEventListener(
"DOMContentLoaded",
function () {

renderCareerSpecificSkills();

const careerElement =
    document.getElementById("career");

if (careerElement) {

    careerElement.addEventListener(
        "change",
        handleCareerChange
    );
}

const historySection =
    document.getElementById(
        "history-section"
    );

const analyticsSection =
    document.getElementById(
        "analytics-section"
    );

if (
    historySection &&
    historySection.dataset.autoload === "true"
) {
    loadHistory();
}

if (
    analyticsSection &&
    analyticsSection.dataset.autoload === "true"
) {
    loadAnalytics();
}

});