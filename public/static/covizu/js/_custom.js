// customizations for virus-seq implementation

// get API URL from URL query
var urlParams = new URLSearchParams(window.location.search);
var apiUrl = urlParams.get('apiUrl') || '';

// add API URL to i18n links
$('#covizu-18n__en, #covizu-18n__fr').on('click', function (e) {
  e.preventDefault();
  var lang = e.target.id.split('__')[1];
  var filename = lang === 'en' ? 'index.html' : 'index-' + lang + '.html';
  var newUrl = filename + '?apiUrl=' + apiUrl;
  location.href = newUrl;
});

// remove time from loading message
i18n_text.loading_json = i18n_text.loading_json
  .replace(' (~10s)', '') // english
  .replace(' (~10 sec)', ''); // french

// URLs excluded from ajaxSetup changes
const excludeUrls = ['data/countries.json'];

// modify Ajax requests here instead of modifying Covizu code
$.ajaxSetup({
  beforeSend: function (xhr, settings) {
    const originalUrl = settings.url.split('?_=')[0];
    settings.url = excludeUrls.includes(originalUrl)
      ? settings.url
      : settings.url
          .replace(/^\/api\//, apiUrl + '/covizu/')
          .replace(/^data\//, apiUrl + '/covizu/data/');
  },
  cache: false,
  crossDomain: true,
  headers: { accept: 'application/json', 'Access-Control-Allow-Origin': '*' },
  type: 'GET',
});

$(document).ajaxError(function (event, jqxhr, settings, thrownError) {
  console.error(thrownError);
});
