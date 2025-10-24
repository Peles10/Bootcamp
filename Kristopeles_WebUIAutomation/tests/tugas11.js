import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import fs from 'fs'; // Dibutuhkan untuk screenshot & visual test
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch'; 

// Import file POM
import PageLogin from '../pages/page_login.js';
import PageProducts from '../pages/page_products.js';

// Nama Describe
describe('Sesi 11: SauceDemo Test (POM & Visual)', function () {
  
  let driver;

  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async function() {
    await driver.quit();
  });

  // --- TEST CASE 1 (SUKSES LOGIN & SORTIR) ---
  it('Harus berhasil login dan mengurutkan produk A-Z', async function () {
    await driver.get('https://www.saucedemo.com');
    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');
    await driver.findElement(PageLogin.inputUsername).sendKeys('standard_user');
    await driver.findElement(PageLogin.inputPassword).sendKeys('secret_sauce');
    await driver.findElement(PageLogin.buttonLogin).click();
    let buttonCart = await driver.wait(
      until.elementLocated(PageProducts.buttonCart), 10000
    );
    assert.ok(await buttonCart.isDisplayed(), 'Gagal login, shopping cart tidak ditemukan');
    await driver.findElement(PageProducts.sortDropdown).click();
    await driver.findElement(PageProducts.optionAZ).click();
    let activeSortOption = await driver.findElement(PageProducts.activeSortOption);
    let sortText = await activeSortOption.getText();
    assert.strictEqual(sortText, 'Name (A to Z)', 'Gagal mengurutkan A-Z');
    console.log('Test 1 (POM) Berhasil: Login dan Sortir A-Z sukses!');
  });
  
  // --- TEST CASE 2 (GAGAL LOGIN) ---
  it('Harus menampilkan error message untuk login yang gagal', async function () {
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(PageLogin.inputUsername).sendKeys('user_salah');
    await driver.findElement(PageLogin.inputPassword).sendKeys('secret_sauce');
    await driver.findElement(PageLogin.buttonLogin).click();
    let errorMessage = await driver.findElement(PageLogin.errorMessage);
    assert.ok(await errorMessage.isDisplayed(), 'Error message tidak tampil');
    let errorText = await errorMessage.getText();
    assert.strictEqual(
      errorText, 
      'Epic sadface: Username and password do not match any user in this service',
      'Teks error message tidak sesuai'
    );
    console.log('Test 2 (POM) Berhasil: Menampilkan error login gagal sukses!');
  });

  //
  // --- TEST CASE 3 (VISUAL TESTING) ---
  //
  it('Cek Visual halaman login', async function() {
    
    // 1. Buka halaman login
    await driver.get('https://www.saucedemo.com');
    // waktu: 1s
    await driver.sleep(1000); 

    // 2. Tentukan nama file
    const baselineImageFile = 'baseline.png';
    const currentImageFile = 'current.png';
    const diffImageFile = 'diff.png';

    // 3. Ambil screenshot halaman saat ini
    let ss_current = await driver.takeScreenshot();
    fs.writeFileSync(currentImageFile, Buffer.from(ss_current, "base64"));
    console.log('Mengambil screenshot saat ini (current.png)');

    // 4. Cek apakah Base Image sudah ada?
    if (!fs.existsSync(baselineImageFile)) {
      // JIKA TIDAK: jadikan screenshot sebagai Base Image
      console.log('Baseline.png tidak ditemukan. Membuat baseline baru...');
      fs.copyFileSync(currentImageFile, baselineImageFile);
      // Tes dianggap LULUS (karena ini run pertama)
      assert.ok(true, 'Baseline dibuat, tes lolos by default.');
    } else {
      // JIKA YA: Compare Base Image VS Screenshot
      console.log('Baseline.png ditemukan. Membandingkan gambar...');
      
      const img1 = PNG.sync.read(fs.readFileSync(baselineImageFile));
      const img2 = PNG.sync.read(fs.readFileSync(currentImageFile));
      const { width, height } = img1;
      
      // Buat file diff
      const diff = new PNG({ width, height });

      // 5. Compare
      const mismatchedPixels = pixelmatch(
        img1.data, 
        img2.data, 
        diff.data, 
        width, 
        height, 
        { threshold: 0.1 }
      );

      // 6. Image sama?
      if (mismatchedPixels === 0) {
        // JIKA YA: PASSED
        console.log('Visual PASSED: Tidak ada perbedaan.');
        assert.strictEqual(mismatchedPixels, 0, 'Visual test passed');
      } else {
        // JIKA TIDAK: FAILED
        console.log(`Visual FAILED: Ditemukan ${mismatchedPixels} pixel yang berbeda.`);
        fs.writeFileSync(diffImageFile, PNG.sync.write(diff));
        console.log('Perbedaan disimpan di diff.png');
        // Gunakan assert.fail untuk menggagalkan tes
        assert.fail(`Visual test failed: ${mismatchedPixels} pixels berbeda. Lihat diff.png.`);
      }
    }
  });
});