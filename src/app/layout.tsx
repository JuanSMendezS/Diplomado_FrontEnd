import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
//import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link
          rel="icon"
          href="https://www.cuc.edu.co/wp-content/uploads/2022/06/cropped-faviconV2-1-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          href="https://www.cuc.edu.co/wp-content/uploads/2022/06/cropped-faviconV2-1-192x192.png"
          sizes="192x192"
        />
        <link
          rel="apple-touch-icon"
          href="https://www.cuc.edu.co/wp-content/uploads/2022/06/cropped-faviconV2-1-180x180.png"
        />
      </head>
      <body className="cuerpo">
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
