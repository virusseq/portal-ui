const urlParams = new URLSearchParams(window.location.search);
const dataVersion = urlParams.get('dataVersion') || '';
const dataUrl = urlParams.get('dataUrl') || '';

$('#covizu-18n__en, #covizu-18n__fr').on('click', function (e) {
  e.preventDefault();
  var lang = e.target.id.split('__')[1];
  var newUrl = 'index-' + lang + '.html?dataVersion=' + dataVersion + '&dataUrl=' + dataUrl;
  location.href = newUrl;
});

var customOptions = {
  dataVersion: dataVersion,
  dataUrls: {
    clusters: dataUrl + ['clusters', dataVersion, 'json'].join('.'),
    countries: 'data/countries.json',
    timetree: dataUrl + ['timetree', dataVersion, 'nwk'].join('.'),
    dbstats: dataUrl + ['dbstats', dataVersion, 'json'].join('.'),
  },
};
