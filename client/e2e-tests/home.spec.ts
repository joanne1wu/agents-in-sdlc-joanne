import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('Tailspin Toys - Crowdfunding your new favorite game!');
  });

  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main heading is present
    const mainHeading = page.locator('h1').first();
    await expect(mainHeading).toHaveText('Tailspin Toys');
  });

  test('should display the welcome message', async ({ page }) => {
    await page.goto('/');
    
    // Check that the welcome message is present
    const welcomeMessage = page.locator('p').first();
    await expect(welcomeMessage).toHaveText('Find your next game! And maybe even back one! Explore our collection!');
  });

  test('should display the games grid with games loaded', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the games grid to load
    await page.waitForSelector('[data-testid="games-grid"]', { timeout: 10000 });
    
    // Check that the games grid is visible
    const gamesGrid = page.locator('[data-testid="games-grid"]');
    await expect(gamesGrid).toBeVisible();
    
    // Check that at least one game card is present
    const gameCards = page.locator('[data-testid="game-card"]');
    await expect(gameCards.first()).toBeVisible();
    
    // Verify we have multiple games displayed
    const gameCount = await gameCards.count();
    expect(gameCount).toBeGreaterThan(0);
  });
});
