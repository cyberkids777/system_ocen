import { test, expect } from '@playwright/test';

async function loginAsTeacher(page) {
    await page.goto('/');
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page).toHaveURL('/teacher/add-subject');
}

// TC-006: Przeglądanie Uczniów w Klasie
test('TC-006: View Students in Class', async ({ page }) => {
    await loginAsTeacher(page);

    // Kliknij "Klasy i Uczniowie"
    await page.locator('button:has-text("Klasy i Uczniowie")').click();

    // Sprawdź URL i tabelę
    await expect(page).toHaveURL('/teacher/classes');
    await expect(page.locator('select')).toBeVisible();
    await expect(page.locator('th:has-text("Uczeń")')).toBeVisible();
    await expect(page.locator('th:has-text("Email")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
});

// TC-008: Wyszukiwanie Ucznia
test('TC-008: Search for Student', async ({ page }) => {
    await loginAsTeacher(page);

    // Kliknij "Dodaj oceny"
    await page.locator('button:has-text("Dodaj oceny")').click();

    // Sprawdź URL
    await expect(page).toHaveURL('/teacher/grades');
    await expect(page.locator('input[placeholder="Szukaj ucznia..."]')).toBeVisible();

    const rowsBeforeSearch = await page.locator('tbody tr').count();
    expect(rowsBeforeSearch).toBeGreaterThan(0);

    // Wpisz "Adam"
    await page.locator('input[placeholder="Szukaj ucznia..."]').fill('Adam');
    await page.waitForTimeout(300);

    await expect(page.locator('text=Adam Nowak')).toBeVisible();
    const rowsAfterSearch = await page.locator('tbody tr').count();
    expect(rowsAfterSearch).toBeLessThanOrEqual(rowsBeforeSearch);
});
