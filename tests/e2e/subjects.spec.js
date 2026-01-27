import { test, expect } from '@playwright/test';

// Helper to login as teacher
async function loginAsTeacher(page) {
    await page.goto('/');
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page).toHaveURL('/teacher/add-subject');
}

// TC-003: Dodawanie Nowego Przedmiotu
test('TC-003: Add New Subject', async ({ page }) => {
    await loginAsTeacher(page);

    // Już jesteśmy na /teacher/add-subject
    await expect(page.locator('text=Nazwa przedmiotu')).toBeVisible();

    // Wpisz dane
    await page.locator('input[placeholder="np. Matematyka"]').fill('Chemia');
    await page.locator('input[placeholder="np. Nauka matematyki"]').fill('Podstawy chemii organicznej');

    // Dodaj przedmiot
    await page.locator('button:has-text("Dodaj przedmiot")').last().click();

    // Sprawdź czy przedmiot się pojawił
    await expect(page.locator('.font-medium:has-text("Chemia")')).toBeVisible();
    await expect(page.locator('text=Podstawy chemii organicznej')).toBeVisible();
});

// TC-004: Usuwanie Przedmiotu
test('TC-004: Delete Subject', async ({ page }) => {
    await loginAsTeacher(page);

    const countBefore = await page.locator('button:has-text("Usuń")').count();
    await page.locator('button:has-text("Usuń")').first().click();

    const countAfter = await page.locator('button:has-text("Usuń")').count();
    expect(countAfter).toBe(countBefore - 1);
});

// TC-005: Przeglądanie Listy Przedmiotów
test('TC-005: View Subjects List', async ({ page }) => {
    await loginAsTeacher(page);

    // Kliknij "Przedmioty" w sidebarze
    await page.locator('button:has-text("Przedmioty")').click();

    // Sprawdź URL i zawartość
    await expect(page).toHaveURL('/teacher/subjects');
    await expect(page.locator('text=Moje przedmioty')).toBeVisible();

    // Sprawdź czy przedmioty się wyświetlają
    const subjectCards = page.locator('[class*="border-gray-200"]').filter({ hasText: /uczniów/ });
    const count = await subjectCards.count();
    expect(count).toBeGreaterThan(0);
});
