package com.talentflow;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.junit.jupiter.api.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

@TestMethodOrder(MethodOrderer.DisplayName.class)
public class TalentFlowE2ETest {

    private static final String BASE_URL = System.getProperty("baseUrl", "http://localhost:8000");

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeAll
    static void setupDriverBinary() {
        WebDriverManager.chromedriver().setup();
    }

    @BeforeEach
    void setup() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--window-size=1440,1000");

        // Run in headless mode by default for CI; pass -Dheadless=false for local visual runs.
        boolean headless = Boolean.parseBoolean(System.getProperty("headless", "true"));
        if (headless) {
            options.addArguments("--headless=new");
        }

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(12));
        driver.get(BASE_URL);
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("page-dashboard")));
    }

    @AfterEach
    void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Test
    @DisplayName("1. Dashboard loads with key widgets")
    void dashboardLoadsWithWidgets() {
        String title = driver.getTitle();
        Assertions.assertTrue(title.contains("TalentFlow"), "Page title should contain TalentFlow");

        WebElement statJobs = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("statJobs")));
        WebElement statApps = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("statApps")));
        WebElement recentList = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("recentApps")));

        Assertions.assertFalse(statJobs.getText().isBlank(), "Active jobs stat must not be blank");
        Assertions.assertFalse(statApps.getText().isBlank(), "Applications stat must not be blank");
        Assertions.assertTrue(recentList.findElements(By.className("recent-app-item")).size() > 0,
                "Recent applications should have at least one item");
    }

    @Test
    @DisplayName("2. Sidebar navigation switches pages")
    void sidebarNavigationWorks() {
        clickNav("jobs");
        assertPageVisible("page-jobs");

        clickNav("applications");
        assertPageVisible("page-applications");

        clickNav("candidates");
        assertPageVisible("page-candidates");

        clickNav("post-job");
        assertPageVisible("page-post-job");
    }

    @Test
    @DisplayName("3. Job filters update listing")
    void jobFiltersWork() {
        clickNav("jobs");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("jobsGrid")));

        driver.findElement(By.cssSelector(".filter-btn[data-filter='open']")).click();
        List<WebElement> openBadges = wait.until(
                ExpectedConditions.numberOfElementsToBeMoreThan(By.cssSelector("#jobsGrid .job-status-badge"), 0)
        );

        for (WebElement badge : openBadges) {
            Assertions.assertEquals("open", badge.getText().trim().toLowerCase(),
                    "All badges should show open after open filter");
        }
    }

    @Test
    @DisplayName("4. Application stage update shows toast")
    void stageUpdateShowsToast() {
        clickNav("applications");
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("appsTableBody")));

        WebElement firstStage = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector("#appsTableBody .stage-select")));
        Select select = new Select(firstStage);

        String current = select.getFirstSelectedOption().getText();
        String target = current.equals("Interview") ? "Offer" : "Interview";
        select.selectByVisibleText(target);

        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));
        Assertions.assertTrue(toast.getText().toLowerCase().contains("moved to"),
                "Toast should confirm stage movement");
    }

    @Test
    @DisplayName("5. Global search finds candidate and routes to applications")
    void globalSearchWorks() {
        WebElement search = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("globalSearch")));
        search.clear();
        search.sendKeys("Ayesha");

        wait.until(d -> isVisible("page-applications"));
        wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.cssSelector("#appsTableBody tr"), 0));

        String bodyText = driver.findElement(By.id("appsTableBody")).getText().toLowerCase();
        Assertions.assertTrue(bodyText.contains("ayesha"), "Search result should include Ayesha");
    }

    @Test
    @DisplayName("6. Command palette can toggle theme")
    void commandPaletteAndThemeToggleWork() {
        String classBefore = driver.findElement(By.tagName("body")).getAttribute("class");

        WebElement cmdBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("cmdBtn")));
        cmdBtn.click();

        wait.until(ExpectedConditions.attributeContains(By.id("commandModal"), "class", "open"));
        WebElement toggleCmd = wait.until(ExpectedConditions.elementToBeClickable(
                By.cssSelector(".command-item[data-command='toggle-theme']")));
        toggleCmd.click();

        wait.until(d -> {
            String bodyClass = d.findElement(By.tagName("body")).getAttribute("class");
            return !safe(bodyClass).equals(safe(classBefore));
        });
    }

    @Test
    @DisplayName("7. Quick actions export CSV and navigate")
    void quickActionsWork() {
        WebElement qaMain = wait.until(ExpectedConditions.elementToBeClickable(By.id("qaMain")));
        qaMain.click();

        wait.until(ExpectedConditions.attributeContains(By.id("qaMenu"), "class", "open"));
        WebElement exportBtn = wait.until(ExpectedConditions.elementToBeClickable(By.id("exportCsvBtn")));
        exportBtn.click();

        WebElement toast = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("toast")));
        Assertions.assertTrue(toast.getText().toLowerCase().contains("exported"),
                "Export action should show exported toast message");

        qaMain = wait.until(ExpectedConditions.elementToBeClickable(By.id("qaMain")));
        qaMain.click();
        WebElement postJobAction = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".qa-item[data-page='post-job']")));
        postJobAction.click();

        assertPageVisible("page-post-job");
    }

    private void clickNav(String page) {
        WebElement nav = wait.until(ExpectedConditions.elementToBeClickable(By.cssSelector(".nav-item[data-page='" + page + "']")));
        nav.click();
    }

    private void assertPageVisible(String pageId) {
        wait.until(d -> isVisible(pageId));
        Assertions.assertTrue(isVisible(pageId), "Expected visible page: " + pageId);
    }

    private boolean isVisible(String pageId) {
        WebElement page = driver.findElement(By.id(pageId));
        String cls = safe(page.getAttribute("class"));
        return !cls.contains("hidden");
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
