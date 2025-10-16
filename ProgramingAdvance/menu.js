//Nama: Kristopeles Tambunan

import { kalkulator } from './rumus.js';
import readline from 'readline';

const inputUser = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

inputUser.question('Masukkan angka pertama: ', (angka1) => {
  inputUser.question('Masukkan operator (+, -, *, /): ', (operator) => {
    inputUser.question('Masukkan angka kedua: ', (angka2) => {

      // Mengubah input string menjadi angka (float)
      const num1 = parseFloat(angka1);

      const num2 = parseFloat(angka2);

      // Memanggil fungsi kalkulator dan menyimpan hasilnya
      const hasil = kalkulator(num1, num2, operator);

      //  hasil
      console.log(`\nHasil: ${hasil}`);
      
      inputUser.close();
    });
  });
});