/**
   * Playwright Java Page Object Model Only
   */
  PLAYWRIGHT_JAVA_POM: `
        Instructions:
        - Generate ONLY a Playwright Java Page Object Model class (no test code).
        - Add JavaDoc comments for the class and methods.
        - Use com.microsoft.playwright imports.
        - Use Playwright locators and Page APIs.
        - Do NOT include Selenium WebDriver code.
        - Do NOT include test runner setup.
    
        Context:
        DOM:
        \`\`\`html
        \${domContent}
        \`\`\`
    
        Example:
        \`\`\`java
        package com.testleaf.pages;
    
        import com.microsoft.playwright.Locator;
        import com.microsoft.playwright.Page;
    
        /**
         * Page Object for Login Page
         */
        public class LoginPage {
            private final Page page;
            private final Locator usernameInput;
            private final Locator passwordInput;
            private final Locator loginButton;
    
            public LoginPage(Page page) {
                this.page = page;
                this.usernameInput = page.locator("input#username");
                this.passwordInput = page.locator("input#password");
                this.loginButton = page.locator("button:has-text(\"Login\")");
            }
        }
        \`\`\`
    
        Persona:
        - Audience: Automation engineers building Playwright Java POMs.
    
        Output Format:
        - A single Java class inside a \`\`\`java\`\`\` block.
    
        Tone:
        - Clean, maintainable, enterprise-ready.
      `,
    
      PLAYWRIGHT_JAVA_SPEC: `
        Instructions:
        - Generate ONLY a Playwright Java test class (no Page Object code).
        - Use TestNG and Playwright Java APIs.
        - Include @BeforeMethod and @AfterMethod setup and teardown.
        - Use Page, Browser, BrowserContext, and Playwright APIs.
        - Do NOT include Selenium WebDriver code.
    
        Context:
        DOM:
        \`\`\`html
        \${domContent}
        \`\`\`
        URL: \${pageUrl}
    
        Example:
        \`\`\`java
        import com.microsoft.playwright.*;
        import org.testng.annotations.*;
    
        public class LoginTest {
            private Playwright playwright;
            private Browser browser;
            private BrowserContext context;
            private Page page;
    
            @BeforeMethod
            public void setUp() {
                playwright = Playwright.create();
                browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
                context = browser.newContext();
                page = context.newPage();
                page.navigate("\${pageUrl}");
            }
    
            @AfterMethod
            public void tearDown() {
                context.close();
                browser.close();
                playwright.close();
            }
    
            @Test
            public void successfulLogin() {
                page.fill("input#username", "admin");
                page.fill("input#password", "admin123");
                page.click("button:has-text(\"Login\")");
                page.waitForURL("**/dashboard");
            }
        }
        \`\`\`
    
        Persona:
        - Audience: QA engineers writing Playwright Java test specs.
    
        Output Format:
        - A single Java class inside a \`\`\`java\`\`\` block.
    
        Tone:
        - Executable, modern, Playwright-first.
      `,
    
      PLAYWRIGHT_JAVA_POM_AND_SPEC: `
        Instructions:
        - Generate BOTH:
          1. A Playwright Java Page Object Model class.
          2. A Playwright Java TestNG test class that uses the POM.
        - Do NOT include Selenium WebDriver code.
        - Use Playwright Java APIs and POM best practices.
        - Both classes should be complete and immediately executable.
    
        Context:
        DOM:
        \`\`\`html
        \${domContent}
        \`\`\`
        URL: \${pageUrl}
    
        Example:
        \`\`\`java
        // pages/LoginPage.java
        package com.testleaf.pages;
    
        import com.microsoft.playwright.Locator;
        import com.microsoft.playwright.Page;
    
        public class LoginPage {
            private final Page page;
            private final Locator usernameInput;
            private final Locator passwordInput;
            private final Locator loginButton;
    
            public LoginPage(Page page) {
                this.page = page;
                this.usernameInput = page.locator("input#username");
                this.passwordInput = page.locator("input#password");
                this.loginButton = page.locator("button:has-text(\"Login\")");
            }
    
            public void navigateTo(String url) {
                page.navigate(url);
            }
    
            public void login(String user, String pass) {
                usernameInput.fill(user);
                passwordInput.fill(pass);
                loginButton.click();
            }
        }
        \`\`\`
    
        \`\`\`java
        // tests/LoginTest.java
        package com.testleaf.tests;
    
        import com.microsoft.playwright.*;
        import com.testleaf.pages.LoginPage;
        import org.testng.annotations.*;
    
        public class LoginTest {
            private Playwright playwright;
            private Browser browser;
            private BrowserContext context;
            private Page page;
            private LoginPage loginPage;
    
            @BeforeMethod
            public void setUp() {
                playwright = Playwright.create();
                browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(true));
                context = browser.newContext();
                page = context.newPage();
                loginPage = new LoginPage(page);
                loginPage.navigateTo("\${pageUrl}");
            }
    
            @AfterMethod
            public void tearDown() {
                context.close();
                browser.close();
                playwright.close();
            }
    
            @Test
            public void successfulLogin() {
                loginPage.login("admin", "admin123");
                page.waitForURL("**/dashboard");
            }
        }
        \`\`\`
    
        Persona:
        - Audience: Engineers building complete Playwright Java POM test suites.
    
        Output Format:
        - First \`\`\`java\`\`\` block: POM class
        - Second \`\`\`java\`\`\` block: test class
    
        Tone:
        - Professional, modular, Playwright-ready.
      `,