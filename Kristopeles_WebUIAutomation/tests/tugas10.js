// 1. Import library 
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

// 2. Buat Test Suite
describe('Sesi 10: SauceDemo Test (Hooks)', function () {
  
  // defenisi driver agar dapat dijalankan hook
  let driver;

  // --- HOOKS ---
  // Kode berjalan SEBELUM SETIAP 'it'
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  // Kode berjalan SETELAH SETIAP 'it'
  afterEach(async function() {
    await driver.quit();
  });
  // --- BATAS HOOKS ---


  // 
  // --- TEST CASE 1 (SUKSES LOGIN & SORTIR) ---
  // 
  it('Harus berhasil login dan mengurutkan produk A-Z', async function () {
    
    // Buka website saucedemo.com
    await driver.get('https://www.saucedemo.com');

    // Cek apakah judul halamannya "Swag Labs"
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');

    // --- TAHAP LOGIN ---
    await driver.findElement(By.css('[data-test="username"]')).sendKeys('standard_user');
    await driver.findElement(By.xpath('//*[@data-test="password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.className('submit-button')).click();

    // Validasi setelah login: Cek apakah 'shopping cart' tampil
    let buttonCart = await driver.wait(
      until.elementLocated(By.xpath('//*[@data-test="shopping-cart-link"]')),
      10000
    );
    assert.ok(await buttonCart.isDisplayed(), 'Gagal login, shopping cart tidak ditemukan');

    // --- TAHAP SORTIR (A-Z) ---
    await driver.findElement(By.css('.product_sort_container')).click();
    await driver.findElement(By.xpath('//option[@value="az"]')).click();

    // Validasi Sortir: Cek apakah dropdown sekarang menampilkan 'A TO Z'
    let activeSortOption = await driver.findElement(By.className('active_option'));
    let sortText = await activeSortOption.getText();
    assert.strictEqual(sortText, 'Name (A to Z)', 'Gagal mengurutkan A-Z');

    console.log('Test 1 Berhasil: Login dan Sortir A-Z sukses!');
  });
  

  // 
  // --- TEST CASE 2 (GAGAL LOGIN) ---
  // 
  it('Harus menampilkan error message untuk login yang gagal', async function () {
    
    // Buka website saucedemo.com
    // 'beforeEach' membuka browser dan melakukan tes
    await driver.get('https://www.saucedemo.com');

    // --- TAHAP LOGIN GAGAL ---
    // Username salah
    await driver.findElement(By.css('[data-test="username"]')).sendKeys('user_salah');
    await driver.findElement(By.xpath('//*[@data-test="password"]')).sendKeys('secret_sauce');
    await driver.findElement(By.className('submit-button')).click();

    // --- VALIDASI ERROR ---
    // Cari elemen error message
    let errorMessage = await driver.findElement(By.css('h3[data-test="error"]'));
    
    // Cek apakah elemennya tampil
    assert.ok(await errorMessage.isDisplayed(), 'Error message tidak tampil');

    // Cek isi teks error message
    let errorText = await errorMessage.getText();
    assert.strictEqual(
      errorText, 
      'Epic sadface: Username and password do not match any user in this service',
      'Teks error message tidak sesuai'
    );

    console.log('Test 2 Berhasil: Menampilkan error login gagal sukses!');
  });

});