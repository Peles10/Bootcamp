// menggunakan 'require' dan 'module.exports'
// const { By } = require("selenium-webdriver");
import { By } from "selenium-webdriver";

class PageLogin {
  // Ini adalah locator untuk elemen di halaman login
  static inputUsername = By.css('[data-test="username"]');
  static inputPassword = By.xpath('//*[@data-test="password"]');
  static buttonLogin = By.className('submit-button');
  static errorMessage = By.css('h3[data-test="error"]');
}

// module.exports = PageLogin;
export default PageLogin;