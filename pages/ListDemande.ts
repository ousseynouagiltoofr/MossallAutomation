import type { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class ListDemande extends BasePage {
    readonly page: Page;
    readonly demandeMenu: Locator;
    readonly demandeStatut: Locator;
    readonly demandeValide: Locator;
    readonly demandeList: Locator;
    readonly demandeDropdown: Locator;
    readonly demandeValideSelect: Locator;
    readonly firstLineDemande: Locator;
    readonly columnRembourse: Locator;
    readonly selectRembourse: Locator;
    readonly clickRembourse: Locator;
    readonly confirmButton: Locator;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.demandeMenu = page.getByText('Liste des demandes');
        this.demandeStatut = page.getByText('Statut');
        this.demandeValide = page.getByText('Validée');
        this.demandeList = page.getByText('Liste des demandes');
        this.demandeDropdown = page.locator('.dropdown > .mat-icon').first();
        this.demandeValideSelect = page.locator('#dropdown-statut').getByText('Validée');
        this.firstLineDemande = page.getByRole('row').nth(1).locator('mat-icon');
        this.columnRembourse = page.getByRole('cell', { name: 'Validée Remboursée' }).locator('span').nth(2);
        this.selectRembourse = page.locator('.btn-edit-statut > .text').first();
        this.clickRembourse = page.getByText('Remboursée').nth(1);
        this.confirmButton = page.getByRole('button', { name: 'Confirmer' });
    } 

    async validerUneDemande() {
        await this.demandeMenu.click();
        await this.demandeStatut.click();
        await this.demandeValide.click();
        await this.demandeList.click();
        await this.demandeDropdown.click();
        await this.demandeValideSelect.click();
        await this.firstLineDemande.click();
        await this.columnRembourse.click();
        await this.selectRembourse.click();
        await this.clickRembourse.click();
        await this.confirmButton.click();
    }
}