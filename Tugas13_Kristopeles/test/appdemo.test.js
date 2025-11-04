import { expect } from 'chai';
describe('API Demo Testing', () => {

    it('coba test buka aplikasinya', async () => {
        console.log('Aplikasi terbuka');

        console.log('Aplikasi akan ditahan selama 5 detik...');
        await browser.pause(5000); 

        console.log('Jeda 5 detik selesai. Tes ditutup.');
    });

});