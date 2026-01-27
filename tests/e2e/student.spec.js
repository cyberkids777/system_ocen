import { test, expect } from '@playwright/test';

async function loginAsStudent(page) {
    await page.goto('/');
    await page.locator('input[value="student"]').check();
    await page.locator('input[type="email"]').fill('student@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page).toHaveURL('/student/grades');
}

// TC-009: Wyświetlanie Ocen z Przedmiotu
test('TC-009: View Grades for Subject', async ({ page }) => {
    await loginAsStudent(page);

    // Już jesteśmy na /student/grades
    await expect(page.locator('select')).toBeVisible();
    await expect(page.locator('text=Średnia')).toBeVisible();
    await expect(page.locator('text=Liczba ocen')).toBeVisible();
    await expect(page.locator('text=Najwyższa')).toBeVisible();
    await expect(page.locator('text=Najniższa')).toBeVisible();
    await expect(page.locator('text=Oceny').first()).toBeVisible();
});

// TC-010: Przeglądanie Wszystkich Przedmiotów
test('TC-010: View All Subjects', async ({ page }) => {
    await loginAsStudent(page);

    // Kliknij "Moje Przedmioty"
    await page.locator('button:has-text("Moje Przedmioty")').click();

    // Sprawdź URL i zawartość
    await expect(page).toHaveURL('/student/subjects');
    await expect(page.locator('text=Przedmioty i średnie')).toBeVisible();

    const subjectCards = page.locator('[class*="border-gray-200"]');
    const count = await subjectCards.count();
    expect(count).toBeGreaterThan(0);

    // Kliknij "Szczegóły" 
    await page.locator('button:has-text("Szczegóły")').first().click();

    // Sprawdź przekierowanie
    await expect(page).toHaveURL('/student/grades');
    await expect(page.locator('select')).toBeVisible();
});
