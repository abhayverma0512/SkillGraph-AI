SkillGraph AI

A career readiness and skill assessment platform for evaluating technical skills, career readiness, skill gaps, related career matches, and personalized learning roadmaps.

🚀 Features
Career-specific skill assessment
Technical skill scoring from 0 to 3
Career readiness percentage
Skill gap analysis
Related career matching
Personalized learning roadmap
Assessment history
Progress analytics
Core and career-specific skill tracking
Responsive desktop and mobile UI
MySQL database integration
Spring Boot REST API

🛠️ Tech Stack
Frontend
  HTML
  CSS
  JavaScript
Backend
  Java
  Spring Boot
  Spring Data JPA
  Maven
Database
  MySQL 8
  
📁 Project Structure
Backend/
src/
pom.xml
mvnw
mvnw.cmd
Frontend/
index.html
script.js
style.css
🔄 How It Works

1. Select a target career

2. Rate your core technical skills

3. Complete the career-specific skill assessment

4. Add practical evidence such as projects, problems solved, GitHub activity, and assessment score

5. Analyze the profile

6. View career readiness, skill gaps, related career matches, and personalized roadmap

7. Track previous assessments and progress through History and Analytics

🔐 Backend Configuration

The application uses an environment variable for the database password.

application.properties

spring.datasource.password=${DB_PASSWORD}

Set the DB_PASSWORD environment variable before starting the backend.

▶️ Running the Project
1. Start the Backend

Open PowerShell:

cd Backend

.\mvnw.cmd spring-boot:run

The Spring Boot backend runs on port 8080.

2. Open the Frontend

Open:

Frontend/index.html

in a web browser.

📊 Main Sections
Career Analysis
Skill Gaps
Related Career Matches
Personalized Roadmap
Profile Evidence
Assessment History
Progress Analytics
📱 Responsive Design

SkillGraph AI supports both desktop and mobile screen sizes with a responsive user interface.

👨‍💻 Author

Abhay Pratap Verma

GitHub: https://github.com/abhayverma0512

📌 Project Status

Completed and tested for desktop and mobile responsive layouts.
