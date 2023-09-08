import NextAuth, { SessionStrategy } from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";
import axios from 'axios';

import { getConfig } from '@/global/config';
import { KEYCLOAK_URL_TOKEN, KEYCLOAK_URL_ISSUER } from '@/global/utils/constants';

const { NEXT_PUBLIC_KEYCLOAK_CLIENT_ID, 
  NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET, 
  NEXT_PUBLIC_KEYCLOAK_SECRET  } = getConfig();

const bodyParams = () => {
  return new URLSearchParams({
    'grant_type': 'urn:ietf:params:oauth:grant-type:uma-ticket',
    'audience': 'song',
    'response_mode': 'permissions'
  });
}

const headerWithBearer = (accessToken: string) => {
  return {
    'content-type': 'application/x-www-form-urlencoded',
    'authorization': 'Bearer ' + accessToken,
    'accept': '*/*'
  }
}

const fetchPermissions = async (accessToken: string) => {
  const { data } = await axios.post(
    KEYCLOAK_URL_TOKEN, 
    bodyParams(),
  {
    headers: headerWithBearer(accessToken)
  });
  return data;
}

type Permission = {
  rsid: string;
  rsname: string;
  scopes: string[];
};

const scopesFromPermissions = (permissions: Permission[]) => {
  return permissions
    .filter(p => p.scopes)
    .flatMap(p => p.scopes.flatMap(s => [p.rsname + "." + s]))

}

export const authOptions = {
    secret: NEXT_PUBLIC_KEYCLOAK_SECRET,
    // Configure one or more authentication providers
    providers: [
        KeycloakProvider({
                clientId: NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
                clientSecret: NEXT_PUBLIC_KEYCLOAK_CLIENT_SECRET,
                issuer: KEYCLOAK_URL_ISSUER,
            })
    ],
    callbacks: {
        async jwt(props: any) {
          const { token, account, profile, trigger } = props;

          if (account || profile) {
            // to persist additional data like accessToken as user
            token.account = account
            token.profile = profile
          }

          if(trigger === "signIn"){
            const permissions = await fetchPermissions(token.account.access_token);
            token.permissions = permissions
          }

          return token
        },
        async session({ token, session }: any) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.account = {
            accessToken: token?.account?.access_token,
            provider: token?.account?.provider
          }
          session.user.firstName = token?.profile?.given_name
          session.user.lastName = token?.profile?.family_name
          session.user.emailVerified = token?.profile?.email_verified
          session.user.id = token?.sub
          session.scopes = scopesFromPermissions(token?.permissions)
          return session
        }
    },
    session: {
      // Encrypted JWT (JWE) stored in the session cookie.
      strategy: "jwt" as SessionStrategy,
      // Seconds - How long until an idle session expires and is no longer valid.
      maxAge: 60 * 60, // 1 hour
      raw: true
    }
}

export default NextAuth(authOptions)