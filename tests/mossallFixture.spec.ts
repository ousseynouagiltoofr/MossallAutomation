import { test as baseTest, expect } from '@playwright/test';
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


// Créer une fixture personnalisée pour la connexion et déconnexion
const test = baseTest.extend({
  // Fixture personnalisée "authenticatedPage"
  authenticatedPage: async ({ page }, use) => {
    // Action avant d'utiliser la page dans les tests (connexion)
    await page.goto('https://app-dev.mossall.com/auth/login');
    await page.getByPlaceholder('awafall@mossal.com').fill('genieouzog+atos@gmail.com');
    await page.getByPlaceholder('entrer votre mot de passe').fill('$Mossal1234');
    await page.getByLabel('Se souvenir de moi').check();
    await page.getByRole('button', { name: 'Se connecter' }).click();

    // Utiliser la page dans le test
    await use(page);

    // Action après utilisation de la page dans les tests (déconnexion)
    await page.getByText('arrow_drop_down').click();
    await page.getByText('Déconnexion').click();
  }
});

// Test pour la création d'un collaborateur avec la fixture
test('ajout collaborateur', async ({ authenticatedPage }) => {
    await authenticatedPage.getByText('Collaborateurs').click();
    await authenticatedPage.getByRole('button', { name: '+ Ajouter un collaborateur' }).click();
    await expect(authenticatedPage.getByText('Création compte collaborateur')).toBeVisible();
  
    // Remplir les informations du collaborateur
    await authenticatedPage.getByLabel('Prénom').fill(prenom);
    await authenticatedPage.getByPlaceholder('Doe').fill(nom);
    await authenticatedPage.locator('#address').fill(email);
    await authenticatedPage.getByLabel('Téléphone').fill('77' + telephone.toString());
    await authenticatedPage.getByLabel('Fonction').fill('Homme daffaire');
    await authenticatedPage.locator('#birthDate').fill(birthday);
    await authenticatedPage.getByLabel('Matricule').fill(identifiant.toString());
    await authenticatedPage.getByLabel('Salaire').fill('2000000');
    await authenticatedPage.getByLabel('N° Compte Bancaire').fill('2000000');
    await authenticatedPage.getByRole('combobox').selectOption({ index: 0 });
    await authenticatedPage.getByRole('button', { name: 'Envoyé' }).click();
  });
  