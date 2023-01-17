import localFont from "@next/font/local";
import { Inter, JetBrains_Mono } from "@next/font/google";

export const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

export const inter = Inter({
  variable: "--font-inter",
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
});
