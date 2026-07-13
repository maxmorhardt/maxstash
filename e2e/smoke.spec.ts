import { test, expect } from '@playwright/test';

test('home page loads and renders', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Max Morhardt/);
  await expect(page.getByRole('link', { name: /maxstash home/i })).toBeVisible();
});
