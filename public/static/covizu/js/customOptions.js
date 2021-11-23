// get data info from current URL
var urlParams = new URLSearchParams(window.location.search);
var dataVersion = urlParams.get('dataVersion') || '';
var dataUrl = urlParams.get('dataUrl') || '';

var customOptions = {
  dataVersion: dataVersion,
  dataUrls: {
    clusters: dataUrl + ['clusters', dataVersion, 'json'].join('.'),
    countries: 'data/countries.json',
    timetree: dataUrl + ['timetree', dataVersion, 'nwk'].join('.'),
    dbstats: dataUrl + ['dbstats', dataVersion, 'json'].join('.'),
  },
};

// add data info to i18n links
$('#covizu-18n__en, #covizu-18n__fr').on('click', function (e) {
  e.preventDefault();
  var lang = e.target.id.split('__')[1];
  var filename = lang === 'en' ? 'index.html' : 'index-' + lang + '.html';
  var newUrl = filename + '?dataVersion=' + dataVersion + '&dataUrl=' + dataUrl;
  location.href = newUrl;
});

// remove time from loading message
i18n_text.loading_json = i18n_text.loading_json
  .replace(' (~10s)', '') // english
  .replace(' (~10 sec)', ''); // french
