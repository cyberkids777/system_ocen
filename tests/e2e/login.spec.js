import { test, expect } from '@playwright/test';

// TC-001: Logowanie jako Nauczyciel
test('TC-001: Login as Teacher', async ({ page }) => {
    // Krok 1: Otwórz aplikację
    await page.goto('/');

    // Sprawdź czy strona logowania się wyświetla
    await expect(page.locator('text=Zaloguj się')).toBeVisible();

    // Krok 2: Wybierz opcję "Nauczyciel"
    await page.locator('input[value="teacher"]').check();
    await expect(page.locator('input[value="teacher"]')).toBeChecked();

    // Krok 3 i 4: Wprowadź dane logowania
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');

    // Krok 5: Kliknij "Zaloguj się"
    await page.locator('button:has-text("Zaloguj się")').click();

    // Sprawdź przekierowanie do panelu nauczyciela
    await expect(page).toHaveURL(/\//, { timeout: 3000 });
    // Powinna być widoczna nawigacja nauczyciela
    await expect(page.locator('text=Dodaj Przedmiot')).toBeVisible();
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

    // Sprawdź przekierowanie do panelu ucznia
    await expect(page.locator('text=Moje Oceny')).toBeVisible();
});
