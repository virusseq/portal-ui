This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Development Authentication Setup

Whenever working on auth-reliant features (e.g. submissions dashboard) your local dev environment will need the following:

1. Self-signed certificate to proxy the host

- Install `mkcert` using homebrew, choco or equivalent package manager
- Run `mkcert -install` (you may need to restart your browser after this)
- Generate a certificate for dev domain:

  `mkcert local.dev.virusseq-dataportal.ca`

2. Setup SSL proxy

- Add the following entry to your system hosts file (e.g. /etc/hosts):

  `127.0.0.1 localhost.dev.virusseq-dataportal.ca`

- Start the server:
  `npm run dev:submission`
  (This will use the generated certificates.)

## Feature flags

This is a simplified list of the available functionalities in this app,

| Variable Name                   | Default | Description                                                         |
| ------------------------------- | ------- | ------------------------------------------------------------------- |
| NEXT_PUBLIC_ENABLE_DOWNLOADS    | false   | Enables downloading data at "Exploration" and "Data Releases" pages |
| NEXT_PUBLIC_ENABLE_LOGIN        | false   | Allows submitters to login                                          |
| NEXT_PUBLIC_ENABLE_REGISTRATION | false   | Allows new submitters to register                                   |
