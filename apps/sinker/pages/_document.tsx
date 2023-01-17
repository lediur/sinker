import { Html, Head, Main, NextScript } from "next/document";
import { inter, jetbrainsMono, sfPro } from "@/lib/fonts";
import cx from "classnames";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={cx(
          inter.variable,
          sfPro.variable,
          jetbrainsMono.variable,
          "font-sans",
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
