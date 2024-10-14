import { test, expect } from '@playwright/test';

// Fonction de connexion réutilisable
async function login(page, email, password) {
  await page.goto('https://app-dev.mossall.com/auth/login');
  await page.getByPlaceholder('awafall@mossal.com').fill(email);
  await page.getByPlaceholder('entrer votre mot de passe').fill(password);
  await page.getByLabel('Se souvenir de moi').check();
  await page.getByRole('button', { name: 'Se connecter' }).click();
}

// Utiliser la fonction dans un test
test('test de connexion', async ({ page }) => {
  await login(page, 'genieouzog+atos@gmail.com', '$Mossal1234');
  await page.getByText('Collaborateurs').click();
  // Vérifier si la page des collaborateurs est bien visible
  await expect(page).toHaveURL('https://app-dev.mossall.com/dashboard/collaborators');
});


