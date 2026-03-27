# Upgrade Plan: TalentFlow Selenium QA (20260327090530)

- **Generated**: 2026-03-27 14:36:57 +05:30
- **HEAD Branch**: main
- **HEAD Commit ID**: ff28d65

## Available Tools

**JDKs**
- JDK 21.0.8: C:\Program Files\Java\jdk-21 (baseline compilation and tests in Step 2)
- JDK 25: **<TO_BE_INSTALLED>** (required by Step 1 and used in Steps 3-4)

**Build Tools**
- Maven CLI: **<TO_BE_INSTALLED>** (required by Step 1; no Maven installation detected)
- Maven Wrapper: Not present in project

## Guidelines

- Upgrade Java runtime to the latest LTS version.

## Options

- Working branch: appmod/java-upgrade-20260327090530
- Run tests before and after the upgrade: true

## Upgrade Goals

- Upgrade Java from 17 to 25 (latest LTS).

### Technology Stack

| Technology/Dependency | Current | Min Compatible | Why Incompatible |
| --------------------- | ------- | -------------- | ---------------- |
| Java | 17 (project source/target), JDK 21 installed | 25 | User requested target is latest LTS (Java 25) |
| Maven (CLI) | Not installed | 4.0+ preferred for Java 25 builds | Build tool unavailable; must install for compile/test execution |
| maven-compiler-plugin | Not explicitly pinned (implicit) | 3.14.0+ | Implicit plugin version is uncontrolled; pinning is safer for Java 25 compilation |
| maven-surefire-plugin | 3.2.5 | 3.2.5 | - |
| selenium-java | 4.19.1 | 4.19.1 | - |
| webdrivermanager | 5.7.0 | 5.7.0 | - |
| junit-jupiter | 5.10.2 | 5.10.2 | - |

### Derived Upgrades

- Install JDK 25 to satisfy the requested runtime target.
- Install Maven CLI to enable build/test execution because no Maven installation is currently available.
- Pin maven-compiler-plugin to 3.14.0 and set release to 25 to make Java 25 compilation deterministic.
- Update project Java compiler properties from 17 to 25 in pom.xml.

## Upgrade Steps

- Step 1: Setup Environment
  - **Rationale**: Required tools for Java 25 upgrade are missing from this machine.
  - **Changes to Make**:
    - [ ] Install JDK 25.
    - [ ] Install Maven CLI.
    - [ ] Verify both tools are discoverable.
  - **Verification**:
    - Command: `java -version` and `mvn -version`
    - Expected: Java 25 and Maven are available.

- Step 2: Setup Baseline
  - **Rationale**: Establish current compile/test baseline before editing project files.
  - **Changes to Make**:
    - [ ] Run baseline compile with current project configuration.
    - [ ] Run baseline tests and capture pass rate.
  - **Verification**:
    - Command: `mvn clean test-compile -q` then `mvn clean test -q`
    - JDK: C:\Program Files\Java\jdk-21
    - Expected: Baseline compile/test results documented in progress.md.

- Step 3: Upgrade Maven Build to Java 25
  - **Rationale**: Align build configuration with target runtime while keeping scope minimal.
  - **Changes to Make**:
    - [ ] Update maven.compiler.source from 17 to 25.
    - [ ] Update maven.compiler.target from 17 to 25.
    - [ ] Add and configure maven-compiler-plugin 3.14.0 with release 25.
    - [ ] Resolve any compilation issues caused by Java 25 targeting.
  - **Verification**:
    - Command: `mvn clean test-compile -q`
    - JDK: JDK 25 installation path from Step 1
    - Expected: Main and test code compilation succeeds.

- Step 4: Final Validation
  - **Rationale**: Confirm all goals are met and tests remain fully passing on target runtime.
  - **Changes to Make**:
    - [ ] Verify pom.xml reflects Java 25 target.
    - [ ] Perform clean rebuild on JDK 25.
    - [ ] Run full test suite and fix failures until 100% pass.
  - **Verification**:
    - Command: `mvn clean test -q`
    - JDK: JDK 25 installation path from Step 1
    - Expected: Compilation success and 100% tests passing.

## Key Challenges

- **Maven availability and Java 25 compatibility**
  - **Challenge**: No Maven installation exists; build cannot run without it.
  - **Strategy**: Install Maven first, then validate compile/test before and after config changes.
- **Toolchain transition from Java 17 target to 25 target**
  - **Challenge**: Compiler and test execution can fail if plugin settings are implicit or outdated.
  - **Strategy**: Pin maven-compiler-plugin and validate with clean test-compile and clean test.

## Plan Review

- All placeholders are resolved.
- Step sequence is feasible and each step changes project files or environment as required.
- No unfixable technical limitation identified at planning time.
