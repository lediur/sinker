import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider as RWBProvider } from "react-wrap-balancer";
import cx from "classnames";

import { inter, jetbrainsMono, sfPro } from "@/lib/fonts";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <RWBProvider>
      <main
        className={cx(sfPro.variable, inter.variable, jetbrainsMono.variable)}
      >
        <Component {...pageProps} />
      </main>
    </RWBProvider>
  );
}
