const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  publicRuntimeConfig: {
    NEXT_PUBLIC_EGO_API_ROOT: process.env.NEXT_PUBLIC_EGO_API_ROOT,
    NEXT_PUBLIC_EGO_CLIENT_ID: process.env.NEXT_PUBLIC_EGO_CLIENT_ID,
    EGO_PUBLIC_KEY: process.env.EGO_PUBLIC_KEY,
    NEXT_PUBLIC_KEYCLOAK: process.env.NEXT_PUBLIC_KEYCLOAK_API_URL,
    NEXT_PUBLIC_ARRANGER_PROJECT_ID: process.env.NEXT_PUBLIC_ARRANGER_PROJECT_ID,
    NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD: process.env.NEXT_PUBLIC_ARRANGER_GRAPHQL_FIELD,
    NEXT_PUBLIC_ARRANGER_INDEX: process.env.NEXT_PUBLIC_ARRANGER_INDEX,
    NEXT_PUBLIC_ARRANGER_API: process.env.NEXT_PUBLIC_ARRANGER_API_URL,
    NEXT_PUBLIC_ARRANGER_ADMIN_UI: process.env.NEXT_PUBLIC_ARRANGER_ADMIN_UI_URL,
    NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS: process.env.NEXT_PUBLIC_ARRANGER_MANIFEST_COLUMNS || '',
    // using ASSET_PREFIX for the public runtime BASE_PATH because basePath in the top level config was not working
    // with the dms reverse proxy setup
    NEXT_PUBLIC_DOWNLOAD_ALL_URL: process.env.NEXT_PUBLIC_DOWNLOAD_ALL_URL,
    NEXT_PUBLIC_BASE_PATH: process.env.ASSET_PREFIX || '/',
    NEXT_PUBLIC_ADMIN_EMAIL: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
    NEXT_PUBLIC_LAB_NAME: process.env.NEXT_PUBLIC_LAB_NAME,
    NEXT_PUBLIC_LOGO_FILENAME: process.env.NEXT_PUBLIC_LOGO_FILENAME,
    NEXT_PUBLIC_MUSE_API: process.env.NEXT_PUBLIC_MUSE_API_URL,
    NEXT_PUBLIC_SINGULARITY_API_URL: process.env.NEXT_PUBLIC_SINGULARITY_API_URL,
    NEXT_PUBLIC_SSO_PROVIDERS: process.env.NEXT_PUBLIC_SSO_PROVIDERS,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_RELEASE_DATE: process.env.NEXT_PUBLIC_RELEASE_DATE,
    NEXT_PUBLIC_SYSTEM_ALERTS: process.env.NEXT_PUBLIC_SYSTEM_ALERTS,
    NEXT_PUBLIC_STUDIES_SVC_URL: process.env.NEXT_PUBLIC_STUDIES_SVC_URL,
    NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE: process.env.NEXT_PUBLIC_SCOPE_STUDY_SVC_WRITE,
    NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE:
      process.env.NEXT_PUBLIC_SCOPE_MUSE_STUDY_SYSTEM_WRITE,
    NEXT_PUBLIC_APP_VERSION: process.env.APP_VERSION,
    NEXT_PUBLIC_APP_COMMIT: process.env.APP_COMMIT,
  },
  assetPrefix: process.env.ASSET_PREFIX || '',
  redirects: async () => [
    {
      source: '/about',
      destination: '/',
      permanent: true,
    },
    {
      source: '/static/covizu/data/clusters.json',
      destination:
        process.env.NEXT_PUBLIC_COVIZU_DATA_URL +
        'clusters.' +
        process.env.NEXT_PUBLIC_COVIZU_DATA_VERSION +
        '.json',
      permanent: false,
    },
    {
      source: '/static/covizu/data/timetree.nwk',
      destination:
        process.env.NEXT_PUBLIC_COVIZU_DATA_URL +
        'timetree.' +
        process.env.NEXT_PUBLIC_COVIZU_DATA_VERSION +
        '.nwk',
      permanent: false,
    },
    {
      source: '/static/covizu/data/dbstats.json',
      destination:
        process.env.NEXT_PUBLIC_COVIZU_DATA_URL +
        'dbstats.' +
        process.env.NEXT_PUBLIC_COVIZU_DATA_VERSION +
        '.json',
      permanent: false,
    },
  ],
});
