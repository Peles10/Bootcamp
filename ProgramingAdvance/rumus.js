// Nama: Kristopeles Tambunan

export function kalkulator(angka1, angka2, operator) {
  switch (operator) {
    case "+":
      return angka1 + angka2;
    
    case "-":
      return angka1 - angka2;
    
    case "*":
      return angka1 * angka2;
      
    case "/":
      // Memberi penanganan jika dibagi dengan 0
      if (angka2 === 0) {
        return "Error: Tidak bisa membagi dengan angka nol!";
      }
      return angka1 / angka2;
      
    default:
      return "Operator tidak valid! Gunakan +, -, *, atau /";
  }
}