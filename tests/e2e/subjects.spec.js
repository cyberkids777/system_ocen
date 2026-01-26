import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Login as teacher before each test
    await page.goto('/');
    await page.locator('input[value="teacher"]').check();
    await page.locator('input[type="email"]').fill('teacher@example.com');
    await page.locator('input[type="password"]').fill('password123');
    await page.locator('button:has-text("Zaloguj się")').click();
    await expect(page.locator('text=Dodaj Przedmiot')).toBeVisible();
});

// TC-003: Dodawanie Nowego Przedmiotu
test('TC-003: Add New Subject', async ({ page }) => {
    // Krok 1: Kliknij "Dodaj Przedmiot"
    await page.locator('text=Dodaj Przedmiot').click();

    // Sprawdź czy formularz się wyświetla
    await expect(page.locator('text=Nazwa przedmiotu')).toBeVisible();

    // Krok 2 i 3: Wpisz dane
    await page.locator('input[placeholder="np. Matematyka"]').fill('Chemia');
    await page.locator('input[placeholder="np. Nauka matematyki"]').fill('Podstawy chemii organicznej');

    // Krok 4: Dodaj przedmiot
    await page.locator('button:has-text("Dodaj Przedmiot")').click();

    // Krok 5: Sprawdź czy przedmiot się pojawił
    await expect(page.locator('text=Chemia')).toBeVisible();
    await expect(page.locator('text=Podstawy chemii organicznej')).toBeVisible();
});

// TC-004: Usuwanie Przedmiotu
test('TC-004: Delete Subject', async ({ page }) => {
    await page.locator('text=Dodaj Przedmiot').click();

    // Znajdź pierwszy przedmiot na liście i usuń
    const firstDeleteButton = page.locator('button:has-text("Usuń")').first();
    const subjectName = await page.locator('.font-medium').first().innerText();

    await firstDeleteButton.click();

    // Sprawdź czy przedmiot zniknął
    await expect(page.locator(`text="${subjectName}"`)).not.toBeVisible();
});

// TC-005: Przeglądanie Listy Przedmiotów
test('TC-005: View Subjects List', async ({ page }) => {
    // Krok 1: Kliknij "Przedmioty"
    await page.locator('text=Przedmioty').first().click();

    // Krok 2-4: Sprawdź elementy
    await expect(page.locator('text=Moje przedmioty')).toBeVisible();

    // Sprawdź czy przedmioty mają nazwy
    const subjectCards = page.locator('[class*="border-gray-200"]');
    const count = await subjectCards.count();
    expect(count).toBeGreaterThan(0);

    // Sprawdź czy każdy przedmiot ma liczbę uczniów
    await expect(page.locator('text=/\\d+ uczniów/')).toBeVisible();

    // Sprawdź ikony
    await expect(page.locator('.material-symbols-outlined:has-text("book")')).toBeVisible();
});
