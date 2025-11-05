import { expect } from 'chai';

describe('API Demo Testing', () => {

    it('Buka App > Alert Dialogs > Text Entry dialog dan isi name serta password', async () => {
        console.log('Aplikasi terbuka');

        // waktu 1s
        await browser.pause(1000);

        // Klik menu "App"
        const appMenu = await $('~App');
        await appMenu.click();

        // Klik menu "Alert Dialogs"
        const alertDialogs = await $('~Alert Dialogs');
        await alertDialogs.click();

        // Klik menu "Text Entry dialog"
        const textEntry = await $('~Text Entry dialog');
        await textEntry.click();

        // Isi field name
        const nameField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/username_edit"]');
        await nameField.setValue('Peles');

        // Isi field password
        const passwordField = await $('//android.widget.EditText[@resource-id="io.appium.android.apis:id/password_edit"]');
        await passwordField.setValue('12345');

        // Tekan tombol OK
        const okButton = await $('//android.widget.Button[@text="OK"]');
        await okButton.click();

        // Verifikasi test berhasil (cek apakah halaman Alert Dialogs tampil lagi)
        const isVisible = await $('~Text Entry dialog').isDisplayed();
        expect(isVisible).to.be.true;

        console.log('✅ Test berhasil: Name dan Password terisi, lalu tekan OK');
    });
});
