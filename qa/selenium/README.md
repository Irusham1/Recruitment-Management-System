TalentFlow Selenium QA (Java)

This folder contains automated end-to-end UI tests for the TalentFlow web app using Java, Selenium, and JUnit 5.

What is covered
- Dashboard rendering and widgets
- Sidebar navigation between all pages
- Job filtering behavior
- Application stage change flow and toast confirmation
- Global search behavior
- Command palette and theme toggle
- Quick actions menu, CSV export trigger, and page jump

Prerequisites
- Java 17+
- Maven 3.8+
- Running app at http://localhost:8000

Run tests
1. Start the web app server first.
2. From this folder, run:
   mvn test

Useful options
- Run with visible browser:
  mvn test -Dheadless=false

- Use a custom app URL:
  mvn test -DbaseUrl=http://localhost:8000

Notes
- Tests are isolated per test method (new browser session each time).
- CSV export validates success via UI toast message.
