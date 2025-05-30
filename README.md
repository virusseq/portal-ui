This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Auth development work

Whenever working on auth-reliant features (e.g. submissions dashboard) your local dev environment will need a few things in place:

- self-signed certificate to proxy the host

  ```
  - install `mkcert` using homebrew, choco or equivalent
  - run `mkcert -install` (you may need to restart your browser after this)
  - then `mkcert local.dev.virusseq-dataportal.ca`
  ```

- ssl proxy

  ```
  - add this to your hosts file (e.g. /etc/hosts)
    127.0.0.1 localhost.dev.virusseq-dataportal.ca
  - then run `npm run dev:submission` which uses the certificates
  ```

## Feature flags

This is a simplified list of the available functionalities in this app,

| Variable Name                   | Default | Description                                                         |
| ------------------------------- | ------- | ------------------------------------------------------------------- |
| NEXT_PUBLIC_ENABLE_DOWNLOADS    | false   | Enables downloading data at "Exploration" and "Data Releases" pages |
| NEXT_PUBLIC_ENABLE_LOGIN        | false   | Allows submitters to login                                          |
| NEXT_PUBLIC_ENABLE_REGISTRATION | false   | Allows new submitters to register                                   |
