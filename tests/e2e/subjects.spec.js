import { test, expect } from '@playwright/test';

// Helper to login as teacher
async function loginAsTeacher(page) {
    await page.goto('/');
    await page.locator('input[type="email"]').fill('jan.kowalski@szkola.pl');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page).toHaveURL('/teacher/subjects');
}

// TC-003: Dodawanie Nowego Przedmiotu
test('TC-003: Add New Subject', async ({ page }) => {
    await loginAsTeacher(page);

    // Już jesteśmy na /teacher/subjects
    await expect(page.locator('text=Moje przedmioty')).toBeVisible();

    // Wpisz dane
    await page.locator('button:has-text("Dodaj przedmiot")').click();
    await page.locator('input[placeholder="np. Matematyka"]').fill('Chemia');
    await page.locator('input[placeholder="np. Nauka matematyki"]').fill('Podstawy chemii organicznej');

    // Dodaj przedmiot i wróć na główną
    await page.locator('button:has-text("Dodaj przedmiot")').last().click();
    await page.locator('button:has-text("Przedmioty")').click();

    // Sprawdź czy przedmiot się pojawił
    await expect(page.locator('text=Chemia').first()).toBeVisible();
});

// TC-004: Usuwanie Przedmiotu
test('TC-004: Delete Subject', async ({ page }) => {
    await loginAsTeacher(page);
    const subjectName = 'Chemia';

    page.once('dialog', dialog => dialog.accept());
    const card = page.getByTestId('subject-card').filter({ hasText: subjectName });
    await card.locator('button:has-text("close")').click();
    await expect(page.locator(`text=${subjectName}`)).not.toBeVisible();
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
    await expect(count).toBeGreaterThan(0);
});
