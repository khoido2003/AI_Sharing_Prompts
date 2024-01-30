"use client";

import React from "react";
import "./globals.css";
import BackGround from "./ui/BackGround";
import Nav from "./ui/Nav";
import Provider from "./ui/Provider";
import { ThemeProvider } from "./utils/theme-provider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return (
    <html lang="en">
      <link rel="icon" href="/assets/images/logo.svg" sizes="any" />
      <body className={``}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            <Provider>
              <BackGround />

              <main className="app">
                <Nav />
                {children}
              </main>
            </Provider>
          </ThemeProvider>

          <ReactQueryDevtools initialIsOpen={false} />

          {showDevtools && (
            <React.Suspense fallback={null}>
              <ReactQueryDevtoolsProduction />
            </React.Suspense>
          )}
        </QueryClientProvider>
      </body>
    </html>
  );
}
