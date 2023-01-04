import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { AuthProvider, CompanyProvider, EntriesProvider } from "../context";
import {  } from "../context/companies";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CompanyProvider>
            <EntriesProvider>
              <Component {...pageProps} />
            </EntriesProvider>
          </CompanyProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}
