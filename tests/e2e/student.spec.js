import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Login as student
    await page.goto('/');
    await page.locator('input[value="student"]').check();
    await page.locator('input[type="email"]').fill('student@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page.locator('text=Moje Oceny')).toBeVisible();
});

// TC-009: Wyświetlanie Ocen z Przedmiotu
test('TC-009: View Grades for Subject', async ({ page }) => {
    // Krok 1: Kliknij "Moje Oceny"
    await page.locator('text=Moje Oceny').first().click();

    // Krok 2: Wybierz przedmiot
    await page.locator('select').selectOption({ index: 0 });

    // Krok 3: Sprawdź średnią
    await expect(page.locator('text=Średnia')).toBeVisible();
    await expect(page.locator('[class*="text-[#D0BB95]"]').filter({ hasText: /\d+\.\d+/ })).toBeVisible();

    // Krok 5: Sprawdź statystyki
    await expect(page.locator('text=Liczba ocen')).toBeVisible();
    await expect(page.locator('text=Najwyższa')).toBeVisible();
    await expect(page.locator('text=Najniższa')).toBeVisible();
});

// TC-010: Przeglądanie Wszystkich Przedmiotów
test('TC-010: View All Subjects', async ({ page }) => {
    // Krok 1: Kliknij "Moje Przedmioty"
    await page.locator('text=Moje Przedmioty').click();

    // Krok 2: Sprawdź karty przedmiotów
    await expect(page.locator('text=Przedmioty i średnie')).toBeVisible();

    const subjectCards = page.locator('[class*="border-gray-200"]');
    const count = await subjectCards.count();
    expect(count).toBeGreaterThan(0);

    // Sprawdź że każdy przedmiot ma średnią
    await expect(page.locator('text=Średnia')).toBeVisible();

    // Krok 4: Kliknij "Szczegóły"
    await page.locator('button:has-text("Szczegóły")').first().click();

    // Sprawdź przekierowanie
    await expect(page.locator('select')).toBeVisible();
});
