// get data info from current URL
var urlParams = new URLSearchParams(window.location.search);
// our covizu version number. may be different from upstream's version number.
var covizuVersion = urlParams.get('covizuVersion') || '';
var apiUrl = urlParams.get('apiUrl') || '';
var dataUrl = urlParams.get('dataUrl') || '';
var dataDate = urlParams.get('dataDate') || '';

const isLocal = window && window.location.host.includes('localhost');
const localDataUrls = {
  dbstats: 'ignore/dbstats.2022-07-10.json',
  timetree: 'ignore/timetree.2022-07-10.nwk',
  countries: 'data/countries.json',
};

// setup custom options
// var dataUrlWithVersion = dataUrl + covizuVersion + '/';
var dataUrlWithVersion = 'ignore/';
var covizuApiUrl = apiUrl + '/covizu/';
var customOptions = {
  covizuVersion: covizuVersion,
  dataUrls: {
    cid: covizuApiUrl + 'cid',
    clusters: dataUrlWithVersion + ['clusters', dataDate, 'json'].join('.'),
    countries: 'data/countries.json',
    dbstats: dataUrlWithVersion + ['dbstats', dataDate, 'json'].join('.'),
    df: covizuApiUrl + 'df',
    edgelist: covizuApiUrl + 'edgelist',
    getHits: covizuApiUrl + 'getHits',
    lineage: covizuApiUrl + 'lineage',
    lineagetocid: covizuApiUrl + 'lineagetocid',
    points: covizuApiUrl + 'points',
    searchHits: covizuApiUrl + 'searchHits',
    timetree: dataUrlWithVersion + ['timetree', dataDate, 'nwk'].join('.'),
    tips: covizuApiUrl + 'tips',
    variants: covizuApiUrl + 'variants',
    ...(isLocal ? localDataUrls : {}),
  },
};

// add data info to i18n links
$('#covizu-18n__en, #covizu-18n__fr').on('click', function (e) {
  e.preventDefault();
  var lang = e.target.id.split('__')[1];
  var filename = lang === 'en' ? 'index.html' : 'index-' + lang + '.html';
  var newUrl =
    filename +
    '?apiUrl=' +
    apiUrl +
    '&dataUrl=' +
    dataUrl +
    '&covizuVersion=' +
    covizuVersion +
    '&dataDate=' +
    dataDate;
  location.href = newUrl;
});

// remove time from loading message
i18n_text.loading_json = i18n_text.loading_json
  .replace(' (~10s)', '') // english
  .replace(' (~10 sec)', ''); // french

// to check versions in the console:
// console.log(covizuOptions.covizuVersion)
var covizuOptions = $.extend(true, {}, defaultOptions, customOptions);

// setup all ajax requests
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    if (settings.url.includes(apiUrl)) {
      xhr.setRequestHeader('Accept-Version', `apiVersion=${covizuVersion};dataVersion=${dataDate}`);
    }
  },
  cache: false,
  crossDomain: true,
  headers: { accept: 'application/json', 'Access-Control-Allow-Origin': '*' },
  type: 'GET',
});

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  console.error(thrownError);
});
