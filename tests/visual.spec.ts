import { test, expect } from "@playwright/test";

const routes = ["/", "/global", "/nep", "/rais", "/rais/redaktorsha"];

for (const route of routes) {
  test(`visual: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveScreenshot({
      fullPage: true,
      animations: "disabled",
    });
  });
}

