// const { By } = require("selenium-webdriver");
import { By } from "selenium-webdriver";

class PageProducts {
  // Ini adalah locator untuk elemen di halaman produk
  static buttonCart = By.xpath('//*[@data-test="shopping-cart-link"]');
  static sortDropdown = By.css('.product_sort_container');
  static optionAZ = By.xpath('//option[@value="az"]');
  static activeSortOption = By.className('active_option');
}

// module.exports = PageProducts;
export default PageProducts;