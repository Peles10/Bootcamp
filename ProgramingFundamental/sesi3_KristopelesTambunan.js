//sesi3_KristopelesTambunan

//1.segitiga siku-""
// let tinggi = 4; 

// for (let i = 1; i <= tinggi; i++) {
//   let baris = '';
//   for (let j = 1; j <= i; j++) {
//     baris += '*';
//   }
//   console.log(baris);
// }


//2.segitiga sama kaki
let tinggi = 4;
for (let i = 1; i <= tinggi; i++) {

     let spasi = '';
     let bintang = '';

     for (let j = 1; j <= tinggi - i; j++) {
        spasi += ' ';
    }

  for (let k = 1; k <= 2 * i - 1; k++) {
    bintang += '*';
  }

  console.log(spasi + bintang);
}