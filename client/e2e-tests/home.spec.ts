import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the correct title', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle('Tailspin Toys - Crowdfunding your new favorite game!');
  });

  test('should display the main heading', async ({ page }) => {
    await page.goto('/');
    
    // Check that the main heading is present - use a more specific selector
    const mainHeading = page.locator('h1', { hasText: 'Welcome to Tailspin Toys' });
    await expect(mainHeading).toHaveText('Welcome to Tailspin Toys');
  });

  test('should display the welcome message', async ({ page }) => {
    await page.goto('/');
    
    // Check that the welcome message is present
    const welcomeMessage = page.locator('p').first();
    await expect(welcomeMessage).toHaveText('Find your next game! And maybe even back one! Explore our collection!');
  });

  test('should have games grid loaded', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the games grid to be present
    await page.waitForSelector('[data-testid="games-grid"]', { timeout: 10000 });
    
    // Check that the games grid is visible
    const gamesGrid = page.locator('[data-testid="games-grid"]');
    await expect(gamesGrid).toBeVisible();
  });

  test('should display Featured Games section title', async ({ page }) => {
    await page.goto('/');
    
    // Check that the Featured Games heading is present
    const featuredGamesHeading = page.locator('h2', { hasText: 'Featured Games' });
    await expect(featuredGamesHeading).toBeVisible();
    await expect(featuredGamesHeading).toHaveText('Featured Games');
  });
});
