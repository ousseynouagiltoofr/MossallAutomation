import type { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly seSouvenirDeMoi: Locator;
    readonly loginButton: Locator;
    readonly deconnecter: Locator;
    readonly logoutButton: Locator;
    constructor(page: Page) { 
        this.page = page;
        this.email = page.getByPlaceholder('awafall@mossal.com');
        this.password = page.getByPlaceholder('entrer votre mot de passe');
        this.seSouvenirDeMoi = page.getByLabel('Se souvenir de moi');
        this.loginButton = page.getByRole('button', { name: 'Se connecter' });
        this.deconnecter = page.getByText('arrow_drop_down');
        this.logoutButton = page.getByText('Déconnexion');
    }
    
    async goto(url: string = '/') {
        await this.page.goto(url);
    }


    async login(email: string,password:string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.seSouvenirDeMoi.check();
        await this.loginButton.click();
    }

    async logout() {
        await this.deconnecter.click();
        await this.logoutButton.click();
    }
}
