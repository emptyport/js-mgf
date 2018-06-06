var test = require('tape');
var fs = require('fs');
var mgf = require('../index');

test('File parses correctly', function(t) {
  var filename = './test.mgf';

  fs.readFile(filename, 'utf8', function(err, data){
    if (err) throw err;

    spectra = mgf.parse(data);

    t.equal(spectra.length, 2, 'Correct number of spectra');

    t.equal(spectra[0].title, 'First spectrum', 'Correct title for first spectrum');
    t.equal(spectra[0].rt, 500, 'First RT is correct');
    t.equal(spectra[0].pepmass, 432, 'First pepmass is correct');
    t.equal(spectra[0].pepintensity, 12000, 'First pepintensity is correct');
    t.equal(spectra[0].charge, 2, 'First charge is correct');
    t.equal(spectra[0].mz[1], 549, 'mz array looks good');
    t.equal(spectra[0].intensity[2], 100, 'intensity array looks good');

    t.equal(spectra[1].title, 'Second spectrum = something cool', 'Correct title for second spectrum');
    t.equal(spectra[1].rt, 510, 'Second RT is correct');
    t.equal(spectra[1].pepmass, 679.32, 'Second pepmass is correct');
    t.equal(spectra[1].pepintensity, undefined, 'Second pepintensity is correct');
    t.equal(spectra[1].charge, -3, 'Second charge is correct');
    t.equal(spectra[1].mz[1], 549.6, 'mz array looks good');
    t.equal(spectra[1].intensity[2], 100.67, 'intensity array looks good');


    t.end();
  });
});

