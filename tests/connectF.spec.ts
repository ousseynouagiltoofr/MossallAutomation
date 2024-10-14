import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const email = faker.internet.email();
const prenom = faker.person.firstName();
const nom = faker.person.lastName();
//const password = faker.internet.password();
const identifiant = faker.number.int({ min: 1000, max: 9999 })
const telephone = faker.number.int({min: 1000000, max:9999999})
const birthdayDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
const birthday = birthdayDate.toISOString().split('T')[0];
//const phoneNumber = faker.phone.number('77#######');

// Créer une fixture pour la connexion
test.beforeEach(async ({ page }) => {
  // Fixture pour la connexion
  await login(page);
});

test.afterEach(async ({ page }) => {
  await logout(page);
});

// Fonction de connexion commune
async function login(page) {
  await page.goto('https://app-dev.mossall.com/auth/login');
  await page.getByPlaceholder('awafall@mossal.com').fill('genieouzog+atos@gmail.com');
  await page.getByPlaceholder('entrer votre mot de passe').fill('$Mossal1234');
  await page.getByLabel('Se souvenir de moi').check();
  await page.getByRole('button', { name: 'Se connecter' }).click();
}

// Test pour la création d'un collaborateur
test('create collaborator', async ({ page }) => {
  await page.getByText('Collaborateurs').click();
  await page.getByRole('button', { name: '+ Ajouter un collaborateur' }).click();
  await expect(page.getByText('Création compte collaborateur')).toBeVisible();

  // Remplissage des informations du collaborateur
  await page.getByLabel('Prénom').fill(prenom);
  await page.getByPlaceholder('Doe').fill(nom);
  await page.locator('#address').fill(email);
  await page.getByLabel('Téléphone').fill('77' + telephone.toString());
  await page.getByLabel('Fonction').fill('Homme daffaire');
  await page.locator('#birthDate').fill(birthday);
  await page.getByLabel('Matricule').fill(identifiant.toString());
  await page.getByLabel('Salaire').fill('2000000');
  await page.getByLabel('N° Compte Bancaire').fill('2000000');
  await page.getByRole('combobox').selectOption({ index: 0 });
  await page.getByRole('button', { name: 'Envoyé' }).click();
});


async function logout(page) {
  await page.getByText('arrow_drop_down').click();
  await page.getByText('Déconnexion').click();
}