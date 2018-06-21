# js-mgf

This module provides simple mgf file parsing

## Installation
npm install js-mgf --save

## Usage
Quickstart example:
```javascript
var fs = require('fs');
var mgf = require('js-mgf');

var filename = 'test.mgf';

fs.readFile(filename, 'utf8', function(err, data){
  if (err) throw err;

  spectra = mgf.parse(data);
  console.log(spectra);
});
```

Output:
```javascript
[ { title: 'First spectrum',
    rt: 500,
    pepmass: 432,
    pepintensity: 12000,
    charge: 2,
    mz: [ 123, 549, 567, 657 ],
    intensity: [ 54, 12, 100, 34 ] },
  { title: 'Second spectrum = something cool',
    rt: 510,
    pepmass: 679.32,
    charge: -3,
    mz: [ 123.4, 549.6, 567.8, 657.1 ],
    intensity: [ 54.12, 12.89, 100.67, 34.45 ] } ]
```

Contents of `test.mgf`
```
BEGIN IONS
TITLE=First spectrum
RTINSECONDS=500
PEPMASS=432 12000
CHARGE=2+
123 54
549 12
567 100
657 34
END IONS

BEGIN IONS
TITLE=Second spectrum = something cool
RTINSECONDS=510
PEPMASS=679.32
CHARGE=3-
123.4 54.12
549.6 12.89
567.8 100.67
657.1 34.45
END IONS
```

This module only has the one `parse` method and takes as input the text content of an mgf file. This module will read the following information:
* TITLE as `title`
* RTINSECONDS as `rt`
* PEPMASS as `pepmass` and `pepintensity` if the second intensity value is present
* CHARGE as `charge`
* All the mz and intensity values into the `mz` and `intensity` arrays.

No other fields will be read from the mgf file.

## Tests
You can run `npm test` to run the tests after installing the development dependencies.

## Future functionality
No future functionality is planned.

## License
This software is released under the MIT license.

## Support this project!

[![Support this project on Patreon!](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/MikeTheBiochem)
