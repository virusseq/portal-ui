// get data info from current URL
var urlParams = new URLSearchParams(window.location.search);
var covizuVersion = urlParams.get('covizuVersion') || '';
var dataUrl = urlParams.get('dataUrl') || '';
var filesUrl = urlParams.get('filesUrl') || '';

// get a list of clusters files from the current data version folder
// in order to get the date of the latest file upload
var clusters = [];
var filesPath = window.location.hostname.includes('localhost')
  ? 'cluster-list.json'
  : '?format=json&prefix=' + covizuVersion + '/clusters.20';
var filesUrlComplete = filesUrl + covizuVersion + '/' + filesPath;

$.ajax({
  async: false,
  cache: false,
  crossDomain: true,
  dataType: "json",
  headers: {
    accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  method: 'GET',
  success: function (data) {
    clusters = data;
  },
  url: filesUrlComplete
});

// get latest data date from the clusters filenames
var clusterNames = [];
// make sure filenames follow x.x.x/clusters.20xx-xx-xx.json pattern
var clustersFilenameTest = /^(\d+\.){2}\d+\/(clusters\.)\d{4}(\-\d{2}){2}(\.json)$/;
clusters.forEach(function (cluster) {
  if (clustersFilenameTest.test(cluster.name)) {
    clusterNames.push(cluster.name);
  }
})
var clusterNamesSorted = clusterNames.concat().sort();
var dataDate = clusterNamesSorted[clusterNamesSorted.length - 1].match(/\d{4}\-\d{2}\-\d{2}/)[0];

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
  var newUrl = filename + '?covizuVersion=' + covizuVersion + '&dataUrl=' + dataUrl + '&filesUrl=' + filesUrl;
  location.href = newUrl;
});

// remove time from loading message
i18n_text.loading_json = i18n_text.loading_json
  .replace(' (~10s)', '') // english
  .replace(' (~10 sec)', ''); // french
