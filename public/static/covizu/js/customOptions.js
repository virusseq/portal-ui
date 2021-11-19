const urlParams = new URLSearchParams(window.location.search);
const dataVersion = urlParams.get('dataVersion') || '';
const dataUrl = urlParams.get('dataUrl') || '';

var customOptions = {
  dataVersion: dataVersion,
  dataUrls: {
    clusters: dataUrl + ['clusters', dataVersion, 'json'].join('.'),
    countries: 'data/countries.json',
    timetree: dataUrl + ['timetree', dataVersion, 'nwk'].join('.'),
    dbstats: dataUrl + ['dbstats', dataVersion, 'json'].join('.'),
  },
};
