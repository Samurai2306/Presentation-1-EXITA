import { test, expect } from "@playwright/test";

test("happy path: concierge → rais → microzone", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Ассистент EXITA", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Открыть меню навигации" }),
  ).toBeVisible();

  await page.goto("/rais");
  await expect(page.getByText("EXITA / RAIS", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Редакторша" }).click();

  await expect(page.getByRole("heading", { name: "Редакторша" }).first()).toBeVisible();
  await expect(page.getByText("Демо‑анализ", { exact: true })).toBeVisible();
});

test("burger navigation control exists on all main pages", async ({ page }) => {
  for (const route of ["/", "/about", "/global", "/nep", "/rais"]) {
    await page.goto(route);
    await expect(
      page.getByRole("button", { name: "Открыть меню навигации" }),
    ).toBeVisible();
  }
});
