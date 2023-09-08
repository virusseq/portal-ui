import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      sub: string;
      name: string;
      email: string;
      firstName: string;
      lastName: string;
      emailVerified: string;
    }
    expires: string;
    account: {
      provider: string;
      accessToken: string;
    }
    scopes: string[];
  }
}