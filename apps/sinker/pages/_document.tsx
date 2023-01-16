import { Html, Head, Main, NextScript } from "next/document";
import { inter, jetbrainsMono, sfPro } from "@/lib/fonts";
import cx from "classnames";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body
        className={cx(
          inter.variable,
          sfPro.variable,
          jetbrainsMono.variable,
          "font-sans",
          "dark:bg-zinc-900 dark:text-zinc-50",
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
