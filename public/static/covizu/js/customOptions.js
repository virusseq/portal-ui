var dataUrlRoot = 'data/';

const urlParams = new URLSearchParams(window.location.search);
const dataVersion = urlParams.get('dataVersion') || '';

var customOptions = {
  dataVersion: dataVersion,
  dataUrls: {
    clusters: dataUrlRoot + 'clusters.json',
    countries: dataUrlRoot + 'countries.json',
    timetree: dataUrlRoot + 'timetree.nwk',
    dbstats: dataUrlRoot + 'dbstats.json',
  },
};
