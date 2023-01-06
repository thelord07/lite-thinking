// @ts-nocheck
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

import { dbUsers } from '../../../database';

export default NextAuth({

  providers: [
    CredentialsProvider({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com'  },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña'  },
      },
 
      async authorize(credentials){
 
        return await dbUsers.checkUserEmailPassword( credentials!.email, credentials!.password );

      }
    })

  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },


  
  session: {
    maxAge: 2592000, /// 30d
    strategy: 'jwt',
    updateAge: 86400, // every day
  },


  callbacks: {

    async jwt({ token, account, user }) {
      // console.log({ token, account, user });

      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {

          case 'credentials':
            token.user = user;
          break;
        }

      }

      return token;
    },


    async session({ session, token, user }){
      // console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },

    

  }

});