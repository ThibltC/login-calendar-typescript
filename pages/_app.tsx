import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import SnackbarComponent from "../src/components/Snackbar";
import SnackbarProvider from "../src/contexts/snackbarContext";
import DateProvider from "../src/contexts/dateContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SnackbarProvider>
      <SessionProvider session={session}>
        <DateProvider>
          <>
            <Component {...pageProps} />
            <SnackbarComponent />
          </>
        </DateProvider>
      </SessionProvider>
    </SnackbarProvider>
  );
}
