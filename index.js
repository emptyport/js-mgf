module.exports.parse = function(fileText) {

  let spectra = [];
  let currentSpectrum = {};
  let mzArray = [];
  let intensityArray = [];

  var lines = fileText.split(/\r?\n/);
  lines.forEach(function(line) {
    if(line === 'BEGIN IONS') {
      currentSpectrum['mz'] = mzArray;
      currentSpectrum['intensity'] = intensityArray;
      spectra.push(currentSpectrum);
      currentSpectrum = {};
      mzArray = [];
      intensityArray = [];
    }

    if(line.startsWith("PEPMASS")) {
      var rawInfo = line.split("=")[1];
      var pepmass = parseFloat(rawInfo.split(" ")[0]);
      currentSpectrum['pepmass'] = pepmass;
      var pepintensity = parseFloat(rawInfo.split(" ")[1]);
      if(isNaN(pepintensity) === false) {
        currentSpectrum['pepintensity'] = pepintensity;
      }
    }

    if(line.startsWith("CHARGE")) {
      var rawInfo = line.split("=")[1];
      var sign = rawInfo[rawInfo.length - 1];
      var charge = parseInt(rawInfo.substring(0, rawInfo.length));
      if(sign==='-') {
        charge = -1 * charge;
      }
      currentSpectrum['charge'] = charge;
    }

    if(line.startsWith("TITLE")) {
      var rawInfo = line.substring(6, line.length);
      currentSpectrum['title'] = rawInfo;
    }

    if(line.startsWith('RTINSECONDS')) {
      var rawInfo = line.split("=")[1];
      var rt = parseFloat(rawInfo);
      currentSpectrum['rt'] = rt;
    }

    if(line.match(/^\d/)) {
      var mz = parseFloat(line.split(/[ \t]+/)[0]);
      var intensity = parseFloat(line.split(/[ \t]+/)[1]);
      mzArray.push(mz);
      intensityArray.push(intensity);
    }
  });

  currentSpectrum['mz'] = mzArray;
  currentSpectrum['intensity'] = intensityArray;
  spectra.push(currentSpectrum);

  spectra.shift();
  return spectra;
}