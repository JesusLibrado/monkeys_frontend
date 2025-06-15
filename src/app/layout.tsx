import AppProvidersWrapper from "@/wrappers/AppProvidersWrapper";
import type { Metadata } from "next";

import "@/assets/scss/app.scss";
// import '@/assets/scss/icons'
import { DEFAULT_PAGE_TITLE } from "@/context/constants";

export const metadata: Metadata = {
  title: {
    template: "%s | Sistema administrativo",
    default: "Portal de recepción",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <AppProvidersWrapper>{children}</AppProvidersWrapper>
      </body>
    </html>
  );
}
