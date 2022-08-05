// get data info from current URL
var urlParams = new URLSearchParams(window.location.search);
// our covizu version number. may be different from upstream's version number.
var covizuVersion = urlParams.get('covizuVersion') || '';
var dataUrl = urlParams.get('dataUrl') || '';
var dataDate = urlParams.get('dataDate') || '';

// setup custom options
var dataUrlWithVersion = dataUrl + covizuVersion + '/';
var customOptions = {
  covizuVersion: covizuVersion,
  dataUrls: {
    clusters: dataUrlWithVersion + ['clusters', dataDate, 'json'].join('.'),
    countries: 'data/countries.json',
    timetree: dataUrlWithVersion + ['timetree', dataDate, 'nwk'].join('.'),
    dbstats: dataUrlWithVersion + ['dbstats', dataDate, 'json'].join('.'),
  },
};

// add data info to i18n links
$('#covizu-18n__en, #covizu-18n__fr').on('click', function (e) {
  e.preventDefault();
  var lang = e.target.id.split('__')[1];
  var filename = lang === 'en' ? 'index.html' : 'index-' + lang + '.html';
  var newUrl =
    filename + '?dataUrl=' + dataUrl + '&covizuVersion=' + covizuVersion + '&dataDate=' + dataDate;
  location.href = newUrl;
});

// remove time from loading message
i18n_text.loading_json = i18n_text.loading_json
  .replace(' (~10s)', '') // english
  .replace(' (~10 sec)', ''); // french
