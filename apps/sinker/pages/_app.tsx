import { inter, jetbrainsMono, sfPro } from "@/lib/fonts";
import "@/styles/globals.css";
import cx from "classnames";
import type { AppProps } from "next/app";
import { HotkeysProvider } from "react-hotkeys-hook";
import { Provider as RWBProvider } from "react-wrap-balancer";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RWBProvider>
      <HotkeysProvider>
        <main
          className={cx(sfPro.variable, inter.variable, jetbrainsMono.variable)}
        >
          <Component {...pageProps} />
        </main>
      </HotkeysProvider>
    </RWBProvider>
  );
}
