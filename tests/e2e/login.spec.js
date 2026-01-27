import { test, expect } from '@playwright/test';

// TC-001: Logowanie jako Nauczyciel
test('TC-001: Login as Teacher', async ({ page }) => {
    await page.goto('/');

    // Sprawdź czy strona logowania się wyświetla
    await expect(page.locator('h2:has-text("Zaloguj się")')).toBeVisible();

    // Radio "Nauczyciel" jest domyślnie zaznaczony
    await expect(page.locator('input[value="teacher"]')).toBeChecked();

    // Wprowadź dane logowania
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');

    // Kliknij "Zaloguj się"
    await page.locator('button:has-text("Zaloguj się")').click();

    // Sprawdź przekierowanie do /teacher/add-subject
    await expect(page).toHaveURL('/teacher/add-subject');
    await expect(page.locator('text=Nazwa przedmiotu')).toBeVisible();
});

// TC-002: Logowanie jako Uczeń
test('TC-002: Login as Student', async ({ page }) => {
    await page.goto('/');

    // Wybierz opcję "Uczeń"
    await page.locator('input[value="student"]').check();
    await expect(page.locator('input[value="student"]')).toBeChecked();

    // Wprowadź dane
    await page.locator('input[type="email"]').fill('student@example.com');
    await page.locator('input[type="password"]').fill('password123');

    // Zaloguj się
    await page.locator('button:has-text("Zaloguj się")').click();

    // Sprawdź przekierowanie do /student/grades
    await expect(page).toHaveURL('/student/grades');
    await expect(page.locator('text=Moje Oceny')).toBeVisible();
});
