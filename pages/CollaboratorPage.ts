import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';


export class CollaboratorPage extends BasePage {
    readonly page: Page;
    readonly collaboratorMenu: Locator;
    readonly addColaboratorButton: Locator;
    readonly collaboratorFirstName: Locator;
    readonly collaboratorLasttName: Locator;
    readonly collaboratorEmail: Locator;
    readonly collaboratorPhone: Locator;
    readonly collaboratorFonction: Locator;
    readonly collaboratorBirthDate: Locator;
    readonly collaboratorId: Locator;
    readonly collaboratorSalary: Locator;
    readonly collaboratorBankAccount: Locator;
    readonly collaboratorPaymentMethod: Locator;
    readonly saveButton: Locator;

    constructor(page: Page) {   
        super(page);
        this.page = page;
        this.collaboratorMenu = page.getByText('Collaborateurs');
        this.addColaboratorButton = page.getByRole('button', { name: '+ Ajouter un collaborateur' });
        this.collaboratorFirstName = page.getByLabel('Prénom');
        this.collaboratorLasttName = page.getByPlaceholder('Doe');
        this.collaboratorEmail = page.locator('#address');
        this.collaboratorPhone = page.getByLabel('Téléphone');
        this.collaboratorBirthDate = page.locator('#birthDate');
        this.collaboratorFonction = page.getByLabel('Fonction');
        this.collaboratorId = page.getByLabel('Matricule');
        this.collaboratorSalary = page.getByLabel('Salaire');
        this.collaboratorBankAccount = page.getByLabel('N° Compte Bancaire');
        this.collaboratorPaymentMethod = page.getByRole('combobox');
        this.saveButton = page.getByRole('button', { name: 'Envoyé' });
    }

    async addCollaborator(firstname: string, lastname: string, email: string, phone: string,  birthdate: string, fonction: string, id: string, salary: string, bankAccount: string, paymentMethod: string) {
        await this.collaboratorMenu.click();
        await this.addColaboratorButton.click();
        await this.collaboratorFirstName.fill(firstname);
        await this.collaboratorLasttName.fill(lastname);
        await this.collaboratorEmail.fill(email);
        await this.collaboratorPhone.fill(phone);
        await this.collaboratorFonction.fill(fonction);
        await this.collaboratorBirthDate.fill(birthdate);
        await this.collaboratorId.fill(id);
        await this.collaboratorSalary.fill(salary);
        await this.collaboratorBankAccount.fill(bankAccount);
        await this.collaboratorPaymentMethod.selectOption({ index: 0 });
        await this.saveButton.click();
    }
}
