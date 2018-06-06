var fs = require('fs');
var mgf = require('./index');

var filename = 'test.mgf';

fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  spectra = mgf.parse(data);
  console.log(spectra);
});
