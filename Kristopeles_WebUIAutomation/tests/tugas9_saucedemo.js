// 1. Import library
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

// 2. Buat Test Suite
describe('SauceDemo Test', function () {
  
  let driver;

  // 3. Test Case
  it('Harus berhasil login dan mengurutkan produk A-Z', async function () {
    
    // Buka browser Chrome
    driver = await new Builder().forBrowser('chrome').build();
    
    try {
      // Buka website saucedemo.com
      await driver.get('https://www.saucedemo.com'); 

      // Cek apakah judul halamannya "Swag Labs"
      const title = await driver.getTitle();
      assert.strictEqual(title, 'Swag Labs'); 

      // --- TAHAP LOGIN ---
      // Cari elemen username, password, dan tombol login
      let inputUsername = await driver.findElement(By.css('[data-test="username"]')); 
      let inputPassword = await driver.findElement(By.xpath('//*[@data-test="password"]')); 
      let buttonLogin = await driver.findElement(By.className('submit-button')); 

      // Masukkan username dan password, lalu klik login
      await inputUsername.sendKeys('standard_user'); 
      await inputPassword.sendKeys('secret_sauce'); 
      await buttonLogin.click(); 

      // Validasi setelah login: Cek apakah 'shopping cart' tampil
      let buttonCart = await driver.wait(
        until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
        10000 // tunggu maks 10 detik
      );
      assert.ok(await buttonCart.isDisplayed(), 'Gagal login, shopping cart tidak ditemukan'); 

      // --- TAHAP SORTIR (A-Z) --- 
      // Cari dropdown untuk sortir
      let sortDropdown = await driver.findElement(By.css('.product_sort_container'));
      
      // Klik dropdown
      await sortDropdown.click();

      // Pilih opsi 'Name (A to Z)'
      let optionAZ = await driver.findElement(By.xpath('//option[@value="az"]'));
      await optionAZ.click();

      // Validasi Sortir: Cek apakah dropdown sekarang menampilkan 'A TO Z'
      let activeSortOption = await driver.findElement(By.className('active_option'));
      let sortText = await activeSortOption.getText();
      assert.strictEqual(sortText, 'Name (A to Z)', 'Gagal mengurutkan A-Z');

      console.log('Test Berhasil: Login dan Sortir A-Z sukses!');
    
    } finally {
      // 4. Tutup browser setelah tes selesai
      await driver.quit();
    }
  });
});