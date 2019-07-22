import csv from './company.csv'
const helpers = require('../src/funcs');
const chai = require('chai');
chai.should();

// describe('CSV Parser', function() {
//     it('Should parse csv', async function() {
//         let res = await helpers.parseCSV(csv);
//         // res = JSON.parse(res)
//         console.log(res)
//         // result.should.be.equal('Unrecognized source');
//     }).timeout(300000);
// });