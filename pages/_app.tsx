import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import SnackbarComponent from "../src/components/Snackbar";
import SnackbarProvider from "../src/contexts/snackbarContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <SnackbarProvider>
        <>
          <Component {...pageProps} />
          <SnackbarComponent />
        </>
      </SnackbarProvider>
    </SessionProvider>
  );
}
