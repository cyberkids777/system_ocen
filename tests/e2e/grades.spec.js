import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Login as teacher
    await page.goto('/');
    await page.locator('input[value="teacher"]').check();
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page.locator('text=Dodaj Przedmiot')).toBeVisible();
});

// TC-006: Przeglądanie Uczniów w Klasie
test('TC-006: View Students in Class', async ({ page }) => {
    // Krok 1: Kliknij "Klasy i Uczniowie"
    await page.locator('text=Klasy i Uczniowie').click();

    // Krok 2: Wybierz klasę
    await expect(page.locator('select')).toBeVisible();
    await page.locator('select').selectOption('Klasa 7a');

    // Krok 3: Sprawdź kolumny tabeli
    await expect(page.locator('th:has-text("Uczeń")')).toBeVisible();
    await expect(page.locator('th:has-text("Email")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();

    // Krok 4: Sprawdź statusy
    const statuses = page.locator('.inline-flex.rounded-full');
    await expect(statuses.first()).toBeVisible();
});

// TC-008: Wyszukiwanie Ucznia
test('TC-008: Search for Student', async ({ page }) => {
    // Przejdź do "Dodaj Oceny"
    await page.locator('text=Dodaj Oceny').click();

    // Krok 2: Wpisz "Adam" w wyszukiwarkę
    await page.locator('input[placeholder="Szukaj ucznia..."]').fill('Adam');

    // Sprawdź że tylko Adam jest widoczny
    await expect(page.locator('text=Adam Nowak')).toBeVisible();

    // Krok 4: Wyczyść wyszukiwanie
    await page.locator('input[placeholder="Szukaj ucznia..."]').clear();

    // Sprawdź że wszyscy studenci są znowu widoczni
    const rows = page.locator('tbody tr');
    const count = await rows.count();
    expect(count).toBeGreaterThan(1);
});
